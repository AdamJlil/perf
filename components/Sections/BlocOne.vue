<template>
    <div
      class="w-full h-[100vh] bg-blue text-white flex flex-col justify-center items-center gap-8 relative p-4"
      style="font-family: Montserrat;"
    >
      <!-- Video Background -->
      <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
        <source src="/public/videos/video_01.mp4" type="video/mp4" />
      </video>
      
      <!-- Overlay Layer -->
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>
  
      <!-- Main Heading -->
      <p class="text-white z-9 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide mt-8" style="font-weight: 200;">
        READY TO GET FIT?
      </p>
  
      <!-- Buttons -->
      <div class="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-xs md:max-w-none justify-center items-center z-9">
        <nuxt-link to="/login" class="text-white border border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg max-md:w-[140px] md:w-[200px] lg:w-[300px] z-9" style="font-weight: 300;">
          LOG IN
        </nuxt-link>
        <nuxt-link to="/" class="text-white border border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg max-md:w-[140px] md:w-[200px] lg:w-[300px] z-9" style="font-weight: 300;">
          JOIN
        </nuxt-link>
      </div>
  
      <!-- Footer Text -->
      <div class="absolute bottom-6 w-full text-center z-20 px-4">
        <p class="text-white text-xs sm:text-sm md:text-base tracking-wide font-light">
          YOUR COMPLETE FITNESS ECOSYSTEM
        </p>
      </div>
    </div>
  </template>
  