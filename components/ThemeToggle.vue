<!-- components/ThemeToggle.vue -->
<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    :aria-label="`Switch to ${isDark.value ? 'light' : 'dark'} mode`"
  >
    <!-- Sun Icon for Light Mode -->
    <svg
      v-if="!isDark.value"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-yellow-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m8.66-8.66h-1M4.34 12.34h-1m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
      />
    </svg>
    <!-- Moon Icon for Dark Mode -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-200"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Reactive state for theme
const isDark = ref(false);

// Function to toggle theme
const toggleTheme = () => {
  isDark.value = !isDark.value;
  updateTheme();
};

// Function to update theme classes and localStorage
const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
};

// Function to handle system theme changes
const handleSystemThemeChange = (e: MediaQueryListEvent) => {
  if (!localStorage.getItem("theme")) {
    isDark.value = e.matches;
    updateTheme();
  }
};

let prefersDark: MediaQueryList;

// Lifecycle hook: Runs only on client-side after component is mounted
onMounted(() => {
  // Initialize theme based on localStorage or system preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    isDark.value = savedTheme === "dark";
  } else {
    prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    isDark.value = prefersDark.matches;
  }
  updateTheme();

  // Listen to system theme changes
  if (prefersDark) {
    if (prefersDark.addEventListener) {
      prefersDark.addEventListener("change", handleSystemThemeChange);
    } else if (prefersDark.addListener) {
      // For older browsers
      prefersDark.addListener(handleSystemThemeChange);
    }
  }
});

// Clean up event listeners when component is unmounted
onUnmounted(() => {
  if (prefersDark) {
    if (prefersDark.removeEventListener) {
      prefersDark.removeEventListener("change", handleSystemThemeChange);
    } else if (prefersDark.removeListener) {
      // For older browsers
      prefersDark.removeListener(handleSystemThemeChange);
    }
  }
});
</script>

<style scoped>
button {
  transition:
    background-color 0.3s,
    color 0.3s;
}
</style>
