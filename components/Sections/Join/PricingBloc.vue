<template>
  <div
    class="w-full bg-[#EFEFEC] text-black flex flex-col items-center gap-[100px] relative p-8 pt-[100px]" 
    style="font-family: Montserrat;"
  >
      <h1 class="text-2xl lg:text-3xl lg:text-3xl uppercase text-center tracking-1">{{ title }}</h1>

      <div id="choice-pricing" class="w-full max-w-6xl flex flex-col lg:flex-row justify-center items-start lg:items-end gap-8 lg:gap-5">
        <!-- BRONZE -->
        <div 
          id="Bronze" 
          class="w-full lg:w-1/3 h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8 cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="$emit('planSelected', 'BRONZE')"
        >
          <h2 class="text-xl uppercase tracking-2">{{ plan_1.title }}</h2>
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_1.duration }}</h5>

          <ul class="list-disc p-5 lg:w-50 sm:w-90 pt-5">
            <li
              v-for="(feature, i) in plan_1.features"
              :key="i"
              class="text-center uppercase tracking-1 py-3"
              :class="{ 'opacity-50': feature.isDisabled }"
            >
              {{ feature.text }}
            </li>
          </ul>

          <h2 class="pt-5 text-lg tracking-1">{{ plan_1.price }}</h2>
          <h2 class="text-[#D05E33] text-md uppercase line-through">{{ plan_1.discount }}</h2>
        </div>
 
        <!-- Platinium -->
        <div 
          id="Platinum" 
          class="relative w-full lg:w-1/3 h-full font-medium border border-black rounded-10 flex flex-col items-center p-6 lg:p-8 cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="$emit('planSelected', 'PLATINUM')"
        >
          <img src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3" />

          <h2 class="text-xl uppercase tracking-2">{{ plan_2.title }}</h2>
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_2.duration }}</h5>

          <ul class="list-disc p-5 lg:w-50 sm:w-90 pt-15">
            <li
              v-for="(feature, i) in plan_2.features"
              :key="i"
              class="text-center uppercase tracking-1 py-3"
              :class="{ 'opacity-50': feature.isDisabled }"
            >
              {{ feature.text }}
            </li>
          </ul>

          <h2 class="pt-5 text-lg tracking-1">{{ plan_2.price }}</h2>
          <h2 class="text-[#D05E33] text-md">{{ plan_2.discount }}</h2>
        </div>

        <!-- GOLD -->
        <div 
          id="Gold" 
          class="w-full lg:w-1/3 h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8 cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="$emit('planSelected', 'GOLD')"
        >
          <h2 class="text-xl uppercase tracking-2">{{ plan_3.title }}</h2>
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_3.duration }}</h5>

          <ul class="list-disc p-5 lg:w-50 sm:w-90 pt-5">
            <li
              v-for="(feature, i) in plan_3.features"
              :key="i"
              class="text-center uppercase tracking-1 py-3"
              :class="{ 'opacity-50': feature.isDisabled }"
            >
              {{ feature.text }}
            </li>
          </ul>

          <h2 class="pt-5 text-lg tracking-1">{{ plan_3.price }}</h2>
          <h2 class="text-[#D05E33] text-md">{{ plan_3.discount }}</h2>
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
  }
})

const { title,plan_1,plan_2,plan_3 } = toRefs(props)
</script>