<!-- <template>
  <div
    class="w-full min-h-screen bg-[#EFEFEC] dark:bg-black text-black dark:text-white"
  >

    <Bloc1
      class="mt-60"
      :reversed="true"
      :showButton="false"
      image="/images/coach.png"
      :headingText="`HEY ${userFirstName} 👋, LET'S GET STARTED!`"
    />

    <div class="flex items-center justify-center w-full max-w-2xl mx-auto space-x-4 px-[15px] py-[10px] my-30">
      <div @click="selectedElement = 1" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 1 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100']">BEGINNER 2.5kg</div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div @click="selectedElement = 2" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 2 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100']">MEDIUM 5kg</div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div @click="selectedElement = 3" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 3 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100']">ADVANCED 10kg</div>
    </div>


    <div
      class="bg-[#EFEFEC] dark:bg-black max-md:h-fit max-lg:h-[35vh] lg:h-[50vh] lg:w-full flex max-md:flex-col justify-center items-center text-center p-[30px] lg:mt-5 lg:mb-[50px] gap-[20%] max-md:gap-[50px] max-md:py-[120px]"
    >
      <FlipCardBloc
        outsideTitle="calories"
        style="font-family: Montserrat"
        :backText="caloriesResult"
        frontImage="/images/arrow3.jpg"
      />
      <FlipCardBloc
        outsideTitle="infos"
        style="font-family: Montserrat"
        backText="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis officiis quae error praesentium hic!"
        frontImage="/images/arrow4.jpg"
      />
    </div>



     <div class="w-full mt-30" id="video">
      <video class="w-full h-auto block" controls v-if="!isLoading">
        <source :src="videoSource" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div v-else>Loading...</div>
    </div> 


    <div class="w-full h-[50px] flex justify-end items-center px-[40px] mt-[50px]">
        <div class="flex items-center justify-center gap-[10px] p-[10px] hover:bg-[#e7e7e7] cursor-pointer" @click="nextVideo">
          <span class="text-xl sm:text-lg md:text-2xl text-nowrap">NEXT VIDEO</span>
          <NuxtImg src="/images/next-button.png" alt="arrow" width="40" height="40" />
        </div>
    </div>

      <Bloc1
        class="mt-30"
        :reversed="true"
        :showButton="false"
        image="/images/amjad.png"
        :headingText="`HEY ${userFirstName} 👋, </br> HERE IS YOUR BUDGET FRIENDLY PLAN`"
      />

    <div class="flex flex-col items-center justify-center mt-20 mb-20">
      <h2 class="text-black text-2xl uppercase mb-12" style="letter-spacing: 0.1em; line-height: 1.3">PER DAY</h2>
      <div class="w-[90%] max-w-[500px] px-4 sm:px-8 md:px-12 lg:px-16">
        <div class="text-black uppercase text-[20px] p-4 sm:p-[10px] flex justify-between items-center" style="letter-spacing: 0.1em; line-height: 1.3">
          <span>CALORIES</span>
          <span class="ml-4 sm:ml-8 md:ml-12 lg:ml-20">{{nutritionPerDay?.calories || ''}} KCAL</span>
        </div>
        <div class="w-full border-t-[2px] border-gray-300"></div>
        <div class="text-black uppercase text-xl  text-[20px] p-4 sm:p-[10px] flex justify-between items-center" style="letter-spacing: 0.1em; line-height: 1.3">
          <span>PROTEIN</span>
          <span class="ml-4 sm:ml-8 md:ml-12 lg:ml-20">{{nutritionPerDay?.protein || ''}} G</span>
        </div>
        <div class="w-full border-t-[2px] border-gray-300"></div>
        <div class="text-black uppercase  text-[20px] p-4 sm:p-[10px] flex justify-between items-center" style="letter-spacing: 0.1em; line-height: 1.3">
          <span>CARBS</span>
          <span class="ml-4 sm:ml-8 md:ml-12 lg:ml-20">{{nutritionPerDay?.carbs || ''}} G</span>
        </div>
        <div class="w-full border-t-[2px] border-gray-300"></div>
        <div class="text-black uppercase  text-[20px] p-4 sm:p-[10px] flex justify-between items-center" style="letter-spacing: 0.1em; line-height: 1.3">
          <span>FAT</span>
          <span class="ml-4 sm:ml-8 md:ml-12 lg:ml-20">{{nutritionPerDay?.fat || ''}} G</span>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[1400px] mx-auto">
      <template v-for="(mealPlan, mealType) in mealPlans" :key="mealType">
        <CardInfo
          :collection="mealPlan.collection"
          :mainTitle="mealPlan.mainTitle"
          :mainSubtitle="mealPlan.mainSubtitle"
          @update:activeItem="(itemId) => handleActiveItemChange(itemId, mealType)"
        />
      </template>
    </div>

    <h1 class="text-black text-xl uppercase font-semibold tracking-2 text-center h-30 mt-20">let's keep it up - keep pushing</h1>


    <div class=" w-[70%] h-[30vh] md:h-[35vh] lg:h-[40vh] lg:w-[70%] mx-auto p-4 ">
      
      <div class="bg-transparent rounded-lg p-6 h-full">
        <Line :chartData="chartData" :chartOptions="chartOptions" class="h-full w-full"/>
      </div>
    </div>


    <p
        class="text-black dark:text-white uppercase text-xl sm:text-lg md:text-2xl text-center p-2 text-nowrap mt-[50px]"
        style="letter-spacing: 0.1em; line-height: 1.3"
        >
           TOTAL BURNED UNTIL NOW : {{ totalBurnedCalories }}
        </p>

        
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import FlipCardBloc from "~/components/Sections/Establishement/FlipCardBloc.vue";
import { particulierVideosData } from '../particulier_videos';
import CardInfo from "~/components/SharedCardInfo.vue";
import { useAuthUser } from '~/composables/useAuthUser';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'vue-chartjs'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const currentUser = useAuthUser();
const userFirstName = computed(() => currentUser.value?.first_name || '');

