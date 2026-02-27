<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative py-4 lg:pt-[100px] max-lg:mt-[-40px] max-lg:pt-0 bg-[#EFEFEC] my-0 mb-20"
    style="font-family: Montserrat"
  >
    <!-- Bloc1 Component -->
    <Bloc1
      class="mt-10"
      :reversed="true"
      :show-button="false"
      :image="customerPicture || '/images/amjadSport2.png'"
      :heading-text="`HEY ${customerName},<br/>READY TO BECOME THE BEST VERSION OF YOURSELF`"
    />

    <div class="flex items-center justify-center w-full max-w-2xl mx-auto space-x-4 px-[15px] py-[5px] mt-20 mb-10">
      <div
        :class="[
          'cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full',
          selectedElement === 1 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100',
        ]"
        @click="selectedElement = 1"
      >
        BEGINNER 2.5kg
      </div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div
        :class="[
          'cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full',
          selectedElement === 2 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100',
        ]"
        @click="selectedElement = 2"
      >
        MEDIUM 5kg
      </div>
      <div class="w-[3px] h-8 bg-[#6763634a]"></div>
      <div
        :class="[
          'cursor-pointer px-6 py-3 transition-colors duration-200 text-center w-full',
          selectedElement === 3 ? 'bg-[#D05E33] text-white' : 'hover:bg-gray-100',
        ]"
        @click="selectedElement = 3"
      >
        ADVANCED 10kg
      </div>
    </div>

    <!-- Total Burned (Moved above cards) -->
    <div class="w-full max-w-4xl mx-auto px-4 mt-10">
      <p
        class="text-[#D05E33] uppercase text-xl sm:text-2xl md:text-3xl text-center font-black tracking-[4px] leading-tight"
      >
        Total Burned Until Now: {{ totalBurnedCalories }} kcal
      </p>
    </div>

    <!-- FlipCard Section -->
    <div
      class="w-full flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 lg:gap-32 px-6 py-10 bg-[#EFEFEC] dark:bg-black"
    >
      <FlipCardBloc
        outside-title="calories"
        style="font-family: Montserrat"
        :back-text="caloriesResult"
        :class="{ 'calorie-hump': isCalorieUpdating }"
      />
      <FlipCardBloc
        outside-title="infos"
        style="font-family: Montserrat"
        :back-text="videoCalorieData[costumerVideo]?.description || 'Loading video information...'"
      />
    </div>

    <h1 class="text-black text-xl uppercase font-semibold tracking-2 text-center h-30 mt-10">
      let's keep it up - keep pushing
    </h1>

    <!-- Chart Container (Moved Above Video) -->
    <div class="w-full mx-auto p-1">
      <div class="bg-transparent rounded-lg p-6 h-full min-h-[300px]">
        <Line
          :chart-data="chartData"
          :chart-options="chartOptions"
          :plugins="[gamificationPlugin]"
          class="h-full w-full"
        />
      </div>
    </div>

    <!-- Video Section -->
    <div id="video" class="w-full mt-20 relative group">
      <!-- Loading Overlay for Video -->
      <div
        v-if="isVideoLoading"
        class="absolute inset-0 z-[10] flex items-center justify-center bg-[#EFEFEC]/80 backdrop-blur-sm rounded-3xl"
      >
        <div class="loader"></div>
      </div>

      <div v-if="!isLoading" class="relative w-full max-w-6xl mx-auto px-4">
        <div
          class="relative w-full rounded-[30px] overflow-hidden shadow-2xl border-4 border-white"
          style="padding-top: 56.25%"
        >
          <iframe
            :src="videoSource"
            loading="lazy"
            class="border-none absolute top-0 left-0 h-full w-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowfullscreen="true"
            @load="isVideoLoading = false"
          ></iframe>
        </div>

        <!-- Themed Next Video Button (Directly Under Video) -->
        <div class="mt-12 flex justify-center pb-10">
          <button
            class="group flex items-center gap-6 bg-black text-white px-12 py-6 rounded-2xl transition-all duration-500 hover:bg-[#D05E33] hover:shadow-[0_20px_50px_-10px_rgba(208,94,51,0.5)] active:scale-95 shadow-xl"
            @click="nextVideo"
          >
            <span class="text-lg md:text-xl font-black uppercase tracking-[4px]">Next Session</span>
            <div
              class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div v-else class="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-[40px]">
        <div class="loader"></div>
      </div>
    </div>

    <!-- <Bloc1
      class="my-20"
      :reversed="true"
      :showButton="true"
      image="/images/coach.png"
      :headingText="`HEY ${customerName}, LOVED THE SESSION? <br/> TAKE YOUR JOURNEY FURTHER!`"
      :showImage="false"
      :isLogoutButton="true"
    /> -->

    <!-- <HomeFour  image1="/images/work1.png" link="" buttonText="TRANSFORM NOW" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE." :isLogoutButton="true"/>
 -->
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { Line } from "vue-chartjs";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import HomeFour from "~/components/features/home/HomeFour.vue";
import Bloc1 from "~/components/features/Sections/Nutrition/BlocOne.vue";
import FlipCardBloc from "~/components/features/Sections/Establishement/FlipCardBloc.vue";
import { establishmentUserVideos } from "~/services/mock/videos";
import { videoCalorieData } from "~/services/mock/video-calories";
// Get runtime config
const config = useRuntimeConfig();

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? ""
    : "";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const route = useRoute();
