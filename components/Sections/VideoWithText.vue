<template>
  <div
    class="w-full h-[50vh] bg-blue text-white flex flex-col justify-center items-start gap-8 relative p-4"
    :class="{ 'items-end': isRight }"
    style="font-family: Montserrat; padding: 60px;"
  >
    <!-- Video Background -->
    <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
      <source :src="videoPath" type="video/mp4" />
    </video>
    
    <!-- Overlay Layer -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

    <p
      class="z-20 max-w-full md:max-w-lg lg:max-w-xl max-lg:text-center"
      style="letter-spacing: 0.2em; font-size: 1rem; line-height: 1.5;"
    >
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  videoPath: string
  isRight: boolean
}>();
</script>
