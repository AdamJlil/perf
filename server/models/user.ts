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
      { 
        firstName: "Mohammed", 
        lastName: "Alami", 
        email: "mohammed.alami@example.com", 
        et_customer_id: "et_id!-mohammedAlami1", 
        video: 0,
        ageRange: "20-40",
        weightRange: "50-70",
        burnedCalories: {
          'Day 1': 0,
        }
      },
      { 
        firstName: "Yasmine", 
        lastName: "Bennani", 
        email: "yasmine.bennani@example.com", 
        et_customer_id: "et_id!-yasmineBennani2", 
        video: 1,
        ageRange: "20-40",
        weightRange: "50-70",
        burnedCalories: {
          'Day 1': 238,
          'Day 2': 331,
          'Day 3': 245,
        }
      },
      { 
        firstName: "Karim", 
        lastName: "Idrissi", 
        email: "karim.idrissi@example.com", 
        et_customer_id: "et_id!-karimIdrissi3", 
        video: 2,
        ageRange: "20-40",
        weightRange: "50-70",
        burnedCalories: {
          'Day 1': 270,
          'Day 2': 375,
          'Day 3': 320,
          'Day 4': 345,
          'Day 5': 360,
          'Day 6': 380,
          'Day 7': 355
        }
      }
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
      { 
        firstName: "Amjad", 
        lastName: "Arkhis", 
        email: "amjad.arkhis@example.com", 
        et_customer_id: "et_id!-amjadArkhis1", 
        video: 3,
        ageRange: "20-40",
        weightRange: "50-70",
        burnedCalories: {
          'Day 1': 0,
          'Day 2': 0,
          'Day 3': 0,
          'Day 4': 0,
          'Day 5': 0,
          'Day 6': 0,
          'Day 7': 0
        }
      },
      { 
        firstName: "Saad", 
        lastName: "Tanttaoui", 
        email: "saad.tanttaoui@example.com", 
        et_customer_id: "et_id!-SaadTanttaoui2", 
        video: 4,
        ageRange: "20-40",
        weightRange: "50-70",
        burnedCalories: {
          'Day 1': 0,
          'Day 2': 0,
          'Day 3': 0,
          'Day 4': 0,
          'Day 5': 0,
          'Day 6': 0,
          'Day 7': 0
        }
      },
      { 
        firstName: "Lina", 
        lastName: "BenArfa", 
        email: "lina.ben@example.com",
        et_customer_id: "et_id!-LinaBenArfa3", 
        video: 2,
        ageRange: "20-40",
        weightRange: "50-70",
        burnedCalories: {
          'Day 1': 0,
          'Day 2': 0,
          'Day 3': 0,
          'Day 4': 0,
          'Day 5': 0,
          'Day 6': 0,
          'Day 7': 0
        }
      }
    ]
  },
  {
    id: "PA-d0065700-1707-4ad9-811b-8bbed0364318",
    email: "particuier1@gmail.com",
    name: "John Doe",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "PARTICULIER",
    video: 0
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
