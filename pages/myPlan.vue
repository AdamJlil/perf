<template>
  <div class="w-full" style="font-family: Montserrat">
    <div v-if="!user" class="p-4 bg-yellow-100 text-yellow-800">
      Please log in to view your plan.
    </div>

    <template v-else>
      <div
        class="w-full text-center text-xl font-medium relative text-gray-8 flex flex-col justify-center items-center mt-70 uppercase tracking-2"
      >
        <h1 class="">Your {{ user.type === 'ESTABLISHEMENT' ? 'establishment' : 'subscription' }} plan</h1>
        <p class="" v-if="user.type === 'ESTABLISHEMENT'">Managing {{ customers.length }} customers</p>
      </div>

      <div class="p-10 flex justify-between items-center h-[40vh] mt-20" v-if="currentPlan">
        <div class="flex flex-col">
          <span class="text-orange-7 tracking-0.3 text-sm"> Current plan </span>
          <h1 class="font-bold uppercase tracking-0.4 text-lg">{{ currentPlan.title }}</h1>
          <p class="mt-2 text-gray-7 tracking-0.4 text-sm">{{ currentPlan.price }} MAD</p>
        </div>

        <div class="flex flex-col items-center justify-end">
          <button
            @click="scrollToPlans"
            class="uppercase cursor-pointer tracking-2 border-1 font-semibold border-gray-6 px-5 py-2 text-gray-6 text-xs hover:bg-gray-100"
          >
            upgrade plan
          </button>
        </div>
      </div>

      <div
        class="border-y-1.6 w-[90%] border-gray-4 mx-auto min-h-fit md:h-[30vh] px-4 md:px-10 text-sm py-10 md:py-20 flex flex-col md:flex-row justify-between items-center gap-6"
        v-if="currentPlan"
      >
        <div class="w-full md:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
          <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">
              {{ user.type === 'ESTABLISHEMENT' ? 'Active Customers' : 'Users' }}
            </p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.active_customers || 0 }}</p>
          </div>
          
          <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">Starting date</p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.start_date || 'Not available' }}</p>
          </div>

          <div class="flex flex-col items-center border-b-1 md:border-b-0 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">End date</p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.end_date || 'Not available' }}</p>
          </div>
        </div>

        <div class="w-full md:w-[10%] flex flex-col items-center justify-center">
          <button
            @click="openCancelPlanModal"
            class="cursor-pointer text-3xl rounded px-4 py-2 text-red-600 hover:bg-gray-200 transition-colors duration-300 w-full md:w-auto flex justify-center"
            aria-label="Delete Plan"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-6 0a2 2 0 00-2 2v1h12V5a2 2 0 00-2-2H7z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="h-full">
        <div class="h-full" ref="plansSection">
          <PricingBloc 
            @planSelected="handlePlanUpgrade" 
            :title="'Upgrade Your Plan'"
            :plan_1="plans.ESTABLISHEMENT.plans.plan_1"
            :plan_2="plans.ESTABLISHEMENT.plans.plan_2"
            :plan_3="plans.ESTABLISHEMENT.plans.plan_3"
            :currentPlan="getCurrentPlanType()"
          />
        </div>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showUpgradeModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 class="text-xl font-bold mb-4">Confirm Plan Upgrade</h2>
          <p class="mb-6">Are you sure you want to upgrade to the {{ selectedUpgradePlan }} plan?</p>
          <div class="flex justify-end space-x-4">
            <button 
              @click="showUpgradeModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button 
              @click="confirmUpgrade"
              class="px-4 py-2 bg-[#D05E33] text-white rounded-md hover:bg-[#B54D22]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      
      <!-- Cancel Plan Confirmation Modal -->
      <div v-if="showCancelPlanModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 class="text-xl font-bold mb-4">Confirm Plan Cancellation</h2>
          <p class="mb-6">Are you sure you want to cancel your {{ currentPlan?.title }} plan?</p>
          <div class="flex justify-end space-x-4">
            <button 
              @click="showCancelPlanModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            >
              No, Keep Plan
            </button>
            <button 
              @click="confirmCancelPlan"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Yes, Cancel Plan
            </button>
          </div>
        </div>
      </div>
      
      <!-- Success Notification -->
      <transition
        enter-active-class="transform transition duration-500 ease-out"
        enter-from-class="opacity-0 -translate-y-12"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transform transition duration-300 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-12"
      >
        <div 
          v-if="showSuccessNotification" 
          class="fixed top-6 left-0 right-0 mx-auto w-full max-w-md bg-white shadow-lg rounded-md overflow-hidden z-50 flex items-center"
        >
          <div class="bg-[#e86c02] p-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="p-4 flex-1">
            <p class="font-medium text-gray-800">{{ notificationMessage }}</p>
            <p class="text-sm text-gray-600">An administrator will contact you shortly.</p>
          </div>
          <button 
            @click="showSuccessNotification = false" 
            class="p-4 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </transition>
    </template>
  </div>
</template>

<script lang="ts" setup>
import PricingBloc from "~/components/Sections/Join/PricingBloc.vue";
import { reactive, ref, computed, onMounted, watch } from "vue";
import { useAuthUser } from '~/composables/useAuthUser';
import { plans } from '~/types/plans';

const user = useAuthUser();
const plansSection = ref(null);
const showUpgradeModal = ref(false);
const selectedUpgradePlan = ref('');
const isUpgrading = ref(false);
const showCancelPlanModal = ref(false);
const isCancelling = ref(false);
const showSuccessNotification = ref(false);
const notificationMessage = ref('');

