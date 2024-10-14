<!-- components/BaseFooter.vue -->
<template>
  <footer class="bg-white dark:bg-black flex flex-col items-center w-full font-montserrat">
    <!-- Main Links Section -->
    <div class="flex flex-col md:flex-row justify-start items-start w-full">
      <!-- Column 1 -->
      <div class="w-full md:w-1/3 flex justify-center p-4 md:p-8">
        <div class="flex flex-col w-auto text-center md:text-left">
          <a href="#" class="text-black dark:text-white text-base sm:text-lg tracking-wide mb-2 hover:underline"
            >ABOUT</a
          >
          <a href="#" class="text-black dark:text-white text-base sm:text-lg tracking-wide mb-2 hover:underline"
            >CONTACT</a
          >
          <a href="#" class="text-black dark:text-white text-base sm:text-lg tracking-wide mb-2 hover:underline"
            >SHOP</a
          >
        </div>
      </div>

      <!-- Column 2 -->
      <div class="w-full md:w-1/3 flex justify-center p-4 md:p-8">
        <div class="flex flex-col w-auto text-center md:text-left">
          <a href="#" class="text-black dark:text-white text-base sm:text-lg tracking-wide mb-2 hover:underline"
            >PRIVACY POLICY</a
          >
          <a href="#" class="text-black dark:text-white text-base sm:text-lg tracking-wide mb-2 hover:underline">FAQ</a>
        </div>
      </div>

      <!-- Column 3 (Logo and Socials) -->
      <div class="w-full md:w-1/3 flex flex-col justify-center items-center px-4 md:px-8 pt-0">
        <div class="w-auto mb-4">
          <img
            src="/logo2.jpeg"
            alt="Company Logo"
            class="invert-0 dark:invert-100 w-12 lg:w-14 mx-auto max-md:h-[80px] rotate-[-90deg]"
          />
        </div>
        <div class="flex justify-center items-center gap-6">
          <a href="#" aria-label="Facebook">
            <img
              src="/facebook-svgrepo-com.svg"
              alt="Facebook"
              class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200 invert dark:invert-0"
            />
          </a>
          <a href="#" aria-label="Twitter">
            <img
              src="/twitter-2-svgrepo-com.svg"
              alt="Twitter"
              class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200 invert dark:invert-0"
            />
          </a>
          <a href="#" aria-label="Instagram">
            <img
              src="/instagram-round-svgrepo-com.svg"
              alt="Instagram"
              class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200 invert dark:invert-0"
            />
          </a>
        </div>
      </div>
    </div>

    <!-- Copyright and Sponsor Section -->
    <div class="flex flex-col justify-center p-4 w-full text-center text-gray-700 dark:text-gray-300 text-sm">
      <p class="mb-4">&copy; 2024 Perf. All rights reserved.</p>

      <div class="w-full h-[1px] bg-gray-300 dark:bg-gray-600 mb-4"></div>

      <p class="mb-4">POWERED BY</p>

      <div class="flex flex-col md:flex-row justify-center items-center p-4 gap-6">
        <div class="flex flex-col justify-center items-center">
          <img
            src="/airbnb-179-svgrepo-com.svg"
            alt="Airbnb"
            class="object-cover w-14 lg:w-20 mb-2 max-md:h-[40px] invert dark:invert-0"
          />
          <p class="text-sm lg:text-xl font-semibold text-black dark:text-white">AIRBNB</p>
        </div>

        <div class="h-[1px] w-full md:w-[1px] md:h-20 lg:h-40 bg-gray-300 dark:bg-gray-600 my-4 md:my-0"></div>

        <div class="flex flex-col justify-center items-center">
          <img
            src="/booking-svgrepo-com.svg"
            alt="Booking"
            class="object-cover w-14 lg:w-20 mb-2 max-md:h-[40px] invert dark:invert-0"
          />
          <p class="text-sm lg:text-xl font-semibold text-black dark:text-white">BOOKING</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No script needed unless adding interactivity
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap");

.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

/* Responsiveness adjustments */
.footer {
  padding: 1rem 0;
}

a {
  transition: color 0.3s ease;
}

a:hover {
  color: #ffd700; /* Gold color on hover */
}

/* Ensure images stay proportional */
img {
  object-fit: contain;
}

/* Media Queries for better responsiveness */
@media (min-width: 768px) {
  footer {
    padding: 2rem 0;
  }
}

@media (max-width: 640px) {
  footer {
    padding: 1rem;
  }

  .text-base {
    font-size: 0.875rem;
  }
}
</style>
