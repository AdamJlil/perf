<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat"
  >
    <!-- Bloc1 Component -->
    <Bloc1
      class="mt-60"
      :reversed="true"
      :showButton="false"
      image="/images/coach.png"
      :headingText="`HEY THERE ${customerName} 👋,<br/>READY TO BECOME THE BEST VERSION OF YOURSELF`"
    />

    <div class="flex items-center justify-center w-full max-w-2xl mx-auto space-x-4 px-[15px] py-[10px] mt-35">
      <div @click="selectedElement = 1" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 1 ? 'bg-black text-white' : 'hover:bg-gray-100']">BEGINNER 2.5kg</div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div @click="selectedElement = 2" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 2 ? 'bg-black text-white' : 'hover:bg-gray-100']">MEDIUM 5kg</div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div @click="selectedElement = 3" :class="['cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full', selectedElement === 3 ? 'bg-black text-white' : 'hover:bg-gray-100']">ADVANCED 10kg</div>
    </div>

    <!-- FlipCardBloc Components -->
    <div
      class="bg-[#EFEFEC] dark:bg-black max-md:h-fit max-lg:h-[35vh] lg:h-[50vh] lg:w-full flex max-md:flex-col justify-center items-center text-center p-[30px] lg:mt-5 lg:mb-[50px] gap-[20%] max-md:gap-[50px] max-md:py-[120px]"
    >
      <FlipCardBloc
        outsideTitle="calories"
        style="font-family: Montserrat"
        backText="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis officiis quae error praesentium hic!"
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
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import FlipCardBloc from "~/components/Sections/Establishement/FlipCardBloc.vue";
import { establishmentUserVideos } from '../establishment_user_videos';

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
const isLoading = ref(true);
const selectedElement = ref(1);
const caloriesResult = ref('');

// Fonction de calcul des calories
const calculateCalories = (ageRange: string, weight: string, dumbbellWeight: number) => {
  const calorieData = {
    "20-40": {
      "50-70": { 2.5: "207-288", 5.0: "238-331", 10.0: "270-375" },
      "70-90": { 2.5: "289-372", 5.0: "332-426", 10.0: "375-480" },
      "90-120": { 2.5: "375-496", 5.0: "426-563", 10.0: "480-600" }
    },
    "40-60": {
      "50-70": { 2.5: "186-260", 5.0: "215-299", 10.0: "243-338" },
      "70-90": { 2.5: "260-336", 5.0: "299-386", 10.0: "338-436" },
      "90-120": { 2.5: "338-448", 5.0: "386-511", 10.0: "436-581" }
    }
  };

  try {
    return calorieData[ageRange][weight][dumbbellWeight] || "207-288"; // Default value if not found
  } catch (error) {
    return "207-288"; // Default value in case of error
  }
};

// Watch pour le changement de poids
watch(selectedElement, (newValue) => {
  const dumbbellWeight = newValue === 1 ? 2.5 : newValue === 2 ? 5.0 : 10.0;
  // Using default values for age and weight range for now
  caloriesResult.value = calculateCalories("20-40", "50-70", dumbbellWeight);
});

let labels = ref(['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5','Day 6','Day 7']);
let data = ref([10, 20, 30, 20, 50, 60, 70]);

// Initial calculation
onMounted(async () => {
  const userId = route.query.userId as string;
  const customerId = route.query.id as string;

  if (userId && customerId) {
    const { getUserById } = await import('~/server/models/user');
    const user = await getUserById(userId);

    if (user && user.customers) {
      const customer = user.customers.find(c => c.et_customer_id === customerId);

      if (customer) {
        customerName.value = `${customer.firstName} ${customer.lastName}`;
        
        if (typeof customer.video === 'number' && customer.video >= 0 && customer.video < establishmentUserVideos.length) {
          videoSource.value = establishmentUserVideos[customer.video];
        }

        // Update labels and data dynamically based on burnedCalories
        const burnedCalories = customer.burnedCalories || {};
        labels.value = Object.keys(burnedCalories); // Extract keys dynamically
        data.value = Object.values(burnedCalories); // Extract values dynamically
      }
    }
  }

  isLoading.value = false;
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
