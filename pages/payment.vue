<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-12 pb-20 px-4" style="font-family: Montserrat">
    <div class="max-w-6xl mx-auto flex flex-col items-center">
      <h1 class="text-2xl md:text-3xl font-normal text-center mb-16 uppercase tracking-[6px] text-gray-800">
        Checkout
      </h1>

      <div class="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Payment & Delivery Info - Centered focus -->
        <div class="lg:col-start-2 lg:col-span-7 space-y-8">
          <div class="bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
            <h2 class="text-xl font-normal mb-10 uppercase tracking-[4px] text-gray-700">
              Delivery Information
            </h2>

            <!-- Alerts -->
            <Transition name="fade">
              <div v-if="sendingInformation" class="mb-8 p-4 bg-blue-50 text-blue-700 text-xs font-medium tracking-[1px] rounded-md border border-blue-100 flex items-center gap-3 italic">
                <svg class="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Processing your order information...
              </div>
            </Transition>

            <Transition name="fade">
              <div v-if="showConfirmationMessage" class="mb-8 p-4 bg-green-50 text-green-700 text-xs font-medium tracking-[1px] rounded-md border border-green-100 italic">
                Information received! A confirmation email has been sent to your address.
              </div>
            </Transition>

            <Transition name="fade">
              <div v-if="form.error" class="mb-8 p-4 bg-red-50 text-red-600 text-xs font-medium tracking-[1px] rounded-md border border-red-100 italic">
                ** {{ form.error }}
              </div>
            </Transition>

            <form class="space-y-8" @submit.prevent="handlePayment">
              <div class="relative group">
                <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Shipping Address</label>
                <input v-model="form.address" type="text" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300" :class="{ 'border-red-500': form.errors.address }" placeholder="Street Name, Number, Area" required />
                <span v-if="form.errors.address" class="text-[10px] text-red-500 mt-1">{{ form.errors.address }}</span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="relative group">
                  <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">City</label>
                  <input v-model="form.city" type="text" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300" :class="{ 'border-red-500': form.errors.city }" placeholder="e.g. Casablanca" required />
                  <span v-if="form.errors.city" class="text-[10px] text-red-500 mt-1">{{ form.errors.city }}</span>
                </div>

                <div class="relative group">
                  <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Phone Number</label>
                  <input v-model="form.phone" type="tel" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300" :class="{ 'border-red-500': form.errors.phone }" placeholder="+212 6..." required />
                  <span v-if="form.errors.phone" class="text-[10px] text-red-500 mt-1">{{ form.errors.phone }}</span>
                </div>
              </div>

              <!-- Payment Method Section -->
              <div class="pt-8 space-y-6">
                <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500">Payment Method</label>
                <div class="flex flex-wrap gap-4">
                  <button type="button" class="flex-1 min-w-[150px] py-4 px-6 rounded-xl border-2 transition-all duration-300 text-sm font-bold tracking-[1px] uppercase" :class="form.paymentMethod === 'bank' ? 'border-[#D05E33] bg-[#D05E33]/5 text-[#D05E33]' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'" @click="form.paymentMethod = 'bank'">Bank Deposit</button>
                  <button type="button" class="flex-1 min-w-[150px] py-4 px-6 rounded-xl border-2 transition-all duration-300 text-sm font-bold tracking-[1px] uppercase" :class="form.paymentMethod === 'cash' ? 'border-[#D05E33] bg-[#D05E33]/5 text-[#D05E33]' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'" @click="form.paymentMethod = 'cash'">Cash on Delivery</button>
                </div>
                
                <div class="mt-6">
                  <Transition name="fade" mode="out-in">
                    <div v-if="form.paymentMethod === 'bank'" class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 space-y-4">
                      <div class="space-y-2">
                        <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">Account:</span> PERF FITNESS & WELLNESS</p>
                        <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">Details:</span> 011 590 0000112000002178 72</p>
                        <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">IBAN:</span> MA64 0115 9000 0011 2000 0021 7872</p>
                        <p class="text-sm text-gray-600"><span class="font-bold text-gray-800 uppercase tracking-wide">BIC:</span> BMCEMAMC</p>
                      </div>
                    </div>
                    <div v-else-if="form.paymentMethod === 'cash'" class="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                      <p class="text-sm text-gray-600 leading-relaxed italic">"Payment will be collected upon delivery of your PERF equipment box at the specified address."</p>
                    </div>
                  </Transition>
                </div>
              </div>

              <div class="pt-10">
                <button type="submit" class="w-full uppercase border border-black text-black bg-transparent py-4 px-6 font-bold tracking-[4px] rounded-md hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50" :disabled="form.submitting">
                  <span v-if="!form.submitting">Complete Order</span>
                  <span v-else>Processing...</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Sidebar Summary -->
        <div class="lg:col-span-3 space-y-8">
          <div v-if="selectedPlan" class="bg-white/60 backdrop-blur-md p-8 rounded-[30px] shadow-sm border border-white/30">
            <h2 class="text-lg font-bold mb-6 uppercase tracking-[2px] text-gray-800 border-b border-gray-200 pb-4">Summary</h2>
            <div class="space-y-6">
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="font-bold text-gray-800">{{ selectedPlan.title }}</h3>
                  <p class="text-xs text-gray-500 mt-1">{{ selectedPlan.duration }}</p>
                </div>
                <p class="font-bold text-[#D05E33]">{{ selectedPlan.price }}</p>
              </div>
              <div class="pt-6 border-t border-gray-200 flex justify-between items-center">
                <span class="font-medium text-gray-500 uppercase tracking-widest text-xs">Total</span>
                <span class="text-2xl font-bold text-gray-800">{{ selectedPlan.price }}</span>
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
  address: "", city: "", phone: "", paymentMethod: "bank",
  submitting: false, error: "",
  errors: { address: "", city: "", phone: "", paymentMethod: "" }
});

const selectedPlan = ref<Plan | null>(null);
const showConfirmationMessage = ref(false);
const sendingInformation = ref(false);

const createPlanObject = (planName: string, userType: string, price: string) => {
  selectedPlan.value = {
    title: planName,
    price: price ? `${price} dh` : "",
    duration: planName === "EXPLORER" ? "Less than 10 rooms" : planName === "EXPERIENCE" ? "Between 10-20 rooms" : "More than 20 rooms",
    features: [],
    discount: ""
  };
};

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  createPlanObject(urlParams.get("plan") || "EXPERIENCE", "ESTABLISHEMENT", urlParams.get("price") || "7500");
});

const handlePayment = async () => {
  sendingInformation.value = true;
  setTimeout(() => {
    sendingInformation.value = false;
    showConfirmationMessage.value = true;
  }, 1500);
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s ease, transform 0.5s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
