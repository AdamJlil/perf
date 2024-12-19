<!-- components/Sections/Nutrition/Header.vue -->
<template>
  <header
    class="bg-[#EFEFEC] dark:bg-black flex flex-col md:flex-row items-center w-full"
    style="font-family: Montserrat"
  >
    <!-- Center Section: Content -->
    <div class="w-full flex flex-col content-around bg-[#EFEFEC] dark:bg-black">
      <!-- Title -->
      <h1
        class="text-2xl lg:text-4xl md:text-2xl leading-loose font-normal text-center mb-6 py-10 uppercase text-black dark:text-white"
      >
        <span v-html="headingText" />
      </h1>

      <!-- Buttons -->
      <div
        v-if="isbuttons"
        class="flex flex-col md:flex-row gap-4 md:gap-8 w-full md:max-w-none justify-center items-center z-10 py-10 md:py-5"
      >
        <NuxtLink
          to="/login"
          class="text-black dark:text-white border border-black dark:border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg sm:text-sm max-md:w-[140px] md:w-[200px] lg:w-[300px] text-nowrap"
          style="font-weight: 300"
          aria-label="Log In"
        >
          LOG IN
        </NuxtLink>
        <NuxtLink
          to="/join"
          class="text-black dark:text-white border border-black dark:border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg max-md:w-[140px] md:w-[200px] lg:w-[300px] text-nowrap"
          style="font-weight: 300"
          aria-label="Join In"
        >
          JOIN
        </NuxtLink>
      </div>
    </div>
  </header>
</template>


<script lang="ts" setup>
const props = defineProps({
  headingText: {
    type: String,
    default: '' 
  },
  isbuttons:{
    type: Boolean,
    default: true
  }
})

const { headingText } = toRefs(props)
</script>