// perf/services/mockApiService.ts
import { getStoredUsers, saveUsers, mockPlans } from "./data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  async login(email: string, password: string) {
    await delay(500);
    const users = getStoredUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);

    if (!user) {
      throw { response: { data: { error: "Invalid credentials" } } };
    }

    const { password: _, ...userWithoutPassword } = user;

    // Determine price based on plan
    let price = "";
    if (user.plan) {
      const planTitle = typeof user.plan === "string" ? JSON.parse(user.plan).title || "" : user.plan.title || "";

      const plan = mockPlans.find((p) => p.title === planTitle);
      if (plan) price = plan.price;
    }

    const needsPayment = user.paid !== true && user.paid !== 1 && user.type !== "ADMIN";

    return {
      message: "Login successful",
      user: userWithoutPassword,
      token: "mock-jwt-token-" + user.id,
      needsPayment,
      redirectUrl: needsPayment
        ? `/order?first_name=${encodeURIComponent(user.first_name || "")}&name=${encodeURIComponent(user.name || "")}&email=${encodeURIComponent(user.email)}&userType=${encodeURIComponent(user.type)}&plan=${encodeURIComponent(user.plan ? (typeof user.plan === "string" ? JSON.parse(user.plan).title || "" : user.plan.title || "") : "")}&price=${encodeURIComponent(price)}`
        : null,
    };
  },

  async signup(data: any) {
    await delay(500);
    const users = getStoredUsers();
    if (users.find((u: any) => u.email === data.email)) {
      throw { response: { data: { error: "Email already exists" } } };
    }

    const newUser = {
      id: String(users.length + 1),
      ...data,
      paid: false,
      customers: [],
    };

    users.push(newUser);
    saveUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return {
      message: "User created successfully",
      user: userWithoutPassword,
      token: "mock-jwt-token-" + newUser.id,
    };
  },

  async updateQuiz(userId: string, quizData: any) {
    await delay(300);
    const users = getStoredUsers();
    const index = users.findIndex((u: any) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...quizData };
      saveUsers(users);
    }
    return { message: "Profile updated successfully" };
  },

  async getCustomers(establishmentId: string) {
    await delay(300);
    const users = getStoredUsers();
    const establishment = users.find((u: any) => u.id === establishmentId);
    return establishment?.customers || [];
  },

  async addCustomer(establishmentId: string, customerId: string, customerData: any) {
    await delay(300);
    const users = getStoredUsers();
    const index = users.findIndex((u: any) => u.id === establishmentId);
    if (index !== -1) {
      if (!users[index].customers) users[index].customers = [];

      const customer = {
        ...customerData,
        et_customer_id: customerId,
      };

      users[index].customers.push(customer);
      saveUsers(users);
      return { message: "Customer added successfully", customers: users[index].customers };
    }
    throw new Error("Establishment not found");
  },

  async removeCustomer(establishmentId: string, customerId: string) {
    await delay(300);
    const users = getStoredUsers();
    const index = users.findIndex((u: any) => u.id === establishmentId);
    if (index !== -1) {
      users[index].customers = users[index].customers.filter((c: any) => c.et_customer_id !== customerId);
      saveUsers(users);
      return { message: "Customer removed successfully", customers: users[index].customers };
    }
    throw new Error("Establishment not found");
  },

  async deleteUser(userId: string) {
    await delay(300);
    const users = getStoredUsers();
    const newUsers = users.filter((u: any) => u.id !== userId);
    saveUsers(newUsers);
    return { message: "User deleted successfully" };
  },

  async updateUser(userId: string, userData: any) {
    await delay(300);
    const users = getStoredUsers();
    const index = users.findIndex((u: any) => u.id === userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      saveUsers(users);
      return { message: "User updated successfully", user: users[index] };
    }
    throw new Error("User not found");
  },

  async getUserByEmail(email: string) {
    await delay(300);
    const users = getStoredUsers();
    const user = users.find((u: any) => u.email === email);
    if (!user) throw new Error("User not found");

    const { password: _, ...userWithoutPassword } = user;

    let price = "";
    if (user.plan) {
      const planTitle = typeof user.plan === "string" ? JSON.parse(user.plan).title || "" : user.plan.title || "";
      const plan = mockPlans.find((p) => p.title === planTitle);
      if (plan) price = plan.price;
    }

    return {
      success: true,
      user: { ...userWithoutPassword, price },
    };
  },

  async submitContact(data: any) {
    await delay(500);
    console.log("Mock Contact Submission:", data);
    return { success: true, message: "Contact form submitted successfully" };
  },

  async notifyPayment(data: any) {
    await delay(500);
    console.log("Mock Payment Notification:", data);

    // Update user paid status if email found
    if (data.email) {
      const users = getStoredUsers();
      const index = users.findIndex((u: any) => u.email === data.email);
      if (index !== -1) {
        users[index].paid = true;
        if (data.address) users[index].address = data.address;
        if (data.city) users[index].city = data.city;
        if (data.phone) users[index].phone = data.phone;
        saveUsers(users);
      }
    }

    return { success: true, message: "Payment notification processed successfully" };
  },
};
