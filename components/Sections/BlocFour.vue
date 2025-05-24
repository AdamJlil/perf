<template>
  <div class="w-full h-[100vh] max-md:h-fit bg-blue text-white flex flex-col justify-center max-md:justify-start items-center gap-8 relative overflow-hidden max-md:py-15" style="font-family: Montserrat;">
    <!-- Video Background -->
    <!-- <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-10">
      <source src="/public/videos/video_04.mp4" type="video/mp4" />
    </video> -->
  
    <!-- Overlay Layer -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
  
    <div class="md:hidden md:right-auto md:w-1/2 text-center md:text-left z-30 px-4">
      <p class="text-white" style="font-weight: 300; letter-spacing: 2px; font-size: clamp(0.75rem, 1vw + 0.25rem, 1rem);">
        WE MONITOR YOUR CALORIE BURN, WORKOUT INTENSITY, AND NUTRITION INTAKE TO STAY ON TARGET.
      </p>
    </div>

    <!-- Content Elements -->
    <p class="text-white z-30 text-center px-4 mx-auto md:mt-36 lg:mt-40 xl:mt-48" style="font-weight: 300; letter-spacing: 4px; font-size: clamp(1.5rem, 2vw + 1rem, 2.5rem);">
      YOUR JOURNEY STARTS, <span class="font-bold">NOW</span>
    </p>
  
    <div class="flex flex-col md:flex-row gap-4 md:gap-12 w-full justify-center items-center z-30 mt-4">
      <nuxt-link to="/" class="text-white border border-white py-2 px-4 md:px-8 text-center max-md:w-[140px] md:w-[200px] lg:w-[300px]" style="font-weight: 300; font-size: clamp(0.875rem, 1vw + 0.5rem, 1rem);">LOG IN</nuxt-link>
      <nuxt-link to="/" class="text-white border border-white py-2 px-4 md:px-8 text-center max-md:w-[140px] md:w-[200px] lg:w-[300px]" style="font-weight: 300; font-size: clamp(0.875rem, 1vw + 0.5rem, 1rem);">JOIN</nuxt-link>
    </div>
  
    <div class="max-md:hidden absolute bottom-10 left-4 right-4 md:top-1/4 md:left-12 md:right-auto md:w-1/2 text-center md:text-left z-30 px-4">
      <p class="text-white" style="font-weight: 300; letter-spacing: 2px; font-size: clamp(0.75rem, 1vw + 0.25rem, 1rem);">
        WE MONITOR YOUR CALORIE BURN, WORKOUT INTENSITY, AND NUTRITION INTAKE TO STAY ON TARGET.
      </p>
    </div>
  </div>
</template>