// Parse customers JSON if it exists
const customers = computed(() => {
  if (!user.value?.customers) return [];
  try {
    return typeof user.value.customers === 'string' ? JSON.parse(user.value.customers) : user.value.customers;
  } catch (e) {
    console.error('Error parsing customers:', e);
    return [];
  }
});

// Get current user's plan based on type
const currentPlan = computed(() => {
  if (!user.value) return null;
  
  try {
    // Get plan from user data
    const planData = typeof user.value.plan === 'string' ? JSON.parse(user.value.plan) : user.value.plan;
    
    if (planData) {
      return planData;
    }
  } catch (e) {
    console.error('Error parsing plan data:', e);
  }
  
  return null;
});

// Function to fetch and update user data
const updateUserData = async () => {
  try {
    const userData = localStorage.getItem('user');
    if (!userData) return;
    
    const { token } = JSON.parse(userData);
    
    // Fetch latest user data
    const response = await fetch('http://localhost:3001/api/users/customers', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const customers = await response.json();
    
    // Update the user state with new customers
    if (user.value) {
      user.value = {
        ...user.value,
        customers: JSON.stringify(customers)
      };
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

// Watch for customer changes
watch(() => user.value?.customers, (newCustomers, oldCustomers) => {
  if (newCustomers !== oldCustomers) {
    updateUserData();
  }
}, { deep: true });

// Initial data fetch
onMounted(() => {
  updateUserData();
});

const scrollToPlans = () => {
  plansSection.value?.scrollIntoView({ behavior: 'smooth' });
};

const handlePlanUpgrade = async (planType: string) => {
  selectedUpgradePlan.value = planType;
  showUpgradeModal.value = true;
};

const confirmUpgrade = async () => {
  if (isUpgrading.value) return;
  isUpgrading.value = true;
  
  try {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      throw new Error('User data not found');
    }
    
    const { token } = JSON.parse(userData);
    
    // Prepare email data with user and plan information
    const emailData = {
      userEmail: user.value.email,
      userName: `${user.value.first_name || ''} ${user.value.name || ''}`.trim(),
      userPlan: JSON.stringify(currentPlan.value),
      subject: `[UPGRADE REQUEST] ${user.value.email} wants to upgrade to ${selectedUpgradePlan.value}`,
      message: `
⚠️ THIS IS AN UPGRADE REQUEST, NOT A CANCELLATION ⚠️

User: ${user.value.email} wishes to UPGRADE their plan.
Current plan: ${currentPlan.value?.title || 'Unknown'}
Requested plan: ${selectedUpgradePlan.value}

Action Required: Please process this as a PLAN UPGRADE. The user wants to UPGRADE, not cancel.
      `,
      requestType: 'PLAN_UPGRADE'
    };
    
    // Send upgrade request to API - using the same endpoint as cancellation
    const response = await fetch('http://localhost:3001/api/contact/plan-cancellation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Failed to send upgrade request');
    }
    
    // Close the modal
    showUpgradeModal.value = false;
    
    // Show success notification
    notificationMessage.value = `Plan upgrade request to ${selectedUpgradePlan.value} has been received.`;
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 5000);
    
  } catch (error) {
    console.error('Error sending upgrade request:', error);
    
    // Show error notification
    notificationMessage.value = 'There was an error sending your request. Please try again.';
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 5000);
  } finally {
    isUpgrading.value = false;
  }
};

const getCurrentPlanType = () => {
  if (!user.value || !user.value.plan) return '';
  
  try {
    // Try to parse the plan data if it's a string
    const planData = typeof user.value.plan === 'string' ? 
      JSON.parse(user.value.plan) : user.value.plan;
    
    // Check for plan title that matches one of our plan types
    if (planData && planData.title) {
      // The title might be already uppercase or might need conversion
      const planTitle = planData.title.toUpperCase();
      
      // Return the plan type if it matches one of our known types
      if (['BRONZE', 'PLATINUM', 'GOLD'].includes(planTitle)) {
        return planTitle;
      }
    }
  } catch (e) {
    console.error('Error parsing plan type:', e);
  }
  
  return '';
};

// Function to open cancel plan confirmation modal
const openCancelPlanModal = () => {
  showCancelPlanModal.value = true;
};

// Function to confirm plan cancellation and send notification
const confirmCancelPlan = async () => {
  if (isCancelling.value) return;
  isCancelling.value = true;
  
  try {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      throw new Error('User data not found');
    }
    
    const { token } = JSON.parse(userData);
    
    // Prepare email data with user and plan information
    const emailData = {
      userEmail: user.value.email,
      userName: `${user.value.first_name || ''} ${user.value.name || ''}`.trim(),
      userPlan: JSON.stringify(currentPlan.value),
      subject: `Plan Cancellation Request: ${user.value.email}`,
      message: 'The user has requested to cancel their subscription plan.'
    };
    
    // Send cancellation request to API
    const response = await fetch('http://localhost:3001/api/contact/plan-cancellation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      throw new Error('Failed to send cancellation request');
    }
    
    // Close the modal
    showCancelPlanModal.value = false;
    
    // Show success notification
    notificationMessage.value = 'Your cancellation request has been sent.';
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 5000);
  } catch (error) {
    console.error('Error sending cancellation request:', error);
    
    // Show error notification
    notificationMessage.value = 'There was an error sending your request. Please try again.';
    showSuccessNotification.value = true;
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      showSuccessNotification.value = false;
    }, 5000);
  } finally {
    isCancelling.value = false;
  }
};
</script>
