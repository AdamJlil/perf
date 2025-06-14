<template>
  <div style="font-family: Montserrat;">
    <!-- DESKTOP VERSION - hide on small screens -->
    <div class="hidden md:block w-full">
      <div class="w-full flex justify-center items-center relative">
        <!-- Left Image Section with Text - Original design for desktop -->
        <div class="w-1/2 h-full relative">
          <img :src="image1" alt="Workout Image 1" class="w-full h-full max-h-[510px] object-cover rounded-[40px]" :style="image1Style" />
        </div>

        <!-- Center Text Section - Original positioning for desktop -->
        <div class="absolute top-[10px] left-[50%] px-2 text-left text-white flex flex-col justify-center  h-full">
          <p class="text-2xl mb-4 md:mb-[20px] font-medium " :style="[{ fontWeight: 500 }, TitleStyle]">
            <span v-html="TitleText" />
          </p>

          <p class="text-xl mb-4 md:mb-[20px] " :style="[ DescStyle]">
            <span v-html="DescText" />
          </p>

          <p class="text-xl mb-4 md:mb-[20px] font-medium" :style="[{ fontWeight: 500 }, EndStyle]">
            <span v-html="EndText" />
          </p>
        </div>

        <!-- Right Image Section - Original design for desktop -->
        <div class="w-1/2 h-full">
          <img v-if="image2" :src="image2" alt="Workout Image 2" class="w-full h-full max-h-[510px] object-cover rounded-[40px]" :style="image2Style" />
        </div>

        <!-- Bottom Text Section - Original positioning for desktop -->
        <div class="absolute bottom-[50px] left-[35px] text-left text-white">

          <!-- <p class="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-[20px] font-bold text-white" style="color: white !important; font-weight: 800 !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.8);">
            <span v-html="headingText" style="color: white !important; font-weight: 800 !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.8);" />
          </p> -->
          
          <!-- <nuxt-link v-if="link.length > 0 && !isLogoutButton" :to="link" class="text-white px-6 md:px-10 py-2 md:py-3 uppercase text-md md:text-lg tracking-[6px] md:tracking-[10px] border-white border-2 hover:bg-gray-800/20 transition-colors cursor-pointer font-bold inline-block w-auto" style="font-weight: 800 !important; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            {{ buttonText }}
          </nuxt-link>
          <div v-else @click.prevent="handleButtonClick" class="text-white px-6 md:px-10 py-2 md:py-3 uppercase text-md md:text-lg tracking-[6px] md:tracking-[10px] border-white border-2 hover:bg-gray-800/20 transition-colors cursor-pointer font-bold inline-block w-auto" style="font-weight: 800 !important; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">
            {{ buttonText }}
          </div> -->
        </div>
      </div>
    </div>
    
    <!-- MOBILE VERSION - only show on small screens -->
    <div class="md:hidden w-full">
      <div class="flex flex-col">
        <!-- Single image container -->
        <div class="w-full  flex items-center justify-center">
          <img :src="image1" alt="Workout Image 1" class="w-full h-full object-contain rounded-[40px]" :style="image1Style" />
        </div>
        
        <!-- All text combined in one section on mobile -->
        <div class="py-8 px-5 w-full max-w-md mx-auto text-center flex flex-col">
          <!-- Title section -->
          <p class="text-gray-700 text-xl md:text-2xl font-semibold mb-6" :style="TitleStyle">
            <span v-html="TitleText" />
          </p>
          <p class="text-gray-800 text-lg md:text-xl mb-6" :style="DescStyle">
            <span v-html="DescText" />
          </p>
          <p class="text-gray-700 text-lg md:text-xl font-medium mb-8 uppercase" :style="[{ color: '#545454', fontWeight: 600, padding: '10px' }, EndStyle]">
            <span v-html="EndText" />
          </p>
          
          <!-- Heading & button section -->
          <!-- <p class="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-[20px] font-medium" :style="[{ fontWeight: 500 }, TitleStyle]">
            <span v-html="headingText" />
          </p> -->
          
          <!-- <div class="flex justify-center">
            <nuxt-link v-if="link.length > 0 && !isLogoutButton" :to="link" class="text-black px-6 md:px-10 py-2 md:py-3 uppercase text-md md:text-lg tracking-[6px] md:tracking-[10px] border-black border-2 hover:bg-gray-100 transition-colors cursor-pointer">
              {{ buttonText }}
            </nuxt-link>
            <div v-else @click.prevent="handleButtonClick" class="text-black px-6 md:px-10 py-2 md:py-3 uppercase text-md md:text-lg tracking-[6px] md:tracking-[10px] border-black border-2 hover:bg-gray-100 transition-colors cursor-pointer">
              {{ buttonText }}
            </div>
          </div> -->
        </div>
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
