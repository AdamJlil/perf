<template>
    <div
      class="w-full h-[100vh] max-md:h-fit  bg-blue text-white flex flex-col justify-center items-center gap-8 relative p-4 max-md:py-15"
      style="font-family: Montserrat;"
    >
      <!-- Video Background -->
      <!-- <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-10">
        <source src="/public/videos/video_02.mp4" type="video/mp4" />
      </video> -->
  
      <!-- Overlay Layer -->
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
  
      <!-- Content -->
      <div class="flex flex-col md:flex-row-reverse justify-center items-center gap-8 z-30">
        <!-- Circular Image positioned above text on smaller screens -->
        <div
          class="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden bg-center bg-cover"
          style="background-image: url('/images/soufiane.png'); background-position-x: -6px; background-position-y: 0px;"
        ></div>
  
        <!-- Text block -->
        <p
          class="z-30 text-center max-w-full md:max-w-lg lg:max-w-xl"
          style="letter-spacing: 0.2em; font-size: 1rem; line-height: 1.5;"
        >
          “I KNOW YOUR WORKDAY'S BEEN CRAZY, SO I SHORTENED YOUR WORKOUT. CONSISTENCY IS OUR MOTTO! LET'S KEEP THAT STREAK GOING.”
        </p>
      </div>
  
      <p class="z-30 text-center text-sm md:text-base mt-4" style="letter-spacing: 0.1em;">
        HEAD COACH SOUFIANE
      </p>
  
      <div
        class="text-white border border-white py-2 px-8 text-center z-30 mt-6 cursor-pointer hover:bg-[#EFEFEC] hover:text-blue transition-all duration-300"
        style="font-weight: 300;"
      >
        MORE
      </div>
    </div>
  </template>
  