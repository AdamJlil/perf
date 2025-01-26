<template>
  <div class="w-full" style="font-family: Montserrat">
    <div
      class="w-full text-center text-xl font-medium relative text-gray-8 flex flex-col justify-center items-center mt-70 uppercase tracking-2"
    >
      <h1 class="">Your costumers are loving the program.</h1>
      <p class="">keep it up !</p>
    </div>

    <div class="p-10 flex justify-between items-center h-[40vh] mt-20">
      <div class="flex flex-col">
        <span class="text-orange-7 tracking-0.3 text-sm"> Current plan </span>
        <h1 class="font-bold uppercase tracking-0.4 text-lg">platinum subscription</h1>
        <p class="mt-2 text-gray-7 tracking-0.4 text-sm">1500 dh</p>
      </div>

      <div class="flex flex-col items-center justify-end">
        <button
          class="uppercase cursor-pointer tracking-2 border-1 font-semibold border-gray-6 px-5 py-2 text-gray-6 text-xs"
        >
          upgrade plan
        </button>
      </div>
    </div>

    <div
      class="border-y-1.6 w-[90%] border-gray-4 mx-auto min-h-fit md:h-[30vh] px-4 md:px-10 text-sm py-10 md:py-20 flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <div class="w-full md:w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div class="text-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
          <p class="text-gray-8 text-xs font-medium tracking-0.4">Statut</p>
          <p class="mt-4 md:mt-9 font-bold tracking-0.4">Active</p>
        </div>

        <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
          <p class="text-gray-8 text-xs font-medium tracking-0.4">Number of users</p>
          <p class="mt-4 md:mt-9 font-bold tracking-0.4">56 users</p>
        </div>
        <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
          <p class="text-gray-8 text-xs font-medium tracking-0.4">Starting date</p>
          <p class="mt-4 md:mt-9 font-bold tracking-0.4">01-01-2025</p>
        </div>

        <div class="flex flex-col items-center border-b-1 md:border-b-0 md:border-r-1 border-gray-4 p-4">
          <p class="text-gray-8 text-xs font-medium tracking-0.4">End date</p>
          <p class="mt-4 md:mt-9 font-bold tracking-0.4">01-02-2025</p>
        </div>
      </div>

      <div class="w-full md:w-[10%] flex flex-col items-center justify-center">
        <button
          class="cursor-pointer text-3xl rounded px-4 py-2 text-red-600 hover:bg-gray-200 transition-colors duration-300 w-full md:w-auto flex justify-center"
          aria-label="Delete Plan"
        >
          <!-- Trash Bin SVG Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-6 0a2 2 0 00-2 2v1h12V5a2 2 0 00-2-2H7z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="h-full">
      <div class="h-full">
        <PricingBloc :plan_1="bronzePlan" :plan_2="platinumPlan" :plan_3="goldPlan" />

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PricingBloc from "~/components/Sections/Join/PricingBloc.vue";
import { reactive } from "vue";

const bronzePlan = reactive({
  title: "Bronze",
  duration: "Monthly",
  features: [
    { text: "Access to basic features", isDisabled: false },
    { text: "Email Support", isDisabled: false },
    { text: "Limited Storage", isDisabled: true },
    { text: "Community Access", isDisabled: true },
  ],
  price: "$19.99",
  discount: "$24.99",
});

const platinumPlan = reactive({
  title: "Platinum",
  duration: "Monthly",
  features: [
    { text: "All Bronze features", isDisabled: false },
    { text: "Priority Email Support", isDisabled: false },
    { text: "Unlimited Storage", isDisabled: false },
    { text: "Exclusive Webinars", isDisabled: true },
  ],
  price: "$49.99",
  discount: "save 145dh",
});

const goldPlan = reactive({
  title: "Gold",
  duration: "Monthly",
  features: [
    { text: "All Platinum features", isDisabled: false },
    { text: "Dedicated Account Manager", isDisabled: false },
    { text: "24/7 Support", isDisabled: false },
    { text: "Personalized Reports", isDisabled: false },
  ],
  price: "$99.99",
  discount: "$119.99",
});
</script>
