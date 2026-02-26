<template>
  <div
    class="bg-[#EFEFEC] w-full flex flex-col md:flex-row justify-center items-center text-center p-4 md:p-10 gap-10 py-12 md:py-24 lg:py-28"
  >
    <!-- First Card -->
    <div
      class="flip-container relative w-[80%] sm:w-[60%] md:w-[30%] lg:w-[28%] max-w-[380px] aspect-[4/5] mb-8 md:mb-0 group"
    >
      <div class="flipper">
        <!-- Front Side -->
        <div
          class="front absolute inset-0 border border-black/5 rounded-[30px] bg-[#EFEFEB] shadow-xl flex flex-col justify-center items-center p-8 gap-8 transition-all duration-500 group-hover:border-[#D05E33]/20"
        >
          <div class="text-[#D05E33] transition-transform duration-500 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
          </div>
          <div
            class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight"
          >
            Accessibility
          </div>
        </div>
        <!-- Back Side -->
        <div
          class="back absolute inset-0 border border-black/5 rounded-[30px] shadow-2xl bg-[#EFEFEB] flex flex-col justify-center items-center p-8 lg:p-10"
        >
          <div class="w-12 h-1 bg-[#D05E33] mb-6 rounded-full"></div>
          <div
            class="text-gray-800 text-xs md:text-sm lg:text-[15px] text-center font-medium leading-relaxed tracking-wide"
          >
            Enjoy wellness programs tailored to your environment—on the go, at home, or in the comfort of your hotel.
          </div>
        </div>
      </div>
    </div>

    <!-- Second Card -->
    <div
      class="flip-container relative w-[80%] sm:w-[60%] md:w-[30%] lg:w-[28%] max-w-[380px] aspect-[4/5] mb-8 md:mb-0 group"
    >
      <div class="flipper">
        <!-- Front Side -->
        <div
          class="front absolute inset-0 border border-black/5 rounded-[30px] bg-[#EFEFEB] shadow-xl flex flex-col justify-center items-center p-8 gap-8 transition-all duration-500 group-hover:border-[#D05E33]/20"
        >
          <div class="text-[#D05E33] transition-transform duration-500 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>
          </div>
          <div
            class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight"
          >
            Time<br/>Saving
          </div>
        </div>

        <!-- Back Side -->
        <div
          class="back absolute inset-0 border border-black/5 rounded-[30px] shadow-2xl bg-[#EFEFEB] flex flex-col justify-center items-center p-8 lg:p-10"
        >
          <div class="w-12 h-1 bg-[#D05E33] mb-6 rounded-full"></div>
          <div
            class="text-gray-800 text-xs md:text-sm lg:text-[15px] text-center font-medium leading-relaxed tracking-wide"
          >
            Save time with streamlined fitness plans and ready-to-follow guides, making every minute count.
          </div>
        </div>
      </div>
    </div>

    <!-- Third Card -->
    <div class="flip-container relative w-[80%] sm:w-[60%] md:w-[30%] lg:w-[28%] max-w-[380px] aspect-[4/5] group">
      <div class="flipper">
        <!-- Front Side -->
        <div
          class="front absolute inset-0 border border-black/5 rounded-[30px] bg-[#EFEFEB] shadow-xl flex flex-col justify-center items-center p-8 gap-8 transition-all duration-500 group-hover:border-[#D05E33]/20"
        >
          <div class="text-[#D05E33] transition-transform duration-500 group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
          </div>
          <div
            class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight"
          >
            Guidance
          </div>
        </div>
        <!-- Back Side -->
        <div
          class="back absolute inset-0 border border-black/5 rounded-[30px] shadow-2xl bg-[#EFEFEB] flex flex-col justify-center items-center p-8 lg:p-10"
        >
          <div class="w-12 h-1 bg-[#D05E33] mb-6 rounded-full"></div>
          <div
            class="text-gray-800 text-xs md:text-sm lg:text-[15px] text-center font-medium leading-relaxed tracking-wide"
          >
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

  .front,
  .back {
    border-radius: 25px !important;
  }

  .back div {
    border-radius: 25px !important;
    font-size: 10px !important;
    padding: 8px !important;
  }
}
</style>
