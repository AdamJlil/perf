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

    <div class="flex items-center justify-center w-full max-w-2xl mx-auto space-x-4 px-[15px] py-[10px] my-30">
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
        :backText="videoCalorieData[costumerVideo]?.description || 'Loading video information...'"
        frontImage="/images/arrow4.jpg"
      />
    </div>

    <!-- Video Section -->
    <div class="w-full mt-30" id="video">
      <div class="relative w-full" style="padding-top: 56.25%;" v-if="!isLoading">
        <div v-if="isVideoLoading" class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-80 z-10">
          <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D05E33]"></div>
        </div>
        <iframe
          :src="videoSource"
          loading="lazy"
          class="border-none absolute top-0 left-0 h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowfullscreen="true"
          @load="isVideoLoading = false"
        ></iframe>
      </div>
      <div v-else class="w-full h-[300px] flex items-center justify-center bg-gray-100">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D05E33]"></div>
      </div>
    </div> 

    <div class="w-full h-[50px] flex justify-end items-center pr-[40px]">
      <div class="flex items-center justify-center gap-[10px] p-[10px] hover:bg-[#e7e7e7] cursor-pointer" @click="nextVideo">
        <span class="text-xl sm:text-lg md:text-2xl ">NEXT VIDEO</span>
        <NuxtImg src="/images/next-button.png" alt="arrow" width="40" height="40" />
      </div>
    </div>

    <h1 class="text-black text-xl uppercase font-semibold tracking-2 text-center h-30 mt-20">let's keep it up - keep pushing</h1>

    <!-- Chart Container -->
    <div class=" w-[70%] h-[30vh] md:h-[35vh] lg:h-[40vh] lg:w-[70%] mx-auto p-4 ">
      
      <div class="bg-transparent rounded-lg p-6 h-full">
        {{console.log(chartData)}}
        <Line :chartData="chartData" :chartOptions="chartOptions" class="h-full w-full"/>
      </div>
    </div>


    <p
      class="text-black dark:text-white uppercase text-xl sm:text-lg md:text-2xl text-center p-2 "
      style="letter-spacing: 0.1em; line-height: 1.3"
    >
      TOTAL BURNED UNTIL NOW : {{ totalBurnedCalories }}
    </p>


    <!-- <Bloc1
      class="my-20"
      :reversed="true"
      :showButton="true"
      image="/images/coach.png"
      :headingText="`HEY ${customerName} 👋, LOVED THE SESSION? <br/> TAKE YOUR JOURNEY FURTHER!`"
      :showImage="false"
      :isLogoutButton="true"
    /> -->

    <!-- <HomeFour  image1="/images/work1.png" link="" buttonText="TRANSFORM NOW" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE." :isLogoutButton="true"/>
 -->


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
import { establishmentUserVideos } from '../services/establishment_user_videos';
import { videoCalorieData } from '../services/establishment_user_videos_calories';

const API_BASE_URL = 'http://localhost:3001';

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
const isVideoLoading = ref(true);

const ageRange = ref("");
const weightRange = ref("");

const calorieData = ref(videoCalorieData);

