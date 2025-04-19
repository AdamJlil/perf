<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative p-4 pt-[100px] bg-[#EFEFEC]"
    style="font-family: Montserrat"
  >
    <!-- Main Content -->
    <div class="z-10 flex flex-col items-center w-full px-4">
      <!-- Main Heading -->
      <h1 class="text-[28px] leading-loose font-normal text-center mb-6 uppercase text-black dark:text-white">
        <span>Admin Dashboard - Customer Management</span>
      </h1>

      <!-- Search and Filter Section -->
      <div class="w-full max-w-9xl flex justify-between items-center mb-6">
        <div class="flex items-center">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search customers..."
            class="p-2 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 w-64"
          />
          <button 
            class="ml-2 border-[1px] border-black text-black py-2 px-4 hover:bg-[#00000008] transition-colors duration-300"
            @click="searchCustomers"
          >
            Search
          </button>
        </div>
        <div>
          <select 
            v-model="filterType" 
            class="p-2 border-[1px] border-black bg-transparent text-black focus:outline-none focus:ring-0"
            @change="filterCustomers"
          >
            <option value="">Filter by type</option>
            <option value="PARTICULIER">Particulier</option>
            <option value="ESTABLISHEMENT">Establishment</option>
          </select>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="w-full max-w-9xl text-center py-8">
        <p class="text-lg">Loading customers...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="w-full max-w-9xl text-center py-8">
        <p class="text-lg text-red-600">{{ error }}</p>
        <button 
          @click="fetchCustomers" 
          class="mt-4 border-[1px] border-black text-black py-2 px-4 hover:bg-[#00000008] transition-colors duration-300"
        >
          Try Again
        </button>
      </div>

      <!-- Customers Table -->
      <div v-else class="w-full max-w-9xl overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b-[1px] border-black">
              <th class="py-3 px-4 text-left">Email</th>
              <th class="py-3 px-4 text-left">Name</th>
              <th class="py-3 px-4 text-left">First Name</th>
              <th class="py-3 px-4 text-left">Last Name</th>
              <th class="py-3 px-4 text-left">Type</th>
              <th class="py-3 px-4 text-left">Age</th>
              <th class="py-3 px-4 text-left">Height</th>
              <th class="py-3 px-4 text-left">Gender</th>
              <th class="py-3 px-4 text-left">Allergies</th>
              <th class="py-3 px-4 text-left">Medical Conditions</th>
              <th class="py-3 px-4 text-left">Created At</th>
              <th class="py-3 px-4 text-left">Plan</th>
              <th class="py-3 px-4 text-left">Paid</th>
              <th class="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <!-- Data rows from API -->
            <tr v-for="(customer, index) in displayedCustomers" :key="customer.id || index" class="border-b-[1px] border-[#0000001a] hover:bg-[#00000008]">
              <td class="py-3 px-4">{{ customer.email }}</td>
              <td class="py-3 px-4">{{ customer.name }}</td>
              <td class="py-3 px-4">{{ customer.firstName }}</td>
              <td class="py-3 px-4">{{ customer.lastName }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="{
                    'bg-blue-100 text-blue-800': customer.type === 'PARTICULIER',
                    'bg-green-100 text-green-800': customer.type === 'ESTABLISHEMENT'
                  }"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ customer.type }}
                </span>
              </td>
              <td class="py-3 px-4">{{ customer.age }}</td>
              <td class="py-3 px-4">{{ customer.height }}</td>
              <td class="py-3 px-4">{{ customer.gender }}</td>
              <td class="py-3 px-4">
                <span v-if="customer.allergies" class="cursor-pointer" @click="showDetails(customer.allergies)">
                  View
                </span>
                <span v-else>None</span>
              </td>
              <td class="py-3 px-4">
                <span v-if="customer.medicalConditions" class="cursor-pointer" @click="showDetails(customer.medicalConditions)">
                  View
                </span>
                <span v-else>None</span>
              </td>
              <td class="py-3 px-4">{{ formatDate(customer.createdAt) }}</td>
              <td class="py-3 px-4">{{ formatPlan(customer.plan) }}</td>
              <td class="py-3 px-4">
                <span 
                  :class="{
                    'bg-green-100 text-green-800': customer.paid === true || customer.paid === 1 || customer.paid === '1',
                    'bg-red-100 text-red-800': customer.paid === false || customer.paid === 0 || customer.paid === '0',
                    'bg-gray-100 text-gray-800': customer.paid === null || customer.paid === undefined
                  }"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                >
                  {{ formatPaidStatus(customer.paid) }}
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800" @click="openEditModal(customer)">
                    <span>Edit</span>
                  </button>
                  <button 
                    class="text-red-600 hover:text-red-800"
                    @click="confirmDelete(customer)"
                  >
                    <span>Delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <!-- Empty state when no customers -->
            <tr v-if="displayedCustomers.length === 0">
              <td colspan="14" class="py-8 text-center text-gray-500">No customers found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="!loading && !error && customers.length > 0" class="w-full max-w-9xl flex justify-between items-center mt-6">
        <div>
          <span class="text-sm">Showing {{ paginationStart + 1 }}-{{ paginationEnd }} of {{ customers.length }} customers</span>
        </div>
        <div class="flex space-x-2">
          <button 
            :disabled="currentPage === 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            class="border-[1px] border-black text-black py-1 px-3 hover:bg-[#00000008] transition-colors duration-300"
            @click="prevPage"
          >
            Previous
          </button>
          <button 
            :disabled="currentPage >= totalPages"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }"
            class="border-[1px] border-black text-black py-1 px-3 hover:bg-[#00000008] transition-colors duration-300"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Details Modal -->
      <div v-if="detailsModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 class="text-xl font-semibold mb-4">Details</h2>
          <div class="mb-4">
            <p>{{ detailsContent }}</p>
          </div>
          <div class="flex justify-end">
            <button 
              @click="closeDetailsModal" 
              class="border-[1px] border-black text-black py-2 px-4 hover:bg-[#00000008] transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="deleteModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 class="text-xl font-semibold mb-4">Confirm Delete</h2>
          <div class="mb-4">
            <p>Are you sure you want to delete {{ customerToDelete?.name || 'this customer' }}?</p>
            <p class="text-sm text-red-600 mt-2">This action cannot be undone.</p>
          </div>
          <div class="flex justify-end space-x-3">
            <button 
              @click="cancelDelete" 
              class="border-[1px] border-black text-black py-2 px-4 hover:bg-[#00000008] transition-colors duration-300"
            >
              Cancel
            </button>
            <button 
              @click="deleteCustomer" 
              class="border-[1px] border-red-600 bg-red-600 text-white py-2 px-4 hover:bg-red-700 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Edit Customer Modal -->
      <div v-if="editModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-semibold mb-4">Edit Customer</h2>
          
          <form @submit.prevent="updateCustomer" class="space-y-4">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input 
                  v-model="editForm.email" 
                  type="email" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                  required
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Name</label>
                <input 
                  v-model="editForm.name" 
                  type="text" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">First Name</label>
                <input 
                  v-model="editForm.firstName" 
                  type="text" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Last Name</label>
                <input 
                  v-model="editForm.lastName" 
                  type="text" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                />
              </div>
            </div>
            
            <!-- Personal Information -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Age</label>
                <input 
                  v-model="editForm.age" 
                  type="number" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Height</label>
                <input 
                  v-model="editForm.height" 
                  type="text" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                  placeholder="e.g. 180cm"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Gender</label>
                <select 
                  v-model="editForm.gender" 
                  class="w-full p-2 border-[1px] border-black bg-transparent"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <!-- Health Information -->
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Allergies</label>
                <textarea 
                  v-model="editForm.allergies" 
                  class="w-full p-2 border-[1px] border-black bg-transparent h-20"
                  placeholder="List allergies or type 'None'"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-1">Medical Conditions</label>
                <textarea 
                  v-model="editForm.medicalConditions" 
                  class="w-full p-2 border-[1px] border-black bg-transparent h-20"
                  placeholder="List medical conditions or type 'None'"
                ></textarea>
              </div>
            </div>
            
            <!-- Plan Information -->
            <div>
              <label class="block text-sm font-medium mb-1">Plan</label>
              <select 
                v-model="editForm.plan" 
                class="w-full p-2 border-[1px] border-black bg-transparent"
              >
                <option value="">Select plan</option>
                <option value="BRONZE">BRONZE</option>
                <option value="PLATINUM">PLATINUM</option>
                <option value="GOLD">GOLD</option>
              </select>
            </div>
            
            <!-- Payment Information -->
            <div>
              <label class="block text-sm font-medium mb-1">Paid</label>
              <select 
                v-model="editForm.paid" 
                class="w-full p-2 border-[1px] border-black bg-transparent"
              >
                <option :value="null">-</option>
                <option :value="true">Paid</option>
                <option :value="false">Unpaid</option>
              </select>
            </div>
            
            <!-- Form Actions -->
            <div class="flex justify-end space-x-3 pt-4">
              <button 
                type="button"
                @click="closeEditModal" 
                class="border-[1px] border-black text-black py-2 px-4 hover:bg-[#00000008] transition-colors duration-300"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                class="border-[1px] border-blue-600 bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition-colors duration-300"
                :disabled="updatePending"
              >
                {{ updatePending ? 'Updating...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import axios from 'axios';

// Define customer interface to fix TypeScript errors
interface Customer {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  type: string;
  age?: number | null;
  height?: string | null;
  gender?: string | null;
  allergies?: string | null;
  medicalConditions?: string | null;
  details?: string | null;
  createdAt: string;
  plan?: any;
  paid?: boolean | number | string | null;
}

// State
const customers = ref<Customer[]>([]);
const loading = ref(true);
const error = ref('');
const searchQuery = ref('');
const filterType = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Details modal
const detailsModalVisible = ref(false);
const detailsContent = ref('');

// Delete modal
const deleteModalVisible = ref(false);
const customerToDelete = ref<Customer | null>(null);

// Edit modal
const editModalVisible = ref(false);
const customerToEdit = ref<Customer | null>(null);
const updatePending = ref(false);

// Edit form
const editForm = reactive({
  id: '',
  email: '',
  name: '',
  firstName: '',
  lastName: '',
  age: null as number | null,
  height: '',
  gender: '',
  allergies: '',
  medicalConditions: '',
  plan: '',
  paid: null as boolean | null
});

// Computed properties for pagination
const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage));
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage);
const paginationEnd = computed(() => Math.min(paginationStart.value + itemsPerPage, filteredCustomers.value.length));

