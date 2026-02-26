<template>
  <div
    class="flip-container relative w-[80%] sm:w-[60%] md:w-[30%] lg:w-[28%] max-w-[380px] aspect-[4/5] mb-8 md:mb-0 group"
  >
    <div class="flipper">
      <!-- Front Side -->
      <div
        class="front absolute inset-0 border border-black/5 rounded-[30px] bg-[#EFEFEB] shadow-xl flex flex-col justify-center items-center p-8 gap-8 group-hover:border-[#D05E33]/20 transition-all duration-500"
      >
        <div class="text-[#D05E33] transition-transform duration-500 group-hover:scale-110">
          <svg v-if="outsideTitle.toLowerCase().includes('calorie')" xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.292 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
        
        <!-- Centered Title -->
        <div
          class="text-sm md:text-base lg:text-lg text-black font-bold uppercase tracking-[4px] leading-tight text-center"
        >
          {{ outsideTitle }}
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
          {{ backText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  outsideTitle: {
    type: String,
    required: true,
  },
  backText: {
    type: String,
    required: true,
  },
  frontImage: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
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
