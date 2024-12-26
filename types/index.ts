export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  roles: string[];
  type?: string;
  customers?: Customer[];
}
