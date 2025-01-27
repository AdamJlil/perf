<script lang="ts" setup>
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import type { Customer } from '~/types';

const API_BASE_URL = 'http://localhost:3001';

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
    console.error('Error getting user info:', err);
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

    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
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
    console.error('Error fetching establishment info:', err);
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

    const response = await fetch(`${API_BASE_URL}/api/users/customers/${customerId}`, {
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

    // Remove the customer from the local list
    customers.value = customers.value.filter(c => c.id !== customerId);
  } catch (err) {
    console.error('Error removing customer:', err);
    error.value = err.message || 'An error occurred while removing the customer';
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
    const response = await fetch(`${API_BASE_URL}/api/users/customers`, {
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
          first_name: '',
          last_name: '',
          email: '',
          age_range: '',
          weight_range: '',
          video: 0,
          burned_calories: { 'Day 1': 0 }
        };
      }
      
      // Ensure all required properties exist
      const processedCustomer = {
        id: customer.id || customer._id || customer.et_customer_id,
        first_name: customer.first_name || customer.firstName || '',
        last_name: customer.last_name || customer.lastName || '',
        email: customer.email || '',
        age_range: customer.age_range || customer.ageRange || '',
        weight_range: customer.weight_range || customer.weightRange || '',
        video: customer.video || 0,
        burned_calories: customer.burned_calories || customer.burnedCalories || { 'Day 1': 0 }
      };
      
      console.log('Processed customer:', processedCustomer);
      return processedCustomer;
    });

    console.log('Final customers array:', customers.value);
  } catch (err) {
    console.error('Error fetching customers:', err);
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
                {{ (customer.first_name?.[0] || '') }}{{ (customer.last_name?.[0] || '') }}
              </div>
              <div>
                <h3 class="text-lg font-semibold">{{ customer.first_name || '' }} {{ customer.last_name || '' }}</h3>
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
                {{ customer.age_range || 'Not specified' }}
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
                  {{ (selectedCustomer?.first_name?.[0] || '') }}{{ (selectedCustomer?.last_name?.[0] || '') }}
                </div>
                <div>
                  <h2 class="text-2xl font-bold">{{ selectedCustomer?.first_name }} {{ selectedCustomer?.last_name }}</h2>
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
                  <p class="text-lg font-semibold mt-1">{{ selectedCustomer?.age_range || 'Not specified' }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="text-sm font-medium text-gray-500">Weight Range</h3>
                  <p class="text-lg font-semibold mt-1">{{ selectedCustomer?.weight_range || 'Not specified' }}</p>
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
              <div v-if="selectedCustomer?.burned_calories && Object.keys(selectedCustomer.burned_calories).length > 0"
                   class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold mb-4">Calories Burned History</h3>
                <div class="space-y-3">
                  <div v-for="(calories, day) in selectedCustomer.burned_calories" 
                       :key="day" 
                       class="flex items-center justify-between">
                    <span class="text-gray-600">{{ day }}</span>
                    <div class="flex items-center gap-3">
                      <div class="w-32 bg-gray-200 rounded-full h-2">
                        <div class="bg-green-500 h-2 rounded-full transition-all duration-500"
                             :style="{ width: (calories / 500 * 100) + '%' }"></div>
                      </div>
                      <span class="font-medium min-w-[60px] text-right">{{ calories }} cal</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Remove Customer Button -->
              <div class="flex justify-end pt-4 border-t">
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
              Are you sure you want to remove {{ selectedCustomer?.first_name }} {{ selectedCustomer?.last_name }}? 
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
