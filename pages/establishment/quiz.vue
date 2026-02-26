<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] py-32 px-4" style="font-family: Montserrat">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-normal text-center mb-16 uppercase tracking-[6px] text-gray-800">
        Quick Quiz
      </h1>

      <div class="bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
        <form class="space-y-8" @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- First Name -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">First Name</label>
              <input
                v-model="formData.firstName"
                type="text"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="First Name"
              />
              <p v-if="errors.firstName" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.firstName }}</p>
            </div>

            <!-- Last Name -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Last Name</label>
              <input
                v-model="formData.lastName"
                type="text"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="Last Name"
              />
              <p v-if="errors.lastName" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.lastName }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Age -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Age</label>
              <input
                v-model="formData.age"
                type="number"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="Age"
              />
              <p v-if="errors.age" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.age }}</p>
            </div>

            <!-- Height -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Height (cm)</label>
              <input
                v-model="formData.height"
                type="number"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="cm"
              />
              <p v-if="errors.height" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.height }}</p>
            </div>

            <!-- Weight -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Weight (kg)</label>
              <input
                v-model="formData.weight"
                type="number"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="kg"
              />
              <p v-if="errors.weight" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.weight }}</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Phone -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Phone</label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="+212..."
              />
              <p v-if="errors.phone" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.phone }}</p>
            </div>

            <!-- Email -->
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Email</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="customer@email.com"
              />
              <p v-if="errors.email" class="text-[#D05E33] mt-1 text-[10px] uppercase tracking-wider">{{ errors.email }}</p>
            </div>
          </div>

          <!-- Gender -->
          <div class="pt-4">
            <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-4">Gender</label>
            <div class="flex gap-12">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  class="sr-only peer"
                  :checked="formData.gender === 'male'"
                  @click="formData.gender = 'male'"
                />
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:bg-[#D05E33] peer-checked:border-[#D05E33] transition-all flex items-center justify-center">
                  <div v-if="formData.gender === 'male'" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span class="text-xs font-medium tracking-[1px] uppercase text-gray-500 group-hover:text-black transition-colors">Male</span>
              </label>
              
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="gender"
                  class="sr-only peer"
                  :checked="formData.gender === 'female'"
                  @click="formData.gender = 'female'"
                />
                <div class="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:bg-[#D05E33] peer-checked:border-[#D05E33] transition-all flex items-center justify-center">
                  <div v-if="formData.gender === 'female'" class="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <span class="text-xs font-medium tracking-[1px] uppercase text-gray-500 group-hover:text-black transition-colors">Female</span>
              </label>
            </div>
            <p v-if="errors.gender" class="text-[#D05E33] mt-2 text-[10px] uppercase tracking-wider">{{ errors.gender }}</p>
          </div>

          <!-- Submit Button -->
          <div class="pt-10 flex justify-center">
            <button
              type="submit"
              class="w-full max-w-[250px] uppercase border border-black text-black bg-transparent py-4 px-6 font-bold tracking-[4px] rounded-md hover:bg-black hover:text-white transition-all duration-300"
            >
              Start Program
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const baseURL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? ""
    : "";

const formData = ref({
  firstName: "",
  lastName: "",
  age: "",
  height: "",
  weight: "",
  phone: "",
  email: "",
  gender: null as string | null,
});

const errors = ref({
  firstName: "",
  lastName: "",
  age: "",
  height: "",
  weight: "",
  phone: "",
  email: "",
  gender: "",
});

const validateForm = () => {
  let isValid = true;
  errors.value = {
    firstName: "",
    lastName: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    email: "",
    gender: "",
  };

  if (!formData.value.firstName.trim()) {
    errors.value.firstName = "Required";
    isValid = false;
  }

  if (!formData.value.lastName.trim()) {
    errors.value.lastName = "Required";
    isValid = false;
  }

  if (!formData.value.age) {
    errors.value.age = "Required";
    isValid = false;
  }

  if (!formData.value.height) {
    errors.value.height = "Required";
    isValid = false;
  }

  if (!formData.value.weight) {
    errors.value.weight = "Required";
    isValid = false;
  }

  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  if (!phoneRegex.test(formData.value.phone)) {
    errors.value.phone = "Invalid phone";
    isValid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    errors.value.email = "Invalid email";
    isValid = false;
  }

  if (!formData.value.gender) {
    errors.value.gender = "Please select gender";
    isValid = false;
  }

  return isValid;
};

const getAgeRange = (age: number) => {
  if (age < 40) return "20-40";
  else if (age < 60) return "40-60";
  else return "Over 60";
};

const getWeightRange = (weight: number) => {
  if (weight < 70) return "50-70";
  else if (weight < 90) return "70-90";
  else return "90-120";
};

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) throw new Error("Not logged in");
      
      const userData = JSON.parse(userStr);
      const token = userData.token;

      const customerId = `et_id!-${formData.value.firstName.toLowerCase()}${formData.value.lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`;

      const customerData = {
        et_customer_id: customerId,
        firstName: formData.value.firstName.trim(),
        lastName: formData.value.lastName.trim(),
        email: formData.value.email.trim(),
        ageRange: getAgeRange(parseInt(formData.value.age)),
        weightRange: getWeightRange(parseFloat(formData.value.weight)),
        video: 0,
        burnedCalories: { "Day 1": 0 },
      };

      const response = await fetch(`${baseURL}/api/users/customers/add/${customerId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add customer");
      }

      router.push("/establishment/manage-customers");
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
