<!-- components/Sections/Nutrition/ReviewCard.vue -->
<template>
  <div class="relative rounded-[70px] border border-black dark:border-white w-full p-10 bg-[#EFEFEC] dark:bg-black shadow-md">
    
    <!-- Reviewer Image Badge -->
    <div
      class="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white dark:border-black shadow-md"
      :style="{
        backgroundImage: `url(${reviewerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }"
      aria-label="Reviewer Avatar"
    ></div>
    
    <div class="flex flex-col w-full justify-center items-center">
      <!-- Review Text -->
      <p class="text-[10px] w-50 text-center text-slate-850 dark:text-slate-50">
        {{ reviewText }}
      </p>
    </div>
    
    
    <!-- 5-Star Rating -->
    <div
      class="flex items-center space-x-1 justify-center"
      :aria-label="`${filledStars} out of 5 stars`"
    >
      <StarIcon
        v-for="star in 5"
        :key="star"
        :filled="star <= filledStars"
      />
    </div>
          
  </div>
</template>

<script setup lang="ts">
import StarIcon from '~/components/Sections/Nutrition/StarIcon.vue'

// Define props
defineProps<{
  reviewText: string
  reviewerImage: string
  filledStars: number // New prop for the number of filled stars
}>()
</script>

<style scoped>
/* Optional: Add any additional styles if necessary */

/* Example: Center text on smaller screens */
@media (max-width: 768px) {
  p {
    text-align: center;
  }
}
</style>
