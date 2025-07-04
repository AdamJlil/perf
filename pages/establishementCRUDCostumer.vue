<script lang="ts" setup>
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import type { Customer } from '~/types';
import { useAuthUser } from '~/composables/useAuthUser';

// Define proper customer interface to fix TypeScript errors
interface Customer {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  et_customer_id: string;
  video: number;
  burnedCalories: {
    [key: string]: number;
  };
  ageRange?: string;
  weightRange?: string;
}

// Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''

definePageMeta({
  middleware: ["user-only"],
});

const route = useRoute();
const customers = ref<Customer[]>([]);
const loading = ref(false);
const error = ref('');
const userName = ref('');

const getUserInfo = () => {
  try {
    const userStr = localStorage.getItem('user');
    console.log('User data from localStorage:', userStr);
    
    if (!userStr) return null;
    
    const userData = JSON.parse(userStr);
    console.log('Parsed user data:', userData);
    
    if (userData && userData.user) {
      userName.value = userData.user.first_name || '';
      console.log('Set user name to:', userName.value);
    }
  } catch (err) {
    handleError(err);
  }
};

const fetchEstablishmentInfo = async () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('You must be logged in');
    }

    const userData = JSON.parse(userStr);
    const token = userData.token;
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch(`${baseURL}/api/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch establishment info');
    }

    const data = await response.json();
    const establishmentName = data.establishment_name || data.first_name + ' ' + data.last_name;
  } catch (err) {
    handleError(err);
    error.value = err.message;
  }
};

const selectedCustomer = ref<Customer | null>(null);
const showModal = ref(false);
const showConfirmDialog = ref(false);

const openCustomerDetails = (customer: Customer) => {
  selectedCustomer.value = customer;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  showConfirmDialog.value = false;
  selectedCustomer.value = null;
};

const confirmRemove = () => {
  if (selectedCustomer.value) {
    removeCustomer(selectedCustomer.value.id);
    closeModal();
  }
};

const removeCustomer = async (customerId: string) => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('You must be logged in to remove customers');
    }

    const userData = JSON.parse(userStr);
    const token = userData.token;
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch(`${baseURL}/api/users/customers/remove/${customerId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to remove customer');
    }

    const result = await response.json();
    
    // Update customers list
    customers.value = customers.value.filter(c => c.id !== customerId);

    // Update localStorage with new customers list
    const updatedUserData = {
      ...userData,
      user: {
        ...userData.user,
        customers: result.customers // Use the updated customers from the server
      }
    };
    localStorage.setItem('user', JSON.stringify(updatedUserData));

    // Update the user state
    const user = useAuthUser();
    if (user.value) {
      user.value = {
        ...user.value,
        customers: result.customers
      };
    }
  } catch (err) {
    handleError(err);
    error.value = err instanceof Error ? err.message : 'Failed to remove customer';
  }
};

// Reset expanded cards when customers change
watch(customers, () => {
  // expandedCustomerIds.value.clear();
});

const isExpanded = (customerId: string) => {
  // return expandedCustomerIds.value.has(customerId);
};

const toggleCustomer = (customerId: string) => {
  // console.log('Toggle customer called with ID:', customerId);
  // console.log('Current customers:', customers.value);
  
  // if (!customerId) {
  //   console.error('Invalid customer ID:', customerId);
  //   return;
  // }

  // const newSet = new Set(expandedCustomerIds.value);
  
  // if (newSet.has(customerId)) {
  //   console.log('Closing customer card:', customerId);
  //   newSet.delete(customerId);
  // } else {
  //   console.log('Opening customer card:', customerId);
  //   newSet.clear(); // Close all other cards
  //   newSet.add(customerId);
  // }
  
  // expandedCustomerIds.value = newSet;
  // console.log('Updated expanded IDs:', Array.from(expandedCustomerIds.value));
};

onMounted(async () => {
  // Check if user has paid
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      const user = userData.user;
      
      // Check if the user has paid
      if (user && (user.paid !== true && user.paid !== 1)) {
        console.log('User has not paid, redirecting to payment page');
        
        // Determine price based on plan
        let price = '';
        if (user.plan) {
          const planTitle = typeof user.plan === 'string' ? 
            (JSON.parse(user.plan).title || '') : 
            (user.plan.title || '');
          
          if (user.type === 'ESTABLISHEMENT') {
            if (planTitle === 'EXPLORER') price = '6500';
            else if (planTitle === 'EXPERIENCE') price = '7500';
            else if (planTitle === 'SIGNATURE') price = '8000';
          } else {
            // PARTICULIER prices
            if (planTitle === 'EXPLORER') price = '6500';
            else if (planTitle === 'EXPERIENCE') price = '7500';
            else if (planTitle === 'SIGNATURE') price = '8000';
          }
        }
        
        // Construct the payment URL with user information
        const paymentUrl = `/payment?first_name=${encodeURIComponent(user.first_name || '')}&name=${encodeURIComponent(user.name || '')}&email=${encodeURIComponent(user.email)}&userType=${encodeURIComponent(user.type)}&plan=${encodeURIComponent(user.plan ? (typeof user.plan === 'string' ? JSON.parse(user.plan).title || '' : user.plan.title || '') : '')}&price=${encodeURIComponent(price)}`;
        
        // Redirect to payment page
        window.location.href = paymentUrl;
        return;
      }
    }
  } catch (error) {
    handleError(error);
  }
  
  // Continue with normal page loading if user has paid
  getUserInfo();
  await fetchCustomers();
});

