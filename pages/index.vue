<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import Bloc2Establishment from "~/components/features/Sections/Establishement/BlocTwo.vue";
import Bloc3 from "~/components/features/Sections/Nutrition/BlocThree.vue";
import PricingBloc from "~/components/features/Sections/Join/PricingBloc.vue";
import { plans } from "~/types/plans";

const router = useRouter();
const route = useRoute();
const { user } = useAuth();

const pricingSection = ref<HTMLElement | null>(null);

const currentPlanTitle = computed(() => {
  if (!user.value?.plan) return "";
  if (typeof user.value.plan === "string") {
    try {
      return JSON.parse(user.value.plan).title;
    } catch (e) {
      return user.value.plan;
    }
  }
  return user.value.plan.title;
});

const isPaid = computed(() => !!user.value?.paid);
const requestedPlan = computed(() => user.value?.requested_plan);

const scrollToPricing = () => {
  pricingSection.value?.scrollIntoView({ behavior: "smooth" });
};

const reviews = [
  {
    reviewText:
      "Perf added real value to our guest experience without taking up any extra space. Our suites feel more premium, and the feedback has been incredible.\n— Lamia A., Owner, Boutique Riad – Fès",
    reviewerImage: "images/femme1.jpeg",
    filledStars: 5,
  },
  {
    reviewText:
      "The fact that I didn’t need to go looking for a gym made my stay so much better. I loved being able to work out in total privacy and on my own time.\n— Salma K., Guest – Marrakech",
    reviewerImage: "images/femme2.jpeg",
    filledStars: 5,
  },
  {
    reviewText:
      "We were hesitant at first, but our guests love the flexibility. Perf helped us offer a high-end wellness solution without building a gym.\n— Youssef B., Manager, Luxury Guesthouse – Essaouira",
    reviewerImage: "images/homme1.jpeg",
    filledStars: 5,
  },
  {
    reviewText:
      "I travel a lot for work, and having Perf in my room was a game changer. I trained, stretched, and even followed a guided breathing session — all without leaving my suite.\n— Marc G., Traveler – Agadir",
    reviewerImage: "images/homme2.jpeg",
    filledStars: 5,
  },
  {
    reviewText:
      "Perf created a whole new revenue stream for us. Guests book rooms with the unit more often, and the in-room usage rate is higher than we expected.\n— Sophie M., General Manager, Urban Suites – Casablanca",
    reviewerImage: "images/femme3.jpeg",
    filledStars: 5,
  },
];

const features = [
  {
    title: "Mobile training station",
    desc: "Professional grade fitness equipment delivered directly to your guest rooms.",
    icon: '<path d="M6.5 2h11M6.5 22h11M12 2v20M2 7h20M2 17h20" />', // Simplified dumbbell-ish
  },
  {
    title: "More bookings",
    desc: "Attract health-conscious travelers and increase your establishment's appeal.",
    icon: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/><path d="M16.2 11a3 3 0 1 1-5.9-1.2"/>', // Trending/Growth
  },
  {
    title: "Workout videos",
    desc: "Guided, high-quality workout content tailored for every fitness level.",
    icon: '<polygon points="5 3 19 12 5 21 5 3"/>', // Play icon
  },
  {
    title: "Upgraded experience",
    desc: "Transform a standard stay into a premium wellness journey.",
    icon: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>', // Sparkle
  },
  {
    title: "Space optimization",
    desc: "Maximize your room utility without the need for a dedicated gym facility.",
    icon: '<path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/>', // Grid
  },
  {
    title: "Higher satisfaction",
    desc: "Boost your reviews and guest loyalty with thoughtful wellness amenities.",
    icon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>', // Heart
  },
];

const handlePlanSelection = (plan: string) => {
  const currentQuery = { ...route.query };
  router.push({
    path: "/auth/signUp",
    query: {
      ...currentQuery,
      plan,
    },
  });
};
</script>

