<!-- components/Sections/Nutrition/BlocOne.vue -->
<template>
  <div class="bg-[#EFEFEC] dark:bg-black flex flex-col justify-center items-center w-full py-10 gap-8 md:gap-12" :class="reversed ? ' md:flex-row': ' md:flex-row-reverse'">
  <div
    v-if="showImage"
    class="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden bg-center bg-cover flex-shrink-0"
    :style="{
      backgroundImage: `url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  ></div>

  <div class="flex flex-col justidy-center items-center gap-[30px]">
    <h1 class="text-[20px] leading-loose font-normal text-center mb-0 py-15 uppercase text-black dark:text-white">
      <span v-html="headingText" />
    </h1>

    <div v-if="showButton" @click.prevent="handleButtonClick" class="tracking-normal border border-black max-md:border-black py-[10px] px-[70px]  text-center text-sm md:text-base lg:text-lg z-9 cursor-pointer" style="font-weight: 300;">
           TRANSFORM NOW
    </div>
  </div>
</div>

</template>


<script lang="ts" setup>
import { useAuth } from '~/composables/useAuth'
import { navigateTo } from '#app'

const props = defineProps({
  image: {
    type: String,
    default: '' 
  },
  headingText: {
    type: String,
    default: '' 
  },
  reversed: {
    type: Boolean,
    default: false
  },
  showButton: {
    type: Boolean,
    default: true
  },
  showImage: {
    type: Boolean,
    default: true
  },
  isLogoutButton: {
    type: Boolean,
    default: false
  }
})

const { image, headingText, showButton, showImage, isLogoutButton } = toRefs(props)
const { logout } = useAuth()

const handleButtonClick = async () => {
  if (isLogoutButton.value) {
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
