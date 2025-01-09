<template>
  <div
    class="w-full bg-[#EFEFEC] text-black flex flex-col items-center gap-[150px] relative p-8 pt-[200px]" 
    style="font-family: Montserrat;"
  >
      <h1 class="text-2xl uppercase text-center tracking-1">{{ title }}</h1>

      <div id="choice-pricing" class="w-full max-w-6xl flex flex-col lg:flex-row justify-start items-start gap-8 lg:gap-5">
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
              class="text-center lowercase tracking-1 py-3"
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
          class="md:mt-[-80px] relative w-full lg:w-1/3 h-full font-medium border border-black rounded-10 flex flex-col items-center p-6 lg:p-8 cursor-pointer transition-transform duration-300 hover:scale-105"
          @click="$emit('planSelected', 'PLATINUM')"
        >
          <img src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3" />

          <h2 class="text-xl uppercase tracking-2">{{ plan_2.title }}</h2>
          <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_2.duration }}</h5>

          <ul class="list-disc p-5 lg:w-50 sm:w-90 pt-15">
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
              class="text-center lowercase tracking-1 py-3"
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
    height: 800px;
  }
}

ul {
  flex: 1;
  min-height: 500px;
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

.text-[#D05E33] {
  margin-top: 0.5rem;
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