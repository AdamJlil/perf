<template>
  <div class="w-full h-[40vh] bg-black overflow-hidden relative" style="font-family: Montserrat;">
    <!-- Low-opacity black layer -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-10"></div>

    <!-- Scrolling video section -->
    <div class="flex h-full gap-[8px] bg-black animate-scroll">
      <div
        v-for="(video, i) in duplicatedVideos"
        :key="i"
        class="flex-shrink-0 h-full w-[250px] bg-black"
      >
        <video autoplay muted loop class="h-full w-full object-cover">
          <source :src="video" type="video/mp4" />
        </video>
      </div>
    </div>

    <!-- Content over the video section -->
    <div class="absolute inset-0 z-20 flex flex-col lg:flex-row items-center justify-center px-4 space-y-6 lg:space-y-0 lg:space-x-6 text-center lg:text-left">
      <!-- Rounded Image -->
      <div
        class="max-lg:w-[8rem] max-lg:h-[8rem] lg:w-52 lg:h-52 max-sm:w-[5rem] max-sm:h-[5rem] xs:hidden rounded-full overflow-hidden bg-center bg-cover"
        style="background-image: url('/images/review1.jpg'); background-position-x: -14px; background-position-y: -28px;"
      ></div>

      <!-- Text and stars images displayed in flex-col -->
      <div class="flex flex-col space-y-4 justify-center items-center">
        <!-- Main Text -->
        <h2 class="text-lg md:text-xl lg:text-2xl max-w-md text-white text-center" style="letter-spacing: 0.1em; line-height: 1.5;font-size: 1rem;">
          “Before <span class="font-semibold">PERF</span>, I hated working out. Now I move my body 4 to 5 times a week. I’m more productive, energetic and happier!”
        </h2>

        <!-- Flexed images (Stars) -->
        <div class="flex space-x-2">
          <img src="/images/star.png" alt="Star 1" class="w-5 h-5 md:w-6 md:h-6" />
          <img src="/images/star.png" alt="Star 2" class="w-5 h-5 md:w-6 md:h-6" />
          <img src="/images/star.png" alt="Star 3" class="w-5 h-5 md:w-6 md:h-6" />
          <img src="/images/star.png" alt="Star 4" class="w-5 h-5 md:w-6 md:h-6" />
          <img src="/images/star.png" alt="Star 5" class="w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const originalVideos: string[] = [
  './videos/slider_videos/slider-video_01.mp4',
  './videos/slider_videos/slider-video_02.mp4',
  './videos/slider_videos/slider-video_03.mp4',
  './videos/slider_videos/slider-video_04.mp4',
]

// Répétition dynamique des vidéos pour créer l'effet de duplication
const duplicatedVideos: string[] = Array(6).fill(originalVideos).flat()
</script>

<style scoped>
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  animation: scroll 25s linear infinite;
}

img {
  object-fit: cover;
}
</style>
