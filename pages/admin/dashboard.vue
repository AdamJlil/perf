<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-32 pb-20 px-4" style="font-family: Montserrat">
    <!-- Loading Overlay -->
    <div v-if="loading && !customers.length" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="loader"></div>
    </div>

    <div class="max-w-[1600px] mx-auto">
      <h1 class="text-2xl md:text-3xl font-normal text-center mb-16 uppercase tracking-[6px] text-gray-800">
        Admin Dashboard
      </h1>

      <!-- Search and Filter Section -->
      <div class="bg-white/40 backdrop-blur-md p-6 rounded-[20px] shadow-sm border border-white/20 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="flex items-center w-full md:w-auto relative group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="SEARCH CUSTOMERS..."
            class="w-full md:w-80 py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-400 text-sm tracking-[1px]"
            @input="searchCustomers"
          />
          <svg class="absolute right-0 top-2 w-4 h-4 text-gray-400 group-hover:text-[#D05E33] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        <div class="w-full md:w-auto">
          <select
            v-model="filterType"
            class="w-full md:w-64 py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black text-sm tracking-[1px] uppercase appearance-none"
            @change="filterCustomers"
          >
            <option value="">All Types</option>
            <option value="ESTABLISHEMENT">Establishment</option>
          </select>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-10 p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
        <p class="font-medium mb-4">{{ error }}</p>
        <button
          class="uppercase border border-red-600 text-red-600 bg-transparent py-2 px-6 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 text-xs font-bold tracking-[2px]"
          @click="fetchCustomers"
        >
          Try Again
        </button>
      </div>

      <!-- Table Container -->
      <div class="bg-white/60 backdrop-blur-md rounded-[30px] shadow-sm border border-white/30 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-800 text-white">
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Email</th>
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Company</th>
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Contact</th>
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Type</th>
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Plan</th>
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Validity</th>
                <th class="py-5 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase">Payment</th>
                <th class="py-5 px-6 text-center text-[10px] font-bold tracking-[2px] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr
                v-for="(customer, index) in displayedCustomers"
                :key="customer.id || index"
                class="hover:bg-white/40 transition-colors group"
              >
                <td class="py-4 px-6 text-sm text-gray-600 font-medium">{{ customer.email }}</td>
                <td class="py-4 px-6 text-sm text-gray-800 font-bold tracking-tight">{{ customer.name }}</td>
                <td class="py-4 px-6 text-sm text-gray-600">{{ customer.firstName }} {{ customer.lastName }}</td>
                <td class="py-4 px-6">
                  <span class="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold tracking-[1px] uppercase rounded-md border border-green-100">
                    {{ customer.type }}
                  </span>
                </td>
                <td class="py-4 px-6 text-sm text-gray-800 font-bold">{{ formatPlan(customer.plan) }}</td>
                <td class="py-4 px-6 text-[10px] text-gray-500 uppercase tracking-wider">
                  <div v-if="getPlanStartDate(customer.plan)">
                    {{ getPlanStartDate(customer.plan) }}
                    <span class="block text-gray-300 font-normal">to</span>
                    {{ getPlanEndDate(customer.plan) }}
                  </div>
                  <span v-else>-</span>
                </td>
                <td class="py-4 px-6">
                  <span
                    class="px-2 py-1 text-[10px] font-bold tracking-[1px] uppercase rounded-md border"
                    :class="{
                      'bg-green-100 text-green-800 border-green-200': customer.paid === true || customer.paid === 1 || customer.paid === '1',
                      'bg-red-100 text-red-800 border-red-200': customer.paid === false || customer.paid === 0 || customer.paid === '0',
                      'bg-gray-100 text-gray-400 border-gray-200': customer.paid === null || customer.paid === undefined,
                    }"
                  >
                    {{ formatPaidStatus(customer.paid) }}
                  </span>
                </td>
                <td class="py-4 px-6">
                  <div class="flex justify-center gap-3">
                    <button 
                      class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit Customer"
                      @click="openEditModal(customer)"
                    >
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      class="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete Customer"
                      @click="confirmDelete(customer)"
                    >
                      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="displayedCustomers.length === 0">
                <td colspan="8" class="py-20 text-center text-gray-400 italic tracking-[2px] uppercase text-sm">
                  No records found matching your search.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="customers.length > 0" class="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-xs font-medium tracking-[1px] uppercase text-gray-500">
            Showing {{ paginationStart + 1 }} to {{ paginationEnd }} of {{ filteredCustomers.length }} entries
          </p>
          
          <div class="flex gap-2">
            <button
              :disabled="currentPage === 1"
              class="px-4 py-2 text-[10px] font-bold tracking-[2px] uppercase border border-gray-200 rounded-md transition-all enabled:hover:bg-black enabled:hover:text-white disabled:opacity-30"
              @click="prevPage"
            >
              Previous
            </button>
            <div class="flex gap-1">
              <button 
                v-for="page in Math.min(5, totalPages)" 
                :key="page"
                class="w-8 h-8 flex items-center justify-center text-[10px] font-bold rounded-md border transition-all"
                :class="currentPage === page ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-500 hover:border-gray-400'"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
            </div>
            <button
              :disabled="currentPage >= totalPages"
              class="px-4 py-2 text-[10px] font-bold tracking-[2px] uppercase border border-gray-200 rounded-md transition-all enabled:hover:bg-black enabled:hover:text-white disabled:opacity-30"
              @click="nextPage"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Customer Modal -->
    <Transition name="fade">
      <div v-if="editModalVisible" class="fixed inset-0 z-[1100] flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
        <div class="bg-[#EFEFEC] w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
          <div class="p-10">
            <div class="flex justify-between items-center mb-12">
              <h2 class="text-2xl font-normal uppercase tracking-[4px] text-gray-800">Edit Profile</h2>
              <button class="text-gray-400 hover:text-gray-800" @click="closeEditModal">
                <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <form class="space-y-10" @submit.prevent="updateCustomer">
              <!-- Grid 1 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="relative">
                  <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Company Name</label>
                  <input v-model="editForm.name" type="text" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black font-bold" />
                </div>
                <div class="relative">
                  <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Email Access</label>
                  <input v-model="editForm.email" type="email" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black" required />
                </div>
              </div>

              <!-- Grid 2 -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div class="relative">
                  <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">First Name (Rep)</label>
                  <input v-model="editForm.firstName" type="text" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black" />
                </div>
                <div class="relative">
                  <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Last Name (Rep)</label>
                  <input v-model="editForm.lastName" type="text" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black" />
                </div>
              </div>

              <!-- Plan Details -->
              <div class="bg-white/30 p-8 rounded-[25px] border border-white/50 space-y-8">
                <h3 class="text-xs font-bold uppercase tracking-[3px] text-gray-500 border-b border-gray-200 pb-4">Plan Information</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div class="relative">
                    <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Select Plan</label>
                    <select v-model="editForm.plan" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black uppercase tracking-widest font-bold text-xs appearance-none">
                      <option value="EXPLORER">EXPLORER</option>
                      <option value="EXPERIENCE">EXPERIENCE</option>
                      <option value="SIGNATURE">SIGNATURE</option>
                    </select>
                  </div>
                  <div class="relative">
                    <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Payment Status</label>
                    <select v-model="editForm.paid" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black font-bold text-xs appearance-none">
                      <option :value="true">PAID & ACTIVE</option>
                      <option :value="false">UNPAID / PENDING</option>
                    </select>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div class="relative">
                    <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Active Rooms</label>
                    <input v-model="editForm.activeCustomers" type="number" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black" />
                  </div>
                  <div class="relative">
                    <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Start Date</label>
                    <input v-model="editForm.startDate" type="date" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black text-xs" />
                  </div>
                  <div class="relative">
                    <label class="block text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-1">Expiry Date</label>
                    <input v-model="editForm.endDate" type="date" class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all text-black text-xs" />
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="flex justify-end gap-6 pt-6">
                <button
                  type="button"
                  class="uppercase border border-black text-black bg-transparent py-3 px-10 font-bold tracking-[2px] rounded-md hover:bg-black hover:text-white transition-all text-xs"
                  @click="closeEditModal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="uppercase border border-[#D05E33] text-[#D05E33] bg-transparent py-3 px-10 font-bold tracking-[2px] rounded-md hover:bg-[#D05E33] hover:text-white transition-all text-xs"
                  :disabled="updatePending"
                >
                  {{ updatePending ? "Updating..." : "Save Changes" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirmation Modal -->
    <Transition name="fade">
      <div v-if="deleteModalVisible" class="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div class="bg-white p-10 rounded-[40px] max-w-md w-full shadow-2xl border border-red-50 text-center">
          <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg class="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 class="text-xl font-bold uppercase tracking-[2px] text-gray-800 mb-4">Confirm Delete</h2>
          <p class="text-sm text-gray-500 mb-10 leading-relaxed">Are you sure you want to permanently remove <span class="font-bold text-gray-800">{{ customerToDelete?.name }}</span> from the system?</p>
          
          <div class="flex gap-4">
            <button
              class="flex-1 uppercase border border-gray-300 text-gray-500 bg-transparent py-3 px-6 font-bold tracking-[2px] rounded-md hover:bg-gray-100 transition-all text-xs"
              @click="cancelDelete"
            >
              Cancel
            </button>
            <button
              class="flex-1 uppercase bg-red-600 text-white py-3 px-6 font-bold tracking-[2px] rounded-md hover:bg-red-700 transition-all text-xs"
              @click="deleteCustomer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";
import { api } from "~/services/mock/api";

definePageMeta({
  middleware: ["auth"],
});

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

const customers = ref<Customer[]>([]);
const loading = ref(true);
const error = ref("");
const searchQuery = ref("");
const filterType = ref("");
const emailSendingStatus = ref("");

const currentPage = ref(1);
const itemsPerPage = 10;

const detailsModalVisible = ref(false);
const detailsContent = ref("");

const deleteModalVisible = ref(false);
const customerToDelete = ref<Customer | null>(null);

const editModalVisible = ref(false);
const customerToEdit = ref<Customer | null>(null);
const updatePending = ref(false);

const editForm = reactive({
  id: "",
  email: "",
  name: "",
  firstName: "",
  lastName: "",
  age: null as number | null,
  height: "",
  gender: "",
  allergies: "",
  medicalConditions: "",
  plan: "",
  paid: null as boolean | null,
  startDate: "",
  endDate: "",
  activeCustomers: 0,
  status: "",
});

const totalPages = computed(() => Math.ceil(filteredCustomers.value.length / itemsPerPage));
const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage);
const paginationEnd = computed(() => Math.min(paginationStart.value + itemsPerPage, filteredCustomers.value.length));

const filteredCustomers = computed(() => {
  let result = [...customers.value];
  if (filterType.value) {
    result = result.filter((customer) => customer.type === filterType.value);
  }
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (customer) =>
        customer.email?.toLowerCase().includes(query) ||
        customer.name?.toLowerCase().includes(query) ||
        customer.firstName?.toLowerCase().includes(query) ||
        customer.lastName?.toLowerCase().includes(query),
    );
  }
  return result;
});

