<!-- components/layout/BaseHeader.vue -->
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "#app";

const route = useRoute();
const router = useRouter();
const { user, logout, me } = useAuth();

const isHeroLoginVisible = useState("isHeroLoginVisible", () => true);

const isUpdatingPicture = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  const file = target.files[0];
  if (file.size > 2 * 1024 * 1024) {
    useToast().error("Image must be smaller than 2MB");
    return;
  }

  const reader = new FileReader();
  reader.onload = async () => {
    isUpdatingPicture.value = true;
    try {
      const base64 = reader.result as string;
      await $fetch("/api/users/update-profile", {
        method: "POST",
        body: { profile_picture: base64 },
      });
      await me(); // Refresh user data to show new picture
      useToast().success("Profile picture updated!");
    } catch (e) {
      useToast().error("Failed to update picture");
    } finally {
      isUpdatingPicture.value = false;
    }
  };
  reader.readAsDataURL(file);
};

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
      class="w-full max-w-7xl h-20 px-4 md:px-8 flex items-center justify-between transition-all duration-500 rounded-[25px] border border-white/20 shadow-sm"
      :class="[isScrolled ? 'bg-white/70 backdrop-blur-xl shadow-lg h-16' : 'bg-[#EFEFEC]/40 backdrop-blur-md']"
    >
      <!-- Left Section: Logo & Profile -->
      <div class="flex items-center gap-4 md:gap-6">
        <NuxtLink to="/" class="flex items-center">
          <img src="/images/pepe.png" alt="PERF Logo" class="h-8 md:h-10 w-auto object-contain" />
        </NuxtLink>

        <template v-if="isLoggedIn">
          <div class="flex items-center gap-3 border-l-[2px] border-[#D05E334A] pl-4 md:pl-6 ml-0 md:ml-2">
            <!-- Profile Picture Avatar -->
            <button
              class="hidden md:flex relative w-12 h-12 rounded-full border border-gray-200 overflow-hidden group shadow-sm bg-white items-center justify-center transition-all hover:border-[#D05E33]"
              :disabled="isUpdatingPicture"
              title="Edit profile picture"
              @click="triggerFileInput"
            >
              <div v-if="isUpdatingPicture" class="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
                <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>

              <img
                v-if="user?.profile_picture"
                :src="user.profile_picture"
                class="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-gray-400 group-hover:text-[#D05E33]"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>

              <!-- Edit Overlay on Hover -->
              <div
                class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </div>
            </button>

            <!-- Welcome Message -->
            <div class="hidden md:flex flex-col items-start">
              <span class="text-[10px] font-bold uppercase tracking-[1px] text-gray-400">Welcome back!</span>
              <span class="text-[14px] font-black uppercase tracking-[2px] text-black leading-none">{{
                user?.first_name
              }}</span>
            </div>
          </div>
        </template>
      </div>

      <!-- Desktop Center Navigation -->
      <div v-if="!isLoggedIn" class="hidden lg:flex items-center gap-10">
        <template
          v-for="item in [
            { name: 'Hospitality', path: '/' },
            { name: 'About Us', path: '/aboutUs' },
            { name: 'Contact', path: '/contact' },
          ]"
          :key="item.path"
        >
          <NuxtLink
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
        </template>
      </div>

      <div class="relative flex items-center gap-[15px]">
        <template v-if="isLoggedIn">
          <!-- Hidden File Input -->
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileUpload" />

          <!-- Switch Tab for Dashboard, My Plan & Contact - CONSISTENT EVERYWHERE -->
          <div class="hidden lg:flex items-center bg-gray-100/80 p-1 rounded-full border border-gray-200 shadow-inner">
            <NuxtLink
              to="/establishment/manage-customers"
              class="px-5 py-2 text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 rounded-full"
              :class="[
                isActive('/establishment/manage-customers')
                  ? 'bg-white text-black shadow-sm'
                  : 'text-gray-400 hover:text-gray-600',
              ]"
            >
              Dashboard
            </NuxtLink>
            <NuxtLink
              to="/myPlan"
              class="px-5 py-2 text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 rounded-full"
              :class="[isActive('/myPlan') ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600']"
            >
              My Plan
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="px-5 py-2 text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 rounded-full"
              :class="[isActive('/contact') ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600']"
            >
              Contact
            </NuxtLink>
          </div>

          <!-- Fixed Logout Button - HIDDEN ON MOBILE -->
          <button
            class="hidden lg:block ml-2 px-6 py-2 rounded-full bg-black text-white border border-black text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-gray-800 hover:border-gray-800"
            @click="handleLogout"
          >
            Logout
          </button>
        </template>
        <template v-else>
          <button
            class="hidden lg:block px-8 py-2 rounded-full bg-black text-white text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-[#D05E33] hover:shadow-lg active:scale-95"
            @click="handleSignUpClick"
          >
            Sign Up
          </button>
          <NuxtLink
            v-if="route.path !== '/auth/login' && (route.path !== '/' || !isHeroLoginVisible)"
            to="/auth/login"
            class="hidden lg:block ml-2 px-8 py-2 rounded-full border border-black text-black text-[10px] font-bold tracking-[2px] uppercase transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
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
      <div v-if="isMenuOpen" class="fixed inset-0 z-[110] bg-white/98 backdrop-blur-3xl lg:hidden flex flex-col p-8">
        <!-- Mobile Header (Logo + Close) -->
        <div class="flex items-center justify-between mb-16">
          <div class="flex flex-col items-start">
            <img src="/images/pepe.png" alt="PERF Logo" class="h-8 object-contain" />
            <p
              v-if="isLoggedIn"
              class="text-[10px] font-black uppercase tracking-[3px] text-[#D05E33] mt-2 animate-pulse"
            >
              Hey, {{ user?.first_name }}
            </p>
          </div>
          <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" @click="closeMenu">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="flex flex-col items-center gap-8 w-full flex-1 justify-center">
          <template
            v-for="item in [
              { name: 'Hospitality', path: '/' },
              { name: 'About Us', path: '/aboutUs' },
              { name: 'Contact', path: '/contact' },
            ]"
            :key="item.path"
          >
            <NuxtLink
              v-if="!isLoggedIn"
              :to="item.path"
              class="text-2xl font-bold tracking-[6px] uppercase text-gray-800 hover:text-[#D05E33] transition-colors"
              @click="closeMenu"
            >
              {{ item.name }}
            </NuxtLink>
          </template>

          <div v-if="isLoggedIn" class="w-full flex flex-col items-center gap-8 mt-8 border-t border-gray-100 pt-12">
            <!-- Mobile Switch Tab - CONSISTENT -->
            <div class="flex flex-col w-full max-w-xs gap-4">
              <NuxtLink
                to="/establishment/manage-customers"
                class="w-full py-4 rounded-2xl text-center font-bold uppercase tracking-[3px] transition-all"
                :class="[
                  isActive('/establishment/manage-customers')
                    ? 'bg-black text-white shadow-xl'
                    : 'bg-gray-100 text-gray-500',
                ]"
                @click="closeMenu"
              >
                Dashboard
              </NuxtLink>
              <NuxtLink
                to="/myPlan"
                class="w-full py-4 rounded-2xl text-center font-bold uppercase tracking-[3px] transition-all"
                :class="[isActive('/myPlan') ? 'bg-black text-white shadow-xl' : 'bg-gray-100 text-gray-500']"
                @click="closeMenu"
              >
                My Plan
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="w-full py-4 rounded-2xl text-center font-bold uppercase tracking-[3px] transition-all"
                :class="[isActive('/contact') ? 'bg-black text-white shadow-xl' : 'bg-gray-100 text-gray-500']"
                @click="closeMenu"
              >
                Contact
              </NuxtLink>
            </div>

            <!-- Mobile Avatar & Logout -->
            <div class="flex flex-col items-center gap-6 mt-4">
              <button
                class="relative w-20 h-24 rounded-full flex flex-col items-center gap-3 group"
                @click="triggerFileInput"
              >
                <div
                  class="relative w-16 h-16 rounded-full border-2 border-gray-200 overflow-hidden shadow-lg bg-white flex items-center justify-center"
                >
                  <img v-if="user?.profile_picture" :src="user.profile_picture" class="w-full h-full object-cover" />
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="text-gray-300"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-[2px]">Change Photo</span>
              </button>

              <button
                class="px-12 py-4 border-2 border-red-500 text-red-500 font-bold uppercase tracking-[4px] rounded-2xl hover:bg-red-50 transition-all active:scale-95 mt-4"
                @click="handleLogout"
              >
                Logout
              </button>
            </div>
          </div>

          <template v-else>
            <div class="w-full flex flex-col items-center gap-4 mt-8 border-t border-gray-100 pt-12">
              <button
                class="w-full max-w-xs py-5 bg-black text-white font-bold uppercase tracking-[4px] rounded-2xl shadow-xl active:scale-95"
                @click="
                  () => {
                    handleSignUpClick();
                    closeMenu();
                  }
                "
              >
                Sign Up
              </button>
              <NuxtLink
                v-if="route.path !== '/auth/login' && (route.path !== '/' || !isHeroLoginVisible)"
                to="/auth/login"
                class="w-full max-w-xs py-5 border-2 border-black text-black text-center font-bold uppercase tracking-[4px] rounded-2xl active:scale-95"
                @click="closeMenu"
              >
                Login
              </NuxtLink>
            </div>
          </template>
        </div>
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
