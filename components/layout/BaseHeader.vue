<!-- components/layout/BaseHeader.vue -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "#app";

const route = useRoute();
const router = useRouter();
const { user, logout } = useAuth();

const handleSignUpClick = () => {
  if (route.path === "/") {
    const el = document.getElementById("pricing-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push("/").then(() => {
      // Small timeout to ensure page content is loaded
      setTimeout(() => {
        const el = document.getElementById("pricing-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
    });
  }
};
const isMenuOpen = ref(false);
const isScrolled = ref(false);

const isLoggedIn = computed(() => !!user.value);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (isMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "auto";
};

async function handleLogout() {
  await logout();
  closeMenu();
}

const isActive = (path: string) => {
  if (path === "/" && route.path === "/") return true;
  if (path !== "/" && route.path.startsWith(path)) return true;
  return false;
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center px-4"
    :class="[isScrolled ? 'pt-4' : 'pt-8']"
  >
    <nav
      class="w-full max-w-7xl h-20 px-8 flex items-center justify-between transition-all duration-500 rounded-[25px] border border-white/20 shadow-sm"
      :class="[isScrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg h-16' : 'bg-[#EFEFEC]/40 backdrop-blur-md']"
    >
      <!-- Brand Logo -->
      <NuxtLink to="/" class="flex items-center">
        <img src="/images/pepe.png" alt="PERF Logo" class="h-8 md:h-10 w-auto object-contain" />
      </NuxtLink>

      <!-- Desktop Center Navigation -->
      <div class="hidden lg:flex items-center gap-10">
        <NuxtLink
          v-for="item in [
            { name: 'Hospitality', path: '/' },
            { name: 'About', path: '/aboutUs' },
            { name: 'Contact', path: '/contact' },
          ]"
          :key="item.path"
          :to="item.path"
          class="text-[10px] font-bold tracking-[3px] uppercase transition-all duration-300 relative py-2"
          :class="[isActive(item.path) ? 'text-[#D05E33]' : 'text-gray-600 hover:text-black']"
        >
          {{ item.name }}
          <span
            class="absolute bottom-0 left-0 w-full h-[2px] bg-[#D05E33] transition-transform duration-500 origin-left"
            :class="[isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100']"
          ></span>
        </NuxtLink>
      </div>

      <div class="relative flex items-center gap-[15px]">
        <template v-if="isLoggedIn">
          <!-- Switch Tab for Dashboard & My Plan -->
          <div class="flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200 shadow-inner">
            <NuxtLink
              to="/establishment/manage-customers"
              class="px-5 py-2 text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 rounded-full"
              :class="[isActive('/establishment/manage-customers') 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-400 hover:text-gray-600']"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/myPlan"
              class="px-5 py-2 text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 rounded-full"
              :class="[isActive('/myPlan') 
                ? 'bg-white text-black shadow-sm' 
                : 'text-gray-400 hover:text-gray-600']"
            >
              My Plan
            </NuxtLink>
          </div>

          <!-- Fixed Logout Button -->
          <button
            class="ml-2 px-6 py-2 rounded-full bg-black text-white border border-black text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-gray-800 hover:border-gray-800"
            @click="handleLogout"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <button
            class="px-8 py-2 rounded-full bg-black text-white text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-[#D05E33] hover:shadow-lg active:scale-95"
            @click="handleSignUpClick"
          >
            Sign Up
          </button>
          <NuxtLink
            v-if="route.path !== '/' && route.path !== '/auth/login'"
            to="/auth/login"
            class="ml-2 px-8 py-2 rounded-full border border-black text-black text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
          >
            Login
          </NuxtLink>
        </template>
      </div>

      <!-- Mobile Menu Trigger -->
      <button class="lg:hidden flex flex-col gap-1.5 p-2 transition-transform active:scale-90" @click="toggleMenu">
        <span
          class="w-6 h-0.5 bg-black transition-all duration-300"
          :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
        ></span>
        <span class="w-6 h-0.5 bg-black transition-all duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
        <span
          class="w-6 h-0.5 bg-black transition-all duration-300"
          :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
        ></span>
      </button>
    </nav>

    <!-- Mobile Navigation Overlay -->
    <Transition name="fade-slide">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-[110] bg-white/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center p-10"
      >
        <div class="flex flex-col items-center gap-10 w-full">
          <NuxtLink
            v-for="item in [
              { name: 'Hospitality', path: '/' },
              { name: 'About Us', path: '/aboutUs' },
              { name: 'Contact', path: '/contact' },
              { name: 'Dashboard', path: '/establishment/manage-customers', auth: true },
              { name: 'My Plan', path: '/myPlan', auth: true },
            ]"
            v-show="!item.auth || isLoggedIn"
            :key="item.path"
            :to="item.path"
            class="text-xl font-bold tracking-[5px] uppercase text-gray-800"
            @click="closeMenu"
          >
            {{ item.name }}
          </NuxtLink>

          <template v-if="isLoggedIn">
            <button
              class="w-full max-w-xs py-4 border-2 border-red-500 text-red-500 font-bold uppercase tracking-[4px] rounded-xl hover:bg-red-50"
              @click="handleLogout"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <button
              class="w-full max-w-xs py-4 bg-black text-white font-bold uppercase tracking-[4px] rounded-xl mb-4"
              @click="() => { handleSignUpClick(); closeMenu(); }"
            >
              Sign Up
            </button>
            <NuxtLink
              v-if="route.path !== '/' && route.path !== '/auth/login'"
              to="/auth/login"
              class="w-full max-w-xs py-4 border-2 border-black text-black text-center font-bold uppercase tracking-[4px] rounded-xl"
              @click="closeMenu"
            >
              Login
            </NuxtLink>
          </template>
        </div>

        <button
          class="absolute top-10 right-10 p-4 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          @click="closeMenu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Text shadow for better visibility on images */
.text-shadow-white {
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
}
</style>
