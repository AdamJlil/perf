<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { plans } from "~/types/plans";

const { signup } = useAuth();
const toast = useToast();
const route = useRoute();
const router = useRouter();

const establishmentPlans = {
  EXPLORER: {
    title: plans.ESTABLISHEMENT.plans.plan_1.title,
    price: plans.ESTABLISHEMENT.plans.plan_1.price.split(" ")[0],
    duration: plans.ESTABLISHEMENT.plans.plan_1.duration,
  },
  EXPERIENCE: {
    title: plans.ESTABLISHEMENT.plans.plan_2.title,
    price: plans.ESTABLISHEMENT.plans.plan_2.price.split(" ")[0],
    duration: plans.ESTABLISHEMENT.plans.plan_2.duration,
  },
  SIGNATURE: {
    title: plans.ESTABLISHEMENT.plans.plan_3.title,
    price: plans.ESTABLISHEMENT.plans.plan_3.price.split(" ")[0],
    duration: plans.ESTABLISHEMENT.plans.plan_3.duration,
  },
};

const form = reactive({
  data: {
    first_name: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "ESTABLISHEMENT",
    plan: "EXPLORER",
    acceptTerms: false,
    acceptPrivacy: false,
  },
  error: "",
  pending: false,
});

const selectedPlan = computed(() => {
  if (form.data.plan) {
    return establishmentPlans[form.data.plan as keyof typeof establishmentPlans];
  }
  return null;
});

onMounted(() => {
  if (route.query.plan) {
    form.data.plan = route.query.plan as string;
  }
});

const isPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);

const togglePassword = (field: "password" | "confirmPassword") => {
  if (field === "password") {
    isPasswordVisible.value = !isPasswordVisible.value;
  } else {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value;
  }
};

const onSignupClick = async () => {
  try {
    form.error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.data.first_name.trim() || !form.data.name.trim()) {
      const msg = "Please enter your full name";
      toast.error(msg);
      return;
    }

    if (!emailRegex.test(form.data.email)) {
      const msg = "Please enter a valid email address";
      toast.error(msg);
      return;
    }

    if (form.data.password.length < 8) {
      const msg = "Password must be at least 8 characters long";
      toast.error(msg);
      return;
    }

    if (form.data.password !== form.data.confirmPassword) {
      const msg = "Passwords do not match";
      form.error = msg;
      toast.error(msg);
      return;
    }

    if (!form.data.acceptTerms || !form.data.acceptPrivacy) {
      const msg = "Please accept the terms and privacy policy";
      form.error = msg;
      toast.error(msg);
      return;
    }

    form.pending = true;

    // Call real backend API via useAuth
    await signup({
      email: form.data.email,
      password: form.data.password,
      type: form.data.userType,
      first_name: form.data.first_name,
      name: form.data.name,
      plan: form.data.plan,
    });

    toast.success("Account created successfully!");

    // After successful signup, redirect to login or payment
    await router.push({
      path: "/payment",
      query: {
        first_name: form.data.first_name,
        name: form.data.name,
        email: form.data.email,
        userType: form.data.userType,
        plan: form.data.plan,
        price: selectedPlan.value?.price || "6500",
      },
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    const message = error?.data?.statusMessage || error?.statusMessage || "An error occurred during registration";
    form.error = message;
    toast.error(message);
  } finally {
    form.pending = false;
  }
};
</script>

<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] py-32 px-4" style="font-family: Montserrat">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-normal text-center mb-12 uppercase tracking-[6px] text-gray-800">Registration</h1>

      <div class="bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
        <!-- Selected Plan Header -->
        <div v-if="selectedPlan" class="mb-10 pb-6 border-b border-gray-300">
          <div class="flex justify-between items-end">
            <div>
              <p class="text-[10px] font-medium tracking-[2px] uppercase text-gray-500 mb-1">Selected Plan</p>
              <h2 class="text-xl font-bold tracking-[1px] text-gray-800">{{ selectedPlan.title }}</h2>
            </div>
            <div class="text-right">
              <p class="text-2xl font-normal text-[#D05E33]">
                {{ selectedPlan.price }} <span class="text-sm">dh</span>
              </p>
            </div>
          </div>
        </div>

        <form class="space-y-8" @submit.prevent="onSignupClick">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">First Name</label>
              <input
                v-model="form.data.first_name"
                type="text"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="John"
                required
              />
            </div>
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Last Name</label>
              <input
                v-model="form.data.name"
                type="text"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div class="relative group">
            <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Email</label>
            <input
              v-model="form.data.email"
              type="email"
              class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
              placeholder="john@example.com"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Password</label>
              <div class="relative">
                <input
                  v-model="form.data.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  class="absolute right-0 bottom-2 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none pr-2"
                  @click="togglePassword('password')"
                >
                  <svg
                    v-if="isPasswordVisible"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye-off"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1"
                >Confirm Password</label
              >
              <div class="relative">
                <input
                  v-model="form.data.confirmPassword"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  class="absolute right-0 bottom-2 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none pr-2"
                  @click="togglePassword('confirmPassword')"
                >
                  <svg
                    v-if="isConfirmPasswordVisible"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye-off"
                  >
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-eye"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="relative group">
            <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1"
              >Subscription Plan</label
            >
            <div class="relative">
              <select
                v-model="form.data.plan"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black appearance-none"
                required
              >
                <option value="EXPLORER">EXPLORER</option>
                <option value="EXPERIENCE">EXPERIENCE</option>
                <option value="SIGNATURE">SIGNATURE</option>
              </select>
              <span class="absolute right-0 bottom-2 pointer-events-none text-gray-400">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>

          <div class="space-y-4 pt-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="form.data.acceptTerms" type="checkbox" class="sr-only peer" />
              <div
                class="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#D05E33] peer-checked:border-[#D05E33] transition-all flex items-center justify-center"
              >
                <svg
                  v-if="form.data.acceptTerms"
                  class="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="4"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span
                class="text-xs font-medium tracking-[1px] uppercase text-gray-500 group-hover:text-black transition-colors"
              >
                Accept <a href="/privacypolicy" class="text-[#D05E33] underline">Terms & Conditions</a>
              </span>
            </label>

            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="form.data.acceptPrivacy" type="checkbox" class="sr-only peer" />
              <div
                class="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#D05E33] peer-checked:border-[#D05E33] transition-all flex items-center justify-center"
              >
                <svg
                  v-if="form.data.acceptPrivacy"
                  class="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="4"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span
                class="text-xs font-medium tracking-[1px] uppercase text-gray-500 group-hover:text-black transition-colors"
              >
                Accept <a href="/terms" class="text-[#D05E33] underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          <div class="pt-8">
            <button
              type="submit"
              :disabled="form.pending"
              class="w-full uppercase border-2 border-[#D05E33] text-[#D05E33] bg-transparent py-5 px-6 font-bold tracking-[4px] rounded-xl hover:bg-[#D05E33] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shadow-md"
            >
              <span v-if="!form.pending">Create Account</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg
                  class="animate-spin h-5 w-5 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
