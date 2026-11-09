import React, { useState } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Download,
  Share2,
  RotateCcw,
  Stethoscope,
  TrendingUp,
  FileText,
  Check,
  ShieldCheck,
  Edit3,
} from 'lucide-react';
import { PredictionResponse, DiabetesFormData } from '../types/diabetes';

interface InlineResultViewProps {
  result: PredictionResponse;
  formData: DiabetesFormData;
  onEditData: () => void;
  onResetAll: () => void;
  hasLabResults?: boolean;
}

export const InlineResultView: React.FC<InlineResultViewProps> = ({
  result,
  formData,
  onEditData,
  onResetAll,
  hasLabResults = true,
}) => {
  const [copied, setCopied] = useState(false);

  const badgeConfig = {
    Low: {
      title: 'RISIKO RENDAH (LOW RISK)',
      badgeClass: 'bg-emerald-500 text-white',
      cardClass:
        'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100',
      icon: CheckCircle,
      summary:
        'Kabar Baik! Berdasarkan data yang Anda masukkan, indikator biomarker dan gaya hidup Anda berada dalam rentang risiko rendah diabetes melitus.',
      recommendations: [
        'Pertahankan pola makan seimbang kaya serat alami, sayuran hijau, dan batasi konsumsi minuman manis.',
        'Lakukan olahraga aerobik minimal 150 menit per minggu (jalan cepat, bersepeda, senam).',
        'Pertahankan berat badan dan lingkar perut ideal sesuai standar Asia.',
        'Lakukan pemeriksaan gula darah berkala minimal 1 kali per tahun untuk deteksi dini.',
      ],
    },
    Moderate: {
      title: 'RISIKO SEDANG (MODERATE RISK)',
      badgeClass: 'bg-amber-500 text-white',
      cardClass:
        'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100',
      icon: AlertTriangle,
      summary:
        'Perlu Perhatian Khusus! Beberapa indikator tubuh Anda menunjukkan fase awal resistensi insulin atau pradiabetes. Dengan perbaikan pola hidup, kondisi ini sangat dapat dibalikkan.',
      recommendations: [
        'Batasi karbohidrat olahan sederhana (nasi putih berlebih, mi instan, roti putih) dan hindari minuman manis kemasan.',
        'Tingkatkan aktivitas fisik harian: targetkan jalan kaki 30 menit sehari dan latihan otot ringan.',
        'Turunkan 5–7% berat badan jika memiliki kelebihan berat badan untuk mengembalikan sensitivitas insulin.',
        'Rencanakan konsultasi dan tes konfirmasi laboratorium (HbA1c & Gula Darah Puasa) dalam 1–3 bulan ke depan.',
      ],
    },
    High: {
      title: 'RISIKO TINGGI (HIGH RISK)',
      badgeClass: 'bg-rose-600 text-white',
      cardClass:
        'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100',
      icon: AlertOctagon,
      summary:
        'Perhatian Serius! Beberapa biomarker klinis penting Anda mengindikasikan probabilitas tinggi terjadinya diabetes melitus atau gangguan metabolisme aktif. Segera berkonsultasi dengan dokter.',
      recommendations: [
        'Sangat disarankan segera berkonsultasi dengan Dokter Spesialis Penyakit Dalam (Sp.PD) atau dokter umum di faskes terdekat.',
        'Lakukan tes darah vena di laboratorium resmi: HbA1c terstandar NGSP, Glukosa Darah Puasa, dan Profil Lemak lengkap.',
        'Kurangi porsi karbohidrat secara bertahap dan ganti dengan makanan berindeks glikemik rendah.',
        'Mulai rutin pantau kadar glukosa mandiri jika Anda memiliki alat tes glukometer di rumah.',
      ],
    },
  }[result.prediction];

  const BadgeIcon = badgeConfig.icon;

  const lowPct = Math.round((result.probabilities.Low || 0) * 100);
  const modPct = Math.round((result.probabilities.Moderate || 0) * 100);
  const highPct = Math.round((result.probabilities.High || 0) * 100);

  // Copy structured summary
  const handleCopySummary = async () => {
    const summaryText = `📋 *Hasil Skrining Risiko Diabetes AI (DiabeCheck AI)*
Tanggal: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}

Kategori Risiko: *${badgeConfig.title}*
Probabilitas Model Ensemble:
• Rendah  : ${lowPct}%
• Sedang  : ${modPct}%
• Tinggi  : ${highPct}%

Ringkasan Data Pasien:
- Usia: ${formData.Age || '-'} tahun | Gender: ${formData.Gender || '-'}
- BMI: ${formData.BMI || '-'} kg/m² | Lingkar Perut: ${formData.Waist_Circumference_cm || '-'} cm
- HbA1c: ${formData.HbA1c ? formData.HbA1c + '%' : 'Tidak diisi'}
- Gula Darah Puasa: ${formData.Fasting_Blood_Sugar ? formData.Fasting_Blood_Sugar + ' mg/dL' : 'Tidak diisi'}
- Riwayat Keluarga: ${formData.Family_History_Diabetes === 'Yes' ? 'Ada' : 'Tidak'}

Catatan: Alat skrining edukatif berbasis AI, bukan pengganti diagnosis resmi dokter.`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Download Report (.txt)
  const handleDownloadReport = () => {
    const reportContent = `===================================================================
LAPORAN HASIL SKRINING RISIKO DIABETES AI (DIABECHECK AI)
Standar Model: Ensemble XGBoost + LightGBM (Kaggle 50,000 Patient Dataset)
Waktu Pemeriksaan: ${new Date().toLocaleString('id-ID')}
===================================================================

[1] HASIL KLASIFIKASI MODEL
Status Risiko: ${badgeConfig.title}
Sumber Analisis: Server Backend Machine Learning (Ensemble XGBoost + LightGBM)

Distribusi Probabilitas Model:
- Risiko Rendah (Low Risk)     : ${lowPct}%
- Risiko Sedang (Moderate Risk) : ${modPct}%
- Risiko Tinggi (High Risk)    : ${highPct}%

Penilaian Klinis:
${badgeConfig.summary}

[2] DATA FISIK & PENGUKURAN
- Usia                         : ${formData.Age ?? '-'} Tahun
- Jenis Kelamin                : ${formData.Gender ?? '-'}
- Tinggi Badan                 : ${formData.Height_cm ?? '-'} cm
- Berat Badan                  : ${formData.Weight_kg ?? '-'} kg
- Indeks Massa Tubuh (BMI)     : ${formData.BMI ?? '-'} kg/m²
- Lingkar Perut                : ${formData.Waist_Circumference_cm ?? '-'} cm
- HbA1c                        : ${formData.HbA1c ? formData.HbA1c + ' %' : 'Tidak diisi'}
- Gula Darah Puasa (GDP)       : ${formData.Fasting_Blood_Sugar ? formData.Fasting_Blood_Sugar + ' mg/dL' : 'Tidak diisi'}
- Gula Darah Sewaktu (GDS)     : ${formData.Blood_Glucose ? formData.Blood_Glucose + ' mg/dL' : 'Tidak diisi'}
- Kadar Insulin Darah          : ${formData.Insulin_Level ? formData.Insulin_Level + ' µIU/mL' : 'Tidak diisi'}
- Tekanan Darah                : ${formData.Blood_Pressure_Systolic ?? '-'}/${formData.Blood_Pressure_Diastolic ?? '-'} mmHg
- Kolesterol Total             : ${formData.Total_Cholesterol ? formData.Total_Cholesterol + ' mg/dL' : 'Tidak diisi'}
- Trigliserida                 : ${formData.Triglycerides ? formData.Triglycerides + ' mg/dL' : 'Tidak diisi'}
- Kolesterol Baik (HDL)        : ${formData.HDL ? formData.HDL + ' mg/dL' : 'Tidak diisi'}
- Detak Jantung Istirahat      : ${formData.Heart_Rate ? formData.Heart_Rate + ' bpm' : 'Tidak diisi'}

[3] RIWAYAT & GAYA HIDUP
- Riwayat Keluarga Diabetes    : ${formData.Family_History_Diabetes === 'Yes' ? 'Ada' : 'Tidak'}
- Konsumsi Gula Harian         : ${formData.Sugar_Intake_Level ?? '-'}
- Kebiasaan Pola Makan         : ${formData.Diet_Quality ?? '-'}
- Aktivitas Gerak Tubuh        : ${formData.Physical_Activity_Level ?? '-'}
- Olahraga Mingguan            : ${formData.Exercise_Hours_Per_Week ? formData.Exercise_Hours_Per_Week + ' Jam/minggu' : '-'}
- Riwayat Hipertensi           : ${formData.Hypertension ?? 'Tidak Tahu'}
- Perlemakan Hati              : ${formData.Fatty_Liver ?? 'Tidak Tahu'}
- Riwayat Penyakit Jantung     : ${formData.Heart_Disease ?? 'Tidak Tahu'}
- PCOS (Khusus Wanita)         : ${formData.PCOS ?? 'Tidak Tahu'}

[4] FAKTOR KONTRIBUTOR UTAMA
${
  result.contributing_factors && result.contributing_factors.length > 0
    ? result.contributing_factors
        .map(
          (f, idx) =>
            `${idx + 1}. ${f.labelId} (${f.valueText})\n   Dampak: ${f.impact}\n   Catatan: ${f.note}`
        )
        .join('\n\n')
    : 'Tidak ada faktor risiko spesifik yang melebihi ambang batas normal.'
}

[5] REKOMENDASI TINDAKAN
${badgeConfig.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join('\n')}

===================================================================
DISCLAIMER MEDIS:
Hasil skrining ini didasarkan pada kalkulasi statistik model machine learning
dan semata-mata ditujukan untuk edukasi serta penapisan awal. Hasil ini
TIDAK MENGGANTIKAN pemeriksaan klinis resmi oleh dokter atau tenaga medis berlisensi.
===================================================================`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Laporan_Hasil_Risiko_Diabetes_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-sm transition-all border border-slate-200/90 dark:border-slate-800 space-y-8 animate-in fade-in duration-300">
      {/* Top Header with Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400 block mb-1">
            Hasil Analisis AI Siap
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Laporan Skrining Risiko Diabetes Anda
          </h2>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onEditData}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
            <span>Ubah Data Input</span>
          </button>

          <button
            onClick={onResetAll}
            className="px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Skrining Pasien Lain</span>
          </button>
        </div>
      </div>

      {/* No Lab Mode Info Alert */}
      {!hasLabResults && (
        <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border-2 border-amber-300 dark:border-amber-700/80 text-amber-950 dark:text-amber-200 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold block mb-0.5">Mode Skrining Tanpa Hasil Lab:</strong>
            Hasil prediksi ini dihitung murni dari faktor risiko antropometri dan riwayat gaya hidup. Tingkat akurasi lebih terbatas dibandingkan pemeriksaan lengkap dengan biomarker darah (HbA1c/GDP). Sangat dianjurkan melakukan tes darah resmi untuk konfirmasi medis.
          </div>
        </div>
      )}

      {/* BIG RISK BADGE */}
      <div className={`p-6 sm:p-7 rounded-2xl border-2 ${badgeConfig.cardClass}`}>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div
            className={`w-16 h-16 rounded-2xl ${badgeConfig.badgeClass} flex items-center justify-center shadow-lg shrink-0`}
          >
            <BadgeIcon className="w-9 h-9" />
          </div>
          <div className="flex-1">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-1.5 uppercase font-mono bg-white/80 dark:bg-slate-900/80 shadow-xs">
              Kategori Risiko Terdeteksi
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {badgeConfig.title}
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
              {badgeConfig.summary}
            </p>
          </div>
        </div>
      </div>

      {/* PROBABILITY BAR CHART */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-teal-400" />
            <span>Distribusi Probabilitas Model Ensemble XGBoost + LightGBM</span>
          </h4>
          <span className="text-[11px] text-slate-400">Total: 100%</span>
        </div>

        <div className="space-y-4">
          {/* Low Risk Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Risiko Rendah (Low Risk)
              </span>
              <span className="font-mono tabular-nums text-slate-900 dark:text-white text-sm font-bold">
                {lowPct}%
              </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(2, lowPct)}%` }}
              />
            </div>
          </div>

          {/* Moderate Risk Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                Risiko Sedang (Moderate Risk)
              </span>
              <span className="font-mono tabular-nums text-slate-900 dark:text-white text-sm font-bold">
                {modPct}%
              </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(2, modPct)}%` }}
              />
            </div>
          </div>

          {/* High Risk Bar */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
              <span className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Risiko Tinggi (High Risk)
              </span>
              <span className="font-mono tabular-nums text-slate-900 dark:text-white text-sm font-bold">
                {highPct}%
              </span>
            </div>
            <div className="w-full h-3.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.max(2, highPct)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* KEY CONTRIBUTING FACTORS */}
      {result.contributing_factors && result.contributing_factors.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span>Faktor Penentu Utama yang Mempengaruhi Hasil Anda</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {result.contributing_factors.map((factor, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl text-xs border ${
                  factor.status === 'danger'
                    ? 'bg-rose-50/70 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/50'
                    : factor.status === 'warning'
                    ? 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50'
                    : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1.5">
                  <span className="text-slate-900 dark:text-white">{factor.labelId}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      factor.status === 'danger'
                        ? 'bg-rose-600 text-white'
                        : factor.status === 'warning'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {factor.valueText}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {factor.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS */}
      <div className="p-5 sm:p-6 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-indigo-600 dark:text-teal-400" />
          <span>Rekomendasi Langkah Medis & Gaya Hidup</span>
        </h4>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {badgeConfig.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="leading-relaxed">{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleDownloadReport}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-indigo-500" />
            <span>Unduh Laporan (.txt)</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-teal-500" />
                <span>Salin Hasil</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={onEditData}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Ubah Jawaban / Ulangi</span>
        </button>
      </div>
    </div>
  );
};
