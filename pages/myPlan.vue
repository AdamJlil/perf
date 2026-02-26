<script lang="ts" setup>
import PricingBloc from "~/components/features/Sections/Join/PricingBloc.vue";
import { ref, computed } from "vue";
import { plans } from "~/types/plans";

definePageMeta({
  middleware: ["auth"],
});

const { user: currentUser } = useAuth();

const user = computed(() => currentUser.value);

const plansSection = ref<HTMLElement | null>(null);
const showUpgradeModal = ref(false);
const selectedUpgradePlan = ref("");
const isUpgrading = ref(false);
const showCancelPlanModal = ref(false);
const isCancelling = ref(false);
const showSuccessNotification = ref(false);
const notificationMessage = ref("");

const currentPlan = computed(() => {
  if (!user.value?.plan) return null;
  
  let planObj: any = {};
  if (typeof user.value.plan === 'object') {
    planObj = user.value.plan;
  } else {
    try {
      planObj = JSON.parse(user.value.plan);
    } catch (e) {
      planObj = { title: user.value.plan };
    }
  }

  // If price is missing, try to find it in our plans constant
  if (!planObj.price && planObj.title) {
    const p1 = plans.ESTABLISHEMENT.plans.plan_1;
    const p2 = plans.ESTABLISHEMENT.plans.plan_2;
    const p3 = plans.ESTABLISHEMENT.plans.plan_3;
    
    if (planObj.title === p1.title || planObj.title === 'EXPLORER') planObj.price = p1.price.split(' ')[0];
    else if (planObj.title === p2.title || planObj.title === 'EXPERIENCE') planObj.price = p2.price.split(' ')[0];
    else if (planObj.title === p3.title || planObj.title === 'SIGNATURE') planObj.price = p3.price.split(' ')[0];
  }

  return planObj;
});

const isPaid = computed(() => !!user.value?.paid);
const requestedPlan = computed(() => user.value?.requested_plan);

const scrollToPlans = () => {
  plansSection.value?.scrollIntoView({ behavior: "smooth" });
};

const handlePlanUpgrade = (planType: string) => {
  selectedUpgradePlan.value = planType;
  showUpgradeModal.value = true;
};

const confirmUpgrade = async () => {
  isUpgrading.value = true;
  const { me } = useAuth();
  const toast = useToast();

  try {
    const response = await $fetch<any>("/api/users/request-upgrade", {
      method: "POST",
      body: { planTitle: selectedUpgradePlan.value },
    });

    if (response.success) {
      // Small delay to ensure DB consistency before re-fetching
      setTimeout(async () => {
        await me(); 
        toast.success(`Upgrade request to ${selectedUpgradePlan.value} sent!`);
        showUpgradeModal.value = false;
      }, 500);
    }
  } catch (error: any) {
    toast.error(error.statusMessage || "Failed to send upgrade request");
  } finally {
    isUpgrading.value = false;
  }
};

const confirmCancelPlan = () => {
  isCancelling.value = true;
  setTimeout(() => {
    notificationMessage.value = "Cancellation request has been sent.";
    showSuccessNotification.value = true;
    showCancelPlanModal.value = false;
    isCancelling.value = false;
    setTimeout(() => { showSuccessNotification.value = false; }, 5000);
  }, 1000);
};
</script>