<template>
  <div class="w-full overflow-x-hidden bg-[#EFEFEC]">
    <!-- Hero Section -->
    <div class="relative flex justify-center items-start pt-4 px-4" style="z-index: 2">
      <div class="relative w-full max-w-7xl h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-lg">
        <img
          src="/images/headerRotate.jpg"
          alt="Hospitality Wellness"
          class="absolute inset-0 w-full h-[125%] object-cover z-0"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-[#f5dd9a2e] z-10"></div>
        <div
          class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 md:px-16 gap-6"
        >
          <p
            class="text-white text-left text-2xl md:text-3xl xl:text-4xl font-normal tracking-[4px] md:tracking-[8px] uppercase max-w-2xl leading-tight"
          >
            Rise Your Visitors Satisfaction!
          </p>
          <NuxtLink
            to="/auth/login"
            class="uppercase border border-white text-white bg-transparent font-light tracking-[4px] rounded-md hover:bg-white hover:text-black transition-all duration-300 py-3 px-10 text-center text-sm md:text-base w-48 md:w-64 flex items-center justify-center whitespace-nowrap"
          >
            Log In
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Secondary Bloc -->
    <Bloc2Establishment />

    <!-- NO GYM Section -->
    <div class="relative flex justify-center items-start pt-10 px-4" style="z-index: 2">
      <div class="relative w-full max-w-7xl h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-lg">
        <img
          src="/images/home2.jpeg"
          alt="No Gym? No Problem"
          class="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div class="absolute top-0 left-0 w-full h-full bg-black/30 z-10"></div>
        <div class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <p
            class="text-white text-center text-2xl md:text-4xl font-normal tracking-[6px] md:tracking-[10px] uppercase text-shadow-lg px-4"
          >
            No Gym? No Problem!
          </p>
        </div>
      </div>
    </div>

    <!-- Reviews -->
    <Bloc3 class="my-20 md:my-32" :reviews="reviews" />

    <!-- What do you get (Enhanced) -->
    <div class="w-full py-32 px-4 bg-white/40 backdrop-blur-sm border-y border-white/20">
      <div class="max-w-7xl mx-auto flex flex-col items-center">
        <span class="text-[10px] font-bold tracking-[4px] uppercase text-[#D05E33] mb-4">The PERF Advantage</span>
        <h2
          class="text-3xl md:text-4xl font-normal text-center mb-20 uppercase tracking-[8px] text-gray-800 leading-tight"
        >
          What do you get?
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 w-full max-w-6xl">
          <div
            v-for="item in features"
            :key="item.title"
            class="flex flex-col items-center md:items-start group transition-all duration-500"
          >
            <div
              class="w-16 h-16 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-[#D05E33]/30 group-hover:-translate-y-2 transition-all duration-500 mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D05E33"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-html="item.icon"
              ></svg>
            </div>
            <h3
              class="text-gray-800 font-bold uppercase tracking-[2px] text-sm mb-4 group-hover:text-[#D05E33] transition-colors"
            >
              {{ item.title }}
            </h3>
            <p
              class="text-gray-500 text-xs leading-relaxed max-w-xs text-center md:text-left font-medium tracking-wide"
            >
              {{ item.desc }}
            </p>
          </div>
        </div>

        <div class="pt-24">
          <button
            class="group flex items-center gap-4 uppercase border-2 border-black text-black bg-transparent font-bold tracking-[4px] rounded-md hover:bg-black hover:text-white transition-all duration-500 px-12 py-5 text-xs overflow-hidden relative"
            @click="scrollToPricing"
          >
            <span class="relative z-10">Start Your Journey</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="relative z-10 transition-transform duration-500 group-hover:translate-x-2"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Occupancy Rates Section -->
    <div class="relative flex justify-center items-start px-4" style="z-index: 2">
      <div class="relative w-full max-w-7xl h-[500px] md:h-[600px] rounded-[40px] overflow-hidden shadow-lg">
        <img src="/images/handsup.jpg" alt="Occupancy Rates" class="absolute inset-0 w-full h-full object-cover z-0" />
        <div class="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>
        <div
          class="absolute z-20 top-0 left-0 w-full h-full flex flex-col justify-center items-start px-8 md:px-16 gap-6 max-w-3xl"
        >
          <h2 class="text-white text-left text-2xl md:text-4xl font-bold tracking-tight uppercase leading-tight">
            Increased Occupancy & Satisfaction Rates
          </h2>
          <div class="w-24 h-1 bg-[#D05E33]"></div>
          <p class="text-white/90 text-left text-base md:text-xl font-normal leading-relaxed">
            Hotels and accommodations with fitness solutions report up to a 10% increase in bookings. Be the preferred
            choice for health-conscious travelers.
          </p>
          <p class="text-white/50 text-xs uppercase tracking-widest">(McKinsey, 2023)</p>
          <button
            class="uppercase border border-white text-white bg-transparent px-10 py-3 text-sm tracking-[4px] font-bold rounded-md hover:bg-white hover:text-black transition-all duration-300 mt-4"
            @click="scrollToPricing"
          >
            Explore Plans
          </button>
        </div>
      </div>
    </div>

    <!-- Why PERF -->
    <div class="w-full py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <!-- Mobile/Tablet Layout -->
        <div class="flex flex-col gap-16 lg:hidden items-center">
          <div
            v-for="(step, i) in [
              {
                title: 'UNDERSTAND',
                desc: 'We start by understanding your space, your guests, and your vision — to craft a fitness experience that truly fits your establishment.',
              },
              {
                title: 'CREATE',
                desc: 'We design elegant, space-saving equipment and digital training videos that blends seamlessly into your rooms — adding value without requiring renovation.',
              },
              {
                title: 'ELEVATE',
                desc: 'From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the difference — and your reviews reflect it.',
              },
            ]"
            :key="i"
            class="flex flex-col items-center text-center gap-6 max-w-sm"
          >
            <div
              class="w-48 h-48 md:w-64 md:h-64 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-xl text-white shadow-xl"
            >
              {{ step.title }}
            </div>
            <p class="text-sm text-gray-600 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>

        <!-- Desktop Venn -->
        <div class="hidden lg:block relative h-[450px]">
          <div class="flex justify-center relative h-[320px] w-full">
            <div class="relative w-[896px] h-80">
              <div
                class="absolute top-0 left-0 w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-white shadow-xl"
              >
                UNDERSTAND
              </div>
              <div
                class="absolute top-0 left-[288px] w-80 h-80 bg-[#e66939cc] rounded-full z-20 flex items-center justify-center font-bold text-lg text-white shadow-xl"
              >
                CREATE
              </div>
              <div
                class="absolute top-0 left-[576px] w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-white shadow-xl"
              >
                ELEVATE
              </div>
            </div>
          </div>
          <div class="w-[896px] mx-auto flex flex-row justify-between mt-12 text-sm text-gray-600">
            <p class="w-[260px]">
              We start by understanding your space, your guests, and your vision — to craft a fitness experience that
              truly fits your establishment.
            </p>
            <p class="w-[260px]">
              We design elegant, space-saving equipment and digital training videos that blends seamlessly into your
              rooms — adding value without requiring renovation.
            </p>
            <p class="w-[260px]">
              From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the
              difference — and your reviews reflect it.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Pricing Section -->
    <div id="pricing-section" ref="pricingSection" class="pb-10">
      <PricingBloc
        :title="plans.ESTABLISHEMENT.title"
        :plan_1="plans.ESTABLISHEMENT.plans.plan_1"
        :plan_2="plans.ESTABLISHEMENT.plans.plan_2"
        :plan_3="plans.ESTABLISHEMENT.plans.plan_3"
        :current-plan="currentPlanTitle"
        :is-paid="isPaid"
        :requested-plan="requestedPlan"
        @plan-selected="handlePlanSelection"
      />
    </div>
  </div>
</template>

<style scoped>
.text-shadow-lg {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}
</style>
