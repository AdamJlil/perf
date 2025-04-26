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
          <p class="mt-2 text-gray-7 tracking-0.4 text-sm">{{ currentPlan.price }}</p>
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
        <div class="w-full md:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div class="text-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">Status</p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.status }}</p>
          </div>

          <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">
              {{ user.type === 'ESTABLISHEMENT' ? 'Active Customers' : 'Users' }}
            </p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.numberOfUsers }}</p>
          </div>
          
          <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">Starting date</p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.startDate }}</p>
          </div>

          <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
            <p class="text-gray-8 text-xs font-medium tracking-0.4">End date</p>
            <p class="mt-4 md:mt-9 font-bold tracking-0.4">{{ currentPlan.endDate }}</p>
          </div>
        </div>

        <div class="w-full md:w-[10%] flex flex-col items-center justify-center">
          <button
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
      // For establishment, include the number of customers
      if (user.value.type === 'ESTABLISHEMENT') {
        return {
          ...planData,
          numberOfUsers: customers.value.length || 0
        };
      }
      // For regular users, return plan as is
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
  
  try {
    isUpgrading.value = true;
    
    // Map plan names to the correct keys
    const planMap = {
      'BRONZE': 'plan_1',
      'PLATINUM': 'plan_2',
      'GOLD': 'plan_3'
    };
    
    const planKey = planMap[selectedUpgradePlan.value];
    if (!planKey) {
      throw new Error('Invalid plan selected');
    }

    const selectedPlan = plans.ESTABLISHEMENT.plans[planKey];
    
    const planData = {
      title: selectedPlan.title,
      price: selectedPlan.price,
      status: "Active",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      maxCustomers: selectedPlan.maxCustomers
    };

    // Get token from user data in localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      throw new Error('Not authenticated');
    }
    const { token } = JSON.parse(userData);
    if (!token) {
      throw new Error('Not authenticated');
    }

    // Make API call to upgrade plan
    const response = await fetch('http://localhost:3001/api/users/plan/upgrade', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ plan: planData })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to upgrade plan');
    }

    const { user: updatedUser } = await response.json();
    
    // Update local user state
    user.value = updatedUser;
    
  } catch (error) {
    console.error('Error upgrading plan:', error);
    alert(error.message || 'Failed to upgrade plan. Please try again.');
  } finally {
    isUpgrading.value = false;
    showUpgradeModal.value = false;
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
</script>
