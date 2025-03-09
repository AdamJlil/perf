<template>
    <div class="w-full flex max-md:flex-col justify-center items-center relative"  style="font-family: Montserrat;">
      <!-- Left Image Section with Text -->
      <div class="md:w-1/2 max-md:w-full h-full relative">
        <img :src="image1" alt="Workout Image 1" class="w-full h-full md:max-h-[510px] max-md:object-contain md:object-cover" :style="image1Style" />
        
      </div>

      <div class="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center md:absolute md:top-[10px] md:left-[50%] px-2 text-left max-md:text-center text-white max-md:text-black max-md:mt-[70px]">
        <p class="text-lg md:text-2xl lg:text-3xl mb-[20px]" :style="[{ fontWeight: 500 }, TitleStyle]">
            <span v-html="TitleText" />
          </p>

          <p class="text-lg md:text-2xl lg:text-2xl mb-[20px]" :style="[ DescStyle]">
            <span v-html="DescText" />
          </p>

          <p class="text-lg md:text-2xl lg:text-2xl mb-[20px]" :style="[{ fontWeight: 500 }, EndStyle]">
            <span v-html="EndText" />
          </p>
          
      </div>

      <!-- Right Image Section -->
      <div class="md:w-1/2 max-md:w-full h-full">
        <img v-if="image2" :src="image2" alt="Workout Image 2" class="w-full h-full md:max-h-[510px] max-md:object-contain md:object-cover" :style="image2Style" />
      </div>

      <div class="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center md:absolute md:bottom-[50px] md:left-[35px] text-left max-md:text-center text-white max-md:text-black max-md:mt-[70px]">
          <p class="text-lg md:text-2xl lg:text-3xl mb-[20px]" :style="[{ fontWeight: 500 }, headingStyle]">
            <span v-html="headingText" />
          </p>
          
          <nuxt-link v-if="link.length > 0 && !isLogoutButton" :to="link" class="tracking-normal text-nowrap text-center flex justify-center border border-[#ffffff38] max-md:border-black py-[10px] px-[70px] text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" :style="[{ fontWeight: 300 }, buttonStyle]">
            {{ buttonText }}
          </nuxt-link>
          <div v-else @click.prevent="handleButtonClick" class="cursor-pointer text-nowrap text-center flex justify-center tracking-normal border border-[#ffffff38] max-md:border-black py-[10px] px-[70px] text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" :style="[{ fontWeight: 300 }, buttonStyle]">
            {{ buttonText }}
          </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from '#app'

const props = defineProps({
  TitleText: {
    type: String,
    default: '' 
  },
  TitleStyle: {
    type: Object,
    default: () => ({})
  },

  DescText: {
    type: String,
    default: '' 
  },
  DescStyle: {
    type: Object,
    default: () => ({})
  },


  EndText: {
    type: String,
    default: '' 
  },
  EndStyle: {
    type: Object,
    default: () => ({})
  },

  headingText: {
    type: String,
    default: '' 
  },
  headingStyle: {
    type: Object,
    default: () => ({})
  },
  image1: {
    type: String,
    default: ''
  },
  image1Style: {
    type: Object,
    default: () => ({})
  },
  image2: {
    type: String,
    default: ''
  },
  image2Style: {
    type: Object,
    default: () => ({})
  },
  buttonText: {
    type: String,
    default: ''
  },
  link: {
    type: String,
    default: '/'
  },
  isLogoutButton: {
    type: Boolean,
    default: false
  },
  buttonStyle: {
    type: Object,
    default: () => ({})
  }
})

const { logout } = useAuth()

const handleButtonClick = async () => {
  if (props.isLogoutButton) {
    try {
      await logout();
      await navigateTo("/particulierHomePlan");
    } catch (error) {
      console.error(error);
    }
  } else {
    scrollToPricing();
  }
}

const scrollToPricing = () => {
  const pricingSection = document.querySelector('#choice-pricing')
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>
