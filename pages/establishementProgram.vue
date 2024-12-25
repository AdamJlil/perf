<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat"
  >
    <!-- Bloc1 Component -->
    <Bloc1
      class="mt-60 md:mt-40 "
      :reversed="true"
      image="/images/coach.png"
      headingText="“HEY THERE👋,<br/>READY TO BURN CALORIES TODAY ?<br/>SCROLLDOWN THEN !”"
      :showButton="false"/>

    <!-- FlipCardBloc Components -->
    <div
      class="bg-[#EFEFEC] dark:bg-black  lg:h-[50vh] lg:w-full flex max-md:flex-col justify-center items-center text-center p-[30px] lg:mt-30 lg:mb-[50px] gap-[120px] sm:gap-[100px] md:gap-[120px] lg:gap-60 md:mt-20"
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
      <video class="w-full h-auto block" controls>
        <source src="/videos/video_wp_02.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div> 

    <h1 class="text-black text-xl uppercase font-semibold tracking-2 text-center h-30 mt-20">let's keep it up - keep pushing</h1>

    <!-- Chart Container -->
    <div class=" w-[90%] h-[30vh] md:h-[35vh] lg:h-[40vh] sm:w-[90%] md:w-[85%] lg:w-[70%] mx-auto p-4 ">
      
      <div class="bg-transparent rounded-lg p-6 h-full">
        <Line :chartData="chartData" :chartOptions="chartOptions" class="h-full w-full"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import FlipCardBloc from "~/components/Sections/Establishement/FlipCardBloc.vue";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

export default {
  name: 'Dashboard',
  components: {
    Bloc1,
    FlipCardBloc,
    Line, // Register Line component directly
  },
  data() {
    return {
      // Chart Data
      chartData: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        datasets: [
          {
            label: '', // Empty label to hide legend
            data: [10, 20, 30, 20, 50],
            fill: false,
            borderColor: 'black',
            backgroundColor: 'transparent',
            tension: 0.4, // Curves the line
            pointRadius: 5, // Increased from 5 to 8 for larger points
            pointHoverRadius: 1, // Increased from 7 to 10 for larger hover points
            pointBorderWidth: 0, // Increased border width for more prominence
            pointBackgroundColor: 'black', // Solid fill color
            pointBorderColor: 'white', // Contrasting border color
            pointStyle: 'circle', // Shape of the data points
          }
        ]
      },
      // Chart Options
      chartOptions: {
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
        
      },
    }
  },
}
</script>

<style scoped>
* {
  padding: 0;
}
</style>
