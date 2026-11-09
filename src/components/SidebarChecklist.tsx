import React from 'react';
import {
  CheckCircle2,
  Circle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { DiabetesFormData } from '../types/diabetes';

interface SidebarChecklistProps {
  formData: DiabetesFormData;
  completionRate: number;
  filledCount: number;
  totalImportantFields: number;
  onFillDemo: (presetKey: 'low' | 'moderate' | 'high') => void;
  onReset: () => void;
  currentStep?: number;
  onStepChange?: (step: number) => void;
  hasResult?: boolean;
  hasLabResults?: boolean;
}

export const SidebarChecklist: React.FC<SidebarChecklistProps> = ({
  formData,
  completionRate,
  filledCount,
  totalImportantFields,
  onFillDemo,
  onReset,
  currentStep = 1,
  onStepChange,
  hasResult = false,
  hasLabResults = true,
}) => {
  // Checklist items categorized by wizard step
  const allCheckItems = [
    {
      step: 1,
      title: hasLabResults ? 'Langkah 1: Data Fisik' : 'Langkah 1: Data Fisik',
      desc: 'Usia, Gender, Tinggi/Berat Badan (BMI)',
      isComplete: Boolean(
        formData.Age &&
          formData.Gender &&
          (formData.BMI || (formData.Height_cm && formData.Weight_kg))
      ),
      essential: true,
    },
    ...(hasLabResults
      ? [
          {
            step: 2,
            title: 'Langkah 2: HbA1c (Rata-rata 3 Bulan)',
            desc: 'Biomarker utama regulasi gula darah',
            isComplete: Boolean(formData.HbA1c !== undefined && !isNaN(formData.HbA1c)),
            highlight: true,
            essential: true,
          },
          {
            step: 2,
            title: 'Langkah 2: Gula Darah Puasa (GDP)',
            desc: 'Kadar glukosa setelah puasa 8–10 jam',
            isComplete: Boolean(
              formData.Fasting_Blood_Sugar !== undefined && !isNaN(formData.Fasting_Blood_Sugar)
            ),
            essential: true,
          },
          {
            step: 2,
            title: 'Langkah 2: Tekanan Darah & Jantung',
            desc: 'Tekanan darah atau detak nadi',
            isComplete: Boolean(formData.Blood_Pressure_Systolic || formData.Heart_Rate),
            essential: false,
          },
        ]
      : []),
    {
      step: 3,
      title: hasLabResults ? 'Langkah 3: Riwayat Keluarga' : 'Langkah 2: Riwayat Keluarga',
      desc: 'Faktor genetik dari orang tua/saudara',
      isComplete: Boolean(formData.Family_History_Diabetes),
      essential: true,
    },
    {
      step: 3,
      title: hasLabResults ? 'Langkah 3: Kebiasaan & Gaya Hidup' : 'Langkah 2: Kebiasaan & Gaya Hidup',
      desc: 'Konsumsi gula, olahraga, dan jam tidur',
      isComplete: Boolean(
        formData.Sugar_Intake_Level ||
          formData.Physical_Activity_Level ||
          formData.Exercise_Hours_Per_Week
      ),
      essential: false,
    },
  ];

  const checkItems = allCheckItems;

  // SVG circular progress calculation
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      {/* Progress & Wizard Card */}
      <div className="glass-panel p-6 rounded-3xl shadow-sm transition-all border border-slate-200/90 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Kelengkapan Data Pasien
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {filledCount} dari {totalImportantFields} parameter terisi
            </p>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-indigo-600 dark:stroke-teal-400 transition-all duration-500"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                {completionRate}%
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Checklist with Step Links */}
        <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-slate-800">
          {checkItems.map((item, idx) => {
            const isItemStepActive = currentStep === item.step && !hasResult;
            return (
              <div
                key={idx}
                onClick={() => onStepChange && onStepChange(item.step)}
                className={`p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 cursor-pointer ${
                  item.isComplete
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 text-slate-700 dark:text-slate-200 border border-emerald-200/60 dark:border-emerald-900/40 hover:bg-emerald-100/70'
                    : isItemStepActive
                    ? 'bg-indigo-50/80 dark:bg-indigo-950/50 text-slate-900 dark:text-white border-2 border-indigo-400 dark:border-teal-400 shadow-xs'
                    : item.highlight
                    ? 'bg-indigo-50/50 dark:bg-indigo-950/30 text-slate-700 dark:text-slate-300 border border-indigo-200/60 dark:border-indigo-900/40'
                    : 'bg-white/60 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800 hover:bg-slate-100/70'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {item.isComplete ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                    <span className="truncate">{item.title}</span>
                    {item.highlight && (
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-teal-400 bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.2 rounded shrink-0">
                        Kritis
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 text-center">
          *Klik item untuk berpindah ke langkah tersebut
        </p>
      </div>

      {/* Why This Matters Info Card */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50/90 to-teal-50/90 dark:from-indigo-950/30 dark:to-teal-950/30 border border-indigo-200/60 dark:border-indigo-800/50 shadow-xs">
        <h4 className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wide flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Mengapa Skrining 3 Langkah Ini Penting?</span>
        </h4>
        <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed">
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">1. Data Fisik:</strong> Lemak di area perut (lingkar pinggang & BMI) menghasilkan zat pemicu resistensi insulin.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">2. HbA1c & GDP:</strong> Memotret kondisi riil sel darah merah dan pankreas Anda secara objektif.
          </li>
          <li>
            <strong className="text-slate-900 dark:text-white font-semibold">3. Gaya Hidup & Genetik:</strong> Menentukan apakah sel tubuh Anda aktif menyerap glukosa atau menumpuknya di darah.
          </li>
        </ul>
      </div>

      {/* Quick Demo Pre-fill Box */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 text-xs">
        <p className="font-semibold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Isi Cepat Contoh Pasien (Demo)</span>
        </p>
        <div className="grid grid-cols-3 gap-1.5 mb-2">
          <button
            type="button"
            onClick={() => onFillDemo('low')}
            className="py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] border border-emerald-200 dark:border-emerald-800 transition-colors cursor-pointer text-center"
          >
            Sehat
          </button>
          <button
            type="button"
            onClick={() => onFillDemo('moderate')}
            className="py-1.5 px-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 font-semibold text-[11px] border border-amber-200 dark:border-amber-800 transition-colors cursor-pointer text-center"
          >
            Sedang
          </button>
          <button
            type="button"
            onClick={() => onFillDemo('high')}
            className="py-1.5 px-2 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold text-[11px] border border-rose-200 dark:border-rose-800 transition-colors cursor-pointer text-center"
          >
            Tinggi
          </button>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="w-full py-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-[11px] underline text-center cursor-pointer"
        >
          Bersihkan Formulir (Reset)
        </button>
      </div>

      {/* Mini Legal Warning */}
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-400">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong>Catatan:</strong> Sarana penapisan mandiri dan edukasi dini, bukan pengganti diagnosis resmi oleh dokter.
        </span>
      </div>
    </div>
  );
};
