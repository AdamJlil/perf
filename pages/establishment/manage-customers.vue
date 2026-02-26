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
  age?: number;
  weight?: number;
  ageRange?: string;
  weightRange?: string;
  profile_picture?: string | null;
}

const isUpdatingPicture = ref(false);
const targetCustomerId = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const triggerCustomerFileInput = (customerId: string) => {
  targetCustomerId.value = customerId;
  fileInput.value?.click();
};

const handleCustomerFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length || !targetCustomerId.value) return;

  const file = target.files[0];
  if (file.size > 2 * 1024 * 1024) {
    useToast().error("Image must be smaller than 2MB");
    return;
  }

  const customer = customers.value.find((c) => c.id === targetCustomerId.value);
  if (!customer) return;

  const reader = new FileReader();
  reader.onload = async () => {
    isUpdatingPicture.value = true;
    try {
      const base64 = reader.result as string;

      await $fetch("/api/users/customers/add", {
        method: "POST",
        body: {
          ...customer,
          profile_picture: base64,
        },
      });

      await fetchCustomers(); // Refresh list
      useToast().success("Customer picture updated!");
    } catch (e) {
      console.error(e);
      useToast().error("Failed to update customer picture");
    } finally {
      isUpdatingPicture.value = false;
      targetCustomerId.value = null;
    }
  };
  reader.readAsDataURL(file);
};

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
const isEditMode = ref(false);
const isSaving = ref(false);

const editForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  age: 0,
  weight: 0,
});

const openCustomerDetails = (customer: CustomerLocal) => {
  selectedCustomer.value = customer;
  isEditMode.value = false;
  showModal.value = true;
};

const enterEditMode = () => {
  if (selectedCustomer.value) {
    editForm.firstName = selectedCustomer.value.firstName || "";
    editForm.lastName = selectedCustomer.value.lastName || "";
    editForm.email = selectedCustomer.value.email || "";
    editForm.age = selectedCustomer.value.age || 0;
    editForm.weight = selectedCustomer.value.weight || 0;
    isEditMode.value = true;
  }
};

const saveCustomerEdits = async () => {
  if (!selectedCustomer.value) return;

  isSaving.value = true;
  try {
    await $fetch("/api/users/customers/add", {
      method: "POST",
      body: {
        ...selectedCustomer.value,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        age: editForm.age,
        weight: editForm.weight,
      },
    });

    useToast().success("Customer updated successfully!");
    await fetchCustomers();

    // Update selected customer state
    if (selectedCustomer.value) {
      selectedCustomer.value = {
        ...selectedCustomer.value,
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        age: editForm.age,
        weight: editForm.weight,
      };
    }

    isEditMode.value = false;
  } catch (err) {
    useToast().error("Failed to update customer.");
  } finally {
    isSaving.value = false;
  }
};

const draggedItemIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
  draggedItemIndex.value = index;
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const onDrop = async (index: number) => {
  if (draggedItemIndex.value === null || !selectedCustomer.value) return;
  if (draggedItemIndex.value === index) return;

  // Convert current logs to an ordered array of values
  const days = Object.keys(selectedCustomer.value.burnedCalories).sort((a, b) => {
    const numA = parseInt(a.replace("Day ", "")) || 0;
    const numB = parseInt(b.replace("Day ", "")) || 0;
    return numA - numB;
  });

  const values = days.map((day) => selectedCustomer.value!.burnedCalories[day]);

  // Reorder values
  const movedValue = values.splice(draggedItemIndex.value, 1)[0];
  values.splice(index, 0, movedValue);

  // Reconstruct the object with new Day N keys
  const updatedBurnedCalories: { [key: string]: number } = {};
  values.forEach((kcal, i) => {
    updatedBurnedCalories[`Day ${i + 1}`] = kcal;
  });

  try {
    await $fetch("/api/users/customers/add", {
      method: "POST",
      body: {
        ...selectedCustomer.value,
        burnedCalories: updatedBurnedCalories,
      },
    });

    selectedCustomer.value.burnedCalories = updatedBurnedCalories;
    useToast().success("Order updated!");
    await fetchCustomers();
  } catch (err) {
    useToast().error("Failed to reorder logs.");
  } finally {
    draggedItemIndex.value = null;
  }
};

