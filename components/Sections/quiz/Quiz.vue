<template>
  <div
    class="w-full h-[100vh] bg-blue text-white flex flex-col justify-center items-center gap-8 relative p-4"
    style="font-family: Montserrat;"
  >
    <!-- Video Background -->
    <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
      <source :src="videoPath" type="video/mp4" />
    </video>

    <!-- Overlay Layer -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-75 z-1"></div>

    <!-- Text Input Form -->
    <div v-if="isTextInput" class="w-full max-w-[90%] md:max-w-[500px] h-fit flex flex-col justify-center items-center z-2">
      <div v-for="(option, index) in optionRefs" :key="index" class="w-full flex flex-col mb-4">
        <label :for="`${id}-${index}`" class="text-white text-sm md:text-lg mb-1">{{ option.text }}</label>
        <input
          type="number"
          :id="`${id}-${index}`"
          v-model="option.choosed"
          min="0"
          class="w-full p-3 border border-white bg-transparent text-white text-sm md:text-lg placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          :placeholder="`Enter your ${option.text.toLowerCase()}`"
        />
        <!-- Error message for empty input -->
        <p v-if="inputErrors[index]" class="text-red-500 text-xs mt-1">
          {{ inputErrors[index] }}
        </p>
      </div>
    </div>

    <!-- Radio Button Form -->
    <div v-else class="max-w-[90%] md:max-w-[500px] h-fit flex flex-col justify-center items-start z-2">
      <div v-for="(option, index) in optionRefs" :key="index" class="flex items-center gap-4 mb-4">
        <input
          type="radio"
          :id="`${id}-${index}`"
          :value="index"
          v-model="selectedIndex"
          class="hidden"
        />
        <label
          :for="`${id}-${index}`"
          class="flex items-center gap-[15px] cursor-pointer"
        >
          <div class="custom-radio">
            <span v-if="selectedIndex === index" class="checkmark"></span>
          </div>
          <span class="text-white text-sm md:text-lg ml-2">{{ option.text }}</span>
        </label>
      </div>
    </div>
    
    <!-- Buttons -->
    <div 
      class="cursor-pointer text-white border border-white py-2 px-6 md:px-10 text-center text-sm md:text-base lg:text-lg max-md:w-[140px] md:w-[200px] lg:w-[300px] z-9"
      style="font-weight: 300;" 
      @click="handleClick"
    >
      NEXT
    </div>

    <!-- Footer Text -->
    <div class="absolute bottom-6 w-full text-center z-20 px-4">
      <p class="text-white text-xs sm:text-sm md:text-sm tracking-wide font-light">
        © 2024 PERF. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

// Props passed from outside
const props = defineProps<{
  videoPath: string
  options: { text: string, choosed: string | boolean }[]
  id: string
  isTextInput: boolean
}>()

const emit = defineEmits(['next-click'])

const selectedIndex = ref<number | null>(null)

const optionRefs = ref(props.options)
const inputErrors = ref<string[]>([]) // Array to track errors for each input

// Initialize error tracking
inputErrors.value = props.options.map(() => '')

// Function to validate text inputs
const validateInputs = (): boolean => {
  let isValid = true
  optionRefs.value.forEach((option, index) => {
    if (props.isTextInput && typeof option.choosed === 'string' && option.choosed.trim().length === 0) {
      inputErrors.value[index] = 'This field is required'
      isValid = false
    } else {
      inputErrors.value[index] = ''
    }
  })
  return isValid
}

// Set initial selected index for radio buttons
selectedIndex.value = optionRefs.value.findIndex(option => option.choosed === true)

// Watch for radio button selection and update 'choosed' status
watch(selectedIndex, (newIndex) => {
  optionRefs.value.forEach((option, index) => {
    option.choosed = index === newIndex
  })
})

// Handle click and validate inputs
const handleClick = () => {
  if (props.isTextInput) {
    const isValid = validateInputs()
    if (isValid) {
      emit('next-click', optionRefs.value)
    }
  } else {
    emit('next-click', optionRefs.value)
  }
}
</script>

<style scoped>
.custom-radio {
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.checkmark {
  width: 14px;
  height: 14px;
  background-color: white;
}

input[type="radio"]:checked + label .custom-radio {
  border-color: white;
}

.text-white {
  color: white;
}

/* Ensure consistency across screen sizes */
@media (max-width: 768px) {
  .custom-radio {
    width: 24px;
    height: 24px;
  }
  
  .checkmark {
    width: 12px;
    height: 12px;
  }
}

@media (min-width: 769px) {
  .custom-radio {
    width: 32px;
    height: 32px;
  }

  .checkmark {
    width: 18px;
    height: 18px;
  }
}
</style>
