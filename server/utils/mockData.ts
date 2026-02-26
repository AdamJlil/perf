// perf/server/utils/mockData.ts

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
  {
    id: "3",
    email: "user@perf.com",
    password: "password123",
    type: "PARTICULIER",
    roles: [],
    name: "Regular User",
    first_name: "User",
    paid: true,
    plan: JSON.stringify({ title: "EXPLORER" }),
    age: 25,
    height: 180,
    weight: 75,
    gender: "Male",
    has_allergies: false,
    has_medical_conditions: false,
  },
];

export const getMockUsers = () => mockUsers;
