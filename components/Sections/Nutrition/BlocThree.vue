<!-- components/Sections/Nutrition/BlocThree.vue -->
<template>
  <div class="bg-white dark:bg-black w-full">

    <div
    class="carousel-container relative w-full p-2"
    @mouseenter="pauseAutoplay"
    @mouseleave="startAutoplay"
  >
    <!-- Carousel Wrapper -->
    <div class="overflow-hidden w-full py-5">
      <div
        class="flex transition-transform duration-500 ease-in-out"
        :style="`transform: translateX(-${currentIndex * 100}%);`"
      >
        <!-- Render each review as a slide -->
        <div v-for="(review, index) in reviews" :key="index" class="flex-shrink-0 w-full px-2">
          <ReviewCard
            :reviewText="review.reviewText"
            :reviewerImage="review.reviewerImage"
            :filledStars="review.filledStars"
            class="review-card-smaller"
          />
        </div>
      </div>
    </div>

    <!-- Pagination Dots -->
    <div class="flex justify-center mt-4 space-x-2">
      <button
        v-for="(review, index) in reviews"
        :key="index"
        @click="goTo(index)"
        :class="[
          'w-3 h-3 rounded-full focus:outline-none transition-colors',
          currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'
        ]"
        :aria-label="`Go to review ${index + 1}`"
      ></button>
    </div>
  </div>
  </div>
  
  
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import ReviewCard from "~/components/Sections/Nutrition/ReviewCard.vue";

// Define the review data
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
  // {
  //   reviewText: "Not satisfied with the product. It didn't work as advertised.",
  //   reviewerImage: "/images/reviewer4.jpg",
  //   filledStars: 5,
  // },
  // {
  //   reviewText: "Terrible experience. The product broke after one use.",
  //   reviewerImage: "/images/reviewer5.jpg",
  //   filledStars: 5,
  // },
];

// Reactive state for current index
const currentIndex = ref(0);

// Auto-play configuration
const autoplayInterval = 30000; // 30 seconds
let autoplayTimer: number | undefined;

// Function to go to the next review
function next() {
  if (currentIndex.value < reviews.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0; // Loop back to the first review
  }
}

// Function to go to a specific review
function goTo(index: number) {
  currentIndex.value = index;
}

// Start auto-play
function startAutoplay() {
  autoplayTimer = window.setInterval(() => {
    next();
  }, autoplayInterval);
}

// Pause auto-play
function pauseAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer);
    autoplayTimer = undefined;
  }
}

// Lifecycle hooks to manage auto-play
onMounted(() => {
  startAutoplay();
});

onBeforeUnmount(() => {
  pauseAutoplay();
});
</script>

<style scoped>
.carousel-container {
  position: relative;
}

.carousel-container .overflow-hidden {
  width: 100%;
}

.carousel-container .flex {
  display: flex;
}

.carousel-container .transition-transform {
  transition: transform 0.5s ease-in-out;
}

.carousel-container .flex-shrink-0 {
  flex-shrink: 0;
}

.carousel-container button:focus {
  outline: none;
}

/* Make the ReviewCard smaller */
.review-card-smaller {
  /* Adjust padding and width as needed */
  max-width: 350px; /* Example: Limit the maximum width */
  margin: 0 auto; /* Center the card */
  padding: 6px 12px; /* Reduce padding */
}

/* Optional: Adjust the ReviewCard's internal styles if necessary */
</style>
