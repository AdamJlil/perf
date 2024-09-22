<script lang="ts" setup>
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
  return route === '/' ? currentPath === '/' : currentPath.includes(route);
}


const isWorkoutProgram = ref(true);
const isNutritionProgram = ref(true);


</script>

<template>
  <header class="color-white absolute top-0 left-0 right-0 z-50 mt-[30px]" style="font-family: Montserrat;">
    <div class="p-3 w-full flex items-center justify-between">

      <button @click="toggleMenu" class="md:hidden z-20 ml-[20px]">
        <span class="block w-6 h-0.5 bg-white mb-1"></span>
        <span class="block w-6 h-0.5 bg-white mb-1"></span>
        <span class="block w-6 h-0.5 bg-white"></span>
      </button>

      <nav class="hidden md:flex gap-3 items-center w-full">
        <template v-if="currentUser">
          <div class="flex items-center justify-between w-full">
            <div>
              <NuxtLink v-if="!isAdmin && isWorkoutProgram" to="/privateWorkoutProgram" class="px-3" :class="{ 'font-bold': isActive('/privateWorkoutProgram'), 'font-light': !isActive('/privateWorkoutProgram') }" @click="closeMenu">Your Workout Programme</NuxtLink>
              <NuxtLink v-if="!isAdmin && isNutritionProgram" to="/privateNutritionProgram" class="px-3" :class="{ 'font-bold': isActive('/privateNutritionProgram'), 'font-light': !isActive('/privateNutritionProgram') }" @click="closeMenu">Your Nutrition Programme</NuxtLink>
              <NuxtLink v-if="isAdmin" to="/admin" class="px-3 font-semibold">Admin</NuxtLink>
            </div>
            <div class="flex items-center gap-[30px]">
              <button
                class="py-1.5 px-3 rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 transition-colors"
                :disabled="form.pending"
                @click="onLogoutClick"
              >
                Logout
              </button>
  
              <div class="flex justify-center items-center gap-[5px]">
                <NuxtImg src="/images/arrow_down.png" alt="Profile" class="h-[20px] w-[20px] rounded-full overflow-hidden bg-center bg-cover" />
                <div
                  class="h-[40px] w-[40px] rounded-full overflow-hidden bg-center bg-cover"
                  style="background-image: url('/images/soufiane.png'); background-position-x: -6px; background-position-y: 0px;"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/" class="px-3" :class="{ 'font-bold': isActive('/'), 'font-light': !isActive('/') }" @click="closeMenu">HOME</NuxtLink>
          <NuxtLink to="/workoutPrograms" class="px-3" :class="{ 'font-bold': isActive('/workoutPrograms'), 'font-light': !isActive('/workoutPrograms') }" @click="closeMenu">WORKOUT PROGRAMS</NuxtLink>
          <NuxtLink to="/" class="px-3" :class="{ 'font-bold': isActive('/##'), 'font-light': !isActive('/##') }" @click="closeMenu">NUTRITION PLANS</NuxtLink>
          <NuxtLink to="/" class="px-3" :class="{ 'font-bold': isActive('/##'), 'font-light': !isActive('/##') }" @click="closeMenu">OUR PRODUCTS</NuxtLink>
        </template>
      </nav>

      <!-- Menu latéral pour mobile et tablette -->
      <div 
        v-show="isMenuOpen" 
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="closeMenu"
      ></div>

      <div 
        :class="['fixed top-0 left-0 bottom-0 w-64 bg-[#585050] z-40 transform transition-transform duration-300 ease-in-out h-[90vh]', isMenuOpen ? 'translate-x-0' : '-translate-x-full']"
      >
        <nav class="flex flex-col p-4 relative">
          <div class="absolute top-[20px] right-[15px] cursor-pointer" @click="closeMenu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.281 18.2198C19.3507 18.2895 19.406 18.3722 19.4437 18.4632C19.4814 18.5543 19.5008 18.6519 19.5008 18.7504C19.5008 18.849 19.4814 18.9465 19.4437 19.0376C19.406 19.1286 19.3507 19.2114 19.281 19.281C19.2114 19.3507 19.1286 19.406 19.0376 19.4437C18.9465 19.4814 18.849 19.5008 18.7504 19.5008C18.6519 19.5008 18.5543 19.4814 18.4632 19.4437C18.3722 19.406 18.2895 19.3507 18.2198 19.281L12.0004 13.0607L5.78104 19.281C5.64031 19.4218 5.44944 19.5008 5.25042 19.5008C5.05139 19.5008 4.86052 19.4218 4.71979 19.281C4.57906 19.1403 4.5 18.9494 4.5 18.7504C4.5 18.5514 4.57906 18.3605 4.71979 18.2198L10.9401 12.0004L4.71979 5.78104C4.57906 5.64031 4.5 5.44944 4.5 5.25042C4.5 5.05139 4.57906 4.86052 4.71979 4.71979C4.86052 4.57906 5.05139 4.5 5.25042 4.5C5.44944 4.5 5.64031 4.57906 5.78104 4.71979L12.0004 10.9401L18.2198 4.71979C18.3605 4.57906 18.5514 4.5 18.7504 4.5C18.9494 4.5 19.1403 4.57906 19.281 4.71979C19.4218 4.86052 19.5008 5.05139 19.5008 5.25042C19.5008 5.44944 19.4218 5.64031 19.281 5.78104L13.0607 12.0004L19.281 18.2198Z" fill="#B4ADBD"/>
            </svg>
          </div>
          <template v-if="currentUser">
            <NuxtLink v-if="!isAdmin && isWorkoutProgram" to="/privateWorkoutProgram" class="px-3" :class="{ 'font-bold': isActive('/privateWorkoutProgram'), 'font-light': !isActive('/privateWorkoutProgram') }" @click="closeMenu">Your Workout Programme</NuxtLink>
            <NuxtLink v-if="!isAdmin && isNutritionProgram" to="/privateNutritionProgram" class="px-3" :class="{ 'font-bold': isActive('/privateNutritionProgram'), 'font-light': !isActive('/privateNutritionProgram') }" @click="closeMenu">Your Nutrition Programme</NuxtLink>
            <NuxtLink v-if="isAdmin" to="/admin" class="py-2 px-3 font-semibold" @click="closeMenu">Admin</NuxtLink>
            <button
              class="py-1.5 px-3 mt-2 rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 transition-colors"
              :disabled="form.pending"
              @click="onLogoutClick"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/" class="py-2 px-3 mt-[30px]" :class="{ 'font-bold': isActive('/'), 'font-light': !isActive('/') }" @click="closeMenu">HOME</NuxtLink>
            <NuxtLink to="/workoutPrograms" class="py-2 px-3" :class="{ 'font-bold': isActive('/workoutPrograms'), 'font-light': !isActive('/workoutPrograms') }" @click="closeMenu">WORKOUT PROGRAMS</NuxtLink>
            <NuxtLink to="/" class="py-2 px-3" :class="{ 'font-bold': isActive('/##'), 'font-light': !isActive('/##') }" @click="closeMenu">NUTRITION PLANS</NuxtLink>
            <NuxtLink to="/" class="py-2 px-3" :class="{ 'font-bold': isActive('/##'), 'font-light': !isActive('/##') }" @click="closeMenu">OUR PRODUCTS</NuxtLink>
          </template>
        </nav>
      </div>
    </div>
  </header>
</template>



<style scoped>
@media (max-width: 768px) {
  .md\:hidden {
    display: block;
  }
  .md\:flex {
    display: none;
  }
}
</style>