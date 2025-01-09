<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from "~/components/Sections/Nutrition/Header.vue";
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import Bloc2 from "~/components/Sections/Nutrition/BlocTwo.vue"
import Bloc2Establishment from "~/components/Sections/Establishement/BlocTwo.vue"
import Bloc3 from "~/components/Sections/Nutrition/BlocThree.vue";
import Bloc4 from "~/components/Sections/Nutrition/BlocFour.vue";
import HomeOne from '~/components/home/HomeOne.vue';
import HomeFour from '~/components/home/HomeFour.vue';
import PricingBloc from '~/components/sections/Join/PricingBloc.vue';
import { plans } from '~/types/plans';

const currentUser = useAuthUser();
const router = useRouter();
const route = useRoute();

const reviews = [
  {
    reviewText: "Our gym members love having access to PERF. It's added so much value to our membership offerings!",
    reviewerImage: "images/er1.jpg",
    filledStars: 5,
  },
  {
    reviewText: "Implementing PERF in our corporate wellness program has been a game-changer. Employee satisfaction is up 40%!",
    reviewerImage: "images/er2.jpg",
    filledStars: 5,
  },
  {
    reviewText: "The seamless integration and professional support from PERF has made this partnership incredibly valuable.",
    reviewerImage: "images/er3.jpg",
    filledStars: 5,
  },
];

// Redirect establishment users to their customer management page
onMounted(() => {
  if (currentUser.value?.type === 'ESTABLISHEMENT') {
    router.push({
      path: '/establishementCRUDCostumer',
      query: { userId: currentUser.value.id }
    });
  }
});

const handlePlanSelection = (plan: string) => {
    // Get all existing query parameters
    const currentQuery = { ...route.query };
    
    // Add the selected plan to the query parameters
    router.push({
    path: '/signUp',
    query: {
        ...currentQuery, // This spreads all existing params
        plan,            // Add the selected plan
        userType: 'ESTABLISHEMENT' // Override or add the userType query param
    }
})

};
</script>

<style scoped>
/* Add specific shadow for pricing text to ensure readability */
:deep(.shadowme) {
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
}
</style>

<template>
  <div>
      <HomeOne 
        background-image="/images/hospi1.png"
        image-alt="Background Image"
        main-text="TAKE YOUR VISITORS SATISFACTION HIGHER"
        button-text="LOG IN"
        button-link="/login"
      />
    <Bloc2Establishment class="py-[300px]"  />

    <div class="relative w-full h-[90vh] max-md:h-[50vh] overflow-hidden">
      <!-- Background Image -->
      <img 
        src="/images/123.png" 
        alt="Background Image" 
        class="absolute top-0 left-0 w-full h-full object-cover"
      />
      
      <!-- Content -->
      <div class="relative h-full w-full flex justify-end max-md:justify-center items-center px-[90px] max-md:px-[20px]">
        <p class="shadowme text-white z-10 text-right max-md:text-center text-base sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-[15px] max-md:tracking-[4px]" style="font-weight: 700;">
          ANY SPACE, ANY TIME
        </p>
      </div>
    </div>

    <Bloc3 class="my-[100px] py-[100px]" :reviews="reviews" />
    <HomeFour  image1="/images/129.png" link="" buttonText="MORE" image2="/images/128.png" headingText="AT HOME, OUTDOORS, </br> OR WHILE TRAVELING!"/>
   
 

    <PricingBloc 
        @planSelected="handlePlanSelection"
        :title="plans.ESTABLISHEMENT.title"
        :plan_1="plans.ESTABLISHEMENT.plans.plan_1"
        :plan_2="plans.ESTABLISHEMENT.plans.plan_2"
        :plan_3="plans.ESTABLISHEMENT.plans.plan_3"
    />
  </div>
</template>
