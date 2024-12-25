export interface User {
  id: string;
  email: string;
  password: string;
  roles: string[];
  type?: string;
}

export type UserWithoutPassword = Omit<User, "password">;