const displayedCustomers = computed(() => {
  return filteredCustomers.value.slice(paginationStart.value, paginationEnd.value);
});

async function fetchCustomers() {
  loading.value = true;
  error.value = "";
  try {
    const userStr = localStorage.getItem("user");
    let token = "";
    if (userStr) {
      const userData = JSON.parse(userStr);
      token = userData.token;
    }
    if (!token) {
      error.value = "Authentication required. Please log in again.";
      loading.value = false;
      return;
    }
    const data = await api.getCustomers("2");
    customers.value = data.map((customer: any) => ({
      id: customer.id,
      email: customer.email,
      name: customer.name || "",
      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      type: customer.type,
      age: customer.age,
      height: customer.height,
      gender: customer.gender,
      allergies: customer.allergies_details || customer.allergies,
      medicalConditions: customer.medical_conditions_details || customer.medicalConditions,
      details: customer.details,
      createdAt: customer.createdAt || customer.created_at,
      plan: customer.plan,
      paid: customer.paid,
    }));
    currentPage.value = 1;
  } catch (err: any) {
    console.error("Error fetching customers:", err);
    error.value = err.response?.data?.error || "Failed to fetch customers.";
  } finally {
    loading.value = false;
  }
}

function searchCustomers() {
  currentPage.value = 1;
}

