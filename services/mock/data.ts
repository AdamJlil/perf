// perf/services/mockData.ts

export const mockUsers = [
  {
    id: "1",
    email: "admin@perf.com",
    password: "password123",
    type: "ADMIN",
    role: "founder",
    roles: ["founder"],
    name: "Admin User",
    first_name: "Admin",
    is_admin: true,
    paid: true,
  },
  {
    id: "2",
    email: "est@perf.com",
    password: "password123",
    type: "ESTABLISHEMENT",
    name: "Establishement One",
    first_name: "Est",
    roles: [],
    paid: true,
    plan: JSON.stringify({ title: "SIGNATURE" }),
    customers: [],
  },
];

export const mockPlans = [
  { title: "EXPLORER", price: "6500" },
  { title: "EXPERIENCE", price: "7500" },
  { title: "SIGNATURE", price: "8000" },
];

export const getStoredUsers = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("mock_users");
    if (stored) return JSON.parse(stored);
    localStorage.setItem("mock_users", JSON.stringify(mockUsers));
    return mockUsers;
  }
  return mockUsers;
};

export const saveUsers = (users: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("mock_users", JSON.stringify(users));
  }
};