const fetchCustomers = async () => {
  loading.value = true;
  error.value = '';
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('You must be logged in to view customers');
    }

    const userData = JSON.parse(userStr);
    const token = userData.token;
    if (!token) {
      throw new Error('Authentication token not found');
    }

    console.log('Fetching customers with token:', token);
    const response = await fetch(`${baseURL}/api/users/customers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch customers: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Raw customer data:', JSON.stringify(data, null, 2));

    // Ensure each customer has the required properties
    customers.value = data.map(customer => {
      console.log('Processing customer:', customer);
      
      // If customer is just a string (ID), convert it to a proper object
      if (typeof customer === 'string') {
        return {
          id: customer,
          firstName: '',
          lastName: '',
          email: '',
          ageRange: '',
          weightRange: '',
          video: 0,
          burnedCalories: { 'Day 1': 0 }
        };
      }
      
      // Ensure all required properties exist
      const processedCustomer: Customer = {
        id: customer.id || customer._id || customer.et_customer_id,
        firstName: customer.first_name || customer.firstName || '',
        lastName: customer.last_name || customer.lastName || '',
        email: customer.email || '',
        ageRange: customer.age_range || customer.ageRange || '',
        weightRange: customer.weight_range || customer.weightRange || '',
        video: customer.video || 0,
        burnedCalories: customer.burned_calories || customer.burnedCalories || { 'Day 1': 0 }
      };
      
      console.log('Processed customer:', processedCustomer);
      return processedCustomer;
    });

    console.log('Final customers array:', customers.value);
  } catch (err) {
    handleError(err);
    error.value = err.message || 'An error occurred while fetching customers';
  } finally {
    loading.value = false;
  }
};

const confirmDelete = (id: string) => {
  // Not used in this version
};

const deleteUser = async () => {
  // Not used in this version
};

const generateRandomColor = (): string => {
  const colors = [
    "#FFE5B4", "#FFD6A5", "#FFC4A3", "#FFB4A2", "#FFA07A",
    "#FF8C66", "#FF9166", "#FFB07C", "#FFC07F", "#FFD492",
    "#FFE5AA", "#FFEBC0", "#FFDFA1", "#FFD585", "#FFC069",
    "#FFAD54", "#FF9940", "#FF8533", "#FF6F1C", "#FF5C0A",
    "#FEC89A", "#FABD8A", "#F5AB70", "#F4A261", "#E98942",
    "#E76F51", "#FF9F1C", "#FFAC3E", "#FFB957", "#FFCB69"
  ];

  const availableColors = colors.filter(color => !usedColors.includes(color));

  if (availableColors.length === 0) {
    usedColors = []; // Reset if all colors are used
  }

  const color = availableColors[Math.floor(Math.random() * availableColors.length)];
  usedColors.push(color);
  return color;
};

let usedColors: string[] = [];

const handleError = (err: unknown) => {
  console.error('Error:', err instanceof Error ? err.message : String(err));
};

// Computed property for calories to display
const calorieEntriesToDisplay = computed(() => {
  if (!selectedCustomer.value?.burnedCalories) return {};
  
  // If only "Day 1" exists, return just that
  if (Object.keys(selectedCustomer.value.burnedCalories).length === 1 && 
      selectedCustomer.value.burnedCalories['Day 1']) {
    return { 'Day 1': selectedCustomer.value.burnedCalories['Day 1'] };
  }
  
  // Otherwise return all days except "Day 1" and adjust numbering
  const filteredEntries: Record<string, number> = {};
  const entries = Object.entries(selectedCustomer.value.burnedCalories)
    .filter(([day]) => day !== 'Day 1');
    
  // Sort by day number to ensure proper renumbering
  entries.sort((a, b) => {
    const numA = parseInt(a[0].replace('Day ', ''));
    const numB = parseInt(b[0].replace('Day ', ''));
    return numA - numB;
  });
  
  // Renumber days (Day 2 becomes Day 1, Day 3 becomes Day 2, etc.)
  entries.forEach(([day, calories], index) => {
    filteredEntries[`Day ${index + 1}`] = Number(calories);
  });
  
  return filteredEntries;
});

// Check if we should show calorie history (hide if only Day 0 exists)
const shouldShowCalorieHistory = computed(() => {
  if (!selectedCustomer.value?.burnedCalories) return false;
  
  // If there's only Day 0, don't show the section
  if (Object.keys(selectedCustomer.value.burnedCalories).length === 1 && 
      selectedCustomer.value.burnedCalories['Day 0']) {
    return false;
  }
  
  // If there are any entries after filtering, show the section
  return Object.keys(calorieEntriesToDisplay.value).length > 0;
});

</script>

<template>
  <div class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center relative p-4 pt-[100px] bg-[#EFEFEC] my-0" style="font-family: Montserrat;">
    <Bloc1 
      class="my-[150px]" 
      :reversed="true"  
      :showButton="false" 
      image="/images/coach.png" 
      :headingText="`HEY ${userName || 'there'} 👋,<br/>MANAGE YOUR CUSTOMERS HERE`" 
    />

    <!-- Customer Management Section -->
    <section class="w-full max-w-5xl bg-[#EFEFEC] rounded-lg p-6 my-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">{{ userName ? `${userName}'s` : 'Your' }} Customers</h2>
      
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
        {{ error }}
      </div>
      
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>

      <div v-else-if="customers.length === 0" class="text-center text-gray-600 py-8">
        You don't have any customers yet.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="customer in customers" 
             :key="customer.id" 
             class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
             @click="openCustomerDetails(customer)">
          <div class="p-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                {{ (customer.firstName?.[0] || '') }}{{ (customer.lastName?.[0] || '') }}
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ customer.firstName || '' }} {{ customer.lastName || '' }}</h3>
                <p class="text-gray-600 text-sm">{{ customer.email }}</p>
              </div>
            </div>
            
            <!-- Preview Stats -->
            <div class="mt-4 grid grid-cols-2 gap-4">
              <div class="text-sm text-gray-600">
                <span class="block font-medium">Videos</span>
                {{ customer.video || 0 }}
              </div>
              <div class="text-sm text-gray-600">
                <span class="block font-medium">Age Range</span>
                {{ customer.ageRange || 'Not specified' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Customer Details Modal -->
      <div v-if="showModal" 
           class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
           @click="closeModal">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
             @click.stop>
          <div class="p-6">
            <div class="flex justify-between items-start mb-6">
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-2xl">
                  {{ (selectedCustomer?.firstName?.[0] || '') }}{{ (selectedCustomer?.lastName?.[0] || '') }}
                </div>
                <div>
                  <h2 class="text-2xl font-bold">{{ selectedCustomer?.firstName }} {{ selectedCustomer?.lastName }}</h2>
                  <p class="text-gray-600">{{ selectedCustomer?.email }}</p>
                </div>
              </div>
              <button @click="closeModal" 
                      class="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="space-y-6">
              <!-- Customer Stats -->
              <div class="grid grid-cols-2 gap-6">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-500">Age Range</h3>
                  <p class="text-lg font-semibold mt-1">{{ selectedCustomer?.ageRange || 'Not specified' }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-500">Weight Range</h3>
                  <p class="text-lg font-semibold mt-1">{{ selectedCustomer?.weightRange || 'Not specified' }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-500">Videos Completed</h3>
                  <p class="text-lg font-semibold mt-1">{{ selectedCustomer?.video || 0 }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-500">Progress</h3>
                  <div class="mt-2">
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full transition-all duration-500"
                           :style="{ width: ((selectedCustomer?.video || 0) / 10 * 100) + '%' }"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Calories Burned History -->
              <div v-if="shouldShowCalorieHistory"
                   class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold mb-4">Calories Burned History</h3>
                <div class="space-y-3">
                  <div v-for="(calories, day) in calorieEntriesToDisplay" 
                       :key="day"
                       class="flex items-center justify-between">
                    <span class="text-gray-600">{{ day }}</span>
                    <span class="font-medium">{{ calories }} kcal</span>
                  </div>
                </div>
              </div>

              <!-- Remove Customer Button -->
              <div class="flex justify-end gap-3 pt-4 border-t">
                <NuxtLink :to="`/establishementProgram?customerId=${selectedCustomer?.id}`"
                        class="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Start Program
                </NuxtLink>
                <button @click.stop="showConfirmDialog = true"
                        class="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Dialog -->
      <div v-if="showConfirmDialog && showModal" 
           class="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full" @click.stop>
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Remove Customer</h3>
            <p class="text-sm text-gray-500 mb-6">
              Are you sure you want to remove {{ selectedCustomer?.firstName }} {{ selectedCustomer?.lastName }}? 
              This action cannot be undone.
            </p>
            <div class="flex justify-center gap-3">
              <button @click="showConfirmDialog = false"
                      class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                Cancel
              </button>
              <button @click="confirmRemove"
                      class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <nuxt-link to="/quizEstablishement" class="w-full flex justify-center items-center mt-8">
        <div class="flex justify-center items-center gap-[15px] cursor-pointer w-fit hover:bg-[#e7e7e7] p-[20px] rounded-lg transition-colors">
          <img src="/images/plus-icon.png" alt="plus" width="20" height="20" />
          <span class="text-lg font-medium">Add New Customer</span>
        </div>
      </nuxt-link>
    </section>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
