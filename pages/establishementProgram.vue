<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative py-4 lg:pt-[100px] max-lg:mt-[-40px] max-lg:pt-0 bg-[#EFEFEC] my-0"
    style="font-family: Montserrat"
  >
    <!-- Bloc1 Component -->
    <Bloc1
      class="mt-60"
      :reversed="true"
      :showButton="false"
      image="/images/coach.png"
      :headingText="`HEY ${customerName} 👋,<br/>READY TO BECOME THE BEST VERSION OF YOURSELF`"
    />

    <div class="flex items-center justify-center w-full max-w-2xl mx-auto space-x-4 px-[15px] py-[10px] mt-35">
      <div @click="selectedElement = 1" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 1 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100']">BEGINNER 2.5kg</div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div @click="selectedElement = 2" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 2 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100']">MEDIUM 5kg</div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div @click="selectedElement = 3" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 3 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100']">ADVANCED 10kg</div>
    </div>

    <!-- FlipCardBloc Components -->
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

    <!-- Video Section (Commented Out) -->
    <div class="w-full mt-30" id="video">
      <video class="w-full h-auto block" controls v-if="!isLoading">
        <source :src="videoSource" type="video/mp4" />
        {{ console.log(videoSource) }}
        Your browser does not support the video tag.
      </video>
      <div v-else>Loading...</div>
    </div> 

    <h1 class="text-black text-xl uppercase font-semibold tracking-2 text-center h-30 mt-20">let's keep it up - keep pushing</h1>

    <!-- Chart Container -->
    <div class=" w-[70%] h-[30vh] md:h-[35vh] lg:h-[40vh] lg:w-[70%] mx-auto p-4 ">
      
      <div class="bg-transparent rounded-lg p-6 h-full">
        <Line :chartData="chartData" :chartOptions="chartOptions" class="h-full w-full"/>
      </div>
    </div>


    <p
      class="text-black dark:text-white uppercase text-xl sm:text-lg md:text-2xl text-center p-2 "
      style="letter-spacing: 0.1em; line-height: 1.3"
    >
      TOTAL BURNED UNTIL NOW : {{ totalBurnedCalories }}
    </p>


      <Bloc1
      class="my-20"
      :reversed="true"
      :showButton="true"
      image="/images/coach.png"
      :headingText="`HEY ${customerName} 👋, LOVED THE SESSION? <br/> TAKE YOUR JOURNEY FURTHER!`"
      :showImage="false"
      :isLogoutButton="true"
    />

    <HomeFour  image1="/images/work1.png" link="" buttonText="TRANSFORM NOW" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE."/>


  </div>
</template>

<script setup lang="ts">
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
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import HomeFour from '~/components/home/HomeFour.vue';
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import FlipCardBloc from "~/components/Sections/Establishement/FlipCardBloc.vue";
import { establishmentUserVideos } from '../establishment_user_videos';
import { videoCalorieData } from '~/establishment_user_videos_calories'


// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const route = useRoute();
const customerName = ref('');
const videoSource = ref('');
const costumerVideo = ref(0);
const isLoading = ref(true);
const selectedElement = ref(1);
const caloriesResult = ref('');

const ageRange = ref("");
const weightRange = ref("");

const calorieData = ref(videoCalorieData);

// Fonction de calcul des calories
const calculateCalories = (ageRange: string, weight: string, dumbbellWeight: number, calorieData: any) => {
  try {
    if (!calorieData || !calorieData[ageRange] || !calorieData[ageRange][weight]) {
      return "207-288"; // Return default value if data structure is incomplete
    }
    return calorieData[ageRange][weight][dumbbellWeight] || "207-288";
  } catch (error) {
    return "207-288"; 
  }
};

// Watch pour le changement de poids
watch(selectedElement, (newValue) => {
  const dumbbellWeight = newValue === 1 ? 2.5 : selectedElement.value === 2 ? 5.0 : 10.0;
  caloriesResult.value = calculateCalories(ageRange.value, weightRange.value, dumbbellWeight, calorieData.value[costumerVideo.value || 0]);
});

let labels = ref(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5','Day 6','Day 7']);
let data = ref([10, 20, 30, 20, 50, 60, 70]);

// Initial calculation
onMounted(async () => {
  // Set initial calories with default video index (0)
  const initialDumbbellWeight = 2.5; // Default to beginner weight

  const userId = route.query.userId as string
  const customerId = route.query.id as string

  if (userId && customerId) {
    const { getUserById } = await import('~/server/models/user')
    const user = await getUserById(userId)

    if (user && user.customers) {
      const customer = user.customers.find(c => c.et_customer_id === customerId)

      if (customer) {
        customerName.value = `${customer.firstName} ${customer.lastName}`
        costumerVideo.value = customer.video

        ageRange.value = customer.ageRange
        weightRange.value = customer.weightRange

        if (
          typeof customer.video === 'number' &&
          customer.video >= 0 &&
          customer.video < establishmentUserVideos.length
        ) {
          videoSource.value = establishmentUserVideos[customer.video]
        }

        // Update labels and data dynamically based on burnedCalories
        const burnedCalories = customer.burnedCalories || {}
        labels.value = Object.keys(burnedCalories) // Extract keys dynamically
        data.value = Object.values(burnedCalories) // Extract values dynamically
        console.log(data.value)
        caloriesResult.value = calculateCalories(ageRange.value, weightRange.value, 2.5, calorieData.value[costumerVideo.value || 0]);
      }
    }
  }

  isLoading.value = false
})

// Add computed property for total burned calories
const totalBurnedCalories = computed(() => {
  return data.value.reduce((sum, value) => sum + value, 0);
});

// Chart data and options
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
  //hover with ease mode further from the point
  hover: {
    mode: 'nearest',
    intersect: false,
  },
  responsive: true,
  maintainAspectRatio: false, // Allows the chart to fill the container
  plugins: {
    legend: {
      display: false, // Hide legend
    },
    title: {
      display: false, // Hide title
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true, // Hide y-axis grid lines
        color: 'rgba(0, 0, 0, 0.1)', // Optional: Customize grid line color
        lineWidth: 1, // Optional: Customize grid line width
      },
      ticks: {
        maxTicksLimit: 10, // Limit the number of x-axis grid lines
        stepSize: 1,
      },
    },
    x: {
      grid: {
        display: false, // Show x-axis grid lines
      },
      offset: true, // Show x-axis grid lines

    },
  },
};
</script>
