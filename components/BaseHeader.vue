<!-- components/Sections/Nutrition/Header.vue -->
<script lang="ts" setup>
import ThemeToggle from "~/components/ThemeToggle.vue";

const currentUser = useAuthUser();
const isAdmin = useAdmin();
const { logout } = useAuth();
const form = reactive({
  pending: false,
});

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

async function onLogoutClick() {
  try {
    form.pending = true;
    await logout();
    await navigateTo("/");
    closeMenu();
  } catch (error) {
    console.error(error);
  } finally {
    form.pending = false;
  }
}

const isActive = (route: string): boolean => {
  const currentPath = useRoute().path;
  return route === "/" ? currentPath === "/" : currentPath.includes(route);
};

const isWorkoutProgram = ref(true);
const isNutritionProgram = ref(true);
</script>

<template>
  <header
    class="dark:text-slate-500 absolute top-0 left-0 right-0 z-50 mt-[30px]"
    style="font-family: Montserrat"
    :class="{
      'text-black': isActive('/nutritionPlans') || isActive('/login'),
      'text-white': !isActive('/nutritionPlans') && !isActive('/login'),
    }"
  >
    <div class="p-3 w-full flex items-center justify-between pr-[30px]">
      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden z-20 ml-[20px]" aria-label="Toggle Menu">
        <span class="block w-6 h-0.5 bg-current mb-1"></span>
        <span class="block w-6 h-0.5 bg-current mb-1"></span>
        <span class="block w-6 h-0.5 bg-current"></span>
      </button>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex md:gap-5 lg:gap-15 items-right justify-end w-full">
        <template v-if="currentUser">
          <div class="flex items-center justify-between w-full">
            <div>
              <NuxtLink
                v-if="!isAdmin && isWorkoutProgram"
                to="/privateWorkoutProgram"
                class="px-3 text-shadow-white text-white dark:text-white"
                :class="{
                  'font-bold': isActive('/privateWorkoutProgram'),
                  'font-light': !isActive('/privateWorkoutProgram'),
                }"
                @click="closeMenu"
              >
                Your Workout Programme
              </NuxtLink>
              <NuxtLink
                v-if="!isAdmin && isNutritionProgram"
                to="/privateNutritionProgram"
                class="px-3 text-shadow-white text-white dark:text-white"
                :class="{
                  'font-bold': isActive('/privateNutritionProgram'),
                  'font-light': !isActive('/privateNutritionProgram'),
                }"
                @click="closeMenu"
              >
                Your Nutrition Programme
              </NuxtLink>
              <NuxtLink
                v-if="isAdmin"
                to="/admin"
                class="px-3 font-semibold text-shadow-white text-white dark:text-white"
                @click="closeMenu"
              >
                Admin
              </NuxtLink>
            </div>
            <div class="flex items-center gap-[30px]">
              <!-- Theme Toggle Button -->
              <!-- <ThemeToggle /> -->

              <!-- Logout Button -->
              <button
                class="py-1.5 px-3 rounded bg-light-100 dark:bg-gray-700 font-semibold text-sm text-slate-950 dark:text-white hover:bg-light-700 dark:hover:bg-gray-600 transition-colors"
                :disabled="form.pending"
                @click="onLogoutClick"
                aria-label="Logout"
              >
                Logout
              </button>

              <!-- User Profile Image -->
              <div class="flex justify-center items-center gap-[15px]">
                <div
                  class="h-[60px] w-[60px] rounded-full overflow-hidden bg-center bg-cover"
                  style="background-image: url(&quot;/images/user.png&quot;)"
                  aria-label="User Profile"
                ></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          
          <NuxtLink
            to="/"
            class="px-3 text-shadow-white"
            :class="{
              'text-black': isActive('/nutritionPlans') || isActive('/login'),
              'font-bold': isActive('/'),
              'font-light': !isActive('/')
            }"
            @click="closeMenu"
          >
            HOME
          </NuxtLink>

          {{ console.log(isActive('/login')) }}
          <NuxtLink
            to="/workoutPrograms"
            class="px-3 text-shadow-white"
            :class="{ 
              'text-black': isActive('/nutritionPlans') || isActive('/login'),
              'font-bold': isActive('/workoutPrograms'), 
              'font-light': !isActive('/workoutPrograms') 
            }"
            @click="closeMenu"
          >
            WORKOUT PROGRAMS
          </NuxtLink>
          <NuxtLink
            to="/nutritionPlans"
            class="px-3 text-shadow-white"
            :class="{ 
                  'text-black': isActive('/nutritionPlans') || isActive('/login'),
                  'font-bold': isActive('/nutritionPlans'), 
                  'font-light': !isActive('/nutritionPlans') 
              }"
            @click="closeMenu"
          >
            NUTRITION PLANS
          </NuxtLink>
          <NuxtLink
            to="/products"
            class="px-3 text-shadow-white"
            :class="{ 
                'text-black': isActive('/nutritionPlans') || isActive('/login'),
                'font-bold': isActive('/products'), 
                'font-light': !isActive('/products') 
              }"
            @click="closeMenu"
          >
            OUR PRODUCTS
          </NuxtLink>
          <!-- <ThemeToggle /> -->
        </template>
      </nav>

      <!-- Mobile Overlay -->
      <div
        v-show="isMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="closeMenu"
        aria-hidden="true"
      ></div>

      <!-- Mobile Menu -->
      <div
        :class="[
          'fixed h-full top-0 left-0 bottom-0 max-md:w-full w-[350px] bg-[#EFEFEC] dark:bg-gray-800 z-40 transform transition-transform duration-300 ease-in-out h-[90vh]',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full',
        ]"
        aria-label="Mobile Navigation"
      >
        <nav class="flex flex-col px-[25px] pt-[60px] relative">
          <!-- Close Button -->
          <div class="absolute top-[20px] right-[15px] cursor-pointer" @click="closeMenu" aria-label="Close Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.281 18.2198C19.3507 18.2895 19.406 18.3722 19.4437 18.4632C19.4814 18.5543 19.5008 18.6519 19.5008 18.7504C19.5008 18.849 19.4814 18.9465 19.4437 19.0376C19.406 19.1286 19.3507 19.2114 19.281 19.281C19.2114 19.3507 19.1286 19.406 19.0376 19.4437C18.9465 19.4814 18.849 19.5008 18.7504 19.5008C18.6519 19.5008 18.5543 19.4814 18.4632 19.4437C18.3722 19.406 18.2895 19.3507 18.2198 19.281L12.0004 13.0607L5.78104 19.281C5.64031 19.4218 5.44944 19.5008 5.25042 19.5008C5.05139 19.5008 4.86052 19.4218 4.71979 19.281C4.57906 19.1403 4.5 18.9494 4.5 18.7504C4.5 18.5514 4.57906 18.3605 4.71979 18.2198L10.9401 12.0004L4.71979 5.78104C4.57906 5.64031 4.5 5.44944 4.5 5.25042C4.5 5.05139 4.57906 4.86052 4.71979 4.71979C4.86052 4.57906 5.05139 4.5 5.25042 4.5C5.44944 4.5 5.64031 4.57906 5.78104 4.71979L12.0004 10.9401L18.2198 4.71979C18.3605 4.57906 18.5514 4.5 18.7504 4.5C18.9494 4.5 19.1403 4.57906 19.281 4.71979C19.4218 4.86052 19.5008 5.05139 19.5008 5.25042C19.5008 5.44944 19.4218 5.64031 19.281 5.78104L13.0607 12.0004L19.281 18.2198Z"
                fill="#B4ADBD"
              />
            </svg>
          </div>

          <template v-if="currentUser">
            <NuxtLink
              v-if="!isAdmin && isWorkoutProgram"
              to="/privateWorkoutProgram"
              class="mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{
                'font-bold': isActive('/privateWorkoutProgram'),
                'font-light': !isActive('/privateWorkoutProgram'),
              }"
              @click="closeMenu"
            >
              Your Workout Programme
            </NuxtLink>
            <NuxtLink
              v-if="!isAdmin && isNutritionProgram"
              to="/privateNutritionProgram"
              class="mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{
                'font-bold': isActive('/privateNutritionProgram'),
                'font-light': !isActive('/privateNutritionProgram'),
              }"
              @click="closeMenu"
            >
              Your Nutrition Programme
            </NuxtLink>
            <NuxtLink
              v-if="isAdmin"
              to="/admin"
              class="py-2 mb-[10px] font-semibold text-shadow-white text-black dark:text-white"
              @click="closeMenu"
            >
              Admin
            </NuxtLink>
            <!-- Theme Toggle in Mobile Menu -->
            <!-- <ThemeToggle class="mb-4" /> -->

            <button
              class="py-1.5 px-3 mt-2 rounded bg-light-100 dark:bg-gray-700 font-semibold text-sm text-slate-950 dark:text-white hover:bg-light-700 dark:hover:bg-gray-600 transition-colors"
              :disabled="form.pending"
              @click="onLogoutClick"
              aria-label="Logout"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <NuxtLink
              to="/"
              class="py-2 mt-[30px] mb-[10px] text-shadow-white text-black"
              :class="{ 'font-bold': isActive('/'), 'font-light': !isActive('/') }"
              @click="closeMenu"
            >
              HOME
            </NuxtLink>
            <NuxtLink
              to="/workoutPrograms"
              class="py-2 mb-[10px] text-shadow-white text-black"
              :class="{ 'font-bold': isActive('/workoutPrograms'), 'font-light': !isActive('/workoutPrograms') }"
              @click="closeMenu"
            >
              WORKOUT PROGRAMS
            </NuxtLink>
            <NuxtLink
              to="/nutritionPlans"
              class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{ 'font-bold': isActive('/nutritionPlans'), 'font-light': !isActive('/nutritionPlans') }"
              @click="closeMenu"
            >
              NUTRITION PLANS
            </NuxtLink>
            <NuxtLink
              to="/products"
              class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{ 'font-bold': isActive('/products'), 'font-light': !isActive('/products') }"
              @click="closeMenu"
            >
              OUR PRODUCTS
            </NuxtLink>
            <!-- Theme Toggle in Mobile Menu -->
            <!-- <ThemeToggle /> -->
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Custom Text Shadow Class */

:global(.light-mode) .text-shadow-white {
  text-shadow: 4px 1px 20px rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .md\:hidden {
    display: block;
  }
  .md\:flex {
    display: none;
  }
}
</style>
