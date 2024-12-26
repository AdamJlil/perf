import type { User } from "~~/types";

// Fake users data
const users: User[] = [
  {
    id: "AD-41dbc5f7-9a4e-42e6-832b-1d3dd8c7c4b6",
    email: "admin1@gmail.com",
    name: "Admin User",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["ADMIN"],
  },
  {
    id: "ET-d0065700-1707-4ad9-811b-8bbed0364318",
    email: "etablissement1@gmail.com",
    name: "IBIS HOTEL",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "ETABLISSEMENT",
    customers: [
      { firstName: "Mohammed", lastName: "Alami", email: "mohammed.alami@example.com", et_customer_id: "et_id!-mohammedAlami1" },
      { firstName: "Yasmine", lastName: "Bennani", email: "yasmine.bennani@example.com", et_customer_id: "et_id!-yasmineBennani2" },
      { firstName: "Karim", lastName: "Idrissi", email: "karim.idrissi@example.com", et_customer_id: "et_id!-karimIdrissi3" }
    ]
  },
  {
    id: "ET-e1265700-1707-4ad9-811b-8bbed0364319",
    email: "etablissement2@gmail.com",
    name: "PANORAMA HOTEL",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "ETABLISSEMENT",
    customers: [
      { firstName: "Amjad", lastName: "Arkhis", email: "amjad.arkhis@example.com", et_customer_id: "et_id!-amjadArkhis1" },
      { firstName: "Saad", lastName: "Tanttaoui", email: "saad.tanttaoui@example.com", et_customer_id: "et_id!-SaadTanttaoui2" },
      { firstName: "Lina", lastName: "BenArfa", email: "lina.ben@example.com",et_customer_id: "et_id!-LinaBenArfa3" }
    ]
  },
  {
    id: "PA-d0065700-1707-4ad9-811b-8bbed0364318",
    email: "particuier1@gmail.com",
    name: "John Doe",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "PARTICULIER",
  },
];

export async function getUsers() {
  return users;
}

export async function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export async function getUserById(id: string) {
  return users.find((user) => user.id === id);
}

export async function isAdmin(user?: User) {
  return user && user.roles.includes("ADMIN");
}
