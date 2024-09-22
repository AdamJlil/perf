<template>
    <div
      class="w-full h-[100vh] max-md:h-fit  bg-blue text-white flex flex-col justify-center items-center gap-8 relative p-4 max-md:py-15"
      style="font-family: Montserrat;"
    >
      <!-- Video Background -->
      <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-10">
        <source src="/public/videos/video_02.mp4" type="video/mp4" />
      </video>
  
      <!-- Overlay Layer -->
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
  
      <!-- Content -->
      <div class="flex flex-col md:flex-row-reverse justify-center items-center max-md:gap-[50px] max-md:pt-[70px] md:gap-[100px] z-30">
         <p
          class="z-30 text-center max-w-full md:max-w-lg lg:max-w-xl"
          style="letter-spacing: 0.2em; font-size: 1rem; line-height: 1.5;"
        >
          “HEY THERE 👋 , <br>
          READY TO BURN SOME CALORIES TODAY ?<br>
          SCROLL DOWN THEN !”
        </p>

        <div
          class="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden bg-center bg-cover"
          style="background-image: url('/images/soufiane.png'); background-position-x: -6px; background-position-y: 0px;"
        ></div>
      </div>
  
      <p class="z-30 text-center text-sm md:text-base mt-[50px]" style=" font-size: 25px;">
        CALORIES TO BE BURNT TODAY
      </p>
  

    </div>
  </template>
  