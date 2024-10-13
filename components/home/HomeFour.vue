<template>
    <div class="h-[70vh] w-full flex justify-center items-center"  style="font-family: Montserrat;">
      <!-- Left Image Section with Text -->
      <div class="w-1/2 h-full relative">
        <img src="/images/blockfour1.jpg" alt="Workout Image 1" class="w-full h-full object-cover" />
        <div class="absolute bottom-[50px] left-[35px] text-left">
          <p class="text-white text-lg md:text-2xl lg:text-3xl mb-[50px]" style="font-weight: 500;">AT HOME, OUTDOORS, OR WHILE TRAVELING!</p>
          <nuxt-link to="/login" class="rtexts text-white tracking-normal border border-[#ffffff38] py-[10px] px-[70px]  text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" style="font-weight: 300;">
            MORE
          </nuxt-link>
        </div>
      </div>
  
      <!-- Right Image Section -->
      <div class="w-1/2 h-full">
        <img src="/images/blockfour2.jpg" alt="Workout Image 2" class="w-full h-full object-cover object-top max-md:object-left" />
      </div>
    </div>
  </template>
  