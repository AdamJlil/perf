<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import CryptoJS from 'crypto-js'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = reactive({
  data: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '', // Will be set from URL
    acceptTerms: false,
    acceptPrivacy: false
  },
  error: '',
  pending: false
})

onMounted(() => {
  // Set userType from URL parameter
  if (route.query.userType) {
    form.data.userType = route.query.userType as string
  }
})

const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)

const togglePassword = (field: 'password' | 'confirmPassword') => {
  const passwordField = document.getElementById(field) as HTMLInputElement
  const eyeIcon = document.getElementById(`${field}-eye`) as HTMLImageElement
  const noEyeIcon = document.getElementById(`${field}-noeye`) as HTMLImageElement

  if (field === 'password') {
    isPasswordVisible.value = !isPasswordVisible.value
    passwordField.type = isPasswordVisible.value ? 'text' : 'password'
    eyeIcon.classList.toggle('hidden', !isPasswordVisible.value)
    noEyeIcon.classList.toggle('hidden', isPasswordVisible.value)
  } else {
    isConfirmPasswordVisible.value = !isConfirmPasswordVisible.value
    passwordField.type = isConfirmPasswordVisible.value ? 'text' : 'password'
    eyeIcon.classList.toggle('hidden', !isConfirmPasswordVisible.value)
    noEyeIcon.classList.toggle('hidden', isConfirmPasswordVisible.value)
  }
}

const onSignupClick = async () => {
  if (form.data.password !== form.data.confirmPassword) {
    form.error = "Passwords don't match."
    return
  }

  if (!form.data.acceptTerms || !form.data.acceptPrivacy) {
    form.error = 'Please accept the terms and privacy policy.'
    return
  }

  console.log('Signup Data:', form.data)

  // Hash the password before sending
  const hashedPassword = CryptoJS.SHA256(form.data.password).toString()

  await navigateTo({
    path: '/payment',
    query: {
      name: form.data.name,
      email: form.data.email,
      password: hashedPassword,
      userType: form.data.userType
    }
  });
}
</script>

<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat;"
  >
    <div class="z-10 flex flex-col items-center w-full px-4">
      <h1 class="text-[20px] leading-loose font-normal text-center mb-0 py-0 max-md:py-[50px] md:py-[100px] uppercase text-black dark:text-white whitespace-nowrap">
        <span>YOUR JOURNEY STARTS NOW !</span>
      </h1>

      <div class="flex flex-col items-center w-full max-w-md">

          <!-- Dropdown -->
         <div class="w-full flex flex-col sm:flex-row items-center mb-6">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">USER TYPE:</label>
          <select
            v-model="form.data.userType"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0"
            required
            disabled
          >
            <option v-if="!form.data.userType" value="" disabled>Select your type</option>
            <option value="Particulier">Particular</option>
            <option value="Establishment">Establishment</option> 
          </select>
        </div>

        <!-- Name -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">NAME:</label>
          <input
            v-model="form.data.name"
            placeholder="NAME*"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-0"
            required
          />
        </div>

        <!-- Email -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">E-MAIL:</label>
          <input
            v-model="form.data.email"
            placeholder="EMAIL*"
            type="email"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-0"
            required
          />
        </div>

        <!-- Password -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-6 relative">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">PASSWORD:</label>
          <input
            id="password"
            v-model="form.data.password"
            placeholder="PASSWORD*"
            type="password"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-0"
            required
          />
          <span class="absolute right-0 bottom-1">
            <NuxtImg 
              id="password-eye" 
              src="/images/eye-p.png" 
              alt="eye" 
              width="30" 
              height="30" 
              class="cursor-pointer hidden pb-1 mb-[-6px]" 
              @click="togglePassword('password')" 
            />
            <NuxtImg 
              id="password-noeye" 
              src="/images/eye_hide.png" 
              alt="noeye" 
              width="27" 
              height="27" 
              class="cursor-pointer" 
              @click="togglePassword('password')" 
            />
          </span>
        </div>

        <!-- Confirm Password -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-6 relative">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">CONFIRM PASSWORD:</label>
          <input
            id="confirmPassword"
            v-model="form.data.confirmPassword"
            placeholder="CONFIRM PASSWORD*"
            type="password"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-400 focus:outline-none focus:ring-0"
            required
          />
          <span class="absolute right-0 md:bottom-[13px] max-md:bottom-[5px]">
            <NuxtImg 
              id="confirmPassword-eye" 
              src="/images/eye-p.png" 
              alt="eye" 
              width="30" 
              height="30" 
              class="cursor-pointer hidden pb-1 mb-[-6px]" 
              @click="togglePassword('confirmPassword')" 
            />
            <NuxtImg 
              id="confirmPassword-noeye" 
              src="/images/eye_hide.png" 
              alt="noeye" 
              width="27" 
              height="27" 
              class="cursor-pointer" 
              @click="togglePassword('confirmPassword')" 
            />
          </span>
        </div>

        <!-- Checkboxes -->
        <div class="w-full flex items-center mb-4 gap-4">
          <label class="flex items-center text-sm text-black">
            <input type="checkbox" class="checkbox-style" v-model="form.data.acceptTerms" />
            <span>I accept the <a href="#" class="text-[#D05E33] underline">terms and conditions</a>.</span>
          </label>
        </div>
        <div class="w-full flex items-center mb-4 gap-4">
          <label class="flex items-center text-sm text-black">
            <input type="checkbox" class="checkbox-style" v-model="form.data.acceptPrivacy" />
            <span>I accept the <a href="#" class="text-[#D05E33] underline">privacy policy</a>.</span>
          </label>
        </div>

        <!-- Error Message -->
        <p class="text-[#ff0d0d] mt-2 whitespace-nowrap" v-if="form.error">**{{ form.error }}</p>

        <!-- Signup Button -->
        <div class="w-full flex justify-center mt-[60px]">
          <button 
            type="submit" 
            class="border-[1px] border-black text-black py-2 px-4 w-full text-center hover:bg-[#00000008] transition-colors duration-300 max-w-[200px]"
            @click.prevent="onSignupClick"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #888; /* Lighter placeholder */
  opacity: 0.8;
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

a {
  text-decoration: none;
  color: #D05E33;
  transition: color 0.3s ease;
}

a:hover {
  color: #d25f35c3;
}

h1 {
  white-space: nowrap;
}

@media (max-width: 768px) {
  h1 {
    font-size: 16px;
  }
}
</style>