const router = useRouter();
const { user } = useAuth();
const customerName = ref("");
const customerPicture = ref("");
const videoSource = ref("");
const costumerVideo = ref(0);
const isLoading = ref(true);
const selectedElement = ref(1);
const caloriesResult = ref("");
const isVideoLoading = ref(true);
const isCalorieUpdating = ref(false);

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

  // Trigger animation
  isCalorieUpdating.value = true;
  setTimeout(() => {
    isCalorieUpdating.value = false;
  }, 600);

  caloriesResult.value = calculateCalories(
    ageRange.value,
    weightRange.value,
    dumbbellWeight,
    calorieData.value[costumerVideo.value || 0],
  );
});

const labels = ref<string[]>([]);
const data = ref<number[]>([]);

// Initial calculation
onMounted(async () => {
  // Redirect unpaid users
  if (!user.value?.paid) {
    useToast().error("Access denied. Please complete your payment first.");
    router.push("/establishment/manage-customers");
    return;
  }

  const customerId = route.query.customerId as string;

  if (customerId) {
    try {
      const allCustomers = await $fetch<any[]>("/api/users/customers");
      const customer = allCustomers.find(
        (c: any) => c.id === customerId || c._id === customerId || c.et_customer_id === customerId,
      );

      if (customer) {
        customerName.value = `${customer.firstName} ${customer.lastName}`;
        customerPicture.value = customer.profile_picture || "";
        
        // SYNC: Derive current video from the number of completed logs
        const burnedCalories = customer.burnedCalories || {};
        const completedSessions = Object.keys(burnedCalories).length;
        costumerVideo.value = completedSessions % establishmentUserVideos.length;
        
        ageRange.value = customer.ageRange || "";
        weightRange.value = customer.weightRange || "";

        if (
          typeof costumerVideo.value === "number" &&
          costumerVideo.value >= 0 &&
          costumerVideo.value < establishmentUserVideos.length
        ) {
          videoSource.value = establishmentUserVideos[costumerVideo.value];
        }

        // Sort keys by Day number to ensure correct chart sequence
        const sortedDays = Object.keys(burnedCalories).sort((a, b) => {
          const numA = parseInt(a.replace("Day ", "")) || 0;
          const numB = parseInt(b.replace("Day ", "")) || 0;
          return numA - numB;
        });

        labels.value = sortedDays;
        data.value = sortedDays.map((day) => burnedCalories[day]);

        caloriesResult.value = calculateCalories(
          ageRange.value,
          weightRange.value,
          2.5,
          calorieData.value[costumerVideo.value || 0],
        );
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
      useToast().error("Failed to load program data.");
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

  // If no data, provide a starting point for gamification
  if (data.value.length === 0) {
    return {
      labels: [""],
      datasets: [
        {
          label: "",
          data: [0],
          fill: false,
          borderColor: "transparent",
          backgroundColor: "transparent",
          pointRadius: 0,
        },
      ],
    };
  }

  // Transform the data to show accumulated values
  data.value.forEach((value) => {
    runningTotal += value;
    accumulatedData.push(runningTotal);
  });

  return {
    labels: labels.value,
    datasets: [
      {
        label: "",
        data: accumulatedData,
        fill: false,
        borderColor: "black",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 1,
        pointBorderWidth: 0,
        pointBackgroundColor: "black",
        pointBorderColor: "white",
        pointStyle: "circle",
      },
    ],
  };
});

// Custom gamification plugin for empty charts
const gamificationPlugin = {
  id: "gamificationPlugin",
  afterDraw: (chart: any) => {
    if (data.value.length === 0) {
      const {
        ctx,
        chartArea: { left, bottom },
        scales: { y },
      } = chart;

      // Position at the far left (near 0,0)
      const xPos = left + 30;
      const yPos = y.getPixelForValue(0) - 30;

      ctx.save();

      // Draw Star
      ctx.fillStyle = "#D05E33";
      ctx.beginPath();
      const spikes = 5;
      const outerRadius = 25;
      const innerRadius = 10;
      let rot = (Math.PI / 2) * 3;
      const step = Math.PI / spikes;

      ctx.moveTo(xPos, yPos - outerRadius);
      for (let i = 0; i < spikes; i++) {
        const px = xPos + Math.cos(rot) * outerRadius;
        const py = yPos + Math.sin(rot) * outerRadius;
        ctx.lineTo(px, py);
        rot += step;

        const ix = xPos + Math.cos(rot) * innerRadius;
        const iy = yPos + Math.sin(rot) * innerRadius;
        ctx.lineTo(ix, iy);
        rot += step;
      }
      ctx.lineTo(xPos, yPos - outerRadius);
      ctx.closePath();
      ctx.fill();

      // Draw Text aligned with star
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      ctx.font = "900 12px Montserrat";
      ctx.fillStyle = "#1A1A1A";
      ctx.fillText("YOU ARE HERE", xPos + 35, yPos - 5);

      ctx.font = "700 9px Montserrat";
      ctx.fillStyle = "#D05E33";
      ctx.fillText("LET'S GO BURN YOUR FIRST CALORIES!", xPos + 35, yPos + 12);

      ctx.restore();
    }
  },
};

const chartOptions = {
  // hover with ease mode further from the point
  hover: {
    mode: "nearest" as "nearest",
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
        display: true,
        color: "rgba(0, 0, 0, 0.05)",
        lineWidth: 1,
      },
      ticks: {
        maxTicksLimit: 8,
        font: { size: 10 },
      },
    },
    x: {
      grid: {
        display: false,
      },
      offset: true,
      ticks: {
        font: { size: 10, weight: "bold" },
      },
    },
  },
};

const nextVideo = async () => {
  try {
    const customerId = route.query.customerId as string;
    if (!customerId) throw new Error("Customer ID not found");

    // Fetch latest data from real backend
    const data = await $fetch<any[]>("/api/users/customers");
    const customer = data.find(
      (c: any) => c.id === customerId || c._id === customerId || c.et_customer_id === customerId,
    );

    if (!customer) throw new Error("Customer not found");

    // Use the value currently shown on the UI card (parsed average)
    const currentCaloriesRange = caloriesResult.value;
    const parts = currentCaloriesRange.split("-").map(Number);
    const avgCalories = parts.length === 2 ? Math.round((parts[0] + parts[1]) / 2) : parts[0] || 0;

    // Update customer's burned calories session-by-session
    const burnedCalories = customer.burnedCalories || {};
    const nextDayIndex = Object.keys(burnedCalories).length + 1;
    const dayLabel = `Day ${nextDayIndex}`;

    const updatedBurnedCalories = { ...burnedCalories, [dayLabel]: avgCalories };

    // Update the customer in real MongoDB via API
    // The video index will be derived automatically from the new count on refresh
    await $fetch("/api/users/customers/add", {
      method: "POST",
      body: {
        ...customer,
        burnedCalories: updatedBurnedCalories,
        video: nextDayIndex % establishmentUserVideos.length
      },
    });

    // Success toast and refresh
    useToast().success(`Completed! ${avgCalories} kcal added.`);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error("Error in nextVideo:", error);
    useToast().error("Failed to save progress. Please try again.");
  }
};
</script>

<style scoped>
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #d05e33;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.calorie-hump {
  animation: hump 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes hump {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(208, 94, 51, 0);
  }
  30% {
    transform: scale(1.05);
    box-shadow: 0 0 30px 10px rgba(208, 94, 51, 0.4);
    border-color: #d05e33;
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(208, 94, 51, 0);
  }
}
</style>
