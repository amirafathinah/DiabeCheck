import { DiabetesFormData, PredictionResponse } from '../types/diabetes';

// =====================================================================
// KONFIGURASI URL BACKEND FASTAPI
// Ubah nilai API_BASE_URL di bawah ini ke alamat server backend Anda
// (misal: di Railway, Render, atau Cloud Run).
// =====================================================================
export const API_BASE_URL = 'https://your-api-url.railway.app';

export const DEMO_PRESETS: Record<
  'low' | 'moderate' | 'high',
  { title: string; desc: string; data: DiabetesFormData }
> = {
  low: {
    title: 'Profil A: Risiko Rendah (Sehat & Aktif)',
    desc: 'Individu usia 28 tahun dengan gaya hidup bugar, HbA1c 4.9%, dan tanpa riwayat diabetes keluarga.',
    data: {
      Age: 28,
      Gender: 'Female',
      Height_cm: 165,
      Weight_kg: 56,
      BMI: 20.6,
      Waist_Circumference_cm: 72,
      HbA1c: 4.9,
      Fasting_Blood_Sugar: 86,
      Blood_Glucose: 105,
      Insulin_Level: 7.2,
      Blood_Pressure_Systolic: 114,
      Blood_Pressure_Diastolic: 74,
      Total_Cholesterol: 172,
      HDL: 58,
      LDL: 94,
      Triglycerides: 98,
      Heart_Rate: 68,
      Exercise_Hours_Per_Week: 4.5,
      Daily_Walking_Minutes: 45,
      Sleep_Hours: 7.5,
      Daily_Water_Intake_L: 2.5,
      Physical_Activity_Level: 'High',
      Diet_Quality: 'Healthy',
      Sugar_Intake_Level: 'Low',
      Stress_Level: 'Low',
      Smoking_Status: 'Never',
      Alcohol_Consumption: 'None',
      Family_History_Diabetes: 'No',
      Hypertension: 'No',
      Heart_Disease: 'No',
      Fatty_Liver: 'No',
      PCOS: 'No',
      Medication_Adherence: 'Good',
      Work_Type: 'Active',
      Residence_Type: 'Urban',
      Country: 'Indonesia',
    },
  },
  moderate: {
    title: 'Profil B: Risiko Sedang (Pradiabetes / Waspada)',
    desc: 'Individu usia 44 tahun dengan HbA1c 5.9%, gula darah puasa batas atas, dan aktivitas fisik minim.',
    data: {
      Age: 44,
      Gender: 'Male',
      Height_cm: 170,
      Weight_kg: 78,
      BMI: 27.0,
      Waist_Circumference_cm: 88,
      HbA1c: 5.9,
      Fasting_Blood_Sugar: 112,
      Blood_Glucose: 148,
      Insulin_Level: 15.4,
      Blood_Pressure_Systolic: 128,
      Blood_Pressure_Diastolic: 82,
      Total_Cholesterol: 215,
      HDL: 44,
      LDL: 136,
      Triglycerides: 168,
      Heart_Rate: 76,
      Exercise_Hours_Per_Week: 1.0,
      Daily_Walking_Minutes: 20,
      Sleep_Hours: 6.0,
      Daily_Water_Intake_L: 1.5,
      Physical_Activity_Level: 'Low',
      Diet_Quality: 'Average',
      Sugar_Intake_Level: 'Moderate',
      Stress_Level: 'Moderate',
      Smoking_Status: 'Former',
      Alcohol_Consumption: 'Occasional',
      Family_History_Diabetes: 'Yes',
      Hypertension: 'No',
      Heart_Disease: 'No',
      Fatty_Liver: 'No',
      PCOS: 'No',
      Medication_Adherence: 'Average',
      Work_Type: 'Sedentary',
      Residence_Type: 'Urban',
      Country: 'Indonesia',
    },
  },
  high: {
    title: 'Profil C: Risiko Tinggi (Perlu Tindakan Klinis)',
    desc: 'Individu usia 53 tahun dengan HbA1c 7.3%, gula puasa 158 mg/dL, riwayat keluarga, dan hipertensi.',
    data: {
      Age: 53,
      Gender: 'Male',
      Height_cm: 168,
      Weight_kg: 92,
      BMI: 32.6,
      Waist_Circumference_cm: 102,
      HbA1c: 7.3,
      Fasting_Blood_Sugar: 158,
      Blood_Glucose: 210,
      Insulin_Level: 28.5,
      Blood_Pressure_Systolic: 142,
      Blood_Pressure_Diastolic: 92,
      Total_Cholesterol: 248,
      HDL: 36,
      LDL: 162,
      Triglycerides: 240,
      Heart_Rate: 84,
      Exercise_Hours_Per_Week: 0.5,
      Daily_Walking_Minutes: 10,
      Sleep_Hours: 5.5,
      Daily_Water_Intake_L: 1.2,
      Physical_Activity_Level: 'Low',
      Diet_Quality: 'Poor',
      Sugar_Intake_Level: 'High',
      Stress_Level: 'High',
      Smoking_Status: 'Current',
      Alcohol_Consumption: 'Occasional',
      Family_History_Diabetes: 'Yes',
      Hypertension: 'Yes',
      Heart_Disease: 'No',
      Fatty_Liver: 'Yes',
      PCOS: 'No',
      Medication_Adherence: 'Poor',
      Work_Type: 'Sedentary',
      Residence_Type: 'Urban',
      Country: 'Indonesia',
    },
  },
};

const LAB_FIELDS = [
  'HbA1c',
  'Fasting_Blood_Sugar',
  'Blood_Glucose',
  'Insulin_Level',
  'Total_Cholesterol',
  'HDL',
  'LDL',
  'Triglycerides',
];

/**
 * Anotasi faktor kontributor klinis berdasarkan data input pengguna
 */
export function extractContributingFactors(data: DiabetesFormData) {
  const factors: NonNullable<PredictionResponse['contributing_factors']> = [];

  // HbA1c
  if (data.HbA1c !== undefined && !isNaN(data.HbA1c)) {
    if (data.HbA1c >= 6.5) {
      factors.push({
        feature: 'HbA1c',
        labelId: 'Kadar Hemoglobin Terglikasi (HbA1c)',
        valueText: `${data.HbA1c}%`,
        status: 'danger',
        impact: 'Tinggi',
        note: 'Sangat tinggi (≥ 6.5%). Menunjukkan rata-rata glukosa tinggi dalam 3 bulan terakhir.',
      });
    } else if (data.HbA1c >= 5.7) {
      factors.push({
        feature: 'HbA1c',
        labelId: 'Kadar Hemoglobin Terglikasi (HbA1c)',
        valueText: `${data.HbA1c}%`,
        status: 'warning',
        impact: 'Sedang',
        note: 'Rentang pradiabetes (5.7% - 6.4%). Diperlukan intervensi pola makan & aktivitas.',
      });
    } else {
      factors.push({
        feature: 'HbA1c',
        labelId: 'Kadar Hemoglobin Terglikasi (HbA1c)',
        valueText: `${data.HbA1c}%`,
        status: 'normal',
        impact: 'Rendah',
        note: 'Normal (< 5.7%). Kontrol glikemik stabil.',
      });
    }
  }

  // Fasting Blood Sugar
  if (data.Fasting_Blood_Sugar !== undefined && !isNaN(data.Fasting_Blood_Sugar)) {
    if (data.Fasting_Blood_Sugar >= 126) {
      factors.push({
        feature: 'Fasting_Blood_Sugar',
        labelId: 'Gula Darah Puasa (GDP)',
        valueText: `${data.Fasting_Blood_Sugar} mg/dL`,
        status: 'danger',
        impact: 'Tinggi',
        note: 'Tinggi (≥ 126 mg/dL). Menunjukkan hiperglikemia saat kondisi puasa.',
      });
    } else if (data.Fasting_Blood_Sugar >= 100) {
      factors.push({
        feature: 'Fasting_Blood_Sugar',
        labelId: 'Gula Darah Puasa (GDP)',
        valueText: `${data.Fasting_Blood_Sugar} mg/dL`,
        status: 'warning',
        impact: 'Sedang',
        note: 'Batas toleransi glukosa terganggu / pradiabetes (100 - 125 mg/dL).',
      });
    }
  }

  // BMI & Obesitas
  if (data.BMI !== undefined && !isNaN(data.BMI)) {
    if (data.BMI >= 30) {
      factors.push({
        feature: 'BMI',
        labelId: 'Indeks Massa Tubuh (BMI)',
        valueText: `${data.BMI.toFixed(1)} kg/m²`,
        status: 'danger',
        impact: 'Tinggi',
        note: 'Obesitas (≥ 30). Memperparah resistensi insulin perifer.',
      });
    } else if (data.BMI >= 25) {
      factors.push({
        feature: 'BMI',
        labelId: 'Indeks Massa Tubuh (BMI)',
        valueText: `${data.BMI.toFixed(1)} kg/m²`,
        status: 'warning',
        impact: 'Sedang',
        note: 'Kelebihan berat badan (Overweight: 25 - 29.9).',
      });
    }
  }

  // Family History
  if (data.Family_History_Diabetes === 'Yes') {
    factors.push({
      feature: 'Family_History_Diabetes',
      labelId: 'Riwayat Diabetes Keluarga',
      valueText: 'Ada (Ya)',
      status: 'warning',
      impact: 'Sedang',
      note: 'Predisposisi genetik meningkatkan kecenderungan diabetes tipe 2.',
    });
  }

  // Blood Pressure
  if (
    (data.Blood_Pressure_Systolic && data.Blood_Pressure_Systolic >= 135) ||
    data.Hypertension === 'Yes'
  ) {
    factors.push({
      feature: 'Blood_Pressure',
      labelId: 'Tekanan Darah & Hipertensi',
      valueText: data.Blood_Pressure_Systolic
        ? `${data.Blood_Pressure_Systolic}/${data.Blood_Pressure_Diastolic || 85} mmHg`
        : 'Riwayat Hipertensi',
      status: 'warning',
      impact: 'Sedang',
      note: 'Hipertensi sering menjadi bagian dari sindrom metabolik.',
    });
  }

  // Triglycerides
  if (data.Triglycerides && data.Triglycerides >= 200) {
    factors.push({
      feature: 'Triglycerides',
      labelId: 'Kadar Trigliserida',
      valueText: `${data.Triglycerides} mg/dL`,
      status: 'warning',
      impact: 'Sedang',
      note: 'Trigliserida tinggi berkorelasi dengan resistensi insulin jaringan lemak.',
    });
  }

  // Sedentary Lifestyle
  if (data.Physical_Activity_Level === 'Low' || (data.Exercise_Hours_Per_Week !== undefined && data.Exercise_Hours_Per_Week < 1)) {
    factors.push({
      feature: 'Physical_Activity_Level',
      labelId: 'Aktivitas Fisik & Olahraga',
      valueText: data.Physical_Activity_Level === 'Low' ? 'Sangat Rendah' : `${data.Exercise_Hours_Per_Week} jam/minggu`,
      status: 'warning',
      impact: 'Rendah',
      note: 'Kurang gerak menurunkan serapan glukosa oleh otot rangka.',
    });
  }

  return factors;
}

/**
 * Mengirimkan data formulir ke endpoint backend FastAPI POST /predict
 * Menggunakan fetch() asli tanpa backend palsu / tanpa simulasi browser.
 */
export async function predictDiabetesRisk(
  formData: DiabetesFormData,
  hasLabResults: boolean = true
): Promise<PredictionResponse> {
  const cleanData: Record<string, unknown> = {};

  // Susun payload JSON: bersihkan nilai kosong/undefined/'Unknown'
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'Unknown') {
      // Kondisional: Sembunyikan PCOS jika jenis kelamin Pria
      if (key === 'PCOS' && formData.Gender === 'Male') {
        return;
      }
      // Jika mode "Tanpa Hasil Lab", jangan kirimkan key biomarker lab
      // agar backend FastAPI mengisi nilai kosong tersebut dengan nilai median (default)
      if (!hasLabResults && LAB_FIELDS.includes(key)) {
        return;
      }
      cleanData[key] = value;
    }
  });

  const endpoint = `${API_BASE_URL.replace(/\/$/, '')}/predict`;

  let response: Response;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 detik timeout

    response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(cleanData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string };
    if (err?.name === 'AbortError') {
      throw new Error(
        `Waktu koneksi habis (timeout). Server backend di ${API_BASE_URL} tidak merespons dalam 10 detik.`
      );
    }
    throw new Error(
      `Gagal terhubung ke backend API (${API_BASE_URL}). Pastikan server backend Anda sedang aktif dan dapat diakses melalui internet.`
    );
  }

  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson.detail || errJson.message || JSON.stringify(errJson);
    } catch {
      errorDetail = `Status HTTP ${response.status} (${response.statusText})`;
    }
    throw new Error(`Server backend mengembalikan kesalahan: ${errorDetail}`);
  }

  const result = await response.json();

  // Validasi format kembalian sesuai kontrak API
  if (!result || !result.prediction || !result.probabilities) {
    throw new Error(
      'Format respons dari server backend tidak sesuai dengan spesifikasi (memerlukan field prediction dan probabilities).'
    );
  }

  const factors = extractContributingFactors(formData);
  if (!hasLabResults) {
    factors.unshift({
      feature: 'Mode_No_Lab',
      labelId: 'Metode Skrining',
      valueText: 'Tanpa Hasil Lab',
      status: 'warning',
      impact: 'Sedang',
      note: 'Dianalisis murni dari faktor risiko fisik & gaya hidup. Disarankan cek darah HbA1c untuk konfirmasi klinis.',
    });
  }

  return {
    prediction: result.prediction,
    probabilities: {
      High: Number(result.probabilities.High ?? 0),
      Low: Number(result.probabilities.Low ?? 0),
      Moderate: Number(result.probabilities.Moderate ?? 0),
    },
    threshold_applied: result.threshold_applied ?? false,
    disclaimer:
      result.disclaimer ||
      (hasLabResults
        ? 'Skrining awal berbasis model AI — bukan pengganti diagnosis medis resmi.'
        : 'Skrining berbasis faktor risiko non-lab — sangat disarankan cek lab untuk konfirmasi.'),
    contributing_factors: factors,
    source: 'api',
  };
}