// Computed property for filtered customers
const filteredCustomers = computed(() => {
  let result = [...customers.value];
  
  // Apply type filter
  if (filterType.value) {
    result = result.filter(customer => customer.type === filterType.value);
  }
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(customer => 
      customer.email?.toLowerCase().includes(query) ||
      customer.name?.toLowerCase().includes(query) ||
      customer.firstName?.toLowerCase().includes(query) ||
      customer.lastName?.toLowerCase().includes(query)
    );
  }
  
  return result;
});

// Computed property for displayed customers (with pagination)
const displayedCustomers = computed(() => {
  return filteredCustomers.value.slice(paginationStart.value, paginationEnd.value);
});

// Fetch customers from API
async function fetchCustomers() {
  loading.value = true;
  error.value = '';
  
  try {
    // Get the auth token from localStorage
    const userStr = localStorage.getItem('user');
    let token = '';
    
    if (userStr) {
      const userData = JSON.parse(userStr);
      token = userData.token;
    }
    
    if (!token) {
      error.value = 'Authentication required. Please log in again.';
      loading.value = false;
      return;
    }
    
    // Call the API endpoint we created
    const response = await axios.get('http://localhost:3001/api/admin/customers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    console.log(response.data);
    
    // Map the response data to match our component's expected format
    customers.value = response.data.map((customer: any) => ({
      id: customer.id,
      email: customer.email,
      name: customer.name || '',
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      type: customer.type,
      age: customer.age,
      height: customer.height,
      gender: customer.gender,
      allergies: customer.allergies_details || customer.allergies,
      medicalConditions: customer.medical_conditions_details || customer.medicalConditions,
      details: customer.details,
      createdAt: customer.createdAt || customer.created_at,
      plan: customer.plan,
      paid: customer.paid
    }));
    
    currentPage.value = 1; // Reset to first page when data is loaded
  } catch (err: any) {
    console.error('Error fetching customers:', err);
    error.value = err.response?.data?.error || 'Failed to fetch customers. Please try again.';
  } finally {
    loading.value = false;
  }
}

// Search and filter functions
function searchCustomers() {
  currentPage.value = 1; // Reset to first page when searching
}

function filterCustomers() {
  currentPage.value = 1; // Reset to first page when filtering
}

// Pagination functions
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

// Details modal functions
function showDetails(content: string) {
  detailsContent.value = content;
  detailsModalVisible.value = true;
}

function closeDetailsModal() {
  detailsModalVisible.value = false;
}

// Delete functions
function confirmDelete(customer: Customer) {
  customerToDelete.value = customer;
  deleteModalVisible.value = true;
}

function cancelDelete() {
  customerToDelete.value = null;
  deleteModalVisible.value = false;
}

async function deleteCustomer() {
  if (!customerToDelete.value) return;
  
  try {
    // Get the auth token from localStorage
    const userStr = localStorage.getItem('user');
    let token = '';
    
    if (userStr) {
      const userData = JSON.parse(userStr);
      token = userData.token;
    }
    
    if (!token) {
      error.value = 'Authentication required. Please log in again.';
      return;
    }
    
    // Call the API to delete the customer
    await axios.delete(`http://localhost:3001/api/users/${customerToDelete.value.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Close the modal
    deleteModalVisible.value = false;
    customerToDelete.value = null;
    
    // Reload the page after successful deletion
    window.location.reload();
  } catch (err: any) {
    console.error('Error deleting customer:', err);
    error.value = err.response?.data?.error || 'Failed to delete customer. Please try again.';
  }
}

// Edit functions
function openEditModal(customer: Customer) {
  // Create a safe copy of the customer to avoid errors with missing data
  const safeCustomer = {
    id: customer.id || '',
    email: customer.email || '',
    name: customer.name || '',
    firstName: customer.firstName || '',
    lastName: customer.lastName || '',
    type: customer.type || '',
    age: customer.age || null,
    height: customer.height || '',
    gender: customer.gender || '',
    allergies: customer.allergies || '',
    medicalConditions: customer.medicalConditions || '',
    details: customer.details || '',
    createdAt: customer.createdAt || '',
    plan: customer.plan || '',
    paid: customer.paid
  };
  
  customerToEdit.value = safeCustomer;
  
  // Initialize the form with customer data
  editForm.id = safeCustomer.id;
  editForm.email = safeCustomer.email;
  editForm.name = safeCustomer.name;
  editForm.firstName = safeCustomer.firstName;
  editForm.lastName = safeCustomer.lastName;
  editForm.age = safeCustomer.age;
  editForm.height = safeCustomer.height;
  editForm.gender = safeCustomer.gender;
  editForm.allergies = safeCustomer.allergies;
  editForm.medicalConditions = safeCustomer.medicalConditions;
  
  // Handle plan data
  if (typeof safeCustomer.plan === 'string' && (safeCustomer.plan.startsWith('{') || safeCustomer.plan.startsWith('['))) {
    try {
      const planObj = JSON.parse(safeCustomer.plan);
      editForm.plan = planObj.title || ''; // Return only the title value
    } catch (e) {
      editForm.plan = safeCustomer.plan;
    }
  } else if (typeof safeCustomer.plan === 'object' && safeCustomer.plan) {
    editForm.plan = safeCustomer.plan.title || '';
  } else {
    editForm.plan = safeCustomer.plan;
  }
  
  // Handle paid status - ensure it's a proper boolean or null
  editForm.paid = safeCustomer.paid === true ? true : safeCustomer.paid === false ? false : null;
  
  editModalVisible.value = true;
}

function closeEditModal() {
  editModalVisible.value = false;
  customerToEdit.value = null;
}

async function updateCustomer() {
  if (!customerToEdit.value) return;
  updatePending.value = true;
  
  try {
    // Get the auth token from localStorage
    const userStr = localStorage.getItem('user');
    let token = '';
    
    if (userStr) {
      const userData = JSON.parse(userStr);
      token = userData.token;
    }
    
    if (!token) {
      error.value = 'Authentication required. Please log in again.';
      updatePending.value = false;
      return;
    }
    
    // Prepare the update data
    const updateData = {
      email: editForm.email,
      name: editForm.name,
      first_name: editForm.firstName,
      last_name: editForm.lastName,
      age: editForm.age,
      height: editForm.height,
      gender: editForm.gender,
      allergies_details: editForm.allergies,
      medical_conditions_details: editForm.medicalConditions,
      // Handle plan update - create a plan object with the title
      plan: JSON.stringify({
        title: editForm.plan,
        status: 'Active'
      }),
      // Ensure paid is explicitly sent as a boolean or null
      paid: editForm.paid
    };
    
    console.log('Updating user with data:', updateData);
    
    // Call the API to update the customer
    await axios.put(`http://localhost:3001/api/users/${editForm.id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Close the modal
    editModalVisible.value = false;
    customerToEdit.value = null;
    
    // Reload the page after successful update
    window.location.reload();
  } catch (err: any) {
    console.error('Error updating customer:', err);
    error.value = err.response?.data?.error || 'Failed to update customer. Please try again.';
  } finally {
    updatePending.value = false;
  }
}

// Format date for display
function formatDate(dateString: string) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format plan for display
function formatPlan(plan: any) {
  if (!plan) return '';
  
  // If plan is a string that looks like JSON, try to parse it
  if (typeof plan === 'string' && (plan.startsWith('{') || plan.startsWith('['))) {
    try {
      const planObj = JSON.parse(plan);
      return planObj.title || ''; // Return only the title value
    } catch (e) {
      return plan;
    }
  }
  
  // If plan is already an object
  if (typeof plan === 'object') {
    return plan.title || ''; // Return only the title value
  }
  
  return plan;
}

// Format paid status for display
function formatPaidStatus(paid: boolean | number | string | null | undefined) {
  // Ensure we're dealing with a proper boolean
  if (paid === true || paid === 1 || paid === '1') return 'Paid';
  if (paid === false || paid === 0 || paid === '0') return 'Unpaid';
  return 'Unknown';
}

// Fetch customers when component is mounted
onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
/* Add any additional custom styles here */
table {
  border-spacing: 0;
}

thead tr th {
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.85rem;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .overflow-x-auto {
    max-width: 100%;
  }
}
</style>