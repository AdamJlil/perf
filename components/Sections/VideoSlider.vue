<template>
  <div class="w-full md:h-[30vh] lg:h-[35vh] max-md:h-[20vh] bg-[#d4d4d4] overflow-hidden relative" style="font-family: Montserrat;">
    <div class="flex h-full gap-[8px] bg-[#d4d4d4] animate-scroll">
      <div
        v-for="(video, i) in duplicatedVideos"
        :key="i"
        class="flex-shrink-0 h-full w-[250px] bg-[#d4d4d4]"
      >
        <video autoplay muted loop class="h-full w-full object-cover">
          <source :src="video" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const originalVideos: string[] = [
  '/videos/slider_videos/slider-video_01.mp4',
  '/videos/slider_videos/slider-video_02.mp4',
  '/videos/slider_videos/slider-video_003.mov',
  '/videos/slider_videos/slider-video_03.mp4',
  '/videos/slider_videos/slider-video_04.mp4',
]

// On double la liste des vidéos avec concat()
const duplicatedVideos: string[] = Array(10).fill(originalVideos).flat()
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

@media (max-width: 750px) {
  .animate-scroll {
  animation: scroll 17s linear infinite;
}
}

@media (max-width: 500px) {
  .animate-scroll {
  animation: scroll 10s linear infinite;
}
}
</style>
