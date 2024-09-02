<template>
  <footer class="bg-black flex flex-col items-center w-full">

    <!-- Main Links Section -->
    <div class="flex flex-col md:flex-row justify-center align-center w-full">

      <div class="w-full md:w-1/3 flex justify-center p-5 md:p-10">
        <div class="flex flex-col w-auto text-center md:text-left">
          <a href="#" class="text-white text-lg tracking-wide mb-2">ABOUT</a>
          <a href="#" class="text-white text-lg tracking-wide mb-2">CONTACT</a>
          <a href="#" class="text-white text-lg tracking-wide mb-2">SHOP</a>
        </div>       
      </div>

      <div class="w-full md:w-1/3 flex justify-center p-5 md:p-10">
        <div class="flex flex-col w-auto text-center md:text-left">
          <a href="#" class="text-white text-lg tracking-wide mb-2">PRIVACY POLICY</a>
          <a href="#" class="text-white text-lg tracking-wide mb-2">FAQ</a>
        </div>       
      </div>

      <div class="w-full md:w-1/3 flex flex-col justify-center items-center p-5 md:p-10">
        <div class="w-auto mb-4">
          <img src="/public/logo2.jpeg" alt="logo" class="-rotate-90 invert w-10 mx-auto">
        </div>  
        <div class="flex justify-center items-center gap-4">
          <div id="meta-svg">
            <img src="/public/facebook-svgrepo-com.svg" alt="" class="object-cover w-8">
          </div>
          <div id="twitter-svg">
            <img src="/public/twitter-2-svgrepo-com.svg" alt="" class="object-cover w-8">
          </div>
          <div id="ig-svg">
            <img src="/public/instagram-round-svgrepo-com.svg" alt="" class="object-cover w-8">
          </div>
        </div>     
      </div>

    </div>

    <!-- Copyright and Sponsor Section -->
    <div class="flex flex-col justify-center p-4 w-full">
      <p class="text-center text-gray-100 text-sm pb-4">
        &copy; 2024 Perf. All rights reserved.
      </p>

      <div class="w-full h-[1px] bg-gray-500 mb-4"></div>

      <p class="text-center text-gray-100 pt-2">
        POWERED BY 
      </p>

      <div id="sponsor-img" class="flex flex-col md:flex-row justify-center items-center p-5 gap-4">
        <div id="airbnb" class="flex flex-col justify-center items-center mb-4 md:mb-0">
          <img src="public/airbnb-179-svgrepo-com.svg" alt="" class="object-cover w-20">
          <p class="text-xl p-2 font-semibold">AIRBNB</p>
        </div>

        <div class="h-[1px] w-full md:w-[1px] md:h-40 bg-gray-500 my-4 md:my-0"></div>

        <div id="booking" class="flex flex-col justify-center items-center">
          <img src="public/booking-svgrepo-com.svg" alt="" class="object-cover w-20">
          <p class="text-xl font-semibold p-2">BOOKING</p>
        </div>
      </div>

    </div>

  </footer>
</template>
