<template>
  <div class="bg-[#EFEFEC] dark:bg-black w-full overflow-hidden ">
    <div class="carousel-container relative w-full p-2">
      <div class="marquee flex w-fit gap-[70px]">
        <div v-for="(review, index) in duplicatedReviews" :key="index" class="flex-shrink-0 w-[300px] px-2 pt-10">
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
import { computed, onMounted, ref } from "vue";
import ReviewCard from "~/components/Sections/Nutrition/ReviewCard.vue";

interface Review {
  reviewText: string;
  reviewerImage: string;
  filledStars: number;
}

const props = defineProps<{
  reviews: Review[];
}>();

// Create a more robust duplicated array for smoother infinite scrolling
const duplicatedReviews = computed(() => {
  // Duplicate the reviews array multiple times to ensure smooth looping
  return [...props.reviews, ...props.reviews, ...props.reviews, ...props.reviews];
});

// Reset animation when it completes to create a seamless loop
onMounted(() => {
  const marquee = document.querySelector(".marquee");
  if (marquee) {
    marquee.addEventListener("animationiteration", () => {
      // This ensures the animation resets smoothly
      setTimeout(() => {
        marquee.classList.remove("marquee-animate");
        void marquee.offsetWidth; // Force reflow
        marquee.classList.add("marquee-animate");
      }, 0);
    });
    // Initial animation start
    marquee.classList.add("marquee-animate");
  }
});
</script>

<style scoped>
.marquee {
  will-change: transform;
  transform: translateZ(0); /* Hardware acceleration */
}

.marquee-animate {
  animation: scroll 25s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-300px * 3 - 70px * 3)); /* Exactly the width of 3 cards + gaps */
  }
}

.carousel-container {
  position: relative;
  overflow: hidden;
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
