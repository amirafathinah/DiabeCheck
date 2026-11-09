import React from 'react';
import { ArrowDownCircle, Shield, Zap, Sparkles, Stethoscope, ChevronRight } from 'lucide-react';
import { DEMO_PRESETS } from '../services/predictionService';
import { DiabetesFormData } from '../types/diabetes';

interface HeroSectionProps {
  onStartScreening: () => void;
  onLoadPreset: (presetKey: 'low' | 'moderate' | 'high') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartScreening,
  onLoadPreset,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background Glows & Floating decorative shapes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-teal-400/15 to-purple-500/15 blur-3xl pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-400/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span>Model Ensemble XGBoost & LightGBM Terverifikasi</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500 dark:text-slate-400 font-normal">Akurasi 86% F1</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 max-w-4xl mx-auto text-balance">
          Ketahui Risiko Diabetes Anda{' '}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
            dalam Hitungan Detik
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Skrining bertenaga kecerdasan buatan berbasis 50.000+ rekam medis pasien.
          Gratis, instan, akurat, dan privasi data kesehatan Anda 100% terjaga di perangkat.
        </p>

        {/* CTA and Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onStartScreening}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-700 to-teal-600 hover:from-indigo-700 hover:to-teal-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Mulai Skrining Sekarang</span>
            <ArrowDownCircle className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <a
            href="#tentang"
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center justify-center gap-1.5"
          >
            <span>Pelajari Cara Kerja Model</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* 3 Trust Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Standar Medis Klinis</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Parameter ADA & IDF</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">100% Privat & Aman</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Data Anda tidak disimpan</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-3 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-semibold text-slate-900 dark:text-white">Hasil Analisis Seketika</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Klasifikasi 3 tingkat risiko</p>
            </div>
          </div>
        </div>

        {/* Interactive Quick Presets Bar */}
        <div className="mt-8 pt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-medium text-slate-500">Coba profil simulasi cepat:</span>
          <button
            onClick={() => onLoadPreset('low')}
            className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            🟢 Pasien Rendah (Sehat)
          </button>
          <button
            onClick={() => onLoadPreset('moderate')}
            className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            🟡 Pasien Sedang (Waspada)
          </button>
          <button
            onClick={() => onLoadPreset('high')}
            className="px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            🔴 Pasien Tinggi (Kritis)
          </button>
        </div>
      </div>
    </section>
  );
};
