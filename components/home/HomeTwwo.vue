<template>
    <div class="bg-[#EFEFEC] w-full flex flex-col md:flex-row justify-center items-center text-center p-4 md:p-[20px] gap-6 md:gap-[5%] py-8 md:py-[7rem] lg:py-20">
      
      <!-- First Card -->
      <div class="flip-container relative w-[50%] sm:w-[45%] md:w-[30%] lg:w-[25%] max-w-[300px] aspect-[7/8] mb-8 md:mb-0">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl"
               style="background-image: url('/images/131.png'); background-size: cover; background-position: center;">
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-base md:text-lg lg:text-xl text-black w-full font-semibold">
              Accessibility
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-xs md:text-base lg:text-lg bg-[#dedcd4] h-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] flex justify-center items-center p-4 md:p-[10px]"
                 style="font-weight: 400;">
                 Enjoy wellness programs tailored to your environment—on the go, at home, or in the comfort of your hotel.
                </div>
          </div>
        </div>
      </div>
      
      <!-- Second Card -->
      <div class="flip-container relative w-[50%] sm:w-[45%] md:w-[30%] lg:w-[25%] max-w-[300px] aspect-[7/8] mb-8 md:mb-0">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl"
               style="background-image: url('/images/132.png'); background-size: cover; background-position: center;">
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-base md:text-lg lg:text-xl text-black w-full font-semibold">
              Time saving
            </div>
          </div>

          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-xs md:text-base lg:text-lg bg-[#dedcd4] h-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] flex justify-center items-center p-4 md:p-[10px]"
                 style="font-weight: 400;">
                 Save time with streamlined fitness plans and ready-to-follow guides, making every minute count.
                </div>
          </div>
        </div>
      </div>
      
      <!-- Third Card -->
      <div class="flip-container relative w-[50%] sm:w-[45%] md:w-[30%] lg:w-[25%] max-w-[300px] aspect-[7/8]">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl"
               style="background-image: url('/images/133.png'); background-size: cover; background-position: center;">
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 text-base md:text-lg lg:text-xl text-black w-full font-semibold">
              Guidance
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[40px] md:rounded-[60px] lg:rounded-[80px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center bg-[#dedcd4]">
            <div class="text-black text-xs md:text-base lg:text-lg bg-[#dedcd4] h-full rounded-[40px] md:rounded-[60px] lg:rounded-[80px] flex justify-center items-center p-4 md:p-[10px]"
                 style="font-weight: 400;">
                 Expert-led guidance ensures guests and clients achieve results confidently and effectively.
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