export type RiskLevel = 'Low' | 'Moderate' | 'High';

export interface DiabetesFormData {
  // Numeric - Essential
  Age?: number;
  Gender?: 'Male' | 'Female' | 'Other';
  Height_cm?: number;
  Weight_kg?: number;
  BMI?: number;
  Waist_Circumference_cm?: number;

  // Numeric - Medical Measurements
  HbA1c?: number;
  Fasting_Blood_Sugar?: number;
  Blood_Glucose?: number;
  Insulin_Level?: number;
  Blood_Pressure_Systolic?: number;
  Blood_Pressure_Diastolic?: number;
  Total_Cholesterol?: number;
  HDL?: number;
  LDL?: number;
  Triglycerides?: number;
  Heart_Rate?: number;

  // Numeric - Lifestyle
  Exercise_Hours_Per_Week?: number;
  Daily_Walking_Minutes?: number;
  Sleep_Hours?: number;
  Daily_Water_Intake_L?: number;

  // Categorical - Lifestyle & History
  Country?: string;
  Physical_Activity_Level?: 'High' | 'Moderate' | 'Low';
  Diet_Quality?: 'Healthy' | 'Average' | 'Poor';
  Sugar_Intake_Level?: 'Low' | 'Moderate' | 'High';
  Stress_Level?: 'Low' | 'Moderate' | 'High';
  Smoking_Status?: 'Never' | 'Former' | 'Current';
  Alcohol_Consumption?: 'None' | 'Occasional' | 'Frequent';
  Family_History_Diabetes?: 'Yes' | 'No';
  Hypertension?: 'Yes' | 'No' | 'Unknown';
  Heart_Disease?: 'Yes' | 'No' | 'Unknown';
  Fatty_Liver?: 'Yes' | 'No' | 'Unknown';
  PCOS?: 'Yes' | 'No' | 'Unknown';
  Medication_Adherence?: 'Good' | 'Average' | 'Poor';
  Work_Type?: 'Sedentary' | 'Active' | 'Mixed';
  Residence_Type?: 'Urban' | 'Rural';
}

export interface PredictionResponse {
  prediction: RiskLevel;
  probabilities: {
    High: number;
    Low: number;
    Moderate: number;
  };
  threshold_applied?: boolean;
  disclaimer: string;
  contributing_factors?: Array<{
    feature: string;
    labelId: string;
    valueText: string;
    status: 'normal' | 'warning' | 'danger';
    impact: 'Tinggi' | 'Sedang' | 'Rendah';
    note: string;
  }>;
  source?: 'api' | 'ensemble-engine';
}

export interface FieldHelp {
  label: string;
  unit?: string;
  normalRange: string;
  description: string;
  min?: number;
  max?: number;
  step?: number;
}
