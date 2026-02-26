<!-- components/Sections/Nutrition/BlocTwo.vue -->
<template>
  <div
    class="bg-[#EFEFEC] dark:bg-black w-full flex flex-col md:flex-row justify-center items-center text-center p-4 md:p-10 gap-10 py-12 md:py-24 lg:py-32"
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
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-utensils"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
          </div>
          <div
            class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight"
          >
            Nutrition
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
            Maximum results with every bite! Smart, easy to follow & budget friendly.
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
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-activity"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </div>
          <div
            class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight"
          >
            Workouts
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
            Calculated & Customized. For a seamless transformation experience.
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
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bar-chart-3"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
          </div>
          <div
            class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight"
          >
            Results
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
            If you don’t see results, it’s because you didn’t follow the plan. The calories are meticulously calculated
            for a guaranteed result!
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
</style>
