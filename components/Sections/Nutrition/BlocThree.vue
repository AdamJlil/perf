<template>
  <div class="bg-[#EFEFEC] dark:bg-black w-full overflow-hidden pt-[100px]">
    <div class="carousel-container relative w-full p-2">
      <div class="marquee flex w-fit gap-[70px]">
        <div
          v-for="(review, index) in repeatedReviews"
          :key="index"
          class="flex-shrink-0 w-[300px] px-2"
        >
          <ReviewCard
            :reviewText="review.reviewText"
            :reviewerImage="review.reviewerImage"
            :filledStars="review.filledStars"
            class="review-card-smaller"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from "vue";
import ReviewCard from "~/components/Sections/Nutrition/ReviewCard.vue";

interface Review {
  reviewText: string;
  reviewerImage: string;
  filledStars: number;
}

const props = defineProps<{
  reviews: Review[]
}>();

// Dupliquez les reviews pour le défilement infini
const repeatedReviews = computed(() => [...props.reviews, ...props.reviews]);
</script>


<style scoped>

.marquee {
  animation: scroll 20s linear infinite;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.carousel-container {
  position: relative;
}

.carousel-container .overflow-x-auto {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin; /* Pour Firefox */
  -ms-overflow-style: none; /* Pour Internet Explorer */
}

.carousel-container .overflow-x-auto::-webkit-scrollbar {
  display: none; /* Pour Chrome, Safari, et Opera */
}

.review-card-smaller {
  max-width: 300px; 
  margin: 0 auto; 
  padding: 6px 12px; 
}
</style>
