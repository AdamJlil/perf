<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from '#app';
const currentUser = useAuthUser();
const router = useRouter();

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
    <HomeOne />


    
    <div class="w-full lg:h-[220px] md:h-[160px] max-md:h-[120px] max-sm:h-[70px] bg-[#EFEFEC] flex justify-center items-center text-center">
        <p class="anytime text-black z-9 text-left text-sm sm:text-3xl lg:text-4xl text-center font-medium tracking-wide" style="font-weight: 300;" >
            ANYWHERE, ANYTIME
        </p>
    </div>
    <!-- <VideoSlider/> -->
    <HomeTwwo />
    <HomeThree class="my-[150px]" />
    <HomeFour image1="/images/blockfour1.jpg" link="/products" buttonText="MORE" image2="/images/blockfour2.jpg" headingText="AT HOME, OUTDOORS, </br> OR WHILE TRAVELING!"/>
    <Bloc3 />
    <Bloc4 headingText=" What are you <br /> waiting for?" />

    
    <!-- <BlocTwo /> -->
    <!-- <BlocThree /> -->
    <!-- <BlocFour/> -->
    <!-- <BlocFive/> -->
    <!-- <VideoSliderReviews/> -->
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