// Fonction de calcul des calories
const calculateCalories = (ageRange: string, weight: string, dumbbellWeight: number, calorieData: any) => {
  console.log("ageRange", ageRange);
  console.log("weight", weight);
  console.log("dumbbellWeight", dumbbellWeight);
  
  try {
    // Since we updated the quiz to store data in the correct format,
    // we only need to handle the ageRanges structure now
    if (calorieData && calorieData.ageRanges) {
      // New structure with ageRanges property
      return calorieData.ageRanges[ageRange][weight][dumbbellWeight] || "900-1100";
    } else {
      // Old structure with direct access (shouldn't be needed anymore)
      return calorieData[ageRange][weight][dumbbellWeight] || "900-1100";
    }
  } catch (error) {
    console.error("Error in calculateCalories:", error);
    return "900-1100"; // Default return a reasonable range instead of an error message
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

  const customerId = route.query.customerId as string

  if (customerId) {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('User not found in localStorage');
      }

      const userData = JSON.parse(userStr);
      const token = userData.token;

      const response = await fetch(`${API_BASE_URL}/api/users/customers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }

      const customers = await response.json();
      const customer = customers.find((c: { id: string; _id: string; et_customer_id: string }) => c.id === customerId || c._id === customerId || c.et_customer_id === customerId);
      
      if (customer) {
        customerName.value = customer.name || `${customer.first_name || ''} ${customer.last_name || ''}`;
        costumerVideo.value = customer.video || 0;
        ageRange.value = customer.age_range || customer.ageRange || '';
        weightRange.value = customer.weight_range || customer.weightRange || '';

        if (typeof costumerVideo.value === 'number' && costumerVideo.value >= 0 && costumerVideo.value < establishmentUserVideos.length) {
          videoSource.value = establishmentUserVideos[costumerVideo.value];
        }

        // Update labels and data dynamically based on burnedCalories
        const burnedCalories = customer.burned_calories || customer.burnedCalories || {};
        labels.value = Object.keys(burnedCalories); // Extract keys dynamically
        data.value = Object.values(burnedCalories); // Extract values dynamically
        caloriesResult.value = calculateCalories(ageRange.value, weightRange.value, 2.5, calorieData.value[costumerVideo.value || 0]);
      }
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  }

  isLoading.value = false;
});

// Add computed property for total burned calories
const totalBurnedCalories = computed(() => {
  return data.value.reduce((sum, value) => sum + value, 0);
});

// Chart data and options
const chartData = computed(() => {
  // Calculate accumulated values
  const accumulatedData: number[] = [];
  let runningTotal = 0;
  
  // Transform the data to show accumulated values
  data.value.forEach(value => {
    runningTotal += value;
    accumulatedData.push(runningTotal);
  });
  
  return {
    labels: labels.value,
    datasets: [
      {
        label: '',
        data: accumulatedData,
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
  };
});

const chartOptions = {
  //hover with ease mode further from the point
  hover: {
    mode: 'nearest' as 'nearest',
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



const nextVideo = async () => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      throw new Error('User not found in localStorage');
    }

    const userData = JSON.parse(userStr);
    const token = userData.token;
    const customerId = route.query.customerId as string;

    if (!customerId) {
      throw new Error('Customer ID not found');
    }

    // Get current customer data to update
    const response = await fetch(`${API_BASE_URL}/api/users/customers`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }

    const customers = await response.json();
    const customer = customers.find((c: { id: string; _id: string; et_customer_id: string }) => c.id === customerId || c._id === customerId || c.et_customer_id === customerId);
    
    if (!customer) {
      throw new Error('Customer not found');
    }

    // Calculate next video index
    const nextVideoIndex = (customer.video + 1) % establishmentUserVideos.length;

    // Get current day's calories
    const dumbbellWeight = selectedElement.value === 1 ? 2.5 : selectedElement.value === 2 ? 5.0 : 10.0;
    const currentCalories = calculateCalories(ageRange.value, weightRange.value, dumbbellWeight, calorieData.value[customer.video || 0]);
    
    // Parse the calories range and get the average
    const [minCal, maxCal] = currentCalories.split('-').map(Number);
    const avgCalories = Math.round((minCal + maxCal) / 2);

    // Update customer's burned calories for the current day
    const burnedCalories = customer.burned_calories || customer.burnedCalories || {};
    const today = `Day ${Object.keys(burnedCalories).length + 1}`;
    
    // Update the customer data
    const updatedBurnedCalories = { ...burnedCalories, [today]: avgCalories };

    // Create updated customer data, preserving the name fields
    const updatedCustomer = {
      et_customer_id: customer.et_customer_id,
      firstName: customer.firstName || customer.first_name,
      lastName: customer.LastName || customer.last_name,
      email: customer.email,
      ageRange: customer.ageRange || customer.age_range,
      weightRange: customer.weightRange || customer.weight_range,
      video: nextVideoIndex,
      burnedCalories: updatedBurnedCalories
    };

    // Update the customer data in the database using the add endpoint
    const updateResponse = await fetch(`${API_BASE_URL}/api/users/customers/add/${customerId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedCustomer)
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update customer data');
    }

    // Reload the page to show the next video
    window.location.reload();
  } catch (error) {
    console.error('Error in nextVideo:', error);
    alert('Failed to move to next video. Please try again.');
  }
}
</script>
