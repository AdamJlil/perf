export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  et_customer_id: string;
  video: number
}

export interface User {
  id: string;
  email: string;
  password: string;
  roles: string[];
  name: string;
  type?: string;
  customers?: Customer[];
  video?: number;
}

export type UserWithoutPassword = Omit<User, "password">;
