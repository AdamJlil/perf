export interface Customer {
  firstName?: string;
  lastName?: string;
  email: string;
  et_customer_id: string;
  video: number;
  burnedCalories: {
    'Day 1'?: number;
    'Day 2'?: number;
    'Day 3'?: number;
    'Day 4'?: number;
    'Day 5'?: number;
    'Day 6'?: number;
    'Day 7'?: number;
  };  
  ageRange?: string;
  weightRange?: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  type?: string;
  customers?: Customer[];
  video?: number;
  burnedCalories?: {
    'Day 1'?: number;
    'Day 2'?: number;
    'Day 3'?: number;
    'Day 4'?: number;
    'Day 5'?: number;
    'Day 6'?: number;
    'Day 7'?: number;
  };  
  ageRange?: string;
  weightRange?: string;
  name?: string
}
