import React, { useState } from 'react';
import {
  User,
  Heart,
  Activity,
  Droplet,
  Scale,
  Sparkles,
  RotateCcw,
  HelpCircle,
  AlertCircle,
  Dna,
  ArrowRight,
  ArrowLeft,
  Check,
  Stethoscope,
  Clock,
  Coffee,
  Footprints,
  Shield,
  Info,
  FileCheck,
  FileQuestion,
  AlertTriangle,
} from 'lucide-react';
import { DiabetesFormData } from '../types/diabetes';
import { DEMO_PRESETS } from '../services/predictionService';

interface ScreeningFormProps {
  formData: DiabetesFormData;
  onChange: (data: DiabetesFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  completionRate: number;
  currentStep: number;
  onStepChange: (step: number) => void;
  hasLabResults: boolean;
  onToggleLabResults: (hasLab: boolean) => void;
}

export const ScreeningForm: React.FC<ScreeningFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  completionRate,
  currentStep,
  onStepChange,
  hasLabResults,
  onToggleLabResults,
}) => {
  // Active tooltip state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Auto-calculate BMI when Height and Weight are updated
  const handleHeightWeightChange = (
    field: 'Height_cm' | 'Weight_kg',
    val: number | undefined
  ) => {
    const updated = { ...formData, [field]: val };
    const h = field === 'Height_cm' ? val : formData.Height_cm;
    const w = field === 'Weight_kg' ? val : formData.Weight_kg;

    if (h && w && h > 0 && w > 0) {
      const calculatedBmi = Number((w / Math.pow(h / 100, 2)).toFixed(1));
      if (calculatedBmi >= 10 && calculatedBmi <= 70) {
        updated.BMI = calculatedBmi;
      }
    }
    onChange(updated);
  };

  const handleFieldChange = (key: keyof DiabetesFormData, val: unknown) => {
    onChange({
      ...formData,
      [key]: val === '' ? undefined : val,
    });
  };

  const handleReset = () => {
    onChange({});
    onStepChange(1);
  };

  const handleLoadDemo = (key: 'low' | 'moderate' | 'high') => {
    const data = { ...DEMO_PRESETS[key].data };
    if (!hasLabResults) {
      // Clear lab parameters in no-lab mode
      delete data.HbA1c;
      delete data.Fasting_Blood_Sugar;
      delete data.Blood_Glucose;
      delete data.Insulin_Level;
      delete data.Total_Cholesterol;
      delete data.HDL;
      delete data.LDL;
      delete data.Triglycerides;
    }
    onChange(data);
  };

  // Tooltip helper
  const renderTooltip = (id: string, text: string) => (
    <div className="relative inline-flex items-center ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setActiveTooltip(activeTooltip === id ? null : id)}
        className="text-slate-400 hover:text-indigo-600 dark:hover:text-teal-400 focus:outline-none cursor-pointer"
        aria-label="Penjelasan singkat"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>
      {activeTooltip === id && (
        <>
          <div
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setActiveTooltip(null)}
          />
          <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-900 text-white text-xs rounded-xl shadow-xl leading-relaxed">
            <div className="flex items-start justify-between gap-1 mb-1 font-semibold text-[11px] text-teal-300">
              <span>Penjelasan Awam:</span>
            </div>
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </div>
        </>
      )}
    </div>
  );

  // Dynamic steps depending on hasLabResults
  const steps = hasLabResults
    ? [
        { number: 1, title: 'Data Dasar & Fisik', short: 'Fisik' },
        { number: 2, title: 'Hasil Lab & Medis', short: 'Lab & Medis' },
        { number: 3, title: 'Gaya Hidup & Riwayat', short: 'Gaya Hidup' },
      ]
    : [
        { number: 1, title: 'Data Dasar & Fisik', short: 'Fisik' },
        { number: 3, title: 'Gaya Hidup & Riwayat', short: 'Gaya Hidup' },
      ];

  const totalStepCount = hasLabResults ? 3 : 2;
  const currentStepDisplayNumber = !hasLabResults && currentStep === 3 ? 2 : currentStep;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm transition-all border border-slate-200/90 dark:border-slate-800 space-y-6">
      {/* Top Header & Demo Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600 dark:text-teal-400" />
            <span>Formulir Skrining Mandiri</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Isi secara bertahap dalam {totalStepCount} langkah mudah. Data diproses privat dan aman.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Quick Demo Pre-fills */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 px-2 hidden sm:inline">
              Contoh Data:
            </span>
            <button
              type="button"
              onClick={() => handleLoadDemo('low')}
              className="px-2 py-1 rounded-lg font-medium text-emerald-700 dark:text-emerald-300 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer text-[11px]"
              title="Isi profil pasien risiko rendah"
            >
              Sehat
            </button>
            <button
              type="button"
              onClick={() => handleLoadDemo('moderate')}
              className="px-2 py-1 rounded-lg font-medium text-amber-700 dark:text-amber-300 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer text-[11px]"
              title="Isi profil pasien risiko sedang"
            >
              Sedang
            </button>
            <button
              type="button"
              onClick={() => handleLoadDemo('high')}
              className="px-2 py-1 rounded-lg font-medium text-rose-700 dark:text-rose-300 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer text-[11px]"
              title="Isi profil pasien risiko tinggi"
            >
              Tinggi
            </button>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Kosongkan Semua Isian"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. PILIHAN MODE INPUT: DENGAN / TANPA HASIL LAB */}
      {/* ============================================================ */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Pilih Mode Pengisian Data:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Opsi A: Punya Hasil Lab */}
          <button
            type="button"
            onClick={() => onToggleLabResults(true)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
              hasLabResults
                ? 'bg-gradient-to-br from-indigo-50/90 to-teal-50/60 dark:from-indigo-950/60 dark:to-teal-950/40 border-indigo-400 dark:border-teal-400 shadow-sm ring-1 ring-indigo-500/30'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                hasLabResults
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              <FileCheck className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Saya punya hasil lab terbaru
                </span>
                {hasLabResults && (
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-teal-400 bg-indigo-100 dark:bg-indigo-900/60 px-2 py-0.5 rounded-full">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Lengkap dengan HbA1c, Gula Darah Puasa, Kolesterol, dll. Hasil analisis paling presisi.
              </p>
            </div>
          </button>

          {/* Opsi B: Tanpa Hasil Lab */}
          <button
            type="button"
            onClick={() => onToggleLabResults(false)}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
              !hasLabResults
                ? 'bg-gradient-to-br from-amber-50/90 to-orange-50/60 dark:from-amber-950/60 dark:to-orange-950/40 border-amber-400 dark:border-amber-500 shadow-sm ring-1 ring-amber-500/30'
                : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                !hasLabResults
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              <FileQuestion className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                  Saya tidak punya hasil lab
                </span>
                {!hasLabResults && (
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                Hanya data fisik (usia, BMI) & gaya hidup. Langkah lab dilewati otomatis.
              </p>
            </div>
          </button>
        </div>

        {/* WARNING KUNING JIKA MEMILIH TANPA HASIL LAB */}
        {!hasLabResults && (
          <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 text-amber-950 dark:text-amber-200 flex items-start gap-3 animate-in fade-in duration-300">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold block mb-0.5">
                Perhatian: Anda memilih skrining tanpa hasil tes laboratorium.
              </strong>
              <span>
                Prediksi ini murni diestimasi berdasarkan faktor risiko non-invasif (usia, indeks massa tubuh/BMI, riwayat diabetes keluarga, dan gaya hidup). Hasil estimasi mungkin kurang akurat dibanding jika menyertakan HbA1c/GDP. Kami sangat menyarankan Anda tetap berkonsultasi ke dokter dan melakukan tes laboratorium formal.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* MULTI-STEP WIZARD PROGRESS TRACKER */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white font-mono">
              Langkah {currentStepDisplayNumber} dari {totalStepCount}
            </span>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {currentStep === 1
                ? 'Data Dasar & Fisik'
                : currentStep === 2
                ? 'Hasil Lab & Medis'
                : 'Gaya Hidup & Riwayat'}
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
            {completionRate}% Data Terisi
          </span>
        </div>

        {/* Step Bubbles & Bar */}
        <div className={`grid gap-2 ${hasLabResults ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {steps.map((s, idx) => {
            const isCurrent = s.number === currentStep;
            const isPassed = s.number < currentStep;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => onStepChange(s.number)}
                className={`py-2 px-3 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
                  isCurrent
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-teal-400 text-indigo-950 dark:text-white shadow-xs'
                    : isPassed
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-indigo-600 text-white'
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                </div>
                <div className="truncate text-xs font-semibold">
                  <span className="hidden sm:inline">{s.title}</span>
                  <span className="sm:hidden">{s.short}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FORM BODY: RENDER ONLY ACTIVE STEP */}
      <form onSubmit={onSubmit} className="space-y-6 pt-2">
        {/* ============================================================ */}
        {/* LANGKAH 1: DATA DASAR & FISIK */}
        {/* ============================================================ */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <span>
                Masukkan ukuran fisik dasar Anda. Berat dan tinggi badan akan otomatis menghitung nilai Indeks Massa Tubuh (BMI) Anda.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* Usia */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Berapa usia Anda saat ini?</span>
                  {renderTooltip('age', 'Risiko diabetes meningkat seiring bertambahnya usia, terutama setelah usia 45 tahun.')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={formData.Age ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Age', e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Contoh: 38"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">Tahun</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Rentang: 1 – 120 tahun</span>
              </div>

              {/* Jenis Kelamin */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Jenis Kelamin</span>
                  {renderTooltip('gender', 'Membantu model mengkalibrasi distribusi hormon dan batas lingkar pinggang yang aman.')}
                </label>
                <select
                  value={formData.Gender ?? ''}
                  onChange={(e) => handleFieldChange('Gender', e.target.value || undefined)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                >
                  <option value="">-- Pilih Jenis Kelamin --</option>
                  <option value="Male">Laki-laki (Pria)</option>
                  <option value="Female">Perempuan (Wanita)</option>
                  <option value="Other">Lainnya / Tidak Disebutkan</option>
                </select>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Pilihan jenis kelamin</span>
              </div>

              {/* Tinggi Badan */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Tinggi Badan</span>
                  {renderTooltip('height', 'Digunakan bersama berat badan untuk menentukan proporsi massa tubuh.')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    max="240"
                    value={formData.Height_cm ?? ''}
                    onChange={(e) =>
                      handleHeightWeightChange(
                        'Height_cm',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 165"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">cm</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Tinggi badan dalam centimeter</span>
              </div>

              {/* Berat Badan */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Berat Badan</span>
                  {renderTooltip('weight', 'Berat badan berlebih berhubungan erat dengan risiko resistensi insulin.')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={formData.Weight_kg ?? ''}
                    onChange={(e) =>
                      handleHeightWeightChange(
                        'Weight_kg',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 68"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">kg</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Berat badan dalam kilogram</span>
              </div>

              {/* Indeks Massa Tubuh (BMI) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                    <span>Indeks Massa Tubuh (BMI)</span>
                    {renderTooltip('bmi', 'Normal: 18.5 - 24.9. Berat berlebih: 25 - 29.9. Obesitas: ≥ 30 kg/m².')}
                  </label>
                  {formData.BMI && (
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded">
                      Auto-Dihitung
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="10"
                    max="70"
                    value={formData.BMI ?? ''}
                    onChange={(e) =>
                      handleFieldChange('BMI', e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Contoh: 24.5"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums font-bold shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">kg/m²</span>
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {formData.BMI ? (
                    formData.BMI < 18.5 ? (
                      'Kurus (< 18.5)'
                    ) : formData.BMI <= 24.9 ? (
                      <span className="text-emerald-600 font-semibold">🟢 Berat Ideal (18.5 - 24.9)</span>
                    ) : formData.BMI <= 29.9 ? (
                      <span className="text-amber-600 font-semibold">🟡 Berat Berlebih (25 - 29.9)</span>
                    ) : (
                      <span className="text-rose-600 font-semibold">🔴 Obesitas (≥ 30)</span>
                    )
                  ) : (
                    'Normal: 18.5 – 24.9 kg/m²'
                  )}
                </span>
              </div>

              {/* Ukuran Lingkar Perut / Pinggang */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Ukuran Lingkar Perut / Pinggang</span>
                  {renderTooltip(
                    'waist',
                    'Diukur melingkari perut sejajar pusar. Batas aman orang Asia: Pria < 90 cm, Wanita < 80 cm.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="40"
                    max="200"
                    value={formData.Waist_Circumference_cm ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Waist_Circumference_cm',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 82"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">cm</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Batas aman: Pria &lt;90cm, Wanita &lt;80cm</span>
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {hasLabResults ? 'Lanjut ke pengisian biomarker lab.' : 'Lompat langsung ke gaya hidup & riwayat.'}
              </span>
              <button
                type="button"
                onClick={() => onStepChange(hasLabResults ? 2 : 3)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <span>{hasLabResults ? 'Lanjut: Hasil Lab & Medis' : 'Lanjut: Gaya Hidup & Riwayat'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* LANGKAH 2: HASIL LAB & MEDIS (ONLY IN LAB MODE) */}
        {/* ============================================================ */}
        {currentStep === 2 && hasLabResults && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Friendly explanation */}
            <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/70 dark:border-indigo-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
              <Stethoscope className="w-4 h-4 text-indigo-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan Ramah:</strong> Jika Anda belum pernah melakukan tes laboratorium tertentu (seperti insulin atau profil lipid lengkap), Anda boleh mengosongkannya. Kolom paling penting adalah <strong>HbA1c</strong> dan <strong>Gula Darah Puasa</strong>.
              </span>
            </div>

            {/* SPECIAL HIGHLIGHT CARD: HbA1c */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 via-teal-50/40 to-white dark:from-indigo-950/50 dark:via-slate-900 dark:to-slate-900 border-2 border-indigo-300 dark:border-indigo-600 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                      <span>HbA1c (Gula darah rata-rata 3 bulan)</span>
                      <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded-full ml-2">
                        ⭐ Paling Penting
                      </span>
                      {renderTooltip(
                        'hba1c',
                        'Mengukur rata-rata kadar gula darah selama 3 bulan terakhir. Nilai normal: di bawah 5.7%. Pradiabetes: 5.7% - 6.4%. Diabetes: 6.5% ke atas.'
                      )}
                    </label>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Indikator emas pengukur stabilitas glukosa tanpa terpengaruh makanan sesaat
                    </p>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-600 dark:text-slate-300 text-right shrink-0">
                  <span className="text-emerald-600 font-semibold">&lt;5.7%</span> Normal ·{' '}
                  <span className="text-amber-600 font-semibold">5.7–6.4%</span> Waspada ·{' '}
                  <span className="text-rose-600 font-semibold">&ge;6.5%</span> Tinggi
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="3.0"
                    max="20.0"
                    value={formData.HbA1c ?? ''}
                    onChange={(e) =>
                      handleFieldChange('HbA1c', e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Contoh: 5.4"
                    className="w-full px-4 py-3 text-base font-bold rounded-xl bg-white dark:bg-slate-900 border-2 border-indigo-400 dark:border-teal-400 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-4 top-3.5 text-sm font-bold text-slate-400">%</span>
                </div>
                <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                  {formData.HbA1c ? (
                    formData.HbA1c < 5.7 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> Kategori Normal (Kontrol gula darah stabil)
                      </span>
                    ) : formData.HbA1c <= 6.4 ? (
                      <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> Waspada Pradiabetes (Perlu atur pola makan)
                      </span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" /> Kategori Tinggi (Segera periksa ke dokter)
                      </span>
                    )
                  ) : (
                    <span>*Masukkan hasil dari lembar tes laboratorium darah Anda</span>
                  )}
                </div>
              </div>
            </div>

            {/* Other Lab Measurements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {/* Fasting Blood Sugar */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Gula Darah Puasa (GDP)</span>
                  {renderTooltip(
                    'fbs',
                    'Kadar gula darah setelah tidak makan/minum kalori selama minimal 8-10 jam. Normal: 70 - 99 mg/dL.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="30"
                    max="600"
                    value={formData.Fasting_Blood_Sugar ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Fasting_Blood_Sugar',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 94"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mg/dL</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Normal: 70 – 99 mg/dL</span>
              </div>

              {/* Random Blood Glucose */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Gula Darah Sewaktu (GDS)</span>
                  {renderTooltip(
                    'glucose',
                    'Gula darah yang dicek kapan saja tanpa puasa. Normal di bawah 140 mg/dL. Di atas 200 mg/dL menandakan gula darah tinggi.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="30"
                    max="600"
                    value={formData.Blood_Glucose ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Blood_Glucose',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 115"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mg/dL</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Normal: &lt; 140 mg/dL</span>
              </div>

              {/* Insulin Level */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Kadar Insulin Darah</span>
                  {renderTooltip(
                    'insulin',
                    'Hormon yang bertugas memasukkan gula ke dalam sel tubuh. Normal puasa: 2.6 - 24.9 µIU/mL.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="300"
                    value={formData.Insulin_Level ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Insulin_Level',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 8.5"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">µIU/mL</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Boleh kosong jika belum pernah tes</span>
              </div>

              {/* Blood Pressure Systolic */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Tekanan Darah Atas (Sistolik)</span>
                  {renderTooltip(
                    'systolic',
                    'Angka atas pada tensimeter saat jantung memompa. Normal: di bawah 120 mmHg. Tinggi: 130 ke atas.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="60"
                    max="260"
                    value={formData.Blood_Pressure_Systolic ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Blood_Pressure_Systolic',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 118"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mmHg</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Ideal: &lt; 120 mmHg</span>
              </div>

              {/* Blood Pressure Diastolic */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Tekanan Darah Bawah (Diastolik)</span>
                  {renderTooltip(
                    'diastolic',
                    'Angka bawah pada tensimeter saat jantung istirahat. Normal: di bawah 80 mmHg.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="40"
                    max="160"
                    value={formData.Blood_Pressure_Diastolic ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Blood_Pressure_Diastolic',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 76"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mmHg</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Ideal: &lt; 80 mmHg</span>
              </div>

              {/* Heart Rate */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Detak Jantung Istirahat</span>
                  {renderTooltip(
                    'hr',
                    'Jumlah denyut nadi per menit saat sedang santai duduk. Normal: 60 - 100 denyut/menit.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="40"
                    max="200"
                    value={formData.Heart_Rate ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Heart_Rate',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 72"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">BPM</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Denyut per menit (BPM)</span>
              </div>

              {/* Total Cholesterol */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Kolesterol Total</span>
                  {renderTooltip('chol', 'Total seluruh lemak kolesterol di dalam darah. Ideal: di bawah 200 mg/dL.')}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="80"
                    max="500"
                    value={formData.Total_Cholesterol ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Total_Cholesterol',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 180"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mg/dL</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Ideal: &lt; 200 mg/dL</span>
              </div>

              {/* Triglycerides */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Trigliserida (Lemak Darah)</span>
                  {renderTooltip(
                    'trig',
                    'Jenis lemak darah yang sering melonjak akibat konsumsi karbohidrat olahan dan gula manis. Normal: di bawah 150 mg/dL.'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="30"
                    max="800"
                    value={formData.Triglycerides ?? ''}
                    onChange={(e) =>
                      handleFieldChange(
                        'Triglycerides',
                        e.target.value ? Number(e.target.value) : undefined
                      )
                    }
                    placeholder="Contoh: 120"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mg/dL</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Normal: &lt; 150 mg/dL</span>
              </div>

              {/* HDL */}
              <div>
                <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                  <span>Kolesterol Baik (HDL)</span>
                  {renderTooltip(
                    'hdl',
                    'Membantu membersihkan pembuluh darah. Semakin tinggi nilainya, semakin baik (aman > 50 mg/dL).'
                  )}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="15"
                    max="120"
                    value={formData.HDL ?? ''}
                    onChange={(e) =>
                      handleFieldChange('HDL', e.target.value ? Number(e.target.value) : undefined)
                    }
                    placeholder="Contoh: 55"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-slate-400">mg/dL</span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Bagus jika &gt; 50 mg/dL</span>
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onStepChange(1)}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Data Fisik</span>
              </button>

              <button
                type="button"
                onClick={() => onStepChange(3)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-semibold text-xs flex items-center gap-2 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
              >
                <span>Lanjut: Gaya Hidup & Riwayat</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* LANGKAH 3: GAYA HIDUP & RIWAYAT (FINAL STEP) */}
        {/* ============================================================ */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Critical Row: Family History & Sugar Intake */}
            <div className="p-5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-800/60 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Family History */}
                <div>
                  <label className="block text-xs font-bold text-purple-950 dark:text-purple-200 mb-1.5 flex items-center">
                    <Dna className="w-4 h-4 text-purple-600 mr-1.5" />
                    <span>Ada anggota keluarga kandung yang sakit diabetes?</span>
                    {renderTooltip(
                      'fam',
                      'Apakah ayah, ibu, kakek-nenek, atau saudara kandung Anda memiliki riwayat penyakit gula/diabetes.'
                    )}
                  </label>
                  <select
                    value={formData.Family_History_Diabetes ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Family_History_Diabetes', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-purple-300 dark:border-purple-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih Jawaban --</option>
                    <option value="No">Tidak Ada (Tidak)</option>
                    <option value="Yes">Ada (Orang Tua / Saudara Kandung)</option>
                  </select>
                  <span className="text-[11px] text-purple-700/80 dark:text-purple-300 mt-1 block">Faktor keturunan (genetik)</span>
                </div>

                {/* Sugar Intake */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                    <span>Seberapa sering makan / minum manis?</span>
                    {renderTooltip(
                      'sugar',
                      'Termasuk teh manis kemasan, boba, soda, kopi susu bergula, kue, donat, dan makanan manis lainnya.'
                    )}
                  </label>
                  <select
                    value={formData.Sugar_Intake_Level ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Sugar_Intake_Level', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih Frekuensi --</option>
                    <option value="Low">Jarang (Kurang dari 1 kali sehari / tanpa gula)</option>
                    <option value="Moderate">Sedang (Sekitar 1 kali sehari)</option>
                    <option value="High">Sering (2 kali atau lebih dalam sehari)</option>
                  </select>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Konsumsi gula harian</span>
                </div>
              </div>
            </div>

            {/* Medical History Section with Layperson Terms & "Tidak Tahu" option */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-500" />
                <span>Riwayat Penyakit & Kondisi Tubuh</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Hypertension */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                    <span>Pernah dinyatakan darah tinggi (hipertensi)?</span>
                    {renderTooltip(
                      'ht',
                      'Dinyatakan oleh dokter atau sedang rutin meminum obat pengendali tekanan darah.'
                    )}
                  </label>
                  <select
                    value={formData.Hypertension ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Hypertension', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="No">Tidak Ada</option>
                    <option value="Yes">Ya (Ada riwayat darah tinggi)</option>
                    <option value="Unknown">Tidak Tahu / Belum Pernah Cek</option>
                  </select>
                </div>

                {/* Fatty Liver (Perlemakan Hati) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                    <span>Punya penyakit perlemakan hati?</span>
                    {renderTooltip('fatty', 'Penumpukan lemak berlebih di organ hati (Fatty Liver Disease).')}
                  </label>
                  <select
                    value={formData.Fatty_Liver ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Fatty_Liver', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="No">Tidak Ada</option>
                    <option value="Yes">Ya (Pernah divonis dokter)</option>
                    <option value="Unknown">Tidak Tahu / Belum Tahu</option>
                  </select>
                </div>

                {/* Heart Disease (Penyakit Jantung) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                    <span>Punya riwayat penyakit jantung?</span>
                    {renderTooltip(
                      'hd',
                      'Riwayat serangan jantung, penyempitan pembuluh darah, pasang ring/stent, atau gagal jantung.'
                    )}
                  </label>
                  <select
                    value={formData.Heart_Disease ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Heart_Disease', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="No">Tidak Ada</option>
                    <option value="Yes">Ya (Ada riwayat sakit jantung)</option>
                    <option value="Unknown">Tidak Tahu / Belum Tahu</option>
                  </select>
                </div>

                {/* PCOS (CONDITIONAL: HIDDEN FOR MALES!) */}
                {formData.Gender !== 'Male' && (
                  <div className="animate-in fade-in duration-200">
                    <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                      <span>Punya kista ovarium / PCOS?</span>
                      {renderTooltip(
                        'pcos',
                        'Gangguan hormon pada wanita yang menyebabkan siklus haid tidak teratur atau kista kecil di indung telur.'
                      )}
                    </label>
                    <select
                      value={formData.PCOS ?? ''}
                      onChange={(e) =>
                        handleFieldChange('PCOS', e.target.value || undefined)
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                    >
                      <option value="">-- Pilih --</option>
                      <option value="No">Tidak Ada</option>
                      <option value="Yes">Ya (Pernah didiagnosis PCOS)</option>
                      <option value="Unknown">Tidak Tahu / Belum Pernah Cek</option>
                    </select>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 block">Khusus wanita</span>
                  </div>
                )}

                {/* Medication Adherence */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                    <span>Keteraturan Minum Obat (jika ada)</span>
                    {renderTooltip('med', 'Apakah Anda rutin meminum obat resep dokter sesuai anjuran.')}
                  </label>
                  <select
                    value={formData.Medication_Adherence ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Medication_Adherence', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih Kepatuhan --</option>
                    <option value="Good">Baik (Rutin sesuai jadwal dokter)</option>
                    <option value="Average">Cukup (Kadang lupa)</option>
                    <option value="Poor">Jarang / Sering lupa</option>
                  </select>
                </div>

                {/* Work Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center">
                    <span>Aktivitas di Tempat Kerja</span>
                    {renderTooltip('work', 'Banyak duduk di meja atau banyak berjalan/mengangkat beban fisik.')}
                  </label>
                  <select
                    value={formData.Work_Type ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Work_Type', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih Jenis Pekerjaan --</option>
                    <option value="Sedentary">Banyak Duduk (Kantor, Komputer, Supir)</option>
                    <option value="Active">Aktif Bergerak (Banyak berdiri/jalan)</option>
                    <option value="Mixed">Campuran (Duduk dan bergerak seimbang)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Daily Habits & Lifestyle Row */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Footprints className="w-3.5 h-3.5 text-indigo-500" />
                <span>Aktivitas Olahraga & Kebiasaan Harian</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Physical Activity Level */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Tingkat Gerak Tubuh
                  </label>
                  <select
                    value={formData.Physical_Activity_Level ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Physical_Activity_Level', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="High">Tinggi (Olahraga rutin & bugar)</option>
                    <option value="Moderate">Sedang (Bergerak cukup harian)</option>
                    <option value="Low">Rendah (Jarang berolahraga / rebahan)</option>
                  </select>
                </div>

                {/* Diet Quality */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Kebiasaan Pola Makan
                  </label>
                  <select
                    value={formData.Diet_Quality ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Diet_Quality', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="Healthy">Sehat (Banyak sayur, buah & serat)</option>
                    <option value="Average">Rata-rata / Cukup seimbang</option>
                    <option value="Poor">Kurang Sehat (Sering gorengan/junkfood)</option>
                  </select>
                </div>

                {/* Exercise Hours */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Olahraga (Jam / Minggu)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="40"
                      value={formData.Exercise_Hours_Per_Week ?? ''}
                      onChange={(e) =>
                        handleFieldChange(
                          'Exercise_Hours_Per_Week',
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      placeholder="Contoh: 2.5"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">Jam</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Anjuran medis: min 2.5 jam/minggu</span>
                </div>

                {/* Sleep Hours */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Durasi Tidur Malam (Jam)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      min="1"
                      max="20"
                      value={formData.Sleep_Hours ?? ''}
                      onChange={(e) =>
                        handleFieldChange(
                          'Sleep_Hours',
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      placeholder="Contoh: 7"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">Jam</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Ideal: 7 – 8 jam tidur</span>
                </div>

                {/* Water Intake */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Air Putih Harian (Liter)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="0.5"
                      max="10"
                      value={formData.Daily_Water_Intake_L ?? ''}
                      onChange={(e) =>
                        handleFieldChange(
                          'Daily_Water_Intake_L',
                          e.target.value ? Number(e.target.value) : undefined
                        )
                      }
                      placeholder="Contoh: 2.0"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono tabular-nums shadow-xs"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">Liter</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">Sekitar 8 gelas (2 liter)</span>
                </div>

                {/* Stress Level */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Tingkat Stres
                  </label>
                  <select
                    value={formData.Stress_Level ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Stress_Level', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih Tingkat Stres --</option>
                    <option value="Low">Rendah (Tenang / Santai)</option>
                    <option value="Moderate">Sedang (Beban kerja wajar)</option>
                    <option value="High">Tinggi (Sering cemas / tertekan)</option>
                  </select>
                </div>

                {/* Smoking Status */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Kebiasaan Merokok
                  </label>
                  <select
                    value={formData.Smoking_Status ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Smoking_Status', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="Never">Tidak Pernah Merokok</option>
                    <option value="Former">Mantan Perokok (Sudah Berhenti)</option>
                    <option value="Current">Perokok Aktif</option>
                  </select>
                </div>

                {/* Alcohol Consumption */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Konsumsi Minuman Beralkohol
                  </label>
                  <select
                    value={formData.Alcohol_Consumption ?? ''}
                    onChange={(e) =>
                      handleFieldChange('Alcohol_Consumption', e.target.value || undefined)
                    }
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="None">Tidak Pernah</option>
                    <option value="Occasional">Kadang-kadang</option>
                    <option value="Frequent">Sering</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
                    Negara Domisili
                  </label>
                  <input
                    type="text"
                    value={formData.Country ?? 'Indonesia'}
                    onChange={(e) => handleFieldChange('Country', e.target.value)}
                    placeholder="Indonesia"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Step 3 Actions: Back and SUBMIT! */}
            <div className="pt-6 border-t border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => onStepChange(hasLabResults ? 2 : 1)}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs flex items-center justify-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{hasLabResults ? 'Kembali ke Hasil Lab' : 'Kembali ke Data Fisik'}</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                  isLoading
                    ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed opacity-90'
                    : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 hover:from-indigo-700 hover:via-purple-700 hover:to-teal-600 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Menganalisis Model AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-teal-300" />
                    <span>Analisis Risiko Saya Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
