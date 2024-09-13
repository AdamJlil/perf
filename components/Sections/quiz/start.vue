<template>
  <div
    class="w-full h-[100vh] bg-blue text-white flex flex-col justify-center items-center gap-8 relative p-4"
    style="font-family: Montserrat;"
  >
    <!-- Video Background -->
    <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
      <source :src="videoPath" type="video/mp4" />
    </video>

    <!-- Overlay Layer -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

    <!-- Main Heading -->
    <p class="text-white z-9 text-center text-xl sm:text-2xl md:text-3xl lg:text-2xl font-medium tracking-wide mb-[50px]" style="font-weight: 200;">
      {{ text }}
    </p>

    <!-- Buttons -->
    <div 
      class="cursor-pointer text-white border border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg max-md:w-[140px] md:w-[200px] lg:w-[300px] z-9"
      style="font-weight: 300;" 
      @click="handleClick"
    >
      START
    </div>

    <!-- Footer Text -->
    <div class="absolute bottom-6 w-full text-center z-20 px-4">
      <p class="text-white text-xs sm:text-sm md:text-sm tracking-wide font-light">
        YOUR INFORMATIONS IS SECURE WITH US. WE PRIORITIZE YOUR PRIVACY AND DATA PROTECTION
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string
  videoPath: string
}>()

const emit = defineEmits(['start-click'])  // Define the event to emit

const handleClick = () => {
  emit('start-click')  // Emit the event when START is clicked
}
</script>
