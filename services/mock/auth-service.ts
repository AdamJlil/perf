import { mockApiService } from "./api-service";

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    type: "ESTABLISHEMENT" | "ADMIN";
    isFinishedOnboarding: boolean;
    // Quiz data fields
    age?: number;
    height?: number;
    weight?: number;
    gender?: string;
    has_allergies?: boolean;
    allergies_details?: string;
    has_medical_conditions?: boolean;
    medical_conditions_details?: string;
    plan?: any;
    paid?: boolean;
    first_name?: string;
    name?: string;
  };
  token: string;
  needsPayment?: boolean;
  redirectUrl?: string;
}

export interface SignupData {
  email: string;
  password: string;
  type: "ESTABLISHEMENT" | "ADMIN";
  first_name?: string;
  name?: string;
  plan?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log("Attempting mock login with email:", email);
      const data = await mockApiService.login(email, password);
      console.log("Mock login response:", data);
      if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      return data as LoginResponse;
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      throw error.response?.data?.error || "Login failed";
    }
  },

  async signup(data: SignupData): Promise<LoginResponse> {
    try {
      console.log("Attempting mock signup with data:", { ...data, password: "[REDACTED]" });
      const responseData = await mockApiService.signup(data);
      console.log("Mock signup response:", responseData);
      if (responseData.token) {
        localStorage.setItem("user", JSON.stringify(responseData));
      }
      return responseData as LoginResponse;
    } catch (error: any) {
      console.error("Signup error:", error.response?.data || error.message);

      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      if (errorMessage && errorMessage.includes("exists")) {
        throw new Error("An account with this email already exists. Please try logging in instead.");
      }

      throw error.response?.data?.error || "Signup failed";
    }
  },

  logout() {
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },
};
