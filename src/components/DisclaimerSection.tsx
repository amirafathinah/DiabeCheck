import React from 'react';
import { AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';

export const DisclaimerSection: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-50/60 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-800/60 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-200 uppercase tracking-wide mb-2 flex items-center gap-2">
                <span>Peringatan Medis Penting (Medical Disclaimer)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Aplikasi skrining ini dibangun untuk tujuan edukasi kesehatan masyarakat dan penapisan awal risiko (screening tool). Hasil estimasi yang diberikan oleh model machine learning <strong>TIDAK MENGGANTIKAN</strong> saran medis profesional, diagnosis klinis, atau rencana pengobatan dokter berlisensi.
              </p>
              <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-amber-900/40 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    Selalu konsultasikan hasil pengukuran laboratorium Anda dengan Dokter Spesialis Penyakit Dalam (Sp.PD) atau fasilitas kesehatan terdekat.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <HeartPulse className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    Jika Anda mengalami gejala akut seperti dehidrasi ekstrem, pandangan kabur, atau sesak napas, segera cari pertolongan medis gawat darurat.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
