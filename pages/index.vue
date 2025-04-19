<script lang="ts" setup>
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

// Redirect establishment users to their customer management page
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
    <HomeOne 
      background-image="/images/homeone.jpg"
      image-alt="Background Image"
      main-text="READY TO GET FIT?"
      button-text="LOG IN"
      button-link="/login"
    />
    <div class="w-full mt-[40px]  bg-[#EFEFEC] flex justify-center items-center text-center">
        <p class="anytime text-black z-9 text-left text-sm  sm:text-3xl lg:text-4xl text-center font-medium tracking-wide" style="font-weight: 300;" >
            ANYWHERE, ANYTIME
        </p>
    </div>
    <!-- <VideoSlider/> -->
    <HomeTwwo />
    <HomeFour class="my-[150px]"   image1="/images/work1.png" link="/particulierHomePlan" buttonText="MORE" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE."/>    
    <Bloc3 :reviews="reviews" />
    <HomeThree class="my-[150px]" />
    <HomeFour image1="/images/blockfour1.jpg" link="/establishementHomePlan" buttonText="MORE" image2="/images/blockfour2.jpg" headingText="AT HOME, OUTDOORS, </br> OR WHILE TRAVELING!"/>
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
</style>
