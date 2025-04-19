<!-- components/Sections/Nutrition/BlocTwo.vue -->
<template>
    <div class="bg-[#EFEFEC] dark:bg-black w-full flex flex-col md:flex-row justify-center items-center text-center p-4 md:p-[20px] gap-6 md:gap-[5%] py-8 md:py-[7rem] lg:py-20">
      
      <!-- First Card -->
      <div class="flip-container relative w-[50%] sm:w-[45%] md:w-[30%] lg:w-[25%] max-w-[300px] aspect-[7/8] mb-8 md:mb-0">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl"
               style="background-image: url('/images/125.png'); background-size: cover; background-position: center;">
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-base md:text-lg lg:text-xl text-black w-full font-semibold">
              SPACE SAVING
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-xs md:text-base lg:text-lg bg-[#dedcd4] h-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] flex justify-center items-center p-4 md:p-[10px]"
                 style="font-weight: 400;">
                 Set your establishment apart by combining fitness and comfort, boosting satisfaction rates by over 15% with ergonomic, innovative amenities.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Second Card -->
      <div class="flip-container relative w-[50%] sm:w-[45%] md:w-[30%] lg:w-[25%] max-w-[300px] aspect-[7/8] mb-8 md:mb-0">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl"
               style="background-image: url('/images/126.png'); background-size: cover; background-position: center;">
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-base md:text-lg lg:text-xl text-black w-full font-semibold">
              15% SATISFACTION
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-xs md:text-base lg:text-lg bg-[#dedcd4] h-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] flex justify-center items-center p-4 md:p-[10px]"
                 style="font-weight: 400;">
                 Ensuring an unforgettable wellness experience, provide your visitors with guided, effective workout videos tailored to their needs.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Third Card -->
      <div class="flip-container relative w-[50%] sm:w-[45%] md:w-[30%] lg:w-[25%] max-w-[300px] aspect-[7/8]">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl"
               style="background-image: url('/images/127.png'); background-size: cover; background-position: center;">
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-base md:text-lg lg:text-xl text-black w-full font-semibold">
              +365 WORKOUT
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center bg-[#dedcd4]">
            <div class="text-black text-xs md:text-base lg:text-lg bg-[#dedcd4] h-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] flex justify-center items-center p-4 md:p-[10px]"
                 style="font-weight: 400;">
                 Right to your visitors rooms , elevate their Stay, with our eco-friendly fitness equipment delivered in a sleek charrette.
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <style>
  .flip-container {
    perspective: 1000px;
  }
  .flip-container:hover .flipper {
    transform: rotateY(180deg);
  }
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden; /* Safari */
  }
  .back {
    transform: rotateY(180deg);
  }
  
  /* Add mobile-specific styles to make cards even smaller on very small screens */
  @media (max-width: 400px) {
    .flip-container {
      width: 45% !important;
      max-width: 180px !important;
    }
    
    .front, .back {
      border-radius: 25px !important;
    }
    
    .back div {
      border-radius: 25px !important;
      font-size: 10px !important;
      padding: 8px !important;
    }
  }
  </style>