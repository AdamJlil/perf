<script lang="ts" setup>
import { ref, onMounted } from "vue";

const currentIndex = ref(0);
const goTo = (index: number) => {
  if (index >= 0 && index < 5) {
    currentIndex.value = index;
  }
};

// Swipe logic
let startX = 0;
let endX = 0;

onMounted(() => {
  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true },
  );

  carousel.addEventListener(
    "touchend",
    (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    },
    { passive: true },
  );
});

const handleSwipe = () => {
  const delta = startX - endX;
  if (delta > 50) {
    // Swipe left
    goTo(currentIndex.value + 1);
  } else if (delta < -50) {
    // Swipe right
    goTo(currentIndex.value - 1);
  }
};
</script>

<template>
  <div class="w-full overflow-x-hidden bg-[#EFEFEC]">
    <!-- Hero Header -->
    <div class="relative flex justify-center items-start pt-4 px-4" style="z-index: 2">
      <div class="relative w-full max-w-7xl h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-lg">
        <img
          src="/images/aboutUsHeader.jpeg"
          alt="Background Image"
          class="absolute inset-0 w-full h-full object-cover z-0 scale-[1.1]"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-black/20 z-10"></div>
        <div class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 md:px-16">
          <p
            class="text-white text-left text-2xl md:text-4xl lg:text-5xl font-normal tracking-[4px] md:tracking-[8px] uppercase max-w-2xl leading-tight"
          >
            Elevating Guest Experience
          </p>
        </div>
      </div>
    </div>

    <!-- Info Bar Section -->
    <div class="w-full px-4 py-12 md:py-20">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <!-- Get in touch -->
          <div class="md:col-span-3 flex flex-col items-center md:items-start">
            <h2 class="text-3xl font-bold text-gray-800 uppercase leading-none mb-6 text-center md:text-left">
              Get in<br class="hidden md:block" />
              touch<br class="hidden md:block" />
              with us
            </h2>
          </div>

          <!-- Vision -->
          <div class="md:col-span-5 space-y-4">
            <h3 class="text-xl font-bold text-gray-800 uppercase tracking-wider">At Perf</h3>
            <p class="text-gray-600 leading-relaxed text-sm md:text-base">
              We envision a world where health and fitness are accessible to everyone, everywhere. We believe that
              fitness shouldn't be confined to a specific space or time, it should seamlessly integrate into your
              lifestyle, whether you're at home, outdoors, or on the move.
            </p>
          </div>

          <!-- Upcoming Events -->
          <div class="md:col-span-4 bg-white/40 backdrop-blur-md p-8 rounded-[30px] border border-white/20">
            <h3 class="text-[10px] font-bold text-gray-400 uppercase tracking-[3px] mb-4">Upcoming Events</h3>
            <p class="text-lg font-bold text-gray-800 leading-tight">Soon, Perf Launch @ Riad Amir - Marrakech.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Stuff we are good at -->
    <div class="w-full py-20 px-4 bg-white/20">
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        <h2 class="text-2xl md:text-3xl font-normal text-center mb-12 uppercase tracking-[6px] text-gray-800">
          Stuff we are good at
        </h2>
        <div class="w-32 h-1 bg-[#D05E33] mb-16 opacity-30"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <div
            v-for="item in [
              'Mobile training station',
              'More bookings',
              'Workout videos',
              'Upgraded experience',
              'Space optimization',
              'Higher satisfaction',
            ]"
            :key="item"
            class="flex items-center gap-6 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20 group hover:border-[#D05E33]/30 transition-all duration-500"
          >
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-[#D05E33]/5 text-[#D05E33]">
              <span class="i-lucide-check w-5 h-5"></span>
            </div>
            <span class="text-sm font-bold uppercase tracking-[2px] text-gray-700">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Why PERF Venn/Steps Section -->
    <div class="w-full py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col gap-16 lg:hidden">
          <div
            v-for="(step, i) in [
              {
                title: 'UNDERSTAND',
                desc: 'We start by understanding your space, your guests, and your vision — to craft a fitness experience that truly fits your establishment.',
              },
              {
                title: 'CREATE',
                desc: 'We design elegant, space-saving equipment and digital training videos that blends seamlessly into your rooms — adding value without requiring renovation.',
              },
              {
                title: 'ELEVATE',
                desc: 'From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the difference — and your reviews reflect it.',
              },
            ]"
            :key="i"
            class="flex flex-col items-center text-center gap-6"
          >
            <div
              class="w-48 h-48 md:w-64 md:h-64 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-xl text-white shadow-xl"
            >
              {{ step.title }}
            </div>
            <p class="max-w-xs text-sm text-gray-600 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <!-- Desktop Venn -->
        <div class="hidden lg:block relative h-[450px]">
          <div class="flex justify-center relative h-[320px] w-full">
            <div class="relative w-[896px] h-80">
              <div
                class="absolute top-0 left-0 w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-white shadow-xl"
              >
                UNDERSTAND
              </div>
              <div
                class="absolute top-0 left-[288px] w-80 h-80 bg-[#e66939cc] rounded-full z-20 flex items-center justify-center font-bold text-lg text-white shadow-xl"
              >
                CREATE
              </div>
              <div
                class="absolute top-0 left-[576px] w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-white shadow-xl"
              >
                ELEVATE
              </div>
            </div>
          </div>
          <div class="w-[896px] mx-auto flex flex-row justify-between mt-12 text-sm text-gray-600">
            <p class="w-[260px]">
              We start by understanding your space, your guests, and your vision — to craft a fitness experience that
              truly fits your establishment.
            </p>
            <p class="w-[260px]">
              We design elegant, space-saving equipment and digital training videos that blends seamlessly into your
              rooms — adding value without requiring renovation.
            </p>
            <p class="w-[260px]">
              From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the
              difference — and your reviews reflect it.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Carousel Section -->
    <div class="w-full py-20 bg-black/5">
      <h2 class="text-center text-xl md:text-2xl font-bold text-gray-700 uppercase mb-12 tracking-[4px]">
        A statement of wellness in every space.
      </h2>
      <div class="max-w-7xl mx-auto px-4">
        <div class="relative overflow-hidden rounded-[40px] shadow-2xl shadow-black/10">
          <div
            id="carousel"
            class="flex transition-transform duration-700 ease-in-out"
            :style="`transform: translateX(-${currentIndex * 100}%);`"
          >
            <div v-for="i in 5" :key="i" class="min-w-full">
              <img
                :src="`/images/swipe${[4, 2, 5, 3, 1][i - 1]}.jpeg`"
                alt="Wellness Space"
                class="w-full h-[400px] md:h-[650px] object-cover"
              />
            </div>
          </div>
          <!-- Dots -->
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            <button
              v-for="i in 5"
              :key="i"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="i - 1 === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'"
              @click="goTo(i - 1)"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <div class="w-full py-32 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-normal text-center mb-24 uppercase tracking-[8px] text-gray-800">
          Who we are
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20 max-w-5xl mx-auto">
          <div
            v-for="member in [
              { name: 'AMJAD ARKHIS', role: 'Co-founder', img: 'mjdAbout.png' },
              { name: 'SAAD TANTAOUI', role: 'Co-founder', img: 'saad.png' },
              { name: 'MEHDI ARKHIS', role: 'Front-end Developer', img: 'mehdiAbout.png' },
              { name: 'ADAM JLIL', role: 'Back-end Developer', img: 'adamAbout.png' },
              { name: 'ANAS ORKHIS', role: 'Back-end Developer', img: 'anasAbout.png' },
            ]"
            :key="member.name"
            class="flex flex-col items-center text-center group"
          >
            <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mb-6">
              <img :src="`/images/${member.img}`" :alt="member.name" class="w-full h-full object-cover" />
            </div>
            <h3 class="text-lg font-bold text-gray-800 tracking-tight mb-1 uppercase">{{ member.name }}</h3>
            <p class="text-[10px] font-bold text-[#D05E33] uppercase tracking-[3px]">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.i-lucide-facebook,
.i-lucide-twitter,
.i-lucide-instagram,
.i-lucide-check {
  display: inline-block;
}
</style>
