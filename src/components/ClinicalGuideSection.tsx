import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, HelpCircle, Check, AlertCircle } from 'lucide-react';

export const ClinicalGuideSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const referenceTable = [
    {
      biomarker: 'HbA1c (Hemoglobin A1c)',
      normal: '< 5.7 %',
      prediabetes: '5.7 % – 6.4 %',
      diabetes: '≥ 6.5 %',
      note: 'Rata-rata gula darah 3 bulan terakhir. Tanpa perlu puasa.',
    },
    {
      biomarker: 'Gula Darah Puasa (GDP)',
      normal: '70 – 99 mg/dL',
      prediabetes: '100 – 125 mg/dL',
      diabetes: '≥ 126 mg/dL',
      note: 'Diperiksa setelah puasa makanan minimal 8–10 jam (air putih diperbolehkan).',
    },
    {
      biomarker: 'Gula Darah Sewaktu (GDS)',
      normal: '< 140 mg/dL',
      prediabetes: '140 – 199 mg/dL',
      diabetes: '≥ 200 mg/dL',
      note: 'Dapat diperiksa kapan saja tanpa memperhatikan jadwal makan.',
    },
    {
      biomarker: 'Indeks Massa Tubuh (BMI Asia)',
      normal: '18.5 – 22.9 kg/m²',
      prediabetes: '23.0 – 24.9 kg/m² (Kelebihan)',
      diabetes: '≥ 25.0 kg/m² (Obesitas)',
      note: 'Standar populasi Asia/Indonesia memiliki ambang batas adipositas lebih ketat.',
    },
    {
      biomarker: 'Lingkar Pinggang (Adipositas Sentral)',
      normal: 'Pria < 90 cm · Wanita < 80 cm',
      prediabetes: 'Batas toleransi',
      diabetes: 'Pria ≥ 90 cm · Wanita ≥ 80 cm',
      note: 'Lemak visceral memicu resistensi insulin pada reseptor hati & otot.',
    },
    {
      biomarker: 'Trigliserida Darah',
      normal: '< 150 mg/dL',
      prediabetes: '150 – 199 mg/dL',
      diabetes: '≥ 200 mg/dL (Tinggi)',
      note: 'Sering meningkat seiring dengan resistensi insulin dan konsumsi karbohidrat olahan.',
    },
  ];

  const faqs = [
    {
      q: 'Mengapa HbA1c dianggap sebagai indikator paling akurat?',
      a: 'HbA1c mencerminkan persentase hemoglobin yang berikatan dengan glukosa selama masa hidup sel darah merah (sekitar 90–120 hari). Tidak seperti tes gula darah jari harian yang berfluktuasi drastis setelah makan atau stres, HbA1c memberikan gambaran stabilitas glikemik jangka panjang.',
    },
    {
      q: 'Apakah hasil "Risiko Tinggi" berarti saya pasti menderita diabetes?',
      a: 'Tidak secara definitif. Hasil skrining adalah peringatan dini probabilitas statistik berdasarkan model machine learning dari 50.000 data pasien. Untuk memastikan diagnosis, Anda harus menjalani tes laboratorium resmi (tes darah vena) dan konsultasi dengan dokter spesialis.',
    },
    {
      q: 'Apakah diabetes fase "Risiko Sedang" (Pradiabetes) bisa disembuhkan atau dibalikkan?',
      a: 'Ya, sangat bisa! Berbagai penelitian klinis (seperti Diabetes Prevention Program) membuktikan bahwa penurunan berat badan 5–7% dan olahraga teratur 150 menit per minggu dapat menurunkan risiko berkembang menjadi diabetes tipe 2 hingga 58%.',
    },
    {
      q: 'Bagaimana privasi data kesehatan saya dilindungi di aplikasi ini?',
      a: 'DiabeCheck AI dirancang dengan prinsip privasi pertama. Seluruh evaluasi numerik dapat dihitung langsung di peramban Anda (client-side) tanpa menyimpan data identitas atau rekam medis Anda ke server permanen mana pun.',
    },
  ];

  return (
    <section id="panduan" className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Sub-section 1: Reference Table */}
        <div id="faktor-risiko">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold text-indigo-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
              Panduan Klinis Kemenkes & PERKENI
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Rentang Normal Biomarker Diabetes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Gunakan tabel acuan ini untuk membandingkan hasil tes laboratorium Anda dengan standar medis resmi.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Parameter / Biomarker</th>
                  <th className="py-3 px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                    🟢 Normal
                  </th>
                  <th className="py-3 px-4 font-semibold text-amber-700 dark:text-amber-400">
                    🟡 Pradiabetes / Waspada
                  </th>
                  <th className="py-3 px-4 font-semibold text-rose-700 dark:text-rose-400">
                    🔴 Diabetes / Berisiko
                  </th>
                  <th className="py-3 px-4 font-semibold hidden md:table-cell">Catatan Klinis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                {referenceTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-white">
                      {row.biomarker}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                      {row.normal}
                    </td>
                    <td className="py-3.5 px-4 text-amber-600 dark:text-amber-400 font-medium">
                      {row.prediabetes}
                    </td>
                    <td className="py-3.5 px-4 text-rose-600 dark:text-rose-400 font-medium">
                      {row.diabetes}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-slate-400 hidden md:table-cell">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sub-section 2: FAQs */}
        <div id="faq" className="max-w-4xl mx-auto pt-6">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-2">
              Pertanyaan yang Sering Diajukan
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Tanya Jawab Seputar Skrining & Diabetes
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-800/40"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
