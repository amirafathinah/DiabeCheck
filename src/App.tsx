import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { ScreeningForm } from './components/ScreeningForm';
import { InlineResultView } from './components/InlineResultView';
import { SidebarChecklist } from './components/SidebarChecklist';
import { DisclaimerSection } from './components/DisclaimerSection';
import { Footer } from './components/Footer';
import { ClinicalGuideSection } from './components/ClinicalGuideSection';
import { DiabetesFormData, PredictionResponse } from './types/diabetes';
import {
  predictDiabetesRisk,
  DEMO_PRESETS,
  API_BASE_URL,
} from './services/predictionService';
import { CheckCircle2, AlertCircle, Info, X, RefreshCw, AlertTriangle } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('diabecheck_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('diabecheck_dark_mode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('diabecheck_dark_mode', 'false');
    }
  }, [darkMode]);

  // Mode: Dengan Hasil Lab vs Tanpa Hasil Lab
  const [hasLabResults, setHasLabResults] = useState<boolean>(true);

  // Form Wizard State (Steps 1, 2, 3)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<DiabetesFormData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{
    type: 'success' | 'warning' | 'info';
    message: string;
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Switch between "Dengan Hasil Lab" and "Tanpa Hasil Lab"
  const handleToggleLabResults = (hasLab: boolean) => {
    setHasLabResults(hasLab);
    setErrorMessage(null);
    if (!hasLab) {
      // If user was on Step 2 (Lab), move to Step 3 (Lifestyle)
      if (currentStep === 2) {
        setCurrentStep(3);
      }
      // Clear lab values from formData
      const updated = { ...formData };
      delete updated.HbA1c;
      delete updated.Fasting_Blood_Sugar;
      delete updated.Blood_Glucose;
      delete updated.Insulin_Level;
      delete updated.Total_Cholesterol;
      delete updated.HDL;
      delete updated.LDL;
      delete updated.Triglycerides;
      setFormData(updated);

      showToast(
        'Beralih ke mode tanpa hasil lab. Langkah lab dilewati otomatis.',
        'warning'
      );
    } else {
      showToast(
        'Beralih ke mode lengkap dengan hasil lab. Semua langkah aktif.',
        'info'
      );
    }
  };

  // Completion Rate Calculation
  const totalImportantKeys: (keyof DiabetesFormData)[] = useMemo(() => {
    if (hasLabResults) {
      return [
        'Age',
        'Gender',
        'Height_cm',
        'Weight_kg',
        'BMI',
        'HbA1c',
        'Fasting_Blood_Sugar',
        'Blood_Glucose',
        'Blood_Pressure_Systolic',
        'Family_History_Diabetes',
        'Physical_Activity_Level',
        'Diet_Quality',
      ];
    }
    // Non-lab mode
    return [
      'Age',
      'Gender',
      'Height_cm',
      'Weight_kg',
      'BMI',
      'Waist_Circumference_cm',
      'Family_History_Diabetes',
      'Physical_Activity_Level',
      'Diet_Quality',
      'Sugar_Intake_Level',
    ];
  }, [hasLabResults]);

  const { filledCount, completionRate } = useMemo(() => {
    let filled = 0;
    totalImportantKeys.forEach((key) => {
      const val = formData[key];
      if (val !== undefined && val !== null && val !== '' && val !== 'Unknown') {
        filled++;
      }
    });

    // Also count other optional keys
    let otherFilled = 0;
    Object.entries(formData).forEach(([k, v]) => {
      if (!totalImportantKeys.includes(k as keyof DiabetesFormData) && v !== undefined && v !== '' && v !== 'Unknown') {
        otherFilled++;
      }
    });

    const calculatedRate = Math.min(
      100,
      Math.round(((filled + Math.min(2, otherFilled * 0.4)) / totalImportantKeys.length) * 100)
    );

    return {
      filledCount: filled,
      completionRate: calculatedRate,
    };
  }, [formData, totalImportantKeys]);

  // Handlers
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleScrollToForm = () => {
    const el = document.getElementById('skrining-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoadPreset = (key: 'low' | 'moderate' | 'high') => {
    const preset = DEMO_PRESETS[key];
    const data = { ...preset.data };
    if (!hasLabResults) {
      delete data.HbA1c;
      delete data.Fasting_Blood_Sugar;
      delete data.Blood_Glucose;
      delete data.Insulin_Level;
      delete data.Total_Cholesterol;
      delete data.HDL;
      delete data.LDL;
      delete data.Triglycerides;
    }
    setFormData(data);
    setResult(null);
    setErrorMessage(null);
    setCurrentStep(1);
    showToast(`Data "${preset.title}" berhasil dimuat!`, 'success');
    handleScrollToForm();
  };

  const handleResetForm = () => {
    setFormData({});
    setResult(null);
    setErrorMessage(null);
    setCurrentStep(1);
    showToast('Formulir berhasil dikosongkan.', 'info');
  };

  const handleEditData = () => {
    setResult(null);
    setErrorMessage(null);
    handleScrollToForm();
  };

  // Form Submission via real HTTP POST fetch() to backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check basic ranges
    if (formData.Age && (formData.Age < 1 || formData.Age > 120)) {
      showToast('Usia harus di antara rentang 1 hingga 120 tahun.', 'warning');
      return;
    }
    if (hasLabResults && formData.HbA1c && (formData.HbA1c < 3.0 || formData.HbA1c > 20.0)) {
      showToast('Nilai HbA1c biasanya berada di rentang 3.0% hingga 20.0%.', 'warning');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await predictDiabetesRisk(formData, hasLabResults);
      setResult(response);
      setErrorMessage(null);
      handleScrollToForm();
      showToast('Hasil analisis berhasil diperoleh dari backend API!', 'success');
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      const friendlyMessage =
        errorObj?.message ||
        `Gagal menghubungi backend API (${API_BASE_URL}). Pastikan server backend sedang aktif dan koneksi internet stabil.`;
      setErrorMessage(friendlyMessage);
      showToast(friendlyMessage, 'warning');
      handleScrollToForm();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold border ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-700'
                : toast.type === 'warning'
                ? 'bg-rose-600 text-white border-rose-700'
                : 'bg-indigo-600 text-white border-indigo-700'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : toast.type === 'warning' ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <Info className="w-4 h-4 shrink-0" />
            )}
            <span className="max-w-md">{toast.message}</span>
            <button
              onClick={() => setToast(null)}
              className="ml-2 hover:opacity-80 text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onScrollToForm={handleScrollToForm}
      />

      {/* Hero Section */}
      <HeroSection
        onStartScreening={handleScrollToForm}
        onLoadPreset={handleLoadPreset}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* MAIN SCREENING SECTION (MULTI-STEP WIZARD / INLINE RESULT) */}
      <section
        id="skrining-section"
        className="py-16 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200/70 dark:border-slate-800 scroll-mt-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Form Wizard OR Inline Result (60% -> 7 or 8 cols) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Friendly Error Banner if API Fails */}
              {errorMessage && (
                <div className="p-5 rounded-3xl bg-rose-50/90 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200 shadow-sm animate-in fade-in duration-200">
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <strong className="text-sm font-bold text-rose-900 dark:text-rose-200">
                          Tidak Dapat Mengakses Server Prediksi
                        </strong>
                        <button
                          onClick={() => setErrorMessage(null)}
                          className="text-rose-500 hover:text-rose-800 dark:hover:text-rose-200 p-1 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                        {errorMessage}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleSubmit(e)}
                          disabled={isLoading}
                          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                          <span>{isLoading ? 'Mencoba Menghubungi...' : 'Coba Kirim Ulang'}</span>
                        </button>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Endpoint: <code className="font-mono text-slate-700 dark:text-slate-300">{API_BASE_URL}/predict</code>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {result ? (
                <InlineResultView
                  result={result}
                  formData={formData}
                  onEditData={handleEditData}
                  onResetAll={handleResetForm}
                  hasLabResults={hasLabResults}
                />
              ) : (
                <ScreeningForm
                  formData={formData}
                  onChange={(newData) => {
                    setFormData(newData);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  completionRate={completionRate}
                  currentStep={currentStep}
                  onStepChange={setCurrentStep}
                  hasLabResults={hasLabResults}
                  onToggleLabResults={handleToggleLabResults}
                />
              )}
            </div>

            {/* Right Column: Sticky Sidebar (40% -> 5 or 4 cols) */}
            <div className="lg:col-span-5 xl:col-span-4">
              <SidebarChecklist
                formData={formData}
                completionRate={completionRate}
                filledCount={filledCount}
                totalImportantFields={totalImportantKeys.length}
                onFillDemo={handleLoadPreset}
                onReset={handleResetForm}
                currentStep={currentStep}
                onStepChange={(step) => {
                  setResult(null);
                  setErrorMessage(null);
                  setCurrentStep(step);
                }}
                hasResult={Boolean(result)}
                hasLabResults={hasLabResults}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Guide & Reference Table */}
      <ClinicalGuideSection />

      {/* Disclaimer Section */}
      <DisclaimerSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
