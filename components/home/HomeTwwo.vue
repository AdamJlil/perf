<template>
    <div class="bg-[#EFEFEC] max-md:h-fit max-lg:h-[35vh] lg:h-[50vh] flex max-md:flex-col justify-center items-center text-center p-[30px] gap-[5%] max-md:gap-[50px] max-md:py-[10px]">
      
      <!-- First Card -->
      <div class="flip-container relative w-[25%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px]">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl"
               style="background-image: url('/images/131.png'); background-size: cover; background-position: center;">
            <!-- Overlay -->
            <!-- <div class="absolute inset-0 bg-[#00000033] opacity-50 rounded-[80px] max-lg:rounded-[50px]"></div> -->
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 lg:text-xl max-md:text-[18px] sm:text-[16px] text-black w-full"
                 style="font-weight: 600; letter-spacing: 0px;">
              Accessibility
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-[15px] lg:text-[20px] bg-[#dedcd4] h-full rounded-[80px] max-lg:rounded-[50px] flex justify-center items-center p-[10px]"
                 style="font-weight: 400; letter-spacing: 0px;">
                 Enjoy wellness programs tailored to your environment—on the go, at home, or in the comfort of your hotel.
                </div>
          </div>
        </div>
      </div>
      
      <!-- Second Card -->
      <div class="flip-container relative w-[25%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px]">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl"
               style="background-image: url('/images/132.png'); background-size: cover; background-position: center;">
            <!-- Overlay -->
            <!-- <div class="absolute inset-0 bg-[#00000033] opacity-50 rounded-[80px] max-lg:rounded-[50px]"></div> -->
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 lg:text-xl max-md:text-[18px] sm:text-[16px] text-black w-full"
                 style="font-weight: 600; letter-spacing: 0px;">
              Time saving
            </div>
          </div>

          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-[15px] lg:text-[20px] bg-[#dedcd4] h-full rounded-[80px] max-lg:rounded-[50px] flex justify-center items-center p-[10px]"
                 style="font-weight: 400; letter-spacing: 0px;">
                 Save time with streamlined fitness plans and ready-to-follow guides, making every minute count.
                </div>
          </div>
        </div>
      </div>
      
      <!-- Third Card -->
      <div class="flip-container relative w-[25%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px]">
        <div class="flipper">
          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl"
               style="background-image: url('/images/133.png'); background-size: cover; background-position: center;">
            <!-- Overlay -->
            <!-- <div class="absolute inset-0 bg-[#00000033] opacity-50 rounded-[80px] max-lg:rounded-[50px]"></div> -->
            <!-- Bottom Text -->
            <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 lg:text-xl max-md:text-[18px] sm:text-[16px] text-black w-full"
                 style="font-weight: 600; letter-spacing: 0px;">
              Guidance
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center bg-[#dedcd4] ">
            <div class="text-black text-[15px] lg:text-[20px] bg-[#dedcd4] h-full rounded-[80px] max-lg:rounded-[50px] flex justify-center items-center p-[10px]"
                 style="font-weight: 400; letter-spacing: 0px;">
                 Expert-led guidance ensures guests and clients achieve results confidently and effectively.            </div>
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
  </style>
  