import React from 'react';
import { Users, BarChart3, Layers, HeartPulse, CheckCircle2 } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '50.000+',
      label: 'Data Pasien Terlatih',
      subtext: 'Dataset rekam medis komprehensif',
      icon: Users,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      value: '86%',
      label: 'Akurasi Macro F1',
      subtext: 'Ensemble XGBoost + LightGBM',
      icon: BarChart3,
      color: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50 dark:bg-teal-950/40',
    },
    {
      value: '3 Tingkat',
      label: 'Kategori Risiko',
      subtext: 'Rendah · Sedang · Tinggi',
      icon: Layers,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/40',
    },
    {
      value: '17+ Faktor',
      label: 'Biomarker Teruji',
      subtext: 'HbA1c, GDP, BMI & Genetik',
      icon: HeartPulse,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/40',
    },
  ];

  return (
    <section id="tentang" className="py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-200/70 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">
            Bukti Kuantitatif & Arsitektur Model
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Didukung Riset Data Klinis Terpercaya
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Model ensemble kami memadukan algoritma gradient boosting termutakhir (XGBoost & LightGBM) yang dilatih menggunakan 50.000+ data kesehatan riil. Model mengevaluasi interaksi kompleks antara biomarker laboratorium, antropometri, serta faktor perilaku secara holistik.
          </p>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">0{i + 1}</span>
                </div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-1 font-mono tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-0.5">
                  {stat.label}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>

        {/* Key Model Highlights */}
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <span>Bagaimana Algoritma Membedakan Risiko?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300 block mb-1">
                🟢 Kategori Rendah (Low Risk)
              </span>
              Indikator metabolik stabil, glukosa puasa &lt;100 mg/dL, HbA1c &lt;5.7%, dan berat badan ideal dengan aktivitas fisik teratur.
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
              <span className="font-semibold text-amber-800 dark:text-amber-300 block mb-1">
                🟡 Kategori Sedang (Moderate Risk)
              </span>
              Gejala awal resistensi insulin, fase pradiabetes (HbA1c 5.7–6.4%), atau kombinasi kelebihan berat badan dan riwayat keluarga.
            </div>
            <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
              <span className="font-semibold text-rose-800 dark:text-rose-300 block mb-1">
                🔴 Kategori Tinggi (High Risk)
              </span>
              Biomarker di atas ambang klinis (HbA1c ≥6.5%, GDP ≥126 mg/dL), hipertensi, atau riwayat sindrom metabolik aktif. Butuh evaluasi dokter.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
