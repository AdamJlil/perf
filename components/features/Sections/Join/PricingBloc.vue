<template>
  <div
    class="w-full h-full bg-[#EFEFEC] text-black flex flex-col items-center relative p-6"
    style="font-family: Montserrat"
  >
    <h1 class="text-2xl uppercase text-center tracking-[4px] mb-10 font-light text-gray-800">{{ title }}</h1>

    <div
      id="choice-pricing"
      class="w-full h-auto max-w-6xl flex flex-col lg:flex-row justify-center items-center gap-6"
    >
      <!-- EXPLORER -->
      <div class="flex flex-col items-center w-full lg:w-1/3 group">
        <div
          id="EXPLORER"
          class="font-medium border border-gray-300 rounded-[30px] bg-white/40 backdrop-blur-sm flex flex-col items-center p-8 w-full transition-all duration-500 hover:shadow-xl hover:border-[#D05E33]/30"
          :class="{
            'cursor-pointer hover:-translate-y-1': currentPlan !== 'EXPLORER' && pendingPlan !== 'EXPLORER',
            'border-[#D05E33] bg-white/60 shadow-lg': currentPlan === 'EXPLORER' || pendingPlan === 'EXPLORER',
          }"
          @click="handlePlanSelected('EXPLORER')"
        >
          <h2 class="text-xl uppercase tracking-[3px] mt-6 mb-2 font-bold text-gray-800">{{ plan_1.title }}</h2>
          <h5 class="text-[10px] font-medium uppercase tracking-[1px] opacity-40 mb-6">{{ plan_1.duration }}</h5>

          <ul class="flex flex-col gap-3 w-full mb-8">
            <li
              v-for="(feature, i) in plan_1.features"
              :key="i"
              class="flex items-start text-[11px] uppercase tracking-[1px] leading-relaxed"
              :class="{ 'opacity-30': feature.isDisabled }"
            >
              <span class="mr-3 text-[#D05E33] font-bold">•</span> {{ feature.text }}
            </li>
          </ul>

          <div class="!mt-auto w-full text-center">
            <!-- Status Badge Placement -->
            <div class="mb-4 flex flex-col items-center gap-2 justify-start self-start mt-6">
              <span
                v-if="currentPlan === 'EXPLORER'"
                :class="isPaid ? 'bg-green-500' : 'bg-[#D05E33]'"
                class="text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                {{ isPaid ? "Active" : "Pending Activation" }}
              </span>

              <span
                v-if="requestedPlan === 'EXPLORER'"
                class="bg-yellow-600 text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                Upgrade Requested
              </span>

              <button
                v-if="requestedPlan === 'EXPLORER'"
                class="text-[8px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors underline mb-2"
                @click.stop="$emit('cancelUpgrade')"
              >
                Cancel Request
              </button>

              <span
                v-if="currentPlan === 'EXPLORER' && isCancelled"
                class="bg-red-600 text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                Requested Cancellation - Waiting for approval
              </span>
            </div>
            <div class="pt-6 border-t border-gray-200 w-full">
              <h2 class="text-xl font-bold tracking-[1px] text-gray-800">{{ plan_1.price }}</h2>
            </div>
          </div>
        </div>
        <!-- <p class="text-[10px] italic text-gray-400 mt-4 text-center">
          *Monthly subscription is required after first month
        </p> -->
      </div>

      <!-- EXPERIENCE -->
      <div class="flex flex-col items-center w-full lg:w-1/3 group relative lg:z-10">
        <div
          id="EXPERIENCE"
          class="font-medium border-2 border-[#E9855F] rounded-[30px] bg-white flex flex-col items-center p-8 w-full transition-all duration-500 shadow-xl"
          :class="{
            'cursor-pointer hover:shadow-2xl hover:scale-[1.02]':
              currentPlan !== 'EXPERIENCE' && pendingPlan !== 'EXPERIENCE',
            'border-[#D05E33]': currentPlan === 'EXPERIENCE' || pendingPlan === 'EXPERIENCE',
          }"
          @click="handlePlanSelected('EXPERIENCE')"
        >
          <!-- Smart Popular Badge -->
          <div
            class="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E9855F] text-white px-8 py-2 rounded-full text-[10px] font-bold uppercase tracking-[3px] shadow-xl z-20 whitespace-nowrap border border-white/10 transition-transform duration-500 group-hover:scale-110"
          >
            Most Popular
          </div>

          <div class="w-full text-center mb-6">
            <h2 class="text-xl uppercase tracking-[3px] mt-2 mb-2 font-bold text-gray-900">{{ plan_2.title }}</h2>
            <h5 class="text-[10px] font-medium uppercase tracking-[1px] opacity-40">{{ plan_2.duration }}</h5>
          </div>

          <ul class="flex flex-col gap-3 w-full mb-8">
            <li
              v-for="(feature, i) in plan_2.features"
              :key="i"
              class="flex items-start text-[11px] uppercase tracking-[1px] leading-relaxed"
              :class="{ 'opacity-30': feature.isDisabled }"
            >
              <span class="mr-3 text-[#D05E33] font-bold">•</span> {{ feature.text }}
            </li>
          </ul>

          <div class="!mt-auto w-full text-center">
            <!-- Status Badge Placement -->
            <div class="mb-4 flex flex-col items-center gap-2 justify-start self-start mt-6">
              <span
                v-if="currentPlan === 'EXPERIENCE'"
                :class="isPaid ? 'bg-green-500' : 'bg-[#D05E33]'"
                class="text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                {{ isPaid ? "Active" : "Pending Activation" }}
              </span>

              <span
                v-if="requestedPlan === 'EXPERIENCE'"
                class="bg-yellow-600 text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                Upgrade Requested
              </span>

              <button
                v-if="requestedPlan === 'EXPERIENCE'"
                class="text-[8px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors underline mb-2"
                @click.stop="$emit('cancelUpgrade')"
              >
                Cancel Request
              </button>

              <span
                v-if="currentPlan === 'EXPERIENCE' && isCancelled"
                class="bg-red-600 text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                Requested Cancellation - Waiting for approval
              </span>
            </div>
            <div class="pt-6 border-t border-gray-200 w-full">
              <h2 class="text-xl font-bold tracking-[1px] text-gray-900">{{ plan_2.price }}</h2>
              <h2 class="text-[10px] uppercase line-through text-[#D05E33] mt-1 opacity-70">{{ plan_2.discount }}</h2>
            </div>
          </div>
        </div>
      </div>

      <!-- SIGNATURE -->
      <div class="flex flex-col items-center w-full lg:w-1/3 group">
        <div
          id="SIGNATURE"
          class="font-medium border border-gray-300 rounded-[30px] bg-white/40 backdrop-blur-sm flex flex-col items-center p-8 w-full transition-all duration-500 hover:shadow-xl hover:border-[#D05E33]/30"
          :class="{
            'cursor-pointer hover:-translate-y-1': currentPlan !== 'SIGNATURE' && pendingPlan !== 'SIGNATURE',
            'border-[#D05E33] bg-white/60 shadow-lg': currentPlan === 'SIGNATURE' || pendingPlan === 'SIGNATURE',
          }"
          @click="handlePlanSelected('SIGNATURE')"
        >
          <h2 class="text-xl uppercase tracking-[3px] mt-6 mb-2 font-bold text-gray-800">{{ plan_3.title }}</h2>
          <h5 class="text-[10px] font-medium uppercase tracking-[1px] opacity-40 mb-6">{{ plan_3.duration }}</h5>

          <ul class="flex flex-col gap-3 w-full mb-8">
            <li
              v-for="(feature, i) in plan_3.features"
              :key="i"
              class="flex items-start text-[11px] uppercase tracking-[1px] leading-relaxed"
              :class="{ 'opacity-30': feature.isDisabled }"
            >
              <span class="mr-3 text-[#D05E33] font-bold">•</span> {{ feature.text }}
            </li>
          </ul>

          <div class="!mt-auto w-full text-center">
            <!-- Status Badge Placement -->
            <div class="mb-4 flex flex-col items-center gap-2 justify-start self-start mt-6">
              <span
                v-if="currentPlan === 'SIGNATURE'"
                :class="isPaid ? 'bg-green-500' : 'bg-[#D05E33]'"
                class="text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                {{ isPaid ? "Active" : "Pending Activation" }}
              </span>

              <span
                v-if="requestedPlan === 'SIGNATURE'"
                class="bg-yellow-600 text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                Upgrade Requested
              </span>

              <button
                v-if="requestedPlan === 'SIGNATURE'"
                class="text-[8px] font-bold uppercase tracking-[1px] text-gray-400 hover:text-red-500 transition-colors underline mb-2"
                @click.stop="$emit('cancelUpgrade')"
              >
                Cancel Request
              </button>

              <span
                v-if="currentPlan === 'SIGNATURE' && isCancelled"
                class="bg-red-600 text-white text-[9px] font-bold uppercase px-4 py-1.5 rounded-full tracking-[2px] shadow-sm"
              >
                Requested Cancellation - Waiting for approval
              </span>
            </div>
            <div class="pt-6 border-t border-gray-200 w-full">
              <h2 class="text-xl font-bold tracking-[1px] text-gray-800">{{ plan_3.price }}</h2>
            </div>
          </div>
        </div>
        <!-- <p class="text-[10px] italic text-gray-400 mt-4 text-center">
          *Monthly subscription is required after first month
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  plan_1: {
    type: Object,
    default: {},
  },
  plan_2: {
    type: Object,
    default: {},
  },
  plan_3: {
    type: Object,
    default: {},
  },
  currentPlan: {
    type: String,
    default: "",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  requestedPlan: {
    type: String,
    default: null,
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
});

const pendingPlan = ref("");

const handlePlanSelected = (planType: string) => {
  if (planType !== props.currentPlan) {
    pendingPlan.value = planType;
    emit("planSelected", planType);
  }
};

const emit = defineEmits(["planSelected", "cancelUpgrade"]);
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  padding: 0;
  margin: 0;
}

@media (min-width: 1024px) {
  #EXPLORER,
  #SIGNATURE {
    min-height: 420px;
  }
  #EXPERIENCE {
    min-height: 450px;
  }
}

@media (max-width: 1023px) {
  #EXPERIENCE {
    margin: 1.5rem 0;
  }
}
</style>
