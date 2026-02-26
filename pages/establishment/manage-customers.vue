<script lang="ts" setup>
import Bloc1 from "~/components/features/Sections/Nutrition/BlocOne.vue";
import { ref, reactive, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

definePageMeta({
  middleware: ["auth"],
});

const { user: currentUser } = useAuth();

interface CustomerLocal {
  id: string;
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

const baseURL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? ""
    : "";

const route = useRoute();
const customers = ref<CustomerLocal[]>([]);
const loading = ref(false);
const error = ref("");
const userName = computed(() => currentUser.value?.first_name || "Establishment Manager");

const selectedCustomer = ref<CustomerLocal | null>(null);
const showModal = ref(false);
const showConfirmDialog = ref(false);

const openCustomerDetails = (customer: CustomerLocal) => {
  selectedCustomer.value = customer;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  showConfirmDialog.value = false;
  selectedCustomer.value = null;
};

const confirmRemove = async () => {
  if (selectedCustomer.value) {
    const name = `${selectedCustomer.value.firstName} ${selectedCustomer.value.lastName}`;
    try {
      await $fetch('/api/users/customers/delete', {
        method: 'POST',
        body: { id: selectedCustomer.value.id }
      });
      useToast().success(`Access removed for ${name}`);
      await fetchCustomers();
      closeModal();
    } catch (err) {
      useToast().error("Failed to remove customer.");
    }
  }
};

onMounted(async () => {
  await fetchCustomers();
});

const fetchCustomers = async () => {
  loading.value = true;
  try {
    const data = await $fetch<any[]>('/api/users/customers');
    customers.value = data.map((customer: any) => ({
      id: customer.id || customer._id,
      et_customer_id: customer.et_customer_id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      ageRange: customer.ageRange,
      weightRange: customer.weightRange,
      video: customer.video,
      burnedCalories: customer.burnedCalories,
    }));
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    useToast().error("Could not load customers.");
  } finally {
    loading.value = false;
  }
};

const calorieEntriesToDisplay = computed(() => {
  if (!selectedCustomer.value?.burnedCalories) return {};
  return selectedCustomer.value.burnedCalories;
});

const shouldShowCalorieHistory = computed(() => {
  return selectedCustomer.value && Object.keys(calorieEntriesToDisplay.value).length > 0;
});
</script>

<template>
  <div
    class="w-full min-h-screen flex flex-col justify-center items-center relative p-4 pt-12 bg-[#EFEFEC] my-0"
    style="font-family: Montserrat"
  >
    <Bloc1
      class="my-[150px]"
      :reversed="true"
      :show-button="false"
      image="/images/coach.png"
      :heading-text="`HEY ${userName},<br/>MANAGE YOUR CUSTOMERS HERE`"
    />

    <!-- Customer Management Section (Section 2) -->
    <section v-if="currentUser?.paid" class="w-full max-w-5xl bg-[#EFEFEC] rounded-lg p-6 my-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-12 text-center uppercase tracking-[4px]">
        {{ userName }}'s Customers
      </h2>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D05E33]"></div>
      </div>

      <div v-else-if="customers.length === 0" class="text-center text-gray-400 py-20 italic tracking-[2px]">
        No customers found in your dashboard.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="customer in customers"
          :key="customer.id"
          class="bg-white/60 backdrop-blur-md rounded-[30px] p-8 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300 cursor-pointer group"
          @click="openCustomerDetails(customer)"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-white"
            >
              {{ customer.firstName?.[0] || "" }}{{ customer.lastName?.[0] || "" }}
            </div>
            
            <h3 class="text-lg font-bold text-gray-800 mb-1 uppercase tracking-tight">{{ customer.firstName }} {{ customer.lastName }}</h3>
            <p class="text-xs text-gray-400 mb-6 font-medium">{{ customer.email }}</p>

            <div class="w-full grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div class="text-center">
                <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Videos</span>
                <span class="text-base font-bold text-[#D05E33]">{{ customer.video || 0 }}</span>
              </div>
              <div class="text-center border-l border-gray-100">
                <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Age</span>
                <span class="text-base font-bold text-gray-700">{{ customer.ageRange || "-" }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Modal -->
      <Transition name="fade">
        <div
          v-if="showModal"
          class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          @click="closeModal"
        >
          <div class="bg-[#EFEFEC] rounded-[40px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20" @click.stop>
            <div class="p-10">
              <div class="flex justify-between items-start mb-10">
                <div class="flex items-center gap-6">
                  <div class="w-20 h-20 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-300 font-bold text-3xl">
                    {{ selectedCustomer?.firstName?.[0] || "" }}
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-gray-800 uppercase tracking-tight">{{ selectedCustomer?.firstName }} {{ selectedCustomer?.lastName }}</h2>
                    <p class="text-sm text-gray-400 font-medium tracking-wide">{{ selectedCustomer?.email }}</p>
                  </div>
                </div>
                <button class="text-gray-400 hover:text-gray-800 transition-colors" @click="closeModal">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div class="space-y-8">
                <div class="grid grid-cols-2 gap-6">
                  <div class="bg-white/40 p-6 rounded-[25px] border border-white/50">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Age Group</h3>
                    <p class="text-lg font-bold text-gray-800">{{ selectedCustomer?.ageRange || "N/A" }}</p>
                  </div>
                  <div class="bg-white/40 p-6 rounded-[25px] border border-white/50">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Weight Group</h3>
                    <p class="text-lg font-bold text-gray-800">{{ selectedCustomer?.weightRange || "N/A" }}</p>
                  </div>
                </div>

                <div v-if="shouldShowCalorieHistory" class="bg-white/40 p-8 rounded-[30px] border border-white/50">
                  <h3 class="text-xs font-bold text-gray-500 uppercase tracking-[3px] mb-6 border-b border-gray-200 pb-4">Activity Logs</h3>
                  <div class="space-y-4">
                    <div v-for="(calories, day) in calorieEntriesToDisplay" :key="day" class="flex items-center justify-between">
                      <span class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ day }}</span>
                      <span class="text-base font-bold text-[#D05E33]">{{ calories }} kcal</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 pt-6">
                  <NuxtLink
                    :to="`/establishment/program?customerId=${selectedCustomer?.id}`"
                    class="flex-1 text-center uppercase border border-black text-black bg-transparent py-4 rounded-xl font-bold tracking-[2px] hover:bg-black hover:text-white transition-all duration-300 text-xs"
                  >
                    Start Program
                  </NuxtLink>
                  <button
                    class="flex-1 uppercase border border-red-100 text-red-400 bg-transparent py-4 rounded-xl font-bold tracking-[2px] hover:bg-red-50 transition-all duration-300 text-xs"
                    @click.stop="showConfirmDialog = true"
                  >
                    Remove Access
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div class="mt-16 flex justify-center">
        <NuxtLink to="/establishment/quiz" class="group flex flex-col items-center gap-4">
          <div class="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-[#D05E33] group-hover:scale-110 transition-all duration-500">
            <svg class="w-6 h-6 text-gray-300 group-hover:text-[#D05E33]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </div>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-[3px] group-hover:text-gray-800 transition-colors">Add New Customer</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Payment Pending Placeholder -->
    <section v-else class="w-full max-w-5xl bg-white/40 backdrop-blur-md rounded-[40px] p-12 md:p-20 my-12 text-center border border-white/20 shadow-sm">
       <div class="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D05E33" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail-warning"><path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M20 14v4"/><path d="M20 22v.01"/></svg>
       </div>
       <h2 class="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-[6px] mb-6">Payment Pending</h2>
       <p class="text-gray-500 max-w-md mx-auto leading-relaxed text-sm md:text-base font-medium">
         We sent an email with the instructions. <br class="hidden md:block"/>
         Waiting for proceeding payment to unlock all features.
       </p>
       <div class="mt-12 pt-10 border-t border-gray-100">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[3px]">Need help? Contact support at contact@perf.ma</p>
       </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
