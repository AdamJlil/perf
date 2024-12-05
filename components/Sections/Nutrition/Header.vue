<!-- components/Sections/Nutrition/Header.vue -->
<template>
  <header
    class="bg-white dark:bg-black flex flex-col md:flex-row items-center w-full h-[100vh]"
    style="font-family: Montserrat"
  >
    <!-- Left Section: Image -->
    <div class="w-full h-full flex flex-col justify-center items-center mt-20">
      <div
        class="w-full md:w-4/5 h-full bg-contain bg-center"
        :style="{ backgroundImage: `url(${currentBackgroundImage})` }"
        aria-label="Healthy Eating Image"
      ></div>
    </div>

    <!-- Right Section: Content -->
    <div class="w-full md:w-3/7 flex flex-col content-around p-8 bg-white dark:bg-black">
      <!-- Title -->
      <h1 class="text-2xl lg:text-4xl md:text-2xl font-normal text-center mb-6 py-10 text-black dark:text-white">
        HEALTHY EATING.<br />FOR EVERY BUDGET
      </h1>

      <!-- Buttons -->
      <div class="flex flex-col md:flex-row gap-4 md:gap-8 w-full  md:max-w-none justify-center items-center z-10 py-10 md:py-5">
        <NuxtLink
          to="/login"
          class="text-black dark:text-white border border-black dark:border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg sm:text-sm max-md:w-[140px] md:w-[200px] lg:w-[300px] text-nowrap"
          style="font-weight: 300"
          aria-label="Log In"
        >
          LOG IN
        </NuxtLink>
        <NuxtLink
          to="/join"
          class="text-black dark:text-white border border-black dark:border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg max-md:w-[140px] md:w-[200px] lg:w-[300px] text-nowrap"
          style="font-weight: 300"
          aria-label="Join In"
        >
          JOIN
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isDarkMode = ref(false);
const currentBackgroundImage = ref("/images/Nutrition1.png"); // Default light mode image

// Function to update background image based on theme
const updateBackgroundImage = () => {
  if (isDarkMode.value) {
    currentBackgroundImage.value = "/images/Nutrition1-dark.png";
  } else {
    currentBackgroundImage.value = "/images/Nutrition1.png";
  }
};

// Function to handle theme changes
const handleThemeChange = () => {
  isDarkMode.value = document.documentElement.classList.contains("dark");
  updateBackgroundImage();
};

// Initialize theme on client-side
onMounted(() => {
  handleThemeChange();

  // Observe class changes on <html> to detect theme toggling
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        handleThemeChange();
      }
    });
  });

  observer.observe(document.documentElement, { attributes: true });

  // Cleanup on unmount
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<style scoped>
/* Custom Styles */

/* Ensure the image div scales properly using Tailwind's built-in utilities */
.bg-contain {
  /* Tailwind's bg-contain already applies background-size: contain; */
  background-repeat: no-repeat;
}

/* Responsive Typography */
h1 {
  line-height: 1.2;
}

/* Button Styles */
button,
a {
  display: inline-block;
}

/* Optional: Add smooth transitions to shadows */
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
