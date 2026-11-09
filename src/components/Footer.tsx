import React from 'react';
import { Activity, Shield, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-teal-400 flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span>
                DiabeCheck<span className="text-teal-400 text-xs ml-1 font-mono uppercase">AI</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              Sistem skrining dan penapisan cerdas risiko diabetes melitus tipe 2 berbasis arsitektur ensemble gradient boosting (XGBoost + LightGBM). Dilatih dengan dataset 50.000+ rekam medis pasien untuk membantu deteksi dini komplikasi metabolik.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="inline-flex items-center gap-1.5 text-[11px]">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>Privasi Lokal Perangkat</span>
              </span>
              <span className="text-slate-700">·</span>
              <span className="inline-flex items-center gap-1.5 text-[11px]">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Kesehatan Preventif</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-3">
              Informasi & Model
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#tentang" className="hover:text-white transition-colors">
                  Tentang Model Ensemble
                </a>
              </li>
              <li>
                <a href="#faktor-risiko" className="hover:text-white transition-colors">
                  17 Faktor Risiko Klinis
                </a>
              </li>
              <li>
                <a href="#panduan" className="hover:text-white transition-colors">
                  Panduan Rentang Normal
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Tanya Jawab (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinical References */}
          <div>
            <h4 className="text-slate-200 font-semibold text-xs uppercase tracking-wider mb-3">
              Referensi Klinis
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1">
                <span>Standar ADA (American Diabetes Assoc.)</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Pedoman PERKENI Indonesia</span>
              </li>
              <li className="flex items-center gap-1">
                <span>IDF Diabetes Atlas</span>
              </li>
              <li className="flex items-center gap-1">
                <span>Dataset Kaggle 50K Pasien</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} DiabeCheck AI. Dikembangkan dengan Kecerdasan Buatan untuk Indonesia Sehat.
          </div>
          <div className="text-center sm:text-right">
            <span>Tidak berafiliasi tunggal dengan institusi rumah sakit mana pun. Sarana skrining awal.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
