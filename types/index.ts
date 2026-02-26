export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  et_customer_id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password?: string;
  roles: string[];
  role?: string;
  type?: string;
  first_name?: string;
  paid?: boolean | number;
  plan?: any;
  customers?: any[];
  video?: number;
  ageRange?: string;
  weightRange?: string;
  burnedCalories?: Record<string, number>;
  is_admin?: boolean;
  price?: string;
  is_finished_onboarding?: boolean;
  age?: number;
  height?: number | string;
  weight?: number;
  gender?: string;
  has_allergies?: boolean;
  allergies_details?: string;
  has_medical_conditions?: boolean;
  medical_conditions_details?: string;
}

export type UserWithoutPassword = Omit<User, "password">;