const deleteCalorieEntry = async (day: string) => {
  if (!selectedCustomer.value) return;

  const updatedBurnedCalories = { ...selectedCustomer.value.burnedCalories };
  delete updatedBurnedCalories[day];

  try {
    await $fetch("/api/users/customers/add", {
      method: "POST",
      body: {
        ...selectedCustomer.value,
        burnedCalories: updatedBurnedCalories,
      },
    });

    selectedCustomer.value.burnedCalories = updatedBurnedCalories;
    useToast().success(`${day} log deleted.`);
    await fetchCustomers();
  } catch (err) {
    useToast().error("Failed to delete log.");
  }
};

const updateCalorieEntry = async (day: string, newValue: string) => {
  if (!selectedCustomer.value) return;

  const kcalValue = parseInt(newValue);
  if (isNaN(kcalValue)) return;

  const updatedBurnedCalories = { ...selectedCustomer.value.burnedCalories };
  updatedBurnedCalories[day] = kcalValue;

  try {
    await $fetch("/api/users/customers/add", {
      method: "POST",
      body: {
        ...selectedCustomer.value,
        burnedCalories: updatedBurnedCalories,
      },
    });

    selectedCustomer.value.burnedCalories = updatedBurnedCalories;
    useToast().success(`${day} updated!`);
    await fetchCustomers();
  } catch (err) {
    useToast().error("Failed to update log.");
  }
};

