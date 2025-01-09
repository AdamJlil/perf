<template>
  <div class="w-full bg-[#EFEFEC] min-h-screen px-7 md:px-20 py-[200px]">
    <!-- 1er block - Centered Text -->
    <div class="text-center mb-24">
      <h1 class="text-[20px] leading-loose font-normal uppercase tracking-[15px]">
        LET'S PERSONALIZE YOUR JOURNEY
      </h1>
    </div>

    <!-- Main Form Container -->
    <div class="max-w-3xl mx-auto">
      <!-- 2em block - Age, Height, Weight -->
      <div class="flex flex-col gap-8 mb-16">
        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">AGE:</label>
          <div class="flex-1">
            <input 
              type="number" 
              v-model="formData.age" 
              min="15"
              max="150"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="Enter your age" 
            />
            <p v-if="errors.age" class="text-[#D05E33] mt-1 text-sm">{{ errors.age }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">HEIGHT:</label>
          <div class="flex-1">
            <input 
              type="number" 
              v-model="formData.height"
              min="50"
              max="300"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="cm" 
            />
            <p v-if="errors.height" class="text-[#D05E33] mt-1 text-sm">{{ errors.height }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">WEIGHT:</label>
          <div class="flex-1">
            <input 
              type="number" 
              v-model="formData.weight"
              min="20"
              max="300"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="kg" 
            />
            <p v-if="errors.weight" class="text-[#D05E33] mt-1 text-sm">{{ errors.weight }}</p>
          </div>
        </div>
      </div>

      <!-- 3em block - Gender -->
      <div class="mb-16">
        <label class="block mb-4 text-sm md:text-base lg:text-lg font-light">GENDER:</label>
        <div class="flex gap-12">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox-style" :checked="formData.gender === 'male'" @click="formData.gender = 'male'" />
            <span>Male</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox-style" :checked="formData.gender === 'female'" @click="formData.gender = 'female'" />
            <span>Female</span>
          </label>
        </div>
        <p v-if="errors.gender" class="text-[#D05E33] mt-1 text-sm">{{ errors.gender }}</p>
      </div>

      <!-- 4ieme block - Food Allergies -->
      <div class="mb-16">
        <label class="block mb-4 text-sm md:text-base lg:text-lg font-light">ANY FOOD ALLERGIES:</label>
        <div class="flex gap-12 mb-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox-style" :checked="formData.hasAllergies === true" @click="() => handleAllergies(true)" />
            <span>Yes</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox-style" :checked="formData.hasAllergies === false" @click="() => handleAllergies(false)" />
            <span>No</span>
          </label>
        </div>
        <p v-if="errors.hasAllergies" class="text-[#D05E33] mt-1 text-sm">{{ errors.hasAllergies }}</p>
        <div v-if="formData.hasAllergies">
          <input type="text" v-model="formData.allergiesDetails" class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" placeholder="If yes, please specify" />
          <p v-if="errors.allergiesDetails" class="text-[#D05E33] mt-1 text-sm">{{ errors.allergiesDetails }}</p>
        </div>
      </div>

      <!-- 5ieme block - Medical Conditions -->
      <div class="mb-16">
        <label class="block mb-4 text-sm md:text-base lg:text-lg font-light">ANY MEDICAL CONDITIONS:</label>
        <div class="flex gap-12 mb-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox-style" :checked="formData.hasMedicalConditions === true" @click="() => handleMedicalConditions(true)" />
            <span>Yes</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox-style" :checked="formData.hasMedicalConditions === false" @click="() => handleMedicalConditions(false)" />
            <span>No</span>
          </label>
        </div>
        <p v-if="errors.hasMedicalConditions" class="text-[#D05E33] mt-1 text-sm">{{ errors.hasMedicalConditions }}</p>
        <div v-if="formData.hasMedicalConditions">
          <input type="text" v-model="formData.medicalDetails" class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" placeholder="If yes, please specify" />
          <p v-if="errors.medicalDetails" class="text-[#D05E33] mt-1 text-sm">{{ errors.medicalDetails }}</p>
        </div>
      </div>

      <!-- 6ieme block - Activity & Goals -->
      <div class="flex flex-col md:flex-row gap-16">
        <!-- Activity Level -->
        <div class="flex-1">
          <label class="block mb-4 text-sm md:text-base lg:text-lg font-light">WHAT'S YOUR ACTIVITY LEVEL?</label>
          <div class="flex flex-col gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox-style" :checked="formData.activityLevel === '0-2'" @click="formData.activityLevel = '0-2'" />
              <span>0-2 TIMES A WEEK</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox-style" :checked="formData.activityLevel === '3-5'" @click="formData.activityLevel = '3-5'" />
              <span>3-5 TIMES A WEEK</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox-style" :checked="formData.activityLevel === 'athlete'" @click="formData.activityLevel = 'athlete'" />
              <span>ATHLETE</span>
            </label>
          </div>
          <p v-if="errors.activityLevel" class="text-[#D05E33] mt-1 text-sm">{{ errors.activityLevel }}</p>
        </div>

        <!-- Fitness Goals -->
        <div class="flex-1">
          <label class="block mb-4 text-sm md:text-base lg:text-lg font-light">WHAT'S YOUR FITNESS GOAL?</label>
          <div class="flex flex-col gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox-style" :checked="formData.fitnessGoal === 'lose'" @click="formData.fitnessGoal = 'lose'" />
              <span>LOSE WEIGHT</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox-style" :checked="formData.fitnessGoal === 'gain'" @click="formData.fitnessGoal = 'gain'" />
              <span>GAIN WEIGHT</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="checkbox-style" :checked="formData.fitnessGoal === 'maintain'" @click="formData.fitnessGoal = 'maintain'" />
              <span>MAINTAIN WEIGHT</span>
            </label>
          </div>
          <p v-if="errors.fitnessGoal" class="text-[#D05E33] mt-1 text-sm">{{ errors.fitnessGoal }}</p>
        </div>
      </div>
    </div>

    <!-- Button Start -->
    <div class="flex justify-center items-center mt-[150px]">
      <button @click="handleSubmit" class="border-[1px] border-black text-black py-2 px-4 w-full text-center hover:bg-[#00000008] transition-colors duration-300 max-w-[200px]">
        START
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const formData = reactive({
  age: '',
  height: '',
  weight: '',
  gender: null as string | null,
  hasAllergies: null as boolean | null,
  allergiesDetails: '',
  hasMedicalConditions: null as boolean | null,
  medicalDetails: '',
  activityLevel: null as string | null,
  fitnessGoal: null as string | null
})

const errors = reactive({
  age: '',
  height: '',
  weight: '',
  gender: '',
  hasAllergies: '',
  allergiesDetails: '',
  hasMedicalConditions: '',
  medicalDetails: '',
  activityLevel: '',
  fitnessGoal: ''
})

const handleAllergies = (value: boolean) => {
  formData.hasAllergies = value
  if (!value) {
    formData.allergiesDetails = '' // Clear details when No is selected
  }
}

const handleMedicalConditions = (value: boolean) => {
  formData.hasMedicalConditions = value
  if (!value) {
    formData.medicalDetails = '' // Clear details when No is selected
  }
}

const validateForm = () => {
  let isValid = true
  
  // Reset all errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')
  
  // Validate required fields
  if (!formData.age) {
    errors.age = 'Age is required'
    isValid = false
  } else {
    const age = Number(formData.age)
    if (isNaN(age) || !Number.isInteger(age)) {
      errors.age = 'Age must be a whole number'
      isValid = false
    } else if (age < 15 || age > 100) {
      errors.age = 'Age must be between 15 and 100'
      isValid = false
    }
  }

  if (!formData.height) {
    errors.height = 'Height is required'
    isValid = false
  } else {
    const height = Number(formData.height)
    if (isNaN(height) || !Number.isInteger(height)) {
      errors.height = 'Height must be a whole number'
      isValid = false
    } else if (height < 50 || height > 300) {
      errors.height = 'Height must be between 50 and 300 cm'
      isValid = false
    }
  }

  if (!formData.weight) {
    errors.weight = 'Weight is required'
    isValid = false
  } else {
    const weight = Number(formData.weight)
    if (isNaN(weight)) {
      errors.weight = 'Weight must be a number'
      isValid = false
    } else if (weight < 20 || weight > 300) {
      errors.weight = 'Weight must be between 20 and 300 kg'
      isValid = false
    }
  }

  if (!formData.gender) {
    errors.gender = 'Please select your gender'
    isValid = false
  }
  if (formData.hasAllergies === null) {
    errors.hasAllergies = 'Please indicate if you have any allergies'
    isValid = false
  }
  // Only validate allergies details if "Yes" is selected
  if (formData.hasAllergies && !formData.allergiesDetails) {
    errors.allergiesDetails = 'Please specify your allergies'
    isValid = false
  }
  if (formData.hasMedicalConditions === null) {
    errors.hasMedicalConditions = 'Please indicate if you have any medical conditions'
    isValid = false
  }
  // Only validate medical details if "Yes" is selected
  if (formData.hasMedicalConditions && !formData.medicalDetails) {
    errors.medicalDetails = 'Please specify your medical conditions'
    isValid = false
  }
  if (!formData.activityLevel) {
    errors.activityLevel = 'Please select your activity level'
    isValid = false
  }
  if (!formData.fitnessGoal) {
    errors.fitnessGoal = 'Please select your fitness goal'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    console.log('Form data:', formData)
    const userId = route.query.userId as string
    if (userId) {
      router.push({
        path: '/particulierProgram',
        query: { userId }
      })
    }
  }
}
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

::placeholder {
  color: #888;
  opacity: 0.7;
}

.checkbox-style {
  width: 18px;
  height: 18px;
  border: 1px solid black;
  appearance: none;
  display: inline-block;
  margin-right: 8px;
  cursor: pointer;
  position: relative;
}

.checkbox-style:checked {
  background-color: #D05E33;
  border-color: #D05E33;
}

.checkbox-style:checked::after {
  content: '';
  width: 10px;
  height: 10px;
  position: absolute;
  background: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>