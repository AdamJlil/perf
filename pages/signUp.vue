<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import CryptoJS from 'crypto-js'
import { useRoute, useRouter } from 'vue-router'
import { authService } from '~/services/auth'

const route = useRoute()
const router = useRouter()

const form = reactive({
  data: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '', // Will be set from URL
    plan: '', // Will be set from URL
    acceptTerms: false,
    acceptPrivacy: false
  },
  error: '',
  pending: false
})

onMounted(() => {
  // Set userType and plan from URL parameters
  if (route.query.userType) {
    form.data.userType = route.query.userType as string
  }
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

    if (!form.data.email || !form.data.password || !form.data.userType) {
      form.error = 'Please fill in all required fields.'
      return
    }

    // Call the signup API
    const response = await authService.signup({
      email: form.data.email,
      password: form.data.password,
      type: form.data.userType as 'ESTABLISHEMENT' | 'PARTICULIER' | 'ADMIN'
    })

    // If successful, navigate to payment page with query params
    await router.push({
      path: '/payment',
      query: {
        name: form.data.name,
        email: form.data.email,
        userType: form.data.userType,
        plan: form.data.plan
      }
    })
  } catch (error: any) {
    console.error('Signup error:', error)
    form.error = error.message || 'Failed to create account. Please try again.'
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

      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Error Message -->
        <div v-if="form.error" class="mb-6 p-4 bg-red-50 text-red-500 rounded-md">
          {{ form.error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="onSignupClick" class="space-y-6">
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

          <!-- User Type -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">User Type</label>
            <select
              v-model="form.data.userType"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#D05E33]"
              required
            >
              <option value="" disabled>Select user type</option>
              <option value="PARTICULIER">Particular</option>
              <option value="ESTABLISHEMENT">Establishment</option>
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
                I accept the <a href="#" class="text-[#D05E33] underline">terms and conditions</a>
              </span>
            </label>
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                v-model="form.data.acceptPrivacy"
                class="rounded border-gray-300 text-[#D05E33] focus:ring-[#D05E33]"
              />
              <span class="text-sm text-gray-700">
                I accept the <a href="#" class="text-[#D05E33] underline">privacy policy</a>
              </span>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="form.pending"
            class="w-full py-2 px-4 bg-[#D05E33] text-white rounded-md hover:bg-[#B54E2B] focus:outline-none focus:ring-2 focus:ring-[#D05E33] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
