<!-- components/Sections/Nutrition/Header.vue -->
<script lang="ts" setup>
import ThemeToggle from "~/components/ThemeToggle.vue";

const currentUser = useAuthUser();
const isAdmin = useAdmin();
const route = useRoute();

const { logout } = useAuth();

const isLoggedIn = computed(() => !!currentUser.value);
const isEtablissement = computed(() => currentUser.value?.type === "ESTABLISHEMENT");
const userId = computed(() => currentUser.value?.id || route.query.userId);

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


const languages = ['FR', 'EN']
const currentLanguage = ref('EN')

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (lang: string) => {
  currentLanguage.value = lang
  isOpen.value = false 
}

onMounted(() => {
  window.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      isOpen.value = false
    }
  })
})

</script>


<template>
  <header
    class="dark:text-slate-500 absolute top-0 left-0 right-0 z-50 md:mt-[30px]"
    style="font-family: Montserrat"
    :class="{
      'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
    }"
  >
    <div class="p-3 w-full flex items-center justify-between pr-[30px] max-md:pt-[30px]">
      
      <!-- v-if="currentUser" -->
      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center justify-between w-full px-8 md:mr-[10px]">
        <!-- Logo - Not clickable when logged in as establishment -->
        <div v-if="isLoggedIn">
          <NuxtImg
            src="/images/pepe.png"
            alt="Company Logo"
            class="w-[80px]"
          />
        </div>
        <NuxtLink v-else to="/">
          <NuxtImg
            :src="!isActive('/') && !isActive('/establishementHomePlan') ? '/images/pepe.png' : '/images/logoNN-white.png'"
            alt="Company Logo"
            class="w-[80px]"
          />
        </NuxtLink>        
        <div class="flex gap-5 lg:gap-15 items-center">
          <template v-if="!(isLoggedIn)">
            <NuxtLink
              v-if="isLoggedIn"
              :to="{ 
                path: '/',
                query: { userId: userId }
              }"
              class="px-3 text-shadow-white"
              :class="{
                'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                'font-bold': isActive('/'),
              }"
              @click="closeMenu"
            >
              HOME
            </NuxtLink>
            <NuxtLink
              v-else
              to="/"
              class="px-3 text-shadow-white"
              :class="{
                'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                'font-bold': isActive('/'),
              }"
              @click="closeMenu"
            >
              HOME
            </NuxtLink>
            <NuxtLink
              v-if="isLoggedIn"
              :to="{ 
                path: '/particulierHomePlan',
                query: { userId: userId }
              }"
              class="px-3 text-shadow-white"
              :class="{ 
                  'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                  'font-bold': isActive('/particulierHomePlan'), 
              }"
              @click="closeMenu"
            >
              PERF PROGRAM
            </NuxtLink>
            <NuxtLink
              v-else
              to="/particulierHomePlan"
              class="px-3 text-shadow-white"
              :class="{ 
                  'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                  'font-bold': isActive('/particulierHomePlan'), 
              }"
              @click="closeMenu"
            >
              PERF PROGRAM
            </NuxtLink>
            <NuxtLink
              v-if="isLoggedIn"
              :to="{ 
                path: '/establishementHomePlan',
                query: { userId: userId }
              }"
              class="px-3 text-shadow-white"
              :class="{ 
                  'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                  'font-bold': isActive('/establishementHomePlan'), 
              }"
              @click="closeMenu"
            >
              PERF HOSPITALITY
            </NuxtLink>
            <NuxtLink
              v-else
              to="/establishementHomePlan"
              class="px-3 text-shadow-white"
              :class="{ 
                  'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                  'font-bold': isActive('/establishementHomePlan'), 
              }"
              @click="closeMenu"
            >
              PERF HOSPITALITY
            </NuxtLink>
          </template>
          <NuxtLink
            v-if="isLoggedIn && isEtablissement"
            :to="{ 
              path: '/establishementCRUDCostumer',
              query: { userId: userId }
            }"
            class="px-3 text-shadow-white"
            :class="{ 
                'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                'font-bold': isActive('/establishementCRUDCostumer'), 
            }"
            @click="closeMenu"
          >
            MANAGE USERS
          </NuxtLink>
          <NuxtLink
            v-if="isLoggedIn"
            :to="{ 
              path: '/myPlan',
              query: { userId: userId }
            }"
            class="px-3 text-shadow-white"
            :class="{ 
                'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
            }"
            @click="closeMenu"
          >
            MY PLAN
          </NuxtLink>
          <!-- <NuxtLink
            to="/products"
            class="px-3 text-shadow-white"
            :class="{ 
                'text-black': isActive('/particulierHomePlan') || isActive('/login') || isActive('/signUp'),
                'font-bold': isActive('/products'), 
                'font-light': !isActive('/products') 
            }"
            @click="closeMenu"
          >
            OUR PRODUCTS
          </NuxtLink> -->
        </div>
        <div class="relative flex items-center gap-[15px]">
          <template v-if="!isLoggedIn">
            <NuxtLink
              to="/login"
              class="px-3 text-shadow-white"
              :class="{
                'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
                'font-bold': isActive('/login'),
              }"
              @click="closeMenu"
            >
              LOGIN
            </NuxtLink>
          </template>
          <template v-else>
            <button
              @click="onLogoutClick"
              class="px-3 text-shadow-white"
              :class="{
                'text-black': !isActive('/') && !isActive('/establishementHomePlan'),
              }"
            >
              LOGOUT
            </button>
          </template>
        <div
          class="flex items-center gap-2 cursor-pointer"
          @click="toggleDropdown"
        >
          <img
            :src="currentLanguage === 'EN' ? '/images/usa-flag.png' : '/images/france-flag.png'"
            alt="Current Language"
            class="w-6 h-6"
          />
          <img
            :src="!isActive('/') && !isActive('/establishementHomePlan') ? '/images/down-arrow.png' : '/images/arrow-down-white.png'"
            alt="arrow"
            class="w-4 h-4 transform transition-transform"
            :class="{ 'rotate-180': isOpen }"
          />
        </div>
        <div
          v-if="isOpen"
          class="absolute top-full left-[64px] mt-2 text-black dark:text-white w-20 shadow-lg rounded-sm backdrop-blur-md"
      >
          <div
            v-for="lang in languages"
            :key="lang"
            @click="selectLanguage(lang)"
            class="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-center"
          >
            <img
              :src="lang === 'EN' ? '/images/usa-flag.png' : '/images/france-flag.png'"
              :alt="lang"
              class="w-6 h-6"
            />
          </div>
        </div>
      </div>

      </nav>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="md:hidden z-20 order-1" aria-label="Toggle Menu">
        <span class="block w-6 h-0.5 bg-current mb-1"></span>
        <span class="block w-6 h-0.5 bg-current mb-1"></span>
        <span class="block w-6 h-0.5 bg-current"></span>
      </button>

      <!-- Logo -->
      <NuxtLink to="/" class="order-2 mx-auto  md:hidden">
        <NuxtImg
          :src="!isActive('/') && !isActive('/establishementHomePlan') ? '/images/pepe.png' : '/images/logoNN-white.png'"
          alt="Company Logo"
          class="w-[50px]"
        />
      </NuxtLink>

     <!-- Language Selector en Mobile -->
      <div 
        class="relative hidden max-md:flex items-center gap-2 cursor-pointer order-3" 
        @click.stop="toggleDropdown" 
      >
        <img
          :src="currentLanguage === 'EN' ? '/images/usa-flag.png' : '/images/france-flag.png'"
          alt="Current Language"
          class="w-6 h-6"
        />
        <img
          :src="!isActive('/') && !isActive('/establishementHomePlan') ? '/images/down-arrow.png' : '/images/arrow-down-white.png'"
          alt="arrow"
          class="w-4 h-4 transform transition-transform"
          :class="{ 'rotate-180': isOpen }"
        />
        <div
          v-if="isOpen"
          class="absolute top-full left-[-28px] mt-2 text-black dark:text-white w-20 shadow-lg rounded-sm backdrop-blur-md"
        >
          <div
            v-for="lang in languages"
            :key="lang"
            @click.stop="selectLanguage(lang)"
            class="px-3 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 flex justify-center"
          >
            <img
              :src="lang === 'EN' ? '/images/usa-flag.png' : '/images/france-flag.png'"
              :alt="lang"
              class="w-6 h-6"
            />
          </div>
        </div>
      </div>


      <!-- Mobile Overlay -->
      <div
        v-show="isMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
        @click="closeMenu"
        aria-hidden="true"
      >
      </div>
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
      
          <div class="flex flex-col">
            <template v-if="!(isLoggedIn && isEtablissement)">
              <NuxtLink
                v-if="isLoggedIn"
                :to="{ 
                  path: '/',
                  query: { userId: userId }
                }"
                class="py-2 mb-[10px] text-shadow-white text-black"
                :class="{ 'font-bold': isActive('/'), 'font-light': !isActive('/') }"
                @click="closeMenu"
              >
                HOME
              </NuxtLink>
              <NuxtLink
                v-else
                to="/"
                class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
                :class="{ 'font-bold': isActive('/'), 'font-light': !isActive('/') }"
                @click="closeMenu"
              >
                HOME
              </NuxtLink>
              <NuxtLink
                v-if="isLoggedIn"
                :to="{ 
                  path: '/particulierHomePlan',
                  query: { userId: userId }
                }"
                class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
                :class="{ 'font-bold': isActive('/particulierHomePlan'), 'font-light': !isActive('/particulierHomePlan') }"
                @click="closeMenu"
              >
                PERF PROGRAM
              </NuxtLink>
              <NuxtLink
                v-else
                to="/particulierHomePlan"
                class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
                :class="{ 'font-bold': isActive('/particulierHomePlan'), 'font-light': !isActive('/particulierHomePlan') }"
                @click="closeMenu"
              >
                PERF PROGRAM
              </NuxtLink>
            </template>
            <NuxtLink
              v-if="isLoggedIn && isEtablissement"
              :to="{ 
                path: '/establishementCRUDCostumer',
                query: { userId: userId }
              }"
              class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{ 'font-bold': isActive('/establishementCRUDCostumer'), 'font-light': !isActive('/establishementCRUDCostumer') }"
              @click="closeMenu"
            >
              MANAGE USERS
            </NuxtLink>
            <NuxtLink
              v-if="isLoggedIn"
              :to="{ 
                path: '/establishementProgram',
                query: { userId: userId }
              }"
              class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{ 'font-bold': isActive('/establishementProgram'), 'font-light': !isActive('/establishementProgram') }"
              @click="closeMenu"
            >
              MY PLAN
            </NuxtLink>
            <NuxtLink
              v-if="!isLoggedIn"
              to="/login"
              class="py-2 mb-[10px] text-shadow-white text-black dark:text-white"
              :class="{ 'font-bold': isActive('/login'), 'font-light': !isActive('/login') }"
              @click="closeMenu"
            >
              LOGIN
            </NuxtLink>
            <div
              v-else
              @click="onLogoutClick"
              class="py-2 mb-[10px] text-shadow-white text-black dark:text-white cursor-pointer"
            >
              LOGOUT
            </div>
          </div>
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

.cursor-pointer {
  cursor: pointer;
}

.transition-transform {
  transition: transform 0.2s ease-in-out;
}
</style>
