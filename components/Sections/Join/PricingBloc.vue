<template>
  <div
    class="w-full h-full bg-[#EFEFEC] text-black flex flex-col items-center mt-10 gap-[50px] relative p-8 transform scale-[0.9] origin-top"
    style="font-family: Montserrat;"
  >
    <h1 class="text-2xl uppercase text-center tracking-1 mb-[50px]">{{ title }}</h1>

    <div id="choice-pricing" class="w-full h-auto max-w-6xl flex flex-col lg:flex-row  justify-start items-stretch gap-8 lg:gap-7">
      <!-- ESSENTIAL -->
      <div class="flex flex-col items-center w-full lg:w-1/3 transform scale-[0.95]">
        <div 
          id="EXPLORER" 
          class="h-auto font-medium border border-gray-500 rounded-15 flex flex-col items-center p-6 lg:p-8 w-full"
          :class="{ 
            'cursor-pointer transition-transform duration-300 hover:scale-105': currentPlan !== 'EXPLORER' && pendingPlan !== 'EXPLORER',
            'relative': currentPlan === 'EXPLORER' || pendingPlan === 'EXPLORER'
          }"
          @click="handlePlanSelected('EXPLORER')"
        >
        <!-- Active badge -->
        <div v-if="currentPlan === 'EXPLORER'" class="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
          Active
        </div>
        <!-- Pending badge -->
        <div v-else-if="pendingPlan === 'EXPLORER'" class="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
          Pending
        </div>

        <h2 class="text-xl uppercase tracking-2 mt-[40px] mb-[10px] font-bold">{{ plan_1.title }}</h2>  
        <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_1.duration }}</h5>

        <ul class="list-disc pl-5">
          <li
            v-for="(feature, i) in plan_1.features"
            :key="i"
            class="text-left uppercase tracking-1"
            :class="{ 'opacity-50': feature.isDisabled }"
          >
            <span class="font-bold mr-2">-</span> {{ feature.text }}
          </li>
        </ul>

        <h2 class="pt-5 text-lg tracking-1">{{ plan_1.price }}</h2>
      </div>
        <div class="text-sm italic text-black mt-[30px] text-center w-full">*Monthly subscription is required after first month</div>
      </div>

      <!-- EXPERIENCE -->
      <div 
        id="EXPERIENCE" 
        class=" md:pt-[80px] relative w-full mb-5 lg:w-1/3 h-auto font-medium border border-black rounded-15 flex flex-col items-center p-6 lg:p-8 transform scale-[1.05]"
        :class="{ 
          'cursor-pointer transition-transform duration-300 hover:scale-110': currentPlan !== 'EXPERIENCE' && pendingPlan !== 'EXPERIENCE',
          'relative': currentPlan === 'EXPERIENCE' || pendingPlan === 'EXPERIENCE'
        }"
        @click="handlePlanSelected('EXPERIENCE')"
      >
        <!-- Active badge -->
        <div v-if="currentPlan === 'EXPERIENCE'" class="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
          Active
        </div>
        <!-- Pending badge -->
        <div v-else-if="pendingPlan === 'EXPERIENCE'" class="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
          Pending
        </div>

        <img src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3" />

        <h2 class="text-xl uppercase tracking-2 mt-[40px] mb-[10px] font-bold">{{ plan_2.title }}</h2>
        <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_2.duration }}</h5>

        <ul class="list-disc pl-5">
          <li
            v-for="(feature, i) in plan_2.features"
            :key="i"
            class="text-left uppercase tracking-1"
            :class="{ 'opacity-50': feature.isDisabled }"
          >
            <span class="font-bold mr-2">-</span> {{ feature.text }}
          </li>
        </ul>

        <h2 class="pt-5 text-lg tracking-1">{{ plan_2.price }}</h2>
        <h2 class="discount-price text-md uppercase line-through">{{ plan_2.discount }}</h2>
      </div>

      <!-- SIGNATURE -->
      <div class="flex flex-col items-center w-full lg:w-1/3 transform scale-[0.95]">
        <div 
          id="SIGNATURE" 
          class="h-auto font-medium border border-gray-500 rounded-15 flex flex-col items-center p-6 lg:p-8 w-full"
          :class="{ 
            'cursor-pointer transition-transform duration-300 hover:scale-105': currentPlan !== 'SIGNATURE' && pendingPlan !== 'SIGNATURE',
            'relative': currentPlan === 'SIGNATURE' || pendingPlan === 'SIGNATURE'
          }"
          @click="handlePlanSelected('SIGNATURE')"
        >
        <!-- Active badge -->
        <div v-if="currentPlan === 'SIGNATURE'" class="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
          Active
        </div>
        <!-- Pending badge -->
        <div v-else-if="pendingPlan === 'SIGNATURE'" class="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold uppercase px-3 py-1 rounded-full">
          Pending
        </div>

        <h2 class="text-xl uppercase tracking-2 mt-[40px] mb-[10px] font-bold">{{ plan_3.title }}</h2>
        <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_3.duration }}</h5>

        <ul class="list-disc pl-5">
          <li
            v-for="(feature, i) in plan_3.features"
            :key="i"
            class="text-left uppercase tracking-1"
            :class="{ 'opacity-50': feature.isDisabled }"
          >
            <span class="font-bold mr-2">-</span> {{ feature.text }}
          </li>
        </ul>

        <h2 class="pt-5 text-lg tracking-1">{{ plan_3.price }}</h2>
      </div>
      <div class="text-sm italic text-black mt-[30px] text-center w-full">*Monthly subscription is required after first month</div>
    </div>
  </div>
</div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

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

const pendingPlan = ref('')

const handlePlanSelected = (planType: string) => {
  if (planType !== props.currentPlan) {
    pendingPlan.value = planType
    emit('planSelected', planType)
  }
}

const emit = defineEmits(['planSelected'])
</script>

<style scoped>
#choice-pricing {
  min-height: 800px;
  display: flex;
  align-items: flex-start;
}

#EXPLORER, #EXPERIENCE, #SIGNATURE {
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
}

@media (min-width: 1024px) {
  #EXPLORER, #EXPERIENCE, #SIGNATURE {
    height: 650px;
  }
}

ul {
  flex: 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2rem 1rem;
  gap:0.5rem;
}

li {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  padding: 10px;
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


