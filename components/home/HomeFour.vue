<template>
    <div class="w-full relative" style="font-family: Montserrat;">
      <!-- Mobile View -->
      <div class="md:hidden flex flex-col w-full">
        <!-- First Image -->
        <div class="w-full h-[400px]">
          <img :src="image1" alt="Workout Image 1" class="w-full h-full object-cover" />
        </div>
        
        <!-- Second Image -->
        <div class="w-full h-[400px]">
          <img :src="image2" alt="Workout Image 2" class="w-full h-full object-cover" />
        </div>
        
        <!-- Mobile Text and Button -->
        <div class="flex flex-col items-center justify-center w-full text-center text-black mt-6 mb-10">
          <p class="text-xl font-semibold mb-8 px-4">
            <span v-html="headingText" />
          </p>
          
          <nuxt-link v-if="link.length > 0 && !isLogoutButton" :to="link" class="tracking-normal text-nowrap text-center flex justify-center border border-black py-[10px] px-[30px] text-center text-sm w-[120px] z-9 font-medium text-black">
            {{ buttonText }}
          </nuxt-link>
          <div v-else @click.prevent="handleButtonClick" class="cursor-pointer text-nowrap text-center flex justify-center tracking-normal border border-black py-[10px] px-[30px] text-center text-sm w-[120px] z-9 font-medium text-black">
            {{ buttonText }}
          </div>
        </div>
      </div>

      <!-- Desktop View -->
      <div class="hidden md:flex w-full relative">
        <!-- Left Image Section -->
        <div class="w-1/2 h-full relative">
          <img :src="image1" alt="Workout Image 1" class="w-full h-full max-h-[510px] object-cover" />
        </div>

        <!-- Right Image Section -->
        <div class="w-1/2 h-full">
          <img :src="image2" alt="Workout Image 2" class="w-full h-full max-h-[510px] object-cover" />
        </div>

        <!-- Desktop Text and Button -->
        <div class="absolute bottom-[50px] left-[35px] text-left text-white">
            <p class="text-lg md:text-2xl lg:text-3xl mb-[50px]" style="font-weight: 500;">
              <span v-html="headingText" />
            </p>
            
            <nuxt-link v-if="link.length > 0 && !isLogoutButton" :to="link" class="tracking-normal text-nowrap text-center flex justify-center border border-[#ffffff38] py-[10px] px-[70px] text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" style="font-weight: 300;">
              {{ buttonText }}
            </nuxt-link>
            <div v-else @click.prevent="handleButtonClick" class="cursor-pointer text-nowrap text-center flex justify-center tracking-normal border border-[#ffffff38] py-[10px] px-[70px] text-center text-sm md:text-base lg:text-lg w-[150px] md:w-[200px] lg:w-[250px] z-9" style="font-weight: 300;">
              {{ buttonText }}
            </div>
        </div>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from '#app'

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
  },
  isLogoutButton: {
    type: Boolean,
    default: false
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