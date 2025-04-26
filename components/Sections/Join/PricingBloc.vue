<template>
  <div
    class="w-full h-full bg-[#EFEFEC] text-black flex flex-col items-center mt-10 gap-[50px] relative p-8 " 
    style="font-family: Montserrat;"
  >
      <h1 class="text-2xl uppercase text-center tracking-1">{{ title }}</h1>

      <div id="choice-pricing" class="w-full h-auto max-w-6xl flex flex-col lg:flex-row  justify-start items-stretch gap-8 lg:gap-7">
        <!-- BRONZE -->
        <div 
          id="Bronze" 
          class="w-full lg:w-1/3 h-auto font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8"
          :class="{ 
            'cursor-pointer transition-transform duration-300 hover:scale-105': currentPlan !== 'BRONZE',
            'relative': currentPlan === 'BRONZE'
          }"
          @click="currentPlan !== 'BRONZE' && $emit('planSelected', 'BRONZE')"
        >
          <!-- Active badge -->
          <div v-if="currentPlan === 'BRONZE'" class="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
            Active
          </div>
          
          <h2 class="text-xl uppercase tracking-2">{{ plan_1.title }}</h2>  
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_1.duration }}</h5>

          <ul class="list-disc ">
            <li
              v-for="(feature, i) in plan_1.features"
              :key="i"
              class="text-center lowercase tracking-1 py-1"
              :class="{ 'opacity-50': feature.isDisabled }"
            >
              {{ feature.text }}
            </li>
          </ul>

          <h2 class="pt-5 text-lg tracking-1">{{ plan_1.price }}</h2>
          <h2 class="discount-price text-md uppercase line-through">{{ plan_1.discount }}</h2>
        </div>
 
        <!-- Platinium -->
        <div 
          id="Platinum" 
          class="md:pt-[80px] relative w-full scale-y-105 mb-5 lg:w-1/3 h-auto font-medium border border-black rounded-10 flex flex-col items-center p-6 lg:p-8"
          :class="{ 
            'cursor-pointer transition-transform duration-300 hover:scale-110': currentPlan !== 'PLATINUM',
            'relative': currentPlan === 'PLATINUM'
          }"
          @click="currentPlan !== 'PLATINUM' && $emit('planSelected', 'PLATINUM')"
        >
          <!-- Active badge -->
          <div v-if="currentPlan === 'PLATINUM'" class="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
            Active
          </div>
          
          <img src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3" />

          <h2 class="text-xl uppercase tracking-2">{{ plan_2.title }}</h2>
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_2.duration }}</h5>

          <ul class="list-disc ">
            <li
              v-for="(feature, i) in plan_2.features"
              :key="i"
              class="text-center lowercase tracking-1 py-3"
              :class="{ 'opacity-50': feature.isDisabled }"
            >
              {{ feature.text }}
            </li>
          </ul>

          <h2 class="pt-5 text-lg tracking-1">{{ plan_2.price }}</h2>
          <h2 class="discount-price text-md uppercase line-through">{{ plan_2.discount }}</h2>
        </div>

        <!-- GOLD -->
        <div 
          id="Gold" 
          class="w-full lg:w-1/3 h-auto font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8"
          :class="{ 
            'cursor-pointer transition-transform duration-300 hover:scale-105': currentPlan !== 'GOLD',
            'relative': currentPlan === 'GOLD'
          }"
          @click="currentPlan !== 'GOLD' && $emit('planSelected', 'GOLD')"
        >
          <!-- Active badge -->
          <div v-if="currentPlan === 'GOLD'" class="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
            Active
          </div>
          
          <h2 class="text-xl uppercase tracking-2">{{ plan_3.title }}</h2>
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_3.duration }}</h5>

          <ul class="list-disc ">
            <li
              v-for="(feature, i) in plan_3.features"
              :key="i"
              class="text-center lowercase tracking-1 py-3"
              :class="{ 'opacity-50': feature.isDisabled }"
            >
              {{ feature.text }}
            </li>
          </ul>

          <h2 class="pt-5 text-lg tracking-1">{{ plan_3.price }}</h2>
          <h2 class="discount-price text-md uppercase line-through">{{ plan_3.discount }}</h2>
        </div>
      </div>

  </div>

</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: '' 
  },
  plan_1: {
    type: Object,
    default: {}
  },
  plan_2: {
    type: Object,
    default: {}
  },
  plan_3: {
    type: Object,
    default: {}
  },
  currentPlan: {
    type: String,
    default: ''
  }
})

const { title, plan_1, plan_2, plan_3, currentPlan } = toRefs(props)
</script>

<style scoped>
#choice-pricing {
  min-height: 800px;
  display: flex;
  align-items: flex-start;
}

#Bronze, #Gold, #Platinum {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

@media (min-width: 1024px) {
  #Bronze, #Gold, #Platinum {
    height: 600px;
  }
}

ul {
  flex: 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
  padding: 2rem 1rem;
}

li {
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  word-break: break-word;
  hyphens: auto;
}

.discount-price {
  margin-top: 0.5rem;
  color: #D05E33;
}

@media (max-width: 768px) {
  ul {
    min-height: auto;
  }
  
  #choice-pricing {
    min-height: auto;
  }
}
</style>
