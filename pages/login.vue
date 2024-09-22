<script lang="ts" setup>
const { login } = useAuth();

const form = reactive({
  data: {
    email: "user1@gmail.com",
    password: "password",
    rememberMe: false,
  },
  error: "",
  pending: false,
});

const isAdmin = useAdmin();

async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;


    const isEtablissement_newUser = ref(false); 
    const isParticulier_newUser = ref(false); 

    const isWorkoutProgram = ref(true);
    const isNutritionProgram = ref(true);


    await login(form.data.email, form.data.password, form.data.rememberMe);

    if (isAdmin.value) {
      await navigateTo("/admin");
    } else {
      if (isParticulier_newUser.value){
        await navigateTo("/particulierQuiz");
      }else if (isEtablissement_newUser.value){
        await navigateTo("/etablissementrQuiz");
      }else{
        if (isWorkoutProgram.value && isNutritionProgram.value){
          await navigateTo("/privateWorkoutProgram");
        }else if (isWorkoutProgram.value) {
          await navigateTo("/privateWorkoutProgram");
        }else if (isNutritionProgram.value) {
          await navigateTo("/privateNutritionProgram");
        }
      }
    }

  } catch (error: any) {
    console.error(error);

    if (error.data.message) form.error = error.data.message;
  } finally {
    form.pending = false;
  }
}

const isPasswordVisible = ref(false)

const togglePassword = () => {
  const passwordField = document.getElementById('pass') as HTMLInputElement
  const eyeIcon = document.getElementById('eye') as HTMLImageElement
  const noEyeIcon = document.getElementById('noeye') as HTMLImageElement

  isPasswordVisible.value = !isPasswordVisible.value

  if (isPasswordVisible.value) {
    passwordField.type = 'text'
    eyeIcon.classList.remove('hidden')
    noEyeIcon.classList.add('hidden')
  } else {
    passwordField.type = 'password'
    eyeIcon.classList.add('hidden')
    noEyeIcon.classList.remove('hidden')
  }
}
</script>

<template>
  <div
    class="w-full h-[100vh] bg-cover bg-center text-white flex flex-col justify-center items-center gap-8 relative p-4"
    style="font-family: Montserrat; background-image: url('/images/blocThree.jpg');"
  >
    <!-- Dark Overlay -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

    <!-- Main Content -->
    <div class="z-10 flex flex-col items-center w-full px-4">
      <!-- Main Heading -->
      <p class="text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide mt-8" style="font-weight: 200;">
        Easy nutrition plans.<br />
        Lasting results.
      </p>

      <!-- Input Fields -->
      <div class="flex flex-col items-center w-full max-w-md mt-12">
        <!-- E-mail/Phone -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-white w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">E-MAIL/PHONE:</label>
          <input
            id="email"
            v-model="form.data.email"
            placeholder="EMAIL*"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-white"
            required
          />
        </div>

        <!-- Password -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-6 relative">
          <label class="text-sm md:text-base lg:text-lg font-light text-white w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">PASSWORD:</label>
          <input
            id="pass"
            v-model="form.data.password"
            placeholder="PASSWORD*"
            type="password"
            class="w-full sm:flex-1 p-1 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-white"
            required
          />
          <!-- Toggle Password Visibility -->
          <span class="absolute right-0 bottom-1">
            <NuxtImg 
              id="eye" 
              src="/eye.png" 
              alt="eye" 
              width="30" 
              height="30" 
              class="cursor-pointer hidden" 
              @click="togglePassword" 
            />
            <NuxtImg 
              id="noeye" 
              src="/noeye.png" 
              alt="noeye" 
              width="30" 
              height="30" 
              class="cursor-pointer" 
              @click="togglePassword" 
            />
          </span>
        </div>

        <!-- Remember Me -->
        <div class="flex justify-between items-center w-full">
          <label class="flex items-center text-sm text-white">
            REMEMBER ME
            <label class="switch ml-2">
              <input 
                id="remember-me" 
                v-model="form.data.rememberMe"
                type="checkbox" 
              />
              <span class="slider"></span>
            </label>
          </label>
        </div>

        <!-- Error Message -->
        <p class="text-[#ff0d0d] mt-2" v-if="form.error">**Please enter valid credentials.</p>

        <!-- Login Button -->
        <div class="w-full flex justify-center mt-10">
          <button 
            type="submit" 
            :disabled="form.pending"
            class="bg-white text-black py-2 px-4 w-full text-center rounded-full hover:bg-[#fff5e1] transition-colors duration-300 max-w-[200px]"
            @click="onLoginClick"
          >
            LOGIN
          </button>
        </div>

        <!-- Forgot Password -->
        <a href="#" class="text-sm text-white hover:underline mt-4">Forgot Password?</a>

        <!-- Sign Up -->
        <a href="signUp" class="text-sm text-white hover:underline mt-2">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: #ffffff; /* Placeholder in white */
  opacity: 1;
}
input:focus {
  outline: none;
  box-shadow: none;
}

.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff; /* Slider in white */
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 3px;
  background-color: #000000; /* Button in black */
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #525252; /* Slider in black when checked */
}

input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
