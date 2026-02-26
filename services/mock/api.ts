// perf/services/api.ts
import { mockApiService } from "./api-service";

export const api = {
  // Auth
  login: mockApiService.login,
  signup: mockApiService.signup,

  // Users
  updateQuiz: mockApiService.updateQuiz,
  getCustomers: mockApiService.getCustomers,
  addCustomer: mockApiService.addCustomer,
  removeCustomer: mockApiService.removeCustomer,
  deleteUser: mockApiService.deleteUser,
  updateUser: mockApiService.updateUser,
  getUserByEmail: mockApiService.getUserByEmail,

  // Contact
  submitContact: mockApiService.submitContact,

  // Payment
  notifyPayment: mockApiService.notifyPayment,

  // Generic helper for components that use fetch/axios directly
  async request(path: string, options: any = {}) {
    const method = options.method || "GET";
    const body = options.body ? (typeof options.body === "string" ? JSON.parse(options.body) : options.body) : null;
    const params = options.params || {};

    console.log(`Mock Request: ${method} ${path}`, body || params);

    if (path.includes("/api/auth/signin")) return this.login(body.email, body.password);
    if (path.includes("/api/auth/signup")) return this.signup(body);
    if (path.includes("/api/users/customers/remove/")) {
      const id = path.split("/").pop();
      return this.removeCustomer(options.establishmentId, id!);
    }
    if (path.includes("/api/users/customers/add/")) {
      const id = path.split("/").pop();
      return this.addCustomer(options.establishmentId, id!, body);
    }
    if (path.includes("/api/users/customers")) return this.getCustomers(options.establishmentId);
    if (path.includes("/api/users/quiz")) return this.updateQuiz(options.userId, body);
    if (path.includes("/api/users/by-email")) {
      const email = new URLSearchParams(path.split("?")[1]).get("email");
      return this.getUserByEmail(email!);
    }
    if (path.includes("/api/users/") && method === "PUT") {
      const id = path.split("/").pop();
      return this.updateUser(id!, body);
    }
    if (path.includes("/api/users/") && method === "DELETE") {
      const id = path.split("/").pop();
      return this.deleteUser(id!);
    }
    if (path.includes("/api/contact/submit")) return this.submitContact(body);
    if (path.includes("/api/payment/notify")) return this.notifyPayment(body);
    if (path.includes("/api/payment/payment-status-update")) return this.notifyPayment(body);
    if (path.includes("/api/users/") && path.includes("/update-payment")) {
      const id = path.split("/")[3]; // /api/users/{id}/update-payment
      return this.updateUser(id, body);
    }

    console.warn(`Unhandled mock request: ${path}`);
    return { success: true };
  },
};
