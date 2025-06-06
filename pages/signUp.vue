<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import CryptoJS from 'crypto-js'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '~/services/auth'
import { plans } from '~/types/plans'

const route = useRoute()
const router = useRouter()

// Define establishment plan prices based on plans.ts
const establishmentPlans = {
  ESSENTIAL: {
    title: plans.ESTABLISHEMENT.plans.plan_1.title,
    price: plans.ESTABLISHEMENT.plans.plan_1.price.split(' ')[0], // Get numeric value only
    status: "Pending",
    duration: plans.ESTABLISHEMENT.plans.plan_1.duration
  },
  PREMIUM: {
    title: plans.ESTABLISHEMENT.plans.plan_2.title,
    price: plans.ESTABLISHEMENT.plans.plan_2.price.split(' ')[0], // Get numeric value only
    status: "Pending",
    duration: plans.ESTABLISHEMENT.plans.plan_2.duration
  },
  GROWTH: {
    title: plans.ESTABLISHEMENT.plans.plan_3.title,
    price: plans.ESTABLISHEMENT.plans.plan_3.price.split(' ')[0], // Get numeric value only
    status: "Pending",
    duration: plans.ESTABLISHEMENT.plans.plan_3.duration
  }
}

const form = reactive({
  data: {
    first_name: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'ESTABLISHEMENT', // Always ESTABLISHEMENT
    plan: '', // Will be set from URL
    acceptTerms: false,
    acceptPrivacy: false
  },
  error: '',
  pending: false
})

// Computed property to get the selected plan details
const selectedPlan = computed(() => {
  if (form.data.plan) {
    return establishmentPlans[form.data.plan as keyof typeof establishmentPlans];
  }
  return null;
})

onMounted(() => {
  // Set plan from URL parameters
  if (route.query.plan) {
    form.data.plan = route.query.plan as string
  }
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const togglePassword = (field: 'password' | 'confirmPassword') => {
  if (field === 'password') {
    isPasswordVisible.value = !isPasswordVisible.value
  } else {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value
  }
}

const calculateEndDate = (duration: string) => {
  const today = new Date();
  
  // Parse the duration string
  if (duration.includes('month')) {
    // Extract the number of months
    const months = parseInt(duration.split(' ')[0]);
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + months);
    return endDate.toISOString().split('T')[0];
  } else if (duration.includes('year')) {
    // Extract the number of years
    const years = parseInt(duration.split(' ')[0]);
    const endDate = new Date(today);
    endDate.setFullYear(endDate.getFullYear() + years);
    return endDate.toISOString().split('T')[0];
  }
  
  // Default fallback to 1 month if duration format is unknown
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + 1);
  return endDate.toISOString().split('T')[0];
}

const onSignupClick = async () => {
  try {
    form.error = ''
    form.pending = true

    if (form.data.password !== form.data.confirmPassword) {
      form.error = "Passwords don't match."
      return
    }

    if (!form.data.acceptTerms || !form.data.acceptPrivacy) {
      form.error = 'Please accept the terms and privacy policy.'
      return
    }

    if (!form.data.email || !form.data.password) {
      form.error = 'Please fill in all required fields.'
      return
    }

    // Prepare the plan data for establishment users
    const planData = selectedPlan.value ? {
      title: selectedPlan.value.title,
      price: selectedPlan.value.price,
      status: selectedPlan.value.status,
      active_customers: 0,
      start_date: new Date().toISOString().split('T')[0],
      end_date: calculateEndDate(selectedPlan.value.duration)
    } : null;

    // Call the signup API with plan data
    const response = await authService.signup({
      email: form.data.email,
      password: form.data.password,
      type: form.data.userType as 'ESTABLISHEMENT' | 'PARTICULIER' | 'ADMIN',
      first_name: form.data.first_name,
      name: form.data.name,
      plan: planData ? JSON.stringify(planData) : null
    })

    // If successful, navigate to payment page with query params
    await router.push({
      path: '/payment',
      query: {
        first_name: form.data.first_name,
        name: form.data.name,
        email: form.data.email,
        userType: form.data.userType,
        plan: form.data.plan,
        price: selectedPlan.value?.price || ''
      }
    })
  } catch (error: any) {
    // Log the entire error object for debugging
    console.error('Signup error object:', JSON.stringify(error, null, 2))
    console.error('Error response:', error.response ? JSON.stringify(error.response.data, null, 2) : 'No response data')
    
    // Handle different error cases
    // Check for email already exists scenarios
    if (
      (error.message && (
        error.message.includes('already exists') || 
        error.message.includes('User found') ||
        error.message.toLowerCase().includes('email') || 
        error.message.toLowerCase().includes('duplicate')
      )) || 
      (error.response?.data?.message && (
        error.response.data.message.includes('already exists') ||
        error.response.data.message.includes('User found') ||
        error.response.data.message.toLowerCase().includes('email') ||
        error.response.data.message.toLowerCase().includes('duplicate')
      )) ||
      error.statusCode === 409 || 
      error.response?.status === 409 ||
      (error.response?.data?.error && error.response.data.error.toLowerCase().includes('exist'))
    ) {
      form.error = 'An account with this email already exists. Please try logging in instead.'
    } else {
      form.error = error.message || 'Failed to create account. Please try again.'
    }
  } finally {
    form.pending = false
  }
}
</script>

<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] py-[100px] px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-[20px] leading-loose font-normal text-center mb-8 uppercase text-black">
        YOUR JOURNEY STARTS NOW!
      </h1>

      <!-- Show selected plan info for establishments -->
      <div v-if="selectedPlan" class="mb-8 p-4 bg-white rounded-lg shadow-sm">
        <h2 class="text-lg font-semibold mb-2">Selected Plan: {{ selectedPlan.title }}</h2>
        <p class="text-gray-600">Price: {{ selectedPlan.price }} dh</p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Error Message -->
        <div v-if="form.error" class="mb-6 p-4 bg-red-50 text-red-500 rounded-md">
          {{ form.error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="onSignupClick" class="space-y-6">
          <!-- First Name -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              v-model="form.data.first_name"
              type="text"
              required
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#D05E33] focus:border-[#D05E33]"
            />
          </div>
          <!-- Name -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model="form.data.name"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D05E33]"
              placeholder="Enter your name"
              required
            />
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="form.data.email"
              type="email"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D05E33]"
              placeholder="Enter your email"
              required
            />
          </div>

          <!-- Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <div class="relative">
              <input
                v-model="form.data.password"
                :type="isPasswordVisible ? 'text' : 'password'"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D05E33]"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                @click="togglePassword('password')"
              >
                <span class="text-gray-500">
                  {{ isPasswordVisible ? '🙈' : '👁️' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="relative">
              <input
                v-model="form.data.confirmPassword"
                :type="isConfirmPasswordVisible ? 'text' : 'password'"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D05E33]"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 transform -translate-y-1/2"
                @click="togglePassword('confirmPassword')"
              >
                <span class="text-gray-500">
                  {{ isConfirmPasswordVisible ? '🙈' : '👁️' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Plan -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">Plan</label>
            <select
              v-model="form.data.plan"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D05E33]"
              required
            >
              <option value="" disabled>Select plan</option>
              <option value="ESSENTIAL">ESSENTIAL</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="GROWTH">GROWTH</option>
            </select>
          </div>

          <!-- Terms and Privacy -->
          <div class="space-y-4">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="form.data.acceptTerms"
                class="rounded border-gray-300 text-[#D05E33] focus:ring-[#D05E33]"
              />
              <span class="text-sm text-gray-700">
                I accept the <a href="/privacypolicy" class="text-[#D05E33] underline">terms and conditions</a>
              </span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="form.data.acceptPrivacy"
                class="rounded border-gray-300 text-[#D05E33] focus:ring-[#D05E33]"
              />
              <span class="text-sm text-gray-700">
                I accept the <a href="/terms" class="text-[#D05E33] underline">privacy policy</a>
              </span>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="form.pending"
            class="uppercase border border-[#D05E33] text-[#D05E33] bg-transparent font-light tracking-[5px] rounded-md hover:bg-[#D05E33] hover:text-white transition-colors duration-200 w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#D05E33] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!form.pending">Sign Up</span>
            <span v-else>Creating Account...</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox-style {
  @apply w-4 h-4 mr-2 rounded border-gray-300 text-[#D05E33] focus:ring-[#D05E33];
}
</style>
