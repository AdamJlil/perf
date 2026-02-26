<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-32 pb-20 px-4" style="font-family: Montserrat">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-2xl md:text-3xl font-normal text-center mb-16 uppercase tracking-[6px] text-gray-800">
        Review Your Order
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <!-- Order & Company Info -->
        <div class="lg:col-span-2 space-y-8">
          <div class="bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
            <h2 class="text-xl font-normal mb-10 uppercase tracking-[4px] text-gray-700">
              Company Information
            </h2>

            <div class="space-y-8">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-200 pb-4 group">
                <span class="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 w-32">Name</span>
                <span class="text-lg font-bold text-gray-800 tracking-tight">PERF Fitness</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-200 pb-4 group">
                <span class="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 w-32">Address</span>
                <span class="text-base text-gray-600">123 Fitness Avenue, Casablanca</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-200 pb-4 group">
                <span class="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 w-32">City</span>
                <span class="text-base text-gray-600">Casablanca</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-200 pb-4 group">
                <span class="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 w-32">Phone</span>
                <span class="text-base text-gray-600">+212 522 123 456</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-200 pb-4 group">
                <span class="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 w-32">Email</span>
                <span class="text-base text-[#D05E33] font-medium">contact@perffitness.ma</span>
              </div>
            </div>

            <!-- Payment Method Section -->
            <div class="pt-12 space-y-6">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500">Payment Method</label>
              
              <div class="flex flex-wrap gap-4">
                <button
                  type="button"
                  class="flex-1 min-w-[150px] py-4 px-6 rounded-xl border-2 transition-all duration-300 text-sm font-bold tracking-[1px] uppercase"
                  :class="form.paymentMethod === 'bank' 
                    ? 'border-[#D05E33] bg-[#D05E33]/5 text-[#D05E33]' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'"
                  @click="form.paymentMethod = 'bank'"
                >
                  Bank Deposit
                </button>
                <button
                  type="button"
                  class="flex-1 min-w-[150px] py-4 px-6 rounded-xl border-2 transition-all duration-300 text-sm font-bold tracking-[1px] uppercase"
                  :class="form.paymentMethod === 'cash' 
                    ? 'border-[#D05E33] bg-[#D05E33]/5 text-[#D05E33]' 
                    : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'"
                  @click="form.paymentMethod = 'cash'"
                >
                  Cash on Delivery
                </button>
              </div>

              <!-- Payment Details -->
              <div class="mt-6">
                <Transition name="fade" mode="out-in">
                  <div v-if="form.paymentMethod === 'bank'" class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                    <div class="space-y-2">
                      <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">Account:</span> M AMJAD ARKHIS</p>
                      <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">Details:</span> 011 590 0000112000002178 72</p>
                      <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">IBAN:</span> MA64 0115 9000 0011 2000 0021 7872</p>
                      <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">BIC:</span> BMCEMAMC</p>
                    </div>
                    <p class="text-[10px] italic text-gray-400 mt-4 border-t border-gray-100 pt-4">
                      Include your order number in the transfer description for faster processing.
                    </p>
                  </div>

                  <div v-else-if="form.paymentMethod === 'cash'" class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                    <p class="text-sm text-gray-600 leading-relaxed italic">
                      "Payment will be collected upon delivery of your items at your provided address."
                    </p>
                  </div>
                </Transition>
              </div>
            </div>

            <!-- Complete Order Button -->
            <div class="pt-10">
              <button
                class="w-full uppercase border border-black text-black bg-transparent py-4 px-6 font-bold tracking-[4px] rounded-md hover:bg-black hover:text-white transition-all duration-300"
                @click="handlePayment"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>

        <!-- Plan Summary Sidebar -->
        <div class="space-y-8">
          <div v-if="selectedPlan" class="bg-white/60 backdrop-blur-md p-8 rounded-[30px] shadow-sm border border-white/30 sticky top-32">
            <h2 class="text-lg font-bold mb-6 uppercase tracking-[2px] text-gray-800 border-b border-gray-200 pb-4">
              Order Summary
            </h2>
            
            <div class="space-y-6">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-gray-800 uppercase tracking-wider text-sm">{{ selectedPlan.title }}</h3>
                  <p class="text-[10px] text-gray-500 mt-1 uppercase">{{ selectedPlan.duration }}</p>
                </div>
                <p class="font-bold text-[#D05E33]">{{ selectedPlan.price }}</p>
              </div>

              <div class="space-y-3 pt-4">
                <div v-for="(feature, i) in selectedPlan.features" :key="i" class="flex items-center gap-3">
                  <svg v-if="!feature.isDisabled" class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <svg v-else class="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span class="text-[10px] text-gray-600 uppercase" :class="{ 'opacity-40 line-through': feature.isDisabled }">
                    {{ feature.text }}
                  </span>
                </div>
              </div>

              <div class="pt-6 border-t border-gray-200">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-500 uppercase tracking-widest text-xs">Subtotal</span>
                  <span class="text-xl font-bold text-gray-800">{{ selectedPlan.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { plans } from "~/types/plans";

interface Plan {
  title: string;
  duration: string;
  features: Array<{ text: string; isDisabled?: boolean }>;
  price: string;
  discount: string;
}

const route = useRoute();

const form = reactive({
  paymentMethod: "bank",
});

const selectedPlan = ref<Plan | null>(null);

onMounted(() => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get("first_name") || "";
    const name = urlParams.get("name") || "";
    const email = urlParams.get("email") || "";
    const userType = urlParams.get("userType") || "";
    const planName = urlParams.get("plan") || "";
    const price = urlParams.get("price") || "";

    if (!firstName || !name || !email || !userType || !planName || !price) {
      fetchUserData();
    } else {
      createPlanObject(planName, userType, price);
    }
  } catch (error: any) {
    console.error("Error in onMounted:", error);
  }
});

const fetchUserData = async () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    if (!email) return;

    const baseURL = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "" : "";
    const response = await fetch(`${baseURL}/api/users/by-email?email=${encodeURIComponent(email)}`);
    if (!response.ok) return;

    const userData = await response.json();
    if (userData && userData.user && userData.user.plan) {
      let price = "";
      const planTitle = typeof userData.user.plan === "string" ? JSON.parse(userData.user.plan).title || "" : userData.user.plan.title || "";
      
      if (userData.user.type === "ESTABLISHEMENT") {
        if (planTitle === "EXPLORER") price = "6500";
        else if (planTitle === "EXPERIENCE") price = "7500";
        else if (planTitle === "SIGNATURE") price = "8000";
      }
      createPlanObject(planTitle, userData.user.type, price);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const createPlanObject = (planName: string, userType: string, price: string) => {
  selectedPlan.value = {
    title: planName,
    price: price ? `${price} dh` : "",
    duration: planName === "EXPLORER" ? "Less than 10 rooms" : planName === "EXPERIENCE" ? "Between 10-20 rooms" : "More than 20 rooms",
    features: [
      { text: "Member accounts", isDisabled: false },
      { text: "Analytics dashboard", isDisabled: false },
      { text: "Email support", isDisabled: false },
      { text: "Custom branding", isDisabled: planName === "EXPLORER" },
      { text: "Priority support", isDisabled: planName !== "SIGNATURE" },
    ],
    discount: planName === "EXPLORER" ? "6500 dh" : planName === "EXPERIENCE" ? "Save 7500 dh" : "Save 8000 dh",
  };
};

const handlePayment = async () => {
  alert("Redirecting to payment confirmation...");
  window.location.href = "/";
};
</script>

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