<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-12 pb-20 px-4" style="font-family: Montserrat">
    <!-- Loading Overlay -->
    <div v-if="isUpgrading || isCancelling" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="loader"></div>
    </div>

    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-3xl md:text-4xl font-light uppercase tracking-[8px] text-gray-800 mb-4">
          {{ isPaid ? 'Your Establishment Plan' : 'Payment Required' }}
        </h1>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[4px]">
          {{ isPaid ? 'Manage your subscription and billing details' : 'Please complete your payment to activate all features' }}
        </p>
      </div>

      <!-- Current Plan Card -->
      <div v-if="currentPlan" class="bg-white/60 backdrop-blur-md p-10 lg:p-12 rounded-[40px] shadow-sm border border-white/40 mb-16 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#D05E33]/5 rounded-full -translate-y-48 translate-x-48 blur-3xl"></div>
        
        <div class="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
          <div class="space-y-4">
            <span v-if="isPaid" class="px-4 py-1.5 bg-[#D05E33] text-white text-[10px] font-bold uppercase tracking-[2px] rounded-full shadow-sm">Active Subscription</span>
            <span v-else class="px-4 py-1.5 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-[2px] rounded-full shadow-sm animate-pulse">Pending Activation (Check Email)</span>
            
            <h2 class="text-5xl font-bold text-gray-900 tracking-tight pt-2 uppercase">{{ currentPlan.title }}</h2>
            <p class="text-2xl text-gray-400 font-light tracking-[1px]">{{ currentPlan.price }} <span class="text-sm">MAD / Month</span></p>
          </div>

          <div v-if="isPaid" class="flex flex-wrap gap-4">
            <button
              class="uppercase border-2 border-black text-black bg-transparent py-3 px-10 rounded-xl font-bold tracking-[2px] hover:bg-black hover:text-white transition-all duration-500 text-[10px] active:scale-95"
              @click="scrollToPlans"
            >
              Change Plan
            </button>
            <button
              class="uppercase border-2 border-red-100 text-red-400 bg-transparent py-3 px-10 rounded-xl font-bold tracking-[2px] hover:bg-red-50 hover:border-red-200 transition-all duration-500 text-[10px] active:scale-95"
              @click="showCancelPlanModal = true"
            >
              Cancel
            </button>
          </div>
          <div v-else class="max-w-xs text-right">
            <p class="text-xs font-bold text-[#D05E33] uppercase tracking-[2px] leading-relaxed">
              Waiting for proceeding payment. Please check your email for the bank details or cash delivery instructions.
            </p>
          </div>
        </div>

        <div v-if="isPaid" class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 pt-12 border-t border-gray-100">
          <div class="space-y-2">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[3px]">Managed Rooms</p>
            <p class="text-2xl font-bold text-gray-800">{{ currentPlan.active_customers || 0 }} Active</p>
          </div>
          <div class="space-y-2 border-l border-gray-100 md:pl-10">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[3px]">Billing Cycle</p>
            <p class="text-2xl font-bold text-gray-800">{{ currentPlan.start_date || '-' }}</p>
          </div>
          <div class="space-y-2 border-l border-gray-100 md:pl-10">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[3px]">Next Renewal</p>
            <p class="text-2xl font-bold text-gray-800">{{ currentPlan.end_date || '-' }}</p>
          </div>
        </div>
      </div>

      <div ref="plansSection" class="pt-8">
        <PricingBloc
          title="UPGRADE YOUR EXPERIENCE"
          :plan_1="plans.ESTABLISHEMENT.plans.plan_1"
          :plan_2="plans.ESTABLISHEMENT.plans.plan_2"
          :plan_3="plans.ESTABLISHEMENT.plans.plan_3"
          :current-plan="currentPlan?.title"
          :is-paid="isPaid"
          :requested-plan="requestedPlan"
          @plan-selected="handlePlanUpgrade"
        />
      </div>
    </div>

    <!-- Modals & Notifications remain styled consistently -->
    <Transition name="fade">
      <div v-if="showUpgradeModal" class="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div class="bg-white p-10 rounded-[40px] max-w-md w-full shadow-2xl text-center">
          <h2 class="text-xl font-bold uppercase tracking-[2px] text-gray-800 mb-4">Confirm Upgrade</h2>
          <p class="text-sm text-gray-500 mb-10">You are about to request an upgrade to the <span class="font-bold text-[#D05E33]">{{ selectedUpgradePlan }}</span> plan.</p>
          <div class="flex gap-4">
            <button class="flex-1 border border-gray-300 py-3 rounded-md uppercase text-[10px] font-bold tracking-[2px]" @click="showUpgradeModal = false">Cancel</button>
            <button class="flex-1 bg-[#D05E33] text-white py-3 rounded-md uppercase text-[10px] font-bold tracking-[2px]" @click="confirmUpgrade">Request</button>
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="slide-down">
      <div v-if="showSuccessNotification" class="fixed top-10 left-1/2 -translate-x-1/2 z-[1200] bg-black text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-white/10">
        <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
          <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        <span class="text-xs font-bold uppercase tracking-[2px]">{{ notificationMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.loader { border: 4px solid rgba(0,0,0,0.1); border-top: 4px solid #D05E33; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-down-enter-active, .slide-down-leave-active { transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.slide-down-enter-from { opacity: 0; transform: translate(-50%, -100px); }
.slide-down-leave-to { opacity: 0; transform: translate(-50%, -100px); }
</style>