const route = useRoute();
const videoSource = ref('');
const ageRange = ref('');
const weightRange = ref('');
const userVideo = ref(0);
const isLoading = ref(true);
const selectedElement = ref(1);
const caloriesResult = ref('');
const burnedCalories = ref<Record<string, number>>({});
const nutritionPerDay = ref(null)
const toBeBurnedCaloriesNutrition = ref(0)

const mealPlans = ref(null)


const totalBurnedCalories = computed(() => {
  return Object.values(burnedCalories.value).reduce((sum, value) => sum + value, 0) + (toBeBurnedCaloriesNutrition.value * Object.keys(burnedCalories.value).length);
});

const calculateCalories = (videoId: number, ageRange: string, weightRange: string, dumbbellWeight: number) => {
  try {
    const videoData = particulierVideosData.find(video => video.id === videoId);
    if (!videoData || !videoData.data[ageRange] || !videoData.data[ageRange][weightRange]) {
      return "207-288"; 
    }
    return videoData.data[ageRange][weightRange][dumbbellWeight] || "207-288";
  } catch (error) {
    console.error('Error calculating calories:', error);
    return "207-288";
  }
};


watch(selectedElement, (newValue) => {
  const dumbbellWeight = newValue === 1 ? 2.5 : newValue === 2 ? 5.0 : 10.0;
  caloriesResult.value = calculateCalories(userVideo.value, ageRange.value, weightRange.value, dumbbellWeight);
});

let labels = ref(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5','Day 6','Day 7']);
let data = ref([10, 20, 30, 20, 50, 60, 70]);

onMounted(async () => {
  const userId = route.query.userId as string

  if (userId) {
    const { getUserById } = await import('~/server/models/user')
    const user = await getUserById(userId)

    if (user) {
      userVideo.value = user.video || 0;
      ageRange.value = user.ageRange || '';
      weightRange.value = user.weightRange || '';
      burnedCalories.value = user.burnedCalories || {};
      toBeBurnedCaloriesNutrition.value = user.toBeBurnedCaloriesNutrition
      mealPlans.value = user.mealPlans || {};
      nutritionPerDay.value = user.nutritionPerDay || {};


      const videoData = particulierVideosData.find(video => video.id === userVideo.value);
      if (videoData) {
        videoSource.value = videoData.url;
      }

      labels.value = Object.keys(user.burnedCalories) 
      data.value = Object.values(user.burnedCalories) 
      data.value = Object.values(user.burnedCalories).map((calorie: number) => calorie + toBeBurnedCaloriesNutrition.value)

      

      selectedElement.value = 1;

      caloriesResult.value = calculateCalories(userVideo.value, ageRange.value, weightRange.value, 2.5);
    }
  }

  isLoading.value = false;
});

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: '',
      data: data.value,
      fill: false,
      borderColor: 'black',
      backgroundColor: 'transparent',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 1,
      pointBorderWidth: 0,
      pointBackgroundColor: 'black',
      pointBorderColor: 'white',
      pointStyle: 'circle',
    }
  ]
}));

const chartOptions = {
  hover: {
    mode: 'nearest',
    intersect: false,
  },
  responsive: true,
  maintainAspectRatio: false, 
  plugins: {
    legend: {
      display: false, 
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 1, 
      },
      ticks: {
        maxTicksLimit: 10, 
      },
    },
    x: {
      grid: {
        display: false, 
      },
      offset: true,

    },
  },
};

const nextVideo = () => {

}



const handleActiveItemChange = (itemId: number, mealType: string) => {
  mealPlans.value[mealType].collection = mealPlans.value[mealType].collection.map(item => ({
    ...item,
    isActive: item.id === itemId,
  }));
};
</script> -->

<template>
  <div>Holla</div>
</template>
