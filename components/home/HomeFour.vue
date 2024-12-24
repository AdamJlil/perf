<template>
    <div class="w-full flex max-md:flex-col justify-center items-center relative"  style="font-family: Montserrat;">
      <!-- Left Image Section with Text -->
      <div class="md:w-1/2 max-md:w-full h-full relative">
        <img :src="image1" alt="Workout Image 1" class="w-full h-full md:max-h-[510px] max-md:object-contain md:object-cover" />
        
      </div>

      <!-- Right Image Section -->
      <div class="md:w-1/2 max-md:w-full h-full">
        <img :src="image2" alt="Workout Image 2" class="w-full h-full md:max-h-[510px] max-md:object-contain md:object-cover" />
      </div>

      <div class="md:absolute md:bottom-[50px] md:left-[35px] text-left max-md:text-center text-white max-md:text-black max-md:mt-[70px]">
          <p class="text-lg md:text-2xl lg:text-3xl mb-[50px]" style="font-weight: 500;">
            <span v-html="headingText" />
          </p>
          
          <nuxt-link v-if="link.length > 0" :to="link" class="tracking-normal text-nowrap text-center flex justify-center border border-[#ffffff38] max-md:border-black py-[10px] px-[70px]  text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" style="font-weight: 300;">
            {{ buttonText }}
          </nuxt-link>
          <div v-else @click.prevent="scrollToPricing"  class="cursor-pointer text-nowrap text-center flex justify-center tracking-normal border border-[#ffffff38] max-md:border-black py-[10px] px-[70px]  text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" style="font-weight: 300;">
            {{ buttonText }}
          </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
const props = defineProps({
  headingText: {
    type: String,
    default: '' 
  },
  image1: {
    type: String,
    default: ''
  },
  image2: {
    type: String,
    default: ''
  },
  buttonText: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '/'
  }
})

const { headingText } = toRefs(props)
const scrollToPricing = () => {
  const pricingSection = document.querySelector('#choice-pricing')
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

</script>
  