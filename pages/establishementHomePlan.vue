<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
import Bloc3Establishment from '~/components/Sections/Establishement/BlocThree.vue';
import { plans } from '~/types/plans';

const currentUser = useAuthUser();
const router = useRouter();
const route = useRoute();

// Reference to the pricing section
const pricingSection = ref<HTMLElement | null>(null);

// Function to scroll to pricing section
const scrollToPricing = () => {
  pricingSection.value?.scrollIntoView({ behavior: 'smooth' });
};

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
      plan            // Add the selected plan
    }
  });
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
    <div class="w-full h-20 bg-white" style="background-image: url('/images/hotels.png'); background-size: 70%; background-position: center; background-repeat: no-repeat;">
    </div>
    <Bloc2Establishment class="py-[300px]" />

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



    <!-- What do you get -->
    <div class="w-full pb-20">
      <div class="w-full p-10 flex justify-center items-center flex-col gap-10" style="font-family: Montserrat;">
      <h1 class="font-bold text-center text-4xl text-gray-700 uppercase pb-20">What do you get ?</h1>
      <div class="w-80 h-4 bg-gray-400"></div>

      <div class="flex justify-center items-center flex-col p-5">
        <div class="flex justify-center items-center gap-10">
          <div><img class="w-10" src="public\images\angle-right-svgrepo-com.png" alt=""></div>
          <p class="text-gray-800 text-xl w-60 text-left">Eco-friendly Fitness Solutions</p>
          <p class="text-gray-800 text-xl w-60 text-right">Training and nutrition Support</p>
          <div><img class="w-10" src="public\images\angle-left-svgrepo-com.png" alt=""></div>
        </div>

        <div class="flex justify-center items-center gap-10">
          <div><img class="w-10" src="public\images\angle-right-svgrepo-com.png" alt=""></div>
          <p class="text-gray-800 text-xl w-60 text-left">Space Optimization</p>
          <p class="text-gray-800 text-xl w-60 text-right">Digital Platforms</p>
          <div><img class="w-10" src="public\images\angle-left-svgrepo-com.png" alt=""></div>
        </div>

        <div class="flex justify-center items-center gap-10">
          <div><img class="w-10" src="public\images\angle-right-svgrepo-com.png" alt=""></div>
          <p class="text-gray-800 text-xl w-60 text-left">Customer Experience</p>
          <p class="text-gray-800 text-xl w-60 text-right">Sustainable Practices</p>
          <div><img class="w-10" src="public\images\angle-left-svgrepo-com.png" alt=""></div>
        </div>
        
      </div>

      <div class="w-80 h-4 bg-gray-400"></div>

      <div class="w-full h-40 flex justify-center items-center pt-40">
        <button @click="scrollToPricing" class="text-black px-10 py-3 uppercase text-lg tracking-[10px] border-black border-2 hover:bg-gray-100 transition-colors cursor-pointer">Start now</button>
      </div>
    </div>
    </div>



    <!-- INCREASE OCCUPANCY RATES -->   
    <Bloc3Establishment 
      image1="/images/128.png" 
      link="" 
      TitleText="INCREASE OCCUPANCY RATES"
      DescText="Hotels and accommodations with fitness
solutions report up to a 10% increase in
bookings. Be the preferred choice for healthconscious travelers.
"
      EndText="(McKinsey, 2023)"
      :TitleStyle="{ color: '#545454', fontWeight: 600, padding: '10px' }"
      :DescStyle="{ color: '#545454', fontWeight: 400, padding: '10px' }"
      :EndStyle="{ color: '#545454', fontWeight: 400, padding: '10px' }"
      buttonText="MORE" 
      image2="/images/statistic-grow-svgrepo-com.png" 
      headingText="INDOORS & OUTDOORS"
      :image1Style="{ filter: 'contrast(120%) brightness(90%)' }"
      :buttonStyle="{  fontWeight: '600', border: '2px solid', shadow: '2px 2px 8px rgba(0, 0, 0, 1)' }"
      :headingStyle="{ textShadow: '1px 1px 5px black'}"
    />


    <!-- Why PERF -->
     <div class="w-full pt-50 bg-[#F2F2F2]">
      <h1 class="font-bold text-center text-4xl text-gray-700 uppercase pb-20">Why PERF ? </h1>
      <div class="w-full h-[100vh] bg-white" style="background-image: url('/images/whyPerf.png'); background-size: cover; background-position: center; background-repeat: no-repeat;">
      </div>
     </div>
    

    <!-- <HomeFour image1="/images/129.png" link="" buttonText="MORE" image2="/images/128.png" headingText="AT HOME, OUTDOORS, </br> OR WHILE TRAVELING!"/> -->
   
    <div ref="pricingSection">
      <PricingBloc 
        @planSelected="handlePlanSelection"
        :title="plans.ESTABLISHEMENT.title"
        :plan_1="plans.ESTABLISHEMENT.plans.plan_1"
        :plan_2="plans.ESTABLISHEMENT.plans.plan_2"
        :plan_3="plans.ESTABLISHEMENT.plans.plan_3"
      />
    </div>
  </div>
</template>