const addManualCalorieEntry = async () => {
  if (!selectedCustomer.value) return;

  const burnedCalories = selectedCustomer.value.burnedCalories || {};
  const nextDayNum = Object.keys(burnedCalories).length + 1;
  const newDayLabel = `Day ${nextDayNum}`;

  const updatedBurnedCalories = { ...burnedCalories, [newDayLabel]: 0 };

  try {
    await $fetch("/api/users/customers/add", {
      method: "POST",
      body: {
        ...selectedCustomer.value,
        burnedCalories: updatedBurnedCalories,
      },
    });

    selectedCustomer.value.burnedCalories = updatedBurnedCalories;
    useToast().success(`New session added: ${newDayLabel}`);
    await fetchCustomers();
  } catch (err) {
    useToast().error("Failed to add new day.");
  }
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
      await $fetch("/api/users/customers/delete", {
        method: "POST",
        body: { id: selectedCustomer.value.id },
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
    const data = await $fetch<any[]>("/api/users/customers");
    customers.value = data.map((customer: any) => ({
      id: customer.id || customer._id,
      et_customer_id: customer.et_customer_id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      age: customer.age,
      weight: customer.weight,
      ageRange: customer.ageRange,
      weightRange: customer.weightRange,
      video: customer.video,
      burnedCalories: customer.burnedCalories,
      profile_picture: customer.profile_picture,
    }));
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    useToast().error("Could not load customers.");
  } finally {
    loading.value = false;
  }
};

const calorieEntriesToDisplay = computed(() => {
  if (!selectedCustomer.value?.burnedCalories) return [];

  // Convert to array of { day, kcal } and sort by day number
  return Object.entries(selectedCustomer.value.burnedCalories)
    .map(([day, kcal]) => ({ day, kcal }))
    .sort((a, b) => {
      const numA = parseInt(a.day.replace("Day ", "")) || 0;
      const numB = parseInt(b.day.replace("Day ", "")) || 0;
      return numA - numB;
    });
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
      class="my-[50px]"
      :reversed="true"
      :show-button="false"
      image="/images/coach.png"
      :heading-text="`HEY ${userName},<br/>MANAGE YOUR CUSTOMERS HERE`"
    />

    <!-- Hidden File Input for Customer Pictures -->
    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleCustomerFileUpload" />

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
          class="bg-white/60 backdrop-blur-md rounded-[30px] p-8 shadow-sm border border-white/20 hover:shadow-md transition-all duration-300 cursor-pointer group relative overflow-hidden"
          @click="openCustomerDetails(customer)"
        >
          <div class="flex flex-col items-center text-center">
            <!-- Customer Avatar with Edit Button -->
            <div class="relative mb-6">
              <div
                class="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl transition-transform duration-300 border-2 border-white group-hover:scale-105 shadow-sm"
              >
                <img
                  v-if="customer.profile_picture"
                  :src="customer.profile_picture"
                  class="w-full h-full object-cover"
                />
                <span v-else>{{ customer.firstName?.[0] || "" }}{{ customer.lastName?.[0] || "" }}</span>
              </div>

              <!-- Individual Edit Button -->
              <button
                class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center border-2 border-[#EFEFEC] hover:bg-[#D05E33] transition-colors shadow-lg z-10"
                :disabled="isUpdatingPicture && targetCustomerId === customer.id"
                title="Change photo"
                @click.stop="triggerCustomerFileInput(customer.id)"
              >
                <div
                  v-if="isUpdatingPicture && targetCustomerId === customer.id"
                  class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"
                ></div>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </button>
            </div>

            <h3 class="text-lg font-bold text-gray-800 mb-1 uppercase tracking-tight">
              {{ customer.firstName }} {{ customer.lastName }}
            </h3>
            <p class="text-xs text-gray-400 mb-6 font-medium">{{ customer.email }}</p>

            <div class="w-full grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div class="text-center">
                <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Videos</span>
                <span class="text-base font-bold text-[#D05E33]">{{ customer.video || 0 }}</span>
              </div>
              <div class="text-center border-l border-gray-100">
                <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Age</span>
                <span class="text-base font-bold text-gray-700">{{ customer.age || "-" }}</span>
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
          <div
            class="bg-[#EFEFEC] rounded-[40px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            @click.stop
          >
            <div class="p-10">
              <div class="flex justify-between items-start mb-10">
                <div class="flex items-center gap-6">
                  <div
                    class="w-20 h-20 rounded-full overflow-hidden bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-300 font-bold text-3xl"
                  >
                    <img
                      v-if="selectedCustomer?.profile_picture"
                      :src="selectedCustomer.profile_picture"
                      class="w-full h-full object-cover"
                    />
                    <span v-else>{{ selectedCustomer?.firstName?.[0] || "" }}</span>
                  </div>
                  <div>
                    <div v-if="!isEditMode">
                      <h2 class="text-2xl font-bold text-gray-800 uppercase tracking-tight">
                        {{ selectedCustomer?.firstName }} {{ selectedCustomer?.lastName }}
                      </h2>
                      <p class="text-sm text-gray-400 font-medium tracking-wide">{{ selectedCustomer?.email }}</p>
                    </div>
                    <div v-else class="space-y-3">
                      <div class="flex gap-2">
                        <input
                          v-model="editForm.firstName"
                          class="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm font-bold w-32 focus:border-[#D05E33] outline-none"
                          placeholder="First Name"
                        />
                        <input
                          v-model="editForm.lastName"
                          class="bg-white border border-gray-200 rounded-lg px-3 py-1 text-sm font-bold w-32 focus:border-[#D05E33] outline-none"
                          placeholder="Last Name"
                        />
                      </div>
                      <input
                        v-model="editForm.email"
                        class="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs w-full focus:border-[#D05E33] outline-none"
                        placeholder="Email Address"
                      />
                    </div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    v-if="!isEditMode"
                    class="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                    title="Edit Customer"
                    @click="enterEditMode"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                  </button>
                  <button
                    v-else
                    class="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-md"
                    :disabled="isSaving"
                    @click="saveCustomerEdits"
                  >
                    <div
                      v-if="isSaving"
                      class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                    ></div>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                  <button class="text-gray-400 hover:text-gray-800 transition-colors p-2" @click="closeModal">
                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="space-y-8">
                <div class="grid grid-cols-2 gap-6">
                  <div class="bg-white/40 p-6 rounded-[25px] border border-white/50">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Age</h3>
                    <p v-if="!isEditMode" class="text-xl font-bold text-gray-800">
                      {{ selectedCustomer?.age || "N/A" }} <span class="text-xs text-gray-400 font-normal">Years</span>
                    </p>
                    <input
                      v-else
                      v-model="editForm.age"
                      type="number"
                      class="bg-white border border-gray-200 rounded-lg px-3 py-1 text-lg font-bold w-full focus:border-[#D05E33] outline-none"
                    />
                  </div>
                  <div class="bg-white/40 p-6 rounded-[25px] border border-white/50">
                    <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-2">Weight</h3>
                    <p v-if="!isEditMode" class="text-xl font-bold text-gray-800">
                      {{ selectedCustomer?.weight || "N/A" }} <span class="text-xs text-gray-400 font-normal">kg</span>
                    </p>
                    <input
                      v-else
                      v-model="editForm.weight"
                      type="number"
                      class="bg-white border border-gray-200 rounded-lg px-3 py-1 text-lg font-bold w-full focus:border-[#D05E33] outline-none"
                    />
                  </div>
                </div>

                <div class="bg-white/40 p-8 rounded-[30px] border border-white/50">
                  <h3
                    class="text-xs font-bold text-gray-500 uppercase tracking-[3px] mb-6 border-b border-gray-200 pb-4 flex justify-between items-center"
                  >
                    <span>Activity Logs</span>
                    <button
                      class="text-[10px] uppercase font-bold text-[#D05E33] hover:underline flex items-center gap-1"
                      @click="addManualCalorieEntry"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      Add Day
                    </button>
                  </h3>
                  <div v-if="calorieEntriesToDisplay.length > 0" class="space-y-4">
                    <div
                      v-for="(entry, index) in calorieEntriesToDisplay"
                      :key="entry.day"
                      class="flex items-center justify-between group/log p-2 rounded-xl transition-all"
                      :class="{
                        'opacity-50 scale-95': draggedItemIndex === index,
                        'bg-white/20': draggedItemIndex !== index,
                      }"
                      draggable="true"
                      @dragstart="onDragStart(index)"
                      @dragover="onDragOver"
                      @drop="onDrop(index)"
                    >
                      <div class="flex items-center gap-3">
                        <div
                          class="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <circle cx="9" cy="5" r="1" />
                            <circle cx="9" cy="12" r="1" />
                            <circle cx="9" cy="19" r="1" />
                            <circle cx="15" cy="5" r="1" />
                            <circle cx="15" cy="12" r="1" />
                            <circle cx="15" cy="19" r="1" />
                          </svg>
                        </div>
                        <span class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ entry.day }}</span>
                      </div>
                      <div class="flex items-center gap-4">
                        <div class="relative">
                          <input
                            :value="entry.kcal"
                            type="number"
                            class="bg-transparent border-b border-transparent focus:border-[#D05E33] text-right text-base font-bold text-[#D05E33] w-20 outline-none transition-colors"
                            @change="(e) => updateCalorieEntry(entry.day, (e.target as HTMLInputElement).value)"
                          />
                          <span class="text-[10px] text-gray-400 ml-1">kcal</span>
                        </div>
                        <button
                          class="opacity-0 group-hover/log:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"
                          title="Delete Log"
                          @click="deleteCalorieEntry(entry.day)"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-4 pt-6">
                  <NuxtLink
                    :to="`/establishment/program?customerId=${selectedCustomer?.id}`"
                    class="flex-1 text-center uppercase border-2 border-black text-black bg-transparent py-5 rounded-xl font-bold tracking-[2px] hover:bg-black hover:text-white transition-all duration-300 text-xs active:scale-95 shadow-sm"
                  >
                    Start Program
                  </NuxtLink>
                  <button
                    class="flex-1 uppercase border-2 border-red-100 text-red-400 bg-transparent py-5 rounded-xl font-bold tracking-[2px] hover:bg-red-50 transition-all duration-300 text-xs active:scale-95"
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
          <div
            class="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center group-hover:border-[#D05E33] group-hover:scale-110 transition-all duration-500"
          >
            <svg
              class="w-6 h-6 text-gray-300 group-hover:text-[#D05E33]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span
            class="text-xs font-bold text-gray-400 uppercase tracking-[3px] group-hover:text-gray-800 transition-colors"
            >Add New Customer</span
          >
        </NuxtLink>
      </div>
    </section>

    <!-- Payment Pending Placeholder -->
    <section
      v-else
      class="w-full max-w-5xl bg-white/40 backdrop-blur-md rounded-[40px] p-12 md:p-20 my-12 text-center border border-white/20 shadow-sm"
    >
      <div class="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D05E33"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-mail-warning"
        >
          <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          <path d="M20 14v4" />
          <path d="M20 22v.01" />
        </svg>
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-[6px] mb-6">Payment Pending</h2>
      <p class="text-gray-500 max-w-md mx-auto leading-relaxed text-sm md:text-base font-medium">
        We sent an email with the instructions. <br class="hidden md:block" />
        Waiting for proceeding payment to unlock all features.
      </p>
      <div class="mt-12 pt-10 border-t border-gray-100">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[3px]">
          Need help? Contact support at contact@perf.ma
        </p>
      </div>
    </section>
  </div>
</template>

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
