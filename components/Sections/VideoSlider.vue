<template>
  <div class="w-full h-[40vh] max-md:h-[28vh] bg-black overflow-hidden relative" style="font-family: Montserrat;">
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
  </div>
</template>

<script setup lang="ts">
const originalVideos: string[] = [
  '/videos/slider_videos/slider-video_01.mp4',
  '/videos/slider_videos/slider-video_02.mp4',
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
</style>
