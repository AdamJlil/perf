<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from "~/components/Sections/Nutrition/Header.vue";
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import Bloc2 from "~/components/Sections/Nutrition/BlocTwo.vue"
import Bloc2Establishment from "~/components/Sections/Establishement/BlocTwo.vue"
import Bloc3 from "~/components/Sections/Nutrition/BlocThree.vue";
import Bloc4 from "~/components/Sections/Nutrition/BlocFour.vue";
import HomeFour from '~/components/home/HomeFour.vue';
import PricingBloc from '~/components/Sections/Join/PricingBloc.vue';
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
    reviewText: "Perf added real value to our guest experience without taking up any extra space. Our suites feel more premium, and the feedback has been incredible.\n— Lamia A., Owner, Boutique Riad – Fès",
    reviewerImage: "images/femme1.jpeg",
    filledStars: 5,
  },
  {
    reviewText: "The fact that I didn’t need to go looking for a gym made my stay so much better. I loved being able to work out in total privacy and on my own time.\n— Salma K., Guest – Marrakech",
    reviewerImage: "images/femme2.jpeg",
    filledStars: 5,
  },
  {
    reviewText: "We were hesitant at first, but our guests love the flexibility. Perf helped us offer a high-end wellness solution without building a gym.\n— Youssef B., Manager, Luxury Guesthouse – Essaouira",
    reviewerImage: "images/homme1.jpeg",
    filledStars: 5,
  },
  {
    reviewText: "I travel a lot for work, and having Perf in my room was a game changer. I trained, stretched, and even followed a guided breathing session — all without leaving my suite.\n— Marc G., Traveler – Agadir",
    reviewerImage: "images/homme2.jpeg",
    filledStars: 5,
  },
  {
    reviewText: "Perf created a whole new revenue stream for us. Guests book rooms with the unit more often, and the in-room usage rate is higher than we expected.\n— Sophie M., General Manager, Urban Suites – Casablanca",
    reviewerImage: "images/femme3.jpeg",
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
.shadowme {
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
}

.big-text-mobile {
  font-size: 6vw !important; 
  font-weight: 700 !important;
  letter-spacing: 3px !important;
  line-height: 1.2 !important;
}

.mobile-highlight-text {
  font-size: 3vw;
  font-weight: 500;
  letter-spacing: 1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
}

@media (max-width: 768px) {
  .mobile-highlight-text {
    font-size: 7vw !important;
    font-weight: 900 !important;
    letter-spacing: 2px !important;
    text-shadow: 2px 2px 6px rgba(0,0,0,0.9) !important;
  }
}

@media (min-width: 768px) {
  .big-text-mobile {
    font-size: 3vw !important;
    letter-spacing: 15px !important;
  }
}

/* Custom mobile banner styles */
.custom-banner {
  position: relative;
  width: 100%;
  height: 25vh;
  overflow: hidden;
}

@media (min-width: 768px) {
  .custom-banner {
    height: 60vh;
  }
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-content {
  position: relative;
  z-index: 10;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  text-align: center;
}

.banner-text {
  color: white;
  font-family: Montserrat, sans-serif;
  font-size: 1.25rem;
  font-weight: 500;
  letter-spacing: 2px;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
  margin-bottom: 1rem;
  max-width: 90%;
}

.banner-button {
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.5);
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.banner-button:hover {
  background: rgba(255,255,255,0.1);
}

@media (min-width: 768px) {
  .banner-content {
    align-items: flex-start;
    padding-left: 5rem;
    text-align: left;
  }
  
  .banner-text {
    font-size: 2rem;
    letter-spacing: 5px;
  }
  
  .banner-button {
    font-size: 1rem;
    padding: 0.75rem 2rem;
  }
}
</style>

<template>
  <div>
    <!-- Custom banner that replaces HomeOne with better mobile control -->
    <!-- <div class="custom-banner">
      <img src="/images/hospi1.png" alt="Background Image" class="banner-image" />
      <div class="banner-content">
        <p class="banner-text">TAKE YOUR VISITORS SATISFACTION HIGHER</p>
        <nuxt-link to="/login" class="banner-button">LOG IN</nuxt-link>
      </div>
    </div> -->

      <div class="relative flex justify-center items-start mt-[20px]" style="z-index:2;">
        <div class="relative w-full mx-[15px] mt-8 rounded-[40px] overflow-hidden shadow-lg" style="height:600px;">
          <img 
            src="/images/headerRotate.jpg" 
            alt="Background Image" 
            class="absolute inset-0 w-full h-full object-cover z-0 scale-[1.2]" 
          />

          <div class="absolute top-0 left-0 w-full h-full bg-[#f5dd9a2e] z-10"></div>



          <!-- Overlayed content -->
          <div class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 md:px-16 gap-6">
            <p class="text-white text-left text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[7px] mb-[20px] max-w-[90%]" style="font-weight: 200;">
             RISE YOUR VISITORS SATISFACTION !
            </p>
            <nuxt-link to="/login" class="uppercase border border-white text-white bg-transparent font-light tracking-[5px] rounded-md hover:bg-white hover:text-black transition-colors duration-200 py-2 px-6 md:px-10 text-center text-sm sm:w-[215px] w-[150px] sm:h-[50px] h-[40px] flex items-center justify-center  whitespace-nowrap" style="font-weight: 300;">
              LOG IN
            </nuxt-link>
          </div>
        </div>
      </div>

    <!-- <div class="w-full h-20 bg-[#EFEFEC]" style="background-image: url('/images/hotels.png'); background-size: 70%; background-position: center; background-repeat: no-repeat;">
    </div> -->
    <!-- <div class="w-full py-6 md:py-8 bg-[#EFEFEC] flex flex-wrap items-center justify-center gap-6 md:gap-[80px] mt-[10px] sm:mt-[20px]">
      <NuxtImg src="/images/forsea.png" alt="Background Image" class="w-[100px] md:w-[150px] h-auto object-contain" />
      <NuxtImg src="/images/sofitel.png" alt="Background Image" class="w-[100px] md:w-[150px] h-auto object-contain" />
      <NuxtImg src="/images/riuu.png" alt="Background Image" class="w-[100px] md:w-[150px] h-auto object-contain" />
    </div> -->
    <Bloc2Establishment />

    <div class="relative flex justify-center items-start mt-[20px]" style="z-index:2;">
      <div class="relative w-full mx-[15px] mt-8 rounded-[40px] overflow-hidden shadow-lg" style="height:600px;">
        <img 
          src="/images/home2.jpeg" 
          alt="Background Image" 
          class="absolute inset-0 w-full h-full object-cover z-0 scale-[1.2]" 
        />
        <div class="absolute top-0 left-0 w-full h-full bg-[#7370624a] z-10"></div>
        <!-- Overlayed content -->
        <div class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <p class="text-white text-center text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-[7px] max-w-[90%]" style="font-weight: 200; text-shadow: 2px 2px 8px rgba(0,0,0,0.73);">
            NO GYM ? NO PROBLEM !
          </p>
        </div>
      </div>
    </div>

    <Bloc3 class="my-[100px]" :reviews="reviews" />



    <!-- What do you get -->
    <div class="w-full pb-10 md:pb-20">
      <div class="w-full p-4 md:p-10 flex justify-center items-center flex-col gap-6 md:gap-10" style="font-family: Montserrat;">
      <h1 class="font-bold text-center text-2xl md:text-4xl text-gray-700 uppercase pb-10 md:pb-20">What do you get ?</h1>
      <div class="w-64 md:w-80 h-3 md:h-4 bg-gray-400"></div>

      <div class="flex justify-center items-center flex-col p-3 md:p-5">
        <!-- First row - stack on mobile, side by side on md+ -->
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6 md:mb-0">
          <div class="flex items-center md:w-auto w-full gap-[30px]">
            <div class="md:block hidden"><img class="w-8 md:w-10" src="public\images\angle-right-svgrepo-com.png" alt=""></div>
            <p class="text-gray-800 text-lg md:text-xl w-full md:w-60 text-center md:text-left">Mobile training station</p>
          </div>
          
          <div class="flex items-center md:w-auto w-full gap-[30px]">
            <p class="text-gray-800 text-lg md:text-xl w-full md:w-60 text-center md:text-right">More bookings</p>
            <div class="md:block hidden"><img class="w-8 md:w-10" src="public\images\angle-left-svgrepo-com.png" alt=""></div>
          </div>
        </div>

        <!-- Second row - stack on mobile, side by side on md+ -->
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10 mb-6 md:mb-0">
          <div class="flex items-center md:w-auto w-full gap-[30px]">
            <div class="md:block hidden"><img class="w-8 md:w-10" src="public\images\angle-right-svgrepo-com.png" alt=""></div>
            <p class="text-gray-800 text-lg md:text-xl w-full md:w-60 text-center md:text-left">Workout videos</p>
          </div>
          
          <div class="flex items-center md:w-auto w-full gap-[30px]">
            <p class="text-gray-800 text-lg md:text-xl w-full md:w-60 text-center md:text-right">Upgraded experience</p>
            <div class="md:block hidden"><img class="w-8 md:w-10" src="public\images\angle-left-svgrepo-com.png" alt=""></div>
          </div>
        </div>

        <!-- Third row - stack on mobile, side by side on md+ -->
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10">
          <div class="flex items-center md:w-auto w-full gap-[30px]">
            <div class="md:block hidden"><img class="w-8 md:w-10" src="public\images\angle-right-svgrepo-com.png" alt=""></div>
            <p class="text-gray-800 text-lg md:text-xl w-full md:w-60 text-center md:text-left">Space optimization</p>
          </div>
          
          <div class="flex items-center md:w-auto w-full gap-[30px]">
            <p class="text-gray-800 text-lg md:text-xl w-full md:w-60 text-center md:text-right">Higher satisfaction</p>
            <div class="md:block hidden"><img class="w-8 md:w-10" src="public\images\angle-left-svgrepo-com.png" alt=""></div>
          </div>
        </div>
        
      </div>

      <div class="w-64 md:w-80 h-3 md:h-4 bg-gray-400"></div>

      <div class="w-full h-32 md:h-40 flex justify-center items-center md:pt-40 pt-20">
        <button @click="scrollToPricing" class="uppercase border border-black text-black bg-transparent font-light tracking-[5px] rounded-md hover:bg-black hover:text-white transition-colors duration-200 px-6 md:px-10 py-2 md:py-3 text-md md:text-lg cursor-pointer">Start now</button>
      </div>
    </div>
    </div>



    <!-- INCREASE OCCUPANCY RATES -->   
      <div class="relative flex justify-center items-start mt-[20px]" style="z-index:2;">
        <div class="relative w-full mx-[15px] mt-8 rounded-[40px] overflow-hidden shadow-lg" style="height:600px;">
          <img 
            src="/images/handsup.jpg" 
            alt="Background Image" 
            class="absolute inset-0 w-full h-full object-cover z-0" 
          />

          <!-- Overlayed content -->
          <div class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 md:px-16 gap-4 max-w-[600px]">
            <h2 class="text-white text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide uppercase mb-2" style="letter-spacing: 1px;">INCREASED OCCUPANCY & SATISFACTION RATES</h2>
            <div class="w-[90%] h-[2px] bg-white opacity-40 mb-2"></div>
            <p class="text-white text-left text-base sm:text-lg md:text-xl font-normal mb-2" style="font-weight: 400; line-height: 1.4;">
              Hotels and accommodations with fitness solutions report up to a 10% increase in bookings. Be the preferred choice for health-conscious travelers.
            </p>
            <p class="text-white text-left text-sm opacity-60 mb-4">(McKinsey, 2023)</p>
            <button @click="scrollToPricing" class="uppercase border border-white text-white bg-transparent px-8 py-3 text-base tracking-[5px] font-light rounded-md hover:bg-white hover:text-black transition-colors duration-200" style="letter-spacing: 3px; min-width: 180px;">MORE</button>
          </div>
        </div>
      </div>


    <!-- Why PERF -->
    <div class="bg-[#EFEFEC] py-[40px] lg:py-[200px] px-4">
      <!-- DESKTOP: 10% OVERLAP VENN LAYOUT -->
      <div class="hidden lg:flex justify-center relative h-[320px] w-full">
        <div class="relative w-[896px] h-80">
          <!-- Left Circle -->
          <div class="absolute top-0 left-0 w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-neutral-900">
            UNDERSTAND
          </div>
          <!-- Middle Circle -->
          <div class="absolute top-0 left-[288px] w-80 h-80 bg-[#e66939cc] rounded-full z-20 flex items-center justify-center font-bold text-lg text-neutral-900">
            CREATE
          </div>
          <!-- Right Circle -->
          <div class="absolute top-0 left-[576px] w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-neutral-900">
            ELEVATE
          </div>
        </div>
      </div>

      <!-- MOBILE/TABLET: VERTICAL LAYOUT -->
      <div class="flex flex-col gap-10 lg:hidden mt-10 text-neutral-900 text-sm items-center text-center">
        <!-- DISCOVER -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-80 h-80 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-lg">
            UNDERSTAND
          </div>
          <p class="max-w-xs">
            We start by understanding your space, your guests, and your vision — to craft a fitness experience that truly fits your establishment.
          </p>
        </div>
        <!-- DESIGN -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-80 h-80 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-lg">
            CREATE
          </div>
          <p class="max-w-xs">
            We design elegant, space-saving equipment and digital training videos that blends seamlessly into your rooms — adding value without requiring renovation.          
          </p>
          </div>
        <!-- DELIVER -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-80 h-80 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-lg">
            ELEVATE
          </div>
          <p class="max-w-xs">
            From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the difference — and your reviews reflect it.         
          </p>
          </div>
      </div>

      <!-- DESKTOP TEXT BELOW CIRCLES -->
      <div class="w-[896px] mx-auto hidden lg:flex flex-row justify-between mt-[-30px] text-sm md:mt-[50px] text-neutral-900">
        <div class="w-[260px] flex flex-col">
          <p>
            We start by understanding your space, your guests, and your vision — to craft a fitness experience that truly fits your establishment.
          </p>
        </div>
        <div class="w-[260px] flex flex-col">
          <p>
            We design elegant, space-saving equipment and digital training videos that blends seamlessly into your rooms — adding value without requiring renovation.
          </p>
        </div>
        <div class="w-[260px] flex flex-col">
          <p>
            From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the difference — and your reviews reflect it.          
          </p>
        </div>
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
