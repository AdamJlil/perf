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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-maximize"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </div>
          <div class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight">
            Space<br />Saving
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
            Set your establishment apart by combining fitness and comfort, boosting satisfaction rates by over 57% with
            ergonomic, innovative amenities.
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-smile"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" x2="9.01" y1="9" y2="9" />
              <line x1="15" x2="15.01" y1="9" y2="9" />
            </svg>
          </div>
          <div class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight">
            +57%<br />Satisfaction
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
            Ensuring an unforgettable wellness experience, provide your visitors with guided, effective workout videos
            tailored to their needs.
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-dumbbell"
            >
              <path d="M14.4 14.4 20 20" />
              <path d="m18.8 10-3.7 3.8" />
              <path d="M10 18.8l3.8-3.7" />
              <path
                d="m9 22-4.7-4.7c-1.1-1-1.1-2.9 0-3.9l1.2-1.2a3 3 0 0 1 4.2 0l1.2 1.2c1 1.1 1 2.9 0 3.9l-4.7 4.7z"
              />
              <path
                d="m22 9-4.7-4.7c-1.1-1-2.9-1.1-3.9 0l-1.2 1.2a3 3 0 0 0 0 4.2l1.2 1.2c1.1 1 2.9 1.1 3.9 0l4.7-4.7z"
              />
              <path d="M8.2 8.2 2 2" />
              <path d="M10 5.2 5.2 10" />
              <path d="m3.8 15.2 5.2-5.2" />
              <path d="m2 22 3-3" />
              <path d="M22 2 19 5" />
            </svg>
          </div>
          <div class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight">
            24/7<br />Workout
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
            Right to your visitors rooms, elevate their stay with our eco-friendly fitness equipment delivered in a
            sleek charrette.
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
