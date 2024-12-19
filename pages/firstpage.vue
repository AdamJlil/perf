<template>
 <div class="pt-[100px] pb-[100px] pl-[50px] pr-[50px] bg-black text-black bg-[#EFEFEC]">
    <div class="bg-[#EFEFEC] dark:bg-black max-md:h-fit max-lg:h-[35vh] lg:h-[50vh] flex max-md:flex-col justify-center items-center text-center p-[30px] lg:mt-[50px] lg:mb-[50px] gap-[10%] max-md:gap-[50px] max-md:py-[80px]">
      
    <!-- First Card -->
    <div class="cursor-pointer relative w-[25%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px] group overflow-hidden rounded-[80px] max-lg:rounded-[50px]">
      <div class="absolute inset-0 border shadow-2xl"
          style="background-image: url('/images/index1.png'); background-size: cover; background-position: center;">
      </div>
      <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </div>

    <!-- Second Card -->
    <nuxt-link to="/" class="cursor-pointer relative w-[25%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px] group overflow-hidden rounded-[80px] max-lg:rounded-[50px]">
      <div class="absolute inset-0 border shadow-2xl"
          style="background-image: url('/images/index2.png'); background-size: cover; background-position: center;">
      </div>
      <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </nuxt-link>


    </div>
 </div>
</template>