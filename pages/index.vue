<!-- <script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from '#app';
const currentUser = useAuthUser();
const router = useRouter();

const reviews = [
  {
    reviewText: "Before PERF, i hated working out. now i move my body 4 to 5 times a week. i'm more productive, energetic and happier !",
    reviewerImage: "images/hr1.jpg",
    filledStars: 5,
  },
  {
    reviewText: "As a busy professional, PERF has transformed how I approach fitness. The flexibility and quality of workouts are unmatched!",
    reviewerImage: "images/hr2.jpg",
    filledStars: 5,
  },
  {
    reviewText: "The personalized approach and constant support make PERF stand out. It's not just a fitness app, it's a lifestyle change.",
    reviewerImage: "images/hr3.jpg",
    filledStars: 5,
  },
];

onMounted(() => {
  if (currentUser.value?.type === 'ETABLISSEMENT') {
    router.push({
      path: '/establishementCRUDCostumer',
      query: { userId: currentUser.value.id }
    });
  }
});

import HomeOne from '~/components/home/HomeOne.vue';
import HomeTwwo from '~/components/home/HomeTwwo.vue';
import HomeThree from '~/components/home/HomeThree.vue';
import HomeFour from '~/components/home/HomeFour.vue';
import Bloc3 from "~/components/Sections/Nutrition/BlocThree.vue";
import Bloc4 from "~/components/Sections/Nutrition/BlocFour.vue";

import CardInfo from "~/components/SharedCardInfo.vue";

import Header from '~/components/sections/Header.vue';
import BlocTwo from '~/components/sections/BlocTwo.vue';
import BlocThree from '~/components/sections/BlocThree.vue';
import BlocFour from '~/components/sections/BlocFour.vue';
import BlocFive from '~/components/sections/BlocFive.vue';
import VideoSlider from '~/components/sections/VideoSlider.vue';
import VideoSliderReviews from '~/components/sections/VideoSliderReviews.vue';


</script>

<template>
      <div class="relative flex justify-center items-start mt-[20px]" style="z-index:2;">
        <div class="relative w-full mx-[15px] mt-8 rounded-[40px] overflow-hidden shadow-lg" style="height:600px;">
          <img 
            src="/images/headerRotate.jpg" 
            alt="Background Image" 
            class="absolute inset-0 w-full h-full object-cover z-0 scale-[1.2]" 
          />

          <div class="absolute top-0 left-0 w-full h-full bg-[#f5dd9a2e] z-10"></div>

          <div class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 md:px-16 gap-6">
            <p class="text-white text-left text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight max-w-[90%]" style="font-weight: 200;">
              RISE YOUR VISITORS SATISFACTION !
            </p>
            <nuxt-link to="/login" class="uppercase border border-white text-white bg-transparent font-light tracking-[5px] rounded-md hover:bg-white hover:text-black transition-colors duration-200 py-2 px-6 md:px-10 text-center text-sm sm:w-[215px] w-[150px] sm:h-[50px] h-[40px] flex items-center justify-center  whitespace-nowrap" style="font-weight: 300;">
              LOG IN
            </nuxt-link>
          </div>
        </div>
      </div>
    <div class="w-full mt-[40px]  bg-[#EFEFEC] flex justify-center items-center text-center">
        <p class="anytime text-black z-9 text-left text-sm  sm:text-3xl lg:text-4xl text-center font-medium tracking-wide" style="font-weight: 300;" >
            ANYWHERE, ANYTIME
        </p>
    </div>
    <HomeTwwo />
    <HomeFour class="my-[150px]"   image1="/images/work1.png" link="/particulierHomePlan" buttonText="MORE" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE."/>    
    <Bloc3 :reviews="reviews" />
    <HomeThree class="my-[150px]" />
    <Bloc4 headingText=" What are you <br /> waiting for?" />
</template>

<style scoped>
.anytime{
    letter-spacing: 15px;
}

@media (max-width: 450px) {
    .anytime{
    letter-spacing: 5px;
}
}
</style> -->
<script setup>
navigateTo('/establishementHomePlan', { redirectCode: 301 })
</script>
<template>
  <div>
  </div>
</template>
