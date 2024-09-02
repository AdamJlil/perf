<template>
    <div
      class="w-full h-[100vh] max-md:h-fit  bg-blue text-white flex flex-col justify-center items-center gap-8 relative p-4 max-md:py-15"
      style="font-family: Montserrat; background-image: url('/images/blocThree.jpg'); background-repeat: no-repeat; background-size: cover;"
    >
      <!-- Overlay Layer -->
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
  
      <div class="flex flex-col md:flex-row justify-center items-center gap-8 z-20">
        <div
          class="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden"
          style="background-image: url('/images/amjad.png'); background-repeat: no-repeat; background-size: cover; background-position: center;"
        ></div>
        <p
          class="z-20 text-center max-w-full md:max-w-lg lg:max-w-xl"
          style="letter-spacing: 0.2em; font-size: 1rem; line-height: 1.5;"
        >
          “I understand that planning healthy meals can be a challenge. I design easy, nutritious plans to make eating well simple and effective.”
        </p>
      </div>
  
      <p class="z-20 text-center text-sm md:text-base mt-4" style="letter-spacing: 0.1em;">
        DR. AMJAD
      </p>
  
      <div
        class="text-white border border-white py-2 px-8 text-center z-20 mt-6 cursor-pointer hover:bg-white hover:text-blue transition-all duration-300"
        style="font-weight: 300;"
      >
        MORE
      </div>
    </div>
  </template>
  