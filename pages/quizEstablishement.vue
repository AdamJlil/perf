<template>
  <div class="w-full bg-[#EFEFEC] min-h-screen px-7 md:px-20 py-[200px]">
    <!-- 1er block - Centered Text -->
    <div class="text-center mb-24">
      <h1 class="text-[20px] leading-loose font-normal uppercase tracking-[6px]">
        QUICK QUIZ
      </h1>
    </div>

    <!-- Main Form Container -->
    <div class="max-w-3xl mx-auto">
      <!-- 2em block - Age, Height, Weight -->
      <div class="flex flex-col gap-[30px] w-full max-w-[500px]">
        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">FIRST NAME:</label>
          <div class="flex-1">
            <input 
              type="text" 
              v-model="formData.firstName"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="Enter your first name" 
            />
            <p v-if="errors.firstName" class="text-[#D05E33] mt-1 text-sm">{{ errors.firstName }}</p>
          </div>
        </div>

        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">LAST NAME:</label>
          <div class="flex-1">
            <input 
              type="text" 
              v-model="formData.lastName"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="Enter your last name" 
            />
            <p v-if="errors.lastName" class="text-[#D05E33] mt-1 text-sm">{{ errors.lastName }}</p>
          </div>
        </div>

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
        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">PHONE:</label>
          <div class="flex-1">
            <input 
              type="tel" 
              v-model="formData.phone"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="Enter your phone number" 
            />
            <p v-if="errors.phone" class="text-[#D05E33] mt-1 text-sm">{{ errors.phone }}</p>
          </div>
        </div>
        <div class="flex items-center">
          <label class="w-40 text-sm md:text-base lg:text-lg font-light">EMAIL:</label>
          <div class="flex-1">
            <input 
              type="email" 
              v-model="formData.email"
              class="w-full p-2 border-b border-[#0000002b] bg-transparent focus:outline-none" 
              placeholder="Enter your email" 
            />
            <p v-if="errors.email" class="text-[#D05E33] mt-1 text-sm">{{ errors.email }}</p>
          </div>
        </div>
        
      </div>

      <!-- 3em block - Gender -->
      <div class="mt-16">
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
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const API_BASE_URL = 'http://localhost:3001'

const formData = ref({
  firstName: '',
  lastName: '',
  age: '',
  height: '',
  weight: '',
  phone: '',
  email: '',
  gender: null as string | null,
})

const errors = ref({
  firstName: '',
  lastName: '',
  age: '',
  height: '',
  weight: '',
  phone: '',
  email: '',
  gender: '',
})

const validateForm = () => {
  let isValid = true
  errors.value = {
    firstName: '',
    lastName: '',
    age: '',
    height: '',
    weight: '',
    phone: '',
    email: '',
    gender: '',
  }

  // First Name validation
  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  } else if (formData.value.firstName.length < 2) {
    errors.value.firstName = 'First name must be at least 2 characters'
    isValid = false
  }

  // Last Name validation
  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  } else if (formData.value.lastName.length < 2) {
    errors.value.lastName = 'Last name must be at least 2 characters'
    isValid = false
  }

  // Age validation
  if (!formData.value.age) {
    errors.value.age = 'Age is required'
    isValid = false
  } else {
    const age = parseInt(formData.value.age)
    if (isNaN(age) || !Number.isInteger(age)) {
      errors.value.age = 'Age must be a whole number'
      isValid = false
    } else if (age < 15 || age > 150) {
      errors.value.age = 'Age must be between 15 and 150'
      isValid = false
    }
  }

  // Height validation
  if (!formData.value.height) {
    errors.value.height = 'Height is required'
    isValid = false
  } else {
    const height = parseInt(formData.value.height)
    if (isNaN(height) || !Number.isInteger(height)) {
      errors.value.height = 'Height must be a whole number'
      isValid = false
    } else if (height < 50 || height > 300) {
      errors.value.height = 'Height must be between 50 and 300 cm'
      isValid = false
    }
  }

  // Weight validation
  if (!formData.value.weight) {
    errors.value.weight = 'Weight is required'
    isValid = false
  } else {
    const weight = parseFloat(formData.value.weight)
    if (isNaN(weight)) {
      errors.value.weight = 'Weight must be a number'
      isValid = false
    } else if (weight < 20 || weight > 300) {
      errors.value.weight = 'Weight must be between 20 and 300 kg'
      isValid = false
    }
  }

  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!phoneRegex.test(formData.value.phone)) {
    errors.value.phone = 'Please enter a valid phone number'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!formData.value.gender) {
    errors.value.gender = 'Please select your gender'
    isValid = false
  }

  return isValid
}

const getAgeRange = (age: number) => {
  if (age < 40) {
    return '20-40'
  } else if (age < 60) {
    return '40-60'
  } else {
    return 'Over 60'
  }
}

const getWeightRange = (weight: number) => {
  if (weight < 70) {
    return '50-70'
  } else if (weight < 90) {
    return '70-90'
  } else {
    return '90-120'
  }
}

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const userStr = localStorage.getItem('user')
      if (!userStr) {
        throw new Error('Not logged in')
      }
      const userData = JSON.parse(userStr)
      const token = userData.token

      console.log('Form data before submission:', formData.value);

      // Create a unique customer ID
      const customerId = `et_id!-${formData.value.firstName.toLowerCase()}${formData.value.lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}`

      // Create the customer object with correct property names
      const customerData = {
        et_customer_id: customerId,
        firstName: formData.value.firstName.trim(),
        lastName: formData.value.lastName.trim(),
        email: formData.value.email.trim(),
        ageRange: getAgeRange(parseInt(formData.value.age)),
        weightRange: getWeightRange(parseFloat(formData.value.weight)),
        video: 0,
        burnedCalories: {
          'Day 1': 0
        }
      }

      console.log('Customer data being sent:', customerData);

      // Add the customer using the API
      const response = await fetch(`${API_BASE_URL}/api/users/customers/add/${customerId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerData)
      })

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.error || 'Failed to add customer');
      }

      const responseData = await response.json();
      console.log('Server response:', responseData);

      // If successful, redirect to the customer management page
      router.push('/establishementCRUDCostumer')
    } catch (error) {
      console.error('Error adding customer:', error)
      errors.value.email = error instanceof Error ? error.message : 'Failed to add customer'
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