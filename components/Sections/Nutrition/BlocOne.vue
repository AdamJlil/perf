<!-- components/Sections/Nutrition/BlocOne.vue -->
<template>
  <div class="bg-[#EFEFEC] dark:bg-black flex flex-col justify-center items-center w-full py-10 gap-8 md:gap-12" :class="reversed ? ' md:flex-row': ' md:flex-row-reverse'">
  <div
    class="w-40 h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden bg-center bg-cover flex-shrink-0"
    :style="{
      backgroundImage: `url('${image}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  ></div>

  <div class="flex flex-col justidy-center items-center gap-[30px]">
    <p
      class="text-black dark:text-white uppercase text-xl sm:text-lg md:text-2xl text-center p-2 "
      style="letter-spacing: 0.1em; line-height: 1.3"
    >
      <span v-html="headingText" />
    </p>

    <div @click.prevent="scrollToPricing" class="tracking-normal border border-black max-md:border-black py-[10px] px-[70px]  text-center text-sm md:text-base lg:text-lg z-9 cursor-pointer" style="font-weight: 300;">
           TRANSFORM NOW
    </div>
  </div>
</div>

</template>


<script lang="ts" setup>
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
  }
})

const { image,headingText } = toRefs(props)


const scrollToPricing = () => {
  const pricingSection = document.querySelector('#choice-pricing')
  if (pricingSection) {
    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>