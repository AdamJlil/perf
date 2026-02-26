import type { UserWithoutPassword } from "~/types/index";

export const useAuthUser = () => {
  return useState<UserWithoutPassword | null>("user", () => null);
};
