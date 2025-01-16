<script lang="ts" setup>
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import type { Customer } from '~/types';

definePageMeta({
  middleware: ["user-only"],
});

const route = useRoute();
const userName = ref('');
const customers = ref<Customer[]>([]);

onMounted(async () => {
  const userId = route.query.userId as string;
  if (userId) {
    const { getUserById } = await import('~/server/models/user');
    const user = await getUserById(userId);
    if (user) {
      userName.value = user.name;
      if (user.customers) {
        customers.value = user.customers;
      }
    }
  }
});

// Utility to generate non-repeating warm background colors
let usedColors: string[] = [];
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

const showModal = ref(false);
const selectedUserId = ref<string | null>(null);

// Open confirmation modal
const confirmDelete = (id: string) => {
  selectedUserId.value = id;
  showModal.value = true;
};

// Delete user
const deleteUser = () => {
  if (selectedUserId.value) {
    customers.value = customers.value.filter(customer => customer.et_customer_id !== selectedUserId.value);
    closeModal();
  }
};

// Close modal
const closeModal = () => {
  showModal.value = false;
  selectedUserId.value = null;
};
</script>

<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat;"
  >
    <Bloc1 
      class="my-[150px]" 
      :reversed="true"  
      :showButton="false" 
      image="/images/coach.png" 
      :headingText="`HEY ${userName}👋,<br/>READY TO UPGRADE YOUR CUSTOMERS EXPERIENCE?`" 
    />

    <!-- New Section: CRUD Users Table -->
    <section class="w-full max-w-5xl bg-[#EFEFEC] rounded-lg p-6 my-12">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Manage Customers</h2>
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left shadow-md rounded-lg bg-[#EFEFEC]">
          <thead>
            <tr class="border-b border-gray-300">
              <th class="py-4 px-4 text-gray-700 font-medium"></th>
              <th class="py-4 px-4 text-gray-700 font-medium text-nowrap">First Name</th>
              <th class="py-4 px-4 text-gray-700 font-medium text-nowrap">Last Name</th>
              <th class="py-4 px-4 text-gray-700 font-medium text-nowrap">Email</th>
              <th class="py-4 px-4 text-gray-700 font-medium text-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(customer, i) in customers"
              :key="i"
              class="border-b border-gray-300 hover:bg-gray-200 transition"
            >
              <nuxt-link
                :to="{ 
                  path: '/establishementProgram', 
                  query: { 
                    userId: route.query.userId,
                    id: customer.et_customer_id 
                  } 
                }"
                class="contents"
              >
                <td class="py-4 px-4">
                  <div
                    class="flex justify-center items-center w-10 h-10 rounded-full text-white font-semibold"
                    :style="{ backgroundColor: generateRandomColor() }"
                  >
                    {{ customer.firstName.charAt(0).toUpperCase() }}
                  </div>
                </td>
                <td class="py-4 px-4">{{ customer.firstName }}</td>
                <td class="py-4 px-4">{{ customer.lastName }}</td>
                <td class="py-4 px-4">{{ customer.email }}</td>
              </nuxt-link>
              <td class="py-4 px-4 flex items-center gap-[10px]">
                <button>
                  <img src="/images/edit-icon3.png" alt="Edit" class="h-5 w-5 cursor-pointer" />
                </button>
                <div class="w-[1px] h-5 bg-gray-400"></div>
                <button @click="confirmDelete(customer.et_customer_id)">
                  <img src="/images/delete-icon3.png" alt="Delete" class="h-5 w-5 cursor-pointer" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <nuxt-link to="/quizEstablishement" class="w-full flex justify-center items-center">
      <div class="flex justify-center items-center gap-[15px] cursor-pointer w-fit hover:bg-[#e7e7e7] p-[20px]">
        <NuxtImg src="/images/plus-icon.png" alt="plus" width="20" height="20" />
        <div class="tracking-normal text-center text-lg cursor-pointer" style="font-weight: 300;">
          ADD NEW CUSTOMER
        </div>
      </div>
    </nuxt-link>

    <!-- Confirmation Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md text-center">
          <h3 class="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
          <p class="text-gray-600 mb-6">Are you sure you want to delete this customer?</p>
          <div class="flex justify-center gap-4">
            <button
              @click="deleteUser"
              class="bg-[#D05E33] text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              @click="closeModal"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, 
.fade-leave-to {
  opacity: 0;
}
</style>
