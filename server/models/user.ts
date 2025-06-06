// Fake users data
const users: any[] = [
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
    isFinishedOnboarding: true,
    name: "IBIS HOTEL",
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "ESTABLISHEMENT",
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
    ],
    payment:{
      planType: "ESSENTIAL", //ESSENTIAL PREMIUM GROWTH
    }
  },
  {
    id: "ET-e1265700-1707-4ad9-811b-8bbed0364319",
    email: "etablissement2@gmail.com",
    isFinishedOnboarding: true,
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
        }
      }
    ],
    payment:{
      planType: "ESSENTIAL", //ESSENTIAL PREMIUM GROWTH
    }
  },
  {
    id: "PA-d0065700-1707-4ad9-811b-8bbed0364318",
    email: "particuier1@gmail.com",
    isFinishedOnboarding: true,
    firstName: "Salah", 
    lastName: "Mo ", 
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "PARTICULIER",
    video: 1,
    ageRange: "20-40",
    weightRange: "50-70",
    toBeBurnedCaloriesNutrition: 500,
    nutritionPerDay: {
      calories: 3000,
      protein: 150,
      carbs: 375,
      fat: 100
    },
    mealPlans: {
      Breakfast: {
        mainTitle: "Breakfast Variations",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "12.50 MAD",
            title: "Baghrir with Honey & Eggs",
            description: `
              2 baghrir, 1 tbsp honey, 2 eggs, 1 orange
              <br/>
              <span class="underline">450 kcal</span>
              / Prot 20g / Carbs 80g / Fats 15g
            `,
            image: "https://img.freepik.com/free-photo/cheese-pancake-with-honey_1339-5251.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "15.00 MAD",
            title: "Avocado Toast with Eggs",
            description: `
              Whole grain bread, mashed avocado, 2 poached eggs
              <br/>
              <span class="underline">420 kcal</span>
              / Prot 18g / Carbs 35g / Fats 28g
            `,
            image: "https://img.freepik.com/free-photo/avocado-toast-with-egg_1339-1402.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "18.00 MAD",
            title: "Protein Oatmeal Bowl",
            description: `
              Oats, protein powder, banana, almond milk, nuts
              <br/>
              <span class="underline">380 kcal</span>
              / Prot 25g / Carbs 45g / Fats 12g
            `,
            image: "https://img.freepik.com/free-photo/bowl-granola-yogurt-honey-berries_114579-76862.jpg",
            isActive: false,
          },
        ]
      },
      MorningSnack: {
        mainTitle: "Morning Snack Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "8.00 MAD",
            title: "Greek Yogurt & Berries",
            description: `
              200g Greek yogurt, mixed berries, honey
              <br/>
              <span class="underline">200 kcal</span>
              / Prot 15g / Carbs 25g / Fats 8g
            `,
            image: "https://img.freepik.com/free-photo/bowl-yogurt-with-mix-berries-granola-honey_114579-76862.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "10.00 MAD",
            title: "Protein Bar",
            description: `
              Homemade protein bar with dates and nuts
              <br/>
              <span class="underline">180 kcal</span>
              / Prot 12g / Carbs 22g / Fats 9g
            `,
            image: "https://img.freepik.com/free-photo/protein-bars-with-nuts_114579-28297.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "7.00 MAD",
            title: "Apple with Almond Butter",
            description: `
              1 medium apple, 2 tbsp almond butter
              <br/>
              <span class="underline">220 kcal</span>
              / Prot 6g / Carbs 28g / Fats 12g
            `,
            image: "https://img.freepik.com/free-photo/sliced-apple-with-almond-butter_1339-7820.jpg",
            isActive: false,
          },
        ]
      },
      Lunch: {
        mainTitle: "Lunch Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "45.00 MAD",
            title: "Grilled Chicken Quinoa Bowl",
            description: `
              Grilled chicken breast, quinoa, roasted vegetables
              <br/>
              <span class="underline">550 kcal</span>
              / Prot 40g / Carbs 45g / Fats 22g
            `,
            image: "https://img.freepik.com/free-photo/buddha-bowl-with-chicken-quinoa-chickpea_1339-4729.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "55.00 MAD",
            title: "Salmon with Sweet Potato",
            description: `
              Baked salmon, mashed sweet potato, steamed broccoli
              <br/>
              <span class="underline">620 kcal</span>
              / Prot 42g / Carbs 48g / Fats 30g
            `,
            image: "https://img.freepik.com/free-photo/baked-salmon-with-vegetables_1339-4728.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "40.00 MAD",
            title: "Mediterranean Bowl",
            description: `
              Falafel, hummus, tabbouleh, mixed greens
              <br/>
              <span class="underline">480 kcal</span>
              / Prot 22g / Carbs 58g / Fats 24g
            `,
            image: "https://img.freepik.com/free-photo/falafel-hummus-pita-middle-eastern-arabic-dishes_1339-4730.jpg",
            isActive: false,
          },
        ]
      },
      AfternoonSnack: {
        mainTitle: "Afternoon Snack Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "15.00 MAD",
            title: "Protein Smoothie",
            description: `
              Banana, protein powder, almond milk, spinach
              <br/>
              <span class="underline">250 kcal</span>
              / Prot 20g / Carbs 30g / Fats 5g
            `,
            image: "https://img.freepik.com/free-photo/fresh-banana-smoothie_144627-27208.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "12.00 MAD",
            title: "Trail Mix",
            description: `
              Mixed nuts, dried fruits, dark chocolate chips
              <br/>
              <span class="underline">280 kcal</span>
              / Prot 8g / Carbs 32g / Fats 16g
            `,
            image: "https://img.freepik.com/free-photo/healthy-mix-nuts-dried-fruits_114579-28298.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "18.00 MAD",
            title: "Rice Cakes with Tuna",
            description: `
              2 rice cakes, tuna salad, cucumber
              <br/>
              <span class="underline">220 kcal</span>
              / Prot 18g / Carbs 24g / Fats 8g
            `,
            image: "https://img.freepik.com/free-photo/rice-cakes-with-tuna-cucumber_1339-7821.jpg",
            isActive: false,
          },
        ]
      },
      Dinner: {
        mainTitle: "Dinner Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "50.00 MAD",
            title: "Turkey Meatballs with Zucchini Noodles",
            description: `
              Lean turkey meatballs, zucchini noodles, marinara
              <br/>
              <span class="underline">420 kcal</span>
              / Prot 35g / Carbs 25g / Fats 22g
            `,
            image: "https://img.freepik.com/free-photo/meatballs-with-zucchini-noodles_1339-4731.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "45.00 MAD",
            title: "Tofu Stir-Fry",
            description: `
              Crispy tofu, mixed vegetables, brown rice
              <br/>
              <span class="underline">380 kcal</span>
              / Prot 22g / Carbs 45g / Fats 18g
            `,
            image: "https://img.freepik.com/free-photo/stir-fried-tofu-with-vegetables_1339-4732.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "60.00 MAD",
            title: "Grilled Sea Bass",
            description: `
              Sea bass fillet, roasted vegetables, quinoa
              <br/>
              <span class="underline">450 kcal</span>
              / Prot 38g / Carbs 35g / Fats 24g
            `,
            image: "https://img.freepik.com/free-photo/grilled-sea-bass-with-vegetables_1339-4733.jpg",
            isActive: false,
          },
        ]
      }
    },
    burnedCalories: {
      'Day 1': 270,
      'Day 2': 375,
      'Day 3': 320,
      'Day 4': 345,
      'Day 5': 360,
      'Day 6': 380,
      'Day 7': 355
    },
    payment:{
      planType: "ESSENTIAL", //ESSENTIAL PREMIUM GROWTH
    }
  },
  {
    id: "PA-d0065700-1707-4ad9-811b-8bbed0364319",
    email: "particuier2@gmail.com",
    isFinishedOnboarding: true,
    firstName: "Njid", 
    lastName: "TOT", 
    password: "$2y$10$hXPea83sKsVsuf95mtEZZeIYtcFl1vLJ1BXVTEqcgKArf6/5.Zksm",
    roles: ["USER"],
    type: "PARTICULIER",
    video: 4,
    ageRange: "20-40",
    weightRange: "50-70",
    toBeBurnedCaloriesNutrition: 100,
    nutritionPerDay: {
      calories: 3000,
      protein: 150,
      carbs: 375,
      fat: 100
    },
    mealPlans: {
      Breakfast: {
        mainTitle: "Breakfast Variations",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "12.50 MAD",
            title: "Baghrir with Honey & Eggs",
            description: `
              2 baghrir, 1 tbsp honey, 2 eggs, 1 orange
              <br/>
              <span class="underline">450 kcal</span>
              / Prot 20g / Carbs 80g / Fats 15g
            `,
            image: "https://img.freepik.com/free-photo/cheese-pancake-with-honey_1339-5251.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "15.00 MAD",
            title: "Avocado Toast with Eggs",
            description: `
              Whole grain bread, mashed avocado, 2 poached eggs
              <br/>
              <span class="underline">420 kcal</span>
              / Prot 18g / Carbs 35g / Fats 28g
            `,
            image: "https://img.freepik.com/free-photo/avocado-toast-with-egg_1339-1402.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "18.00 MAD",
            title: "Protein Oatmeal Bowl",
            description: `
              Oats, protein powder, banana, almond milk, nuts
              <br/>
              <span class="underline">380 kcal</span>
              / Prot 25g / Carbs 45g / Fats 12g
            `,
            image: "https://img.freepik.com/free-photo/bowl-granola-yogurt-honey-berries_114579-76862.jpg",
            isActive: false,
          },
        ]
      },
      MorningSnack: {
        mainTitle: "Morning Snack Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "8.00 MAD",
            title: "Greek Yogurt & Berries",
            description: `
              200g Greek yogurt, mixed berries, honey
              <br/>
              <span class="underline">200 kcal</span>
              / Prot 15g / Carbs 25g / Fats 8g
            `,
            image: "https://img.freepik.com/free-photo/bowl-yogurt-with-mix-berries-granola-honey_114579-76862.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "10.00 MAD",
            title: "Protein Bar",
            description: `
              Homemade protein bar with dates and nuts
              <br/>
              <span class="underline">180 kcal</span>
              / Prot 12g / Carbs 22g / Fats 9g
            `,
            image: "https://img.freepik.com/free-photo/protein-bars-with-nuts_114579-28297.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "7.00 MAD",
            title: "Apple with Almond Butter",
            description: `
              1 medium apple, 2 tbsp almond butter
              <br/>
              <span class="underline">220 kcal</span>
              / Prot 6g / Carbs 28g / Fats 12g
            `,
            image: "https://img.freepik.com/free-photo/sliced-apple-with-almond-butter_1339-7820.jpg",
            isActive: false,
          },
        ]
      },
      Lunch: {
        mainTitle: "Lunch Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "45.00 MAD",
            title: "Grilled Chicken Quinoa Bowl",
            description: `
              Grilled chicken breast, quinoa, roasted vegetables
              <br/>
              <span class="underline">550 kcal</span>
              / Prot 40g / Carbs 45g / Fats 22g
            `,
            image: "https://img.freepik.com/free-photo/buddha-bowl-with-chicken-quinoa-chickpea_1339-4729.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "55.00 MAD",
            title: "Salmon with Sweet Potato",
            description: `
              Baked salmon, mashed sweet potato, steamed broccoli
              <br/>
              <span class="underline">620 kcal</span>
              / Prot 42g / Carbs 48g / Fats 30g
            `,
            image: "https://img.freepik.com/free-photo/baked-salmon-with-vegetables_1339-4728.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "40.00 MAD",
            title: "Mediterranean Bowl",
            description: `
              Falafel, hummus, tabbouleh, mixed greens
              <br/>
              <span class="underline">480 kcal</span>
              / Prot 22g / Carbs 58g / Fats 24g
            `,
            image: "https://img.freepik.com/free-photo/falafel-hummus-pita-middle-eastern-arabic-dishes_1339-4730.jpg",
            isActive: false,
          },
        ]
      },
      AfternoonSnack: {
        mainTitle: "Afternoon Snack Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "15.00 MAD",
            title: "Protein Smoothie",
            description: `
              Banana, protein powder, almond milk, spinach
              <br/>
              <span class="underline">250 kcal</span>
              / Prot 20g / Carbs 30g / Fats 5g
            `,
            image: "https://img.freepik.com/free-photo/fresh-banana-smoothie_144627-27208.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "12.00 MAD",
            title: "Trail Mix",
            description: `
              Mixed nuts, dried fruits, dark chocolate chips
              <br/>
              <span class="underline">280 kcal</span>
              / Prot 8g / Carbs 32g / Fats 16g
            `,
            image: "https://img.freepik.com/free-photo/healthy-mix-nuts-dried-fruits_114579-28298.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "18.00 MAD",
            title: "Rice Cakes with Tuna",
            description: `
              2 rice cakes, tuna salad, cucumber
              <br/>
              <span class="underline">220 kcal</span>
              / Prot 18g / Carbs 24g / Fats 8g
            `,
            image: "https://img.freepik.com/free-photo/rice-cakes-with-tuna-cucumber_1339-7821.jpg",
            isActive: false,
          },
        ]
      },
      Dinner: {
        mainTitle: "Dinner Options",
        mainSubtitle: "( Choose 1 Variation / Day )",
        collection: [
          {
            id: 1,
            price: "50.00 MAD",
            title: "Turkey Meatballs with Zucchini Noodles",
            description: `
              Lean turkey meatballs, zucchini noodles, marinara
              <br/>
              <span class="underline">420 kcal</span>
              / Prot 35g / Carbs 25g / Fats 22g
            `,
            image: "https://img.freepik.com/free-photo/meatballs-with-zucchini-noodles_1339-4731.jpg",
            isActive: true,
          },
          {
            id: 2,
            price: "45.00 MAD",
            title: "Tofu Stir-Fry",
            description: `
              Crispy tofu, mixed vegetables, brown rice
              <br/>
              <span class="underline">380 kcal</span>
              / Prot 22g / Carbs 45g / Fats 18g
            `,
            image: "https://img.freepik.com/free-photo/stir-fried-tofu-with-vegetables_1339-4732.jpg",
            isActive: false,
          },
          {
            id: 3,
            price: "60.00 MAD",
            title: "Grilled Sea Bass",
            description: `
              Sea bass fillet, roasted vegetables, quinoa
              <br/>
              <span class="underline">450 kcal</span>
              / Prot 38g / Carbs 35g / Fats 24g
            `,
            image: "https://img.freepik.com/free-photo/grilled-sea-bass-with-vegetables_1339-4733.jpg",
            isActive: false,
          },
        ]
      }
    },  
    burnedCalories: {
      'Day 1': 0,
    },
    payment:{
      planType: "ESSENTIAL", //ESSENTIAL PREMIUM GROWTH
    }
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

export async function isAdmin(user?: any) {
  return user && user.roles.includes("ADMIN");
}

export async function getAllParticularUsers() {
  return users.filter((user) => user.type === "PARTICULIER");
}

export class User {
  async getUsers() {
    return users;
  }

  async getUserByEmail(email: string) {
    return users.find((user) => user.email === email);
  }

  async getUserById(id: string) {
    return users.find((user) => user.id === id);
  }

  async isAdmin(user?: any) {
    return user && user.roles.includes("ADMIN");
  }

  async getAllParticularUsers() {
    return users.filter((user) => user.type === "PARTICULIER");
  }
}
