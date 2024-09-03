<template>
    <div
      class="w-full h-[100vh] text-white flex flex-col justify-center items-center gap-8 relative p-4"
      style="font-family: Montserrat;"
    >
      <!-- Video Background -->
      <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
        <source src="/videos/video_02.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <!-- Dark Overlay -->
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-2"></div>
  
      <!-- Main Content -->
      <div class="z-10 flex flex-col items-center">
        <!-- Main Heading -->
        <p class="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide mt-8" style="font-weight: 200;">
          Your Journey <br>Starts Now
        </p>
  
        <!-- Input Fields -->
        <div class="flex flex-col items-center w-full max-w-xs mt-12">
          <div class="w-full flex items-center mb-4">
            <label class="text-sm md:text-base lg:text-lg font-light text-white w-40 flex-shrink-0">NAME :</label>
            <input
              type="text"
              class="flex-1 p-1 border-b-2 border-white bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white"
            />
          </div>
          <div class="w-full flex items-center mb-4">
            <label class="text-sm md:text-base lg:text-lg font-light text-white w-40 flex-shrink-0">E-MAIL :</label>
            <input
              type="email"
              class="flex-1 p-1 border-b-2 border-white bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white"
            />
          </div>
          <div class="w-full flex items-center mb-4">
            <label class="text-sm md:text-base lg:text-lg font-light text-white w-40 flex-shrink-0">PASSWORD :</label>
            <input
              type="password"
              class="flex-1 p-1 border-b-2 border-white bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white"
            />
          </div>
          <div class="w-full flex items-center mb-6">
            <label class="text-sm md:text-base lg:text-lg font-light text-white w-40 flex-shrink-0">CONFIRM :</label>
            <input
              type="password"
              class="flex-1 p-1 border-b-2 border-white bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white"
            />
          </div>
  
          <!-- Checkboxes -->
          <div class="flex flex-col items-start w-full mt-4">
            <label class="flex items-center text-sm text-white mb-2">
              <input type="checkbox" class="mr-2 border border-white bg-transparent text-white focus:outline-none focus:ring-0">
              I agree to the terms and conditions.
            </label>
            <label class="flex items-center text-sm text-white">
              <input type="checkbox" class="mr-2 border border-white bg-transparent text-white focus:outline-none focus:ring-0">
              Sign me up for exclusive updates and offers.
            </label>
          </div>
  
          <!-- Sign Up Button -->
          <button class="w-full max-w-[200px] border border-white bg-transparent text-white py-2 hover:bg-white hover:text-black transition-colors mt-6">
            Sign Up
          </button>
        </div>
  
        <!-- Footer Text -->
        <div class="absolute bottom-6 w-full text-center z-20 px-4">
        </div>
      </div>
    </div>
  </template>
  