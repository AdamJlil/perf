<template>
  <footer class="bg-black flex flex-col items-center w-full font-montserrat">

    <!-- Main Links Section -->
    <div class="flex flex-col md:flex-row justify-center items-center w-full">

      <!-- Column 1 -->
      <div class="w-full md:w-1/3 flex justify-center p-4 md:p-8">
        <div class="flex flex-col w-auto text-center md:text-left">
          <a href="#" class="text-white text-base sm:text-lg tracking-wide mb-2 hover:underline">ABOUT</a>
          <a href="#" class="text-white text-base sm:text-lg tracking-wide mb-2 hover:underline">CONTACT</a>
          <a href="#" class="text-white text-base sm:text-lg tracking-wide mb-2 hover:underline">SHOP</a>
        </div>       
      </div>

      <!-- Column 2 -->
      <div class="w-full md:w-1/3 flex justify-center p-4 md:p-8">
        <div class="flex flex-col w-auto text-center md:text-left">
          <a href="#" class="text-white text-base sm:text-lg tracking-wide mb-2 hover:underline">PRIVACY POLICY</a>
          <a href="#" class="text-white text-base sm:text-lg tracking-wide mb-2 hover:underline">FAQ</a>
        </div>       
      </div>

      <!-- Column 3 (Logo and Socials) -->
      <div class="w-full md:w-1/3 flex flex-col justify-center items-center p-4 md:p-8">
        <div class="w-auto mb-4">
          <img src="/public/logo2.jpeg" alt="logo" class="invert w-12 lg:w-14 mx-auto">
        </div>  
        <div class="flex justify-center items-center gap-6">
          <img src="/public/facebook-svgrepo-com.svg" alt="Facebook" class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200">
          <img src="/public/twitter-2-svgrepo-com.svg" alt="Twitter" class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200">
          <img src="/public/instagram-round-svgrepo-com.svg" alt="Instagram" class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200">
        </div>     
      </div>

    </div>

    <!-- Copyright and Sponsor Section -->
    <div class="flex flex-col justify-center p-4 w-full text-center text-gray-100 text-sm">
      <p class="mb-4">&copy; 2024 Perf. All rights reserved.</p>

      <div class="w-full h-[1px] bg-gray-500 mb-4"></div>

      <p class="mb-4">POWERED BY</p>

      <div class="flex flex-col md:flex-row justify-center items-center p-4 gap-6">
        <div class="flex flex-col justify-center items-center">
          <img src="/public/airbnb-179-svgrepo-com.svg" alt="Airbnb" class="object-cover w-14 lg:w-20 mb-2">
          <p class="text-base lg:text-xl font-semibold">AIRBNB</p>
        </div>

        <div class="h-[1px] w-full md:w-[1px] md:h-20 lg:h-40 bg-gray-500 my-4 md:my-0"></div>

        <div class="flex flex-col justify-center items-center">
          <img src="/public/booking-svgrepo-com.svg" alt="Booking" class="object-cover w-14 lg:w-20 mb-2">
          <p class="text-base lg:text-xl font-semibold">BOOKING</p>
        </div>
      </div>

    </div>

  </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');

.font-montserrat {
  font-family: 'Montserrat', sans-serif;
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
