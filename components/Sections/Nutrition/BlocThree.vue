<template>
  <div class="bg-white dark:bg-black w-full">
    <div class="carousel-container relative w-full p-2">
      <!-- Carousel Wrapper -->
      <div class="overflow-x-hidden scroll-smooth w-full pb-2 pt-25 max-md:mt-[-90px] flex justify-center">
        <div
          class="flex gap-4 justify-center items-center w-fit transition-transform duration-500 ease-in-out"
        >
          <div
            v-for="(review, index) in displayedReviews"
            :key="index"
            class="flex-shrink-0 w-[300px] px-2 transition-opacity duration-500 transform-gpu"
            :class="{
              'opacity-50 scale-90': index !== 1,
              'opacity-100 scale-100': index === 1,
            }"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import ReviewCard from "~/components/Sections/Nutrition/ReviewCard.vue";

const reviews = [
  {
    reviewText: "“Before PERF, i hated working out. now i move my body 4 to 5 times a week. i’m more productive, energetic and happier !”",
    reviewerImage: "images/review1.jpg",
    filledStars: 4,
  },
  {
    reviewText: "As a busy mom, finding time to eat healthy was challenging. This nutrition program not only offers simple recipes but also fits seamlessly into my family's routine. We all love the meals!",
    reviewerImage: "images/review1.jpg",
    filledStars: 5,
  },
  {
    reviewText: "“Before PERF, i hated working out. now i move my body 4 to 5 times a week. i’m more productive, energetic and happier !”",
    reviewerImage: "images/review1.jpg",
    filledStars: 5,
  },
];

// L'index courant, pointant toujours sur la review du centre
const currentIndex = ref(0);

// Calcul des reviews affichées à partir de currentIndex
// On prend: review gauche, review centre (currentIndex), review droite.
const displayedReviews = computed(() => {
  const leftIndex = (currentIndex.value - 1 + reviews.length) % reviews.length;
  const centerIndex = currentIndex.value % reviews.length;
  const rightIndex = (currentIndex.value + 1) % reviews.length;

  return [reviews[leftIndex], reviews[centerIndex], reviews[rightIndex]];
});

let interval: number | undefined;

onMounted(() => {
  // Toutes les 2 secondes, on incrémente currentIndex pour faire tourner les reviews
  interval = window.setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % reviews.length;
  }, 2000);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
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
