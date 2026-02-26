import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const authUser = useAuthUser();

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const data = await $fetch<any>("/api/auth/login", {
        method: "POST",
        body: { email, password, rememberMe },
      });
      
      // Update local state immediately
      authUser.value = data.user;
      
      // Double check by calling me() to ensure cookie is accepted and readable
      await me();
      
      return { user: authUser.value, isFirstLogin: data.isFirstLogin };
    } catch (error: any) {
      throw error;
    }
  };

  const signup = async (userData: any) => {
    try {
      const data = await $fetch<any>("/api/auth/signup", {
        method: "POST",
        body: userData,
      });
      return data.user;
    } catch (error: any) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
      authUser.value = null;
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const me = async () => {
    try {
      const headers = useRequestHeaders(["cookie"]);
      const data = await $fetch<any>("/api/auth/me", { headers });
      authUser.value = data.user;
      return authUser.value;
    } catch (error) {
      authUser.value = null;
      return null;
    }
  };

  return {
    login,
    signup,
    logout,
    me,
    user: authUser,
  };
};