function filterCustomers() {
  currentPage.value = 1;
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function closeDetailsModal() {
  detailsModalVisible.value = false;
}

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
    await api.deleteUser(customerToDelete.value.id);
    deleteModalVisible.value = false;
    customerToDelete.value = null;
    await fetchCustomers();
  } catch (err: any) {
    console.error("Error deleting customer:", err);
    error.value = "Failed to delete customer.";
  }
}

function openEditModal(customer: Customer) {
  const safeCustomer = {
    id: customer.id || "",
    email: customer.email || "",
    name: customer.name || "",
    firstName: customer.firstName || "",
    lastName: customer.lastName || "",
    type: customer.type || "",
    age: customer.age || null,
    height: customer.height || "",
    gender: customer.gender || "",
    allergies: customer.allergies || "",
    medicalConditions: customer.medicalConditions || "",
    details: customer.details || "",
    createdAt: customer.createdAt || "",
    plan: customer.plan || "",
    paid: customer.paid,
  };
  customerToEdit.value = safeCustomer;
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

  let planTitle = "";
  let planStartDate = "";
  let planEndDate = "";
  let planActiveCustomers = 0;
  let planStatus = "";

  if (typeof safeCustomer.plan === "string" && (safeCustomer.plan.startsWith("{") || safeCustomer.plan.startsWith("["))) {
    try {
      const planObj = JSON.parse(safeCustomer.plan);
      planTitle = planObj.title || "";
      planStartDate = planObj.start_date || "";
      planEndDate = planObj.end_date || "";
      planActiveCustomers = planObj.active_customers || 0;
      planStatus = planObj.status || "";
    } catch (e) {
      planTitle = safeCustomer.plan;
    }
  } else if (typeof safeCustomer.plan === "object" && safeCustomer.plan) {
    planTitle = safeCustomer.plan.title || "";
    planStartDate = safeCustomer.plan.start_date || "";
    planEndDate = safeCustomer.plan.end_date || "";
    planActiveCustomers = safeCustomer.plan.active_customers || 0;
    planStatus = safeCustomer.plan.status || "";
  } else {
    planTitle = safeCustomer.plan;
  }

  editForm.plan = planTitle;
  editForm.startDate = planStartDate;
  editForm.endDate = planEndDate;
  editForm.activeCustomers = planActiveCustomers;
  editForm.status = planStatus;
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
    const payload = {
      ...editForm,
      plan: JSON.stringify({
        title: editForm.plan,
        start_date: editForm.startDate,
        end_date: editForm.endDate,
        active_customers: editForm.activeCustomers,
        status: editForm.status,
      }),
    };
    await api.updateUser(editForm.id, payload);
    editModalVisible.value = false;
    await fetchCustomers();
  } catch (err: any) {
    console.error("Error updating customer:", err);
    error.value = "Failed to update customer.";
  } finally {
    updatePending.value = false;
  }
}

function formatPlan(plan: any) {
  if (!plan) return "-";
  if (typeof plan === "string" && (plan.startsWith("{") || plan.startsWith("["))) {
    try { return JSON.parse(plan).title || plan; } catch (e) { return plan; }
  }
  return plan.title || plan;
}

function getPlanStartDate(plan: any) {
  if (!plan) return "";
  try {
    const p = typeof plan === "string" ? JSON.parse(plan) : plan;
    return p.start_date || "";
  } catch (e) { return ""; }
}

function getPlanEndDate(plan: any) {
  if (!plan) return "";
  try {
    const p = typeof plan === "string" ? JSON.parse(plan) : plan;
    return p.end_date || "";
  } catch (e) { return ""; }
}

function formatPaidStatus(paid: any) {
  if (paid === true || paid === 1 || paid === "1") return "Paid";
  if (paid === false || paid === 0 || paid === "0") return "Unpaid";
  return "Unknown";
}

onMounted(() => {
  fetchCustomers();
});
</script>

<style scoped>
.loader {
  border: 4px solid rgba(0,0,0,0.1);
  border-top: 4px solid #D05E33;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for better look */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
