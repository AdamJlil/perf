<script lang="ts" setup>
const { login } = useAuth();

const form = reactive({
  data: {
    email: "user1@gmail.com",
    password: "password",
    rememberMe: false,
    etablissement: "", // Ajout de la propriété etablissement
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

const selectedOption = ref('Particulier')

const selectOption = (option: string) => {
  selectedOption.value = option
}
</script>

<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative p-4 pt-[100px] bg-white"
    style="font-family: Montserrat;"
  >
    <!-- Dark Overlay -->
    <!-- <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-1"></div> -->

    <!-- Main Content -->
    <div class="z-10 flex flex-col items-center w-full px-4">
      <!-- Main Heading -->
      <!-- <p class="text-black text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide mt-8" style="font-weight: 200;">
        Easy nutrition plans.<br />
        Lasting results.
      </p> -->


      <!-- Input Fields -->
      <div class="flex flex-col items-center w-full max-w-md mt-12">

        <div class="w-[75%] flex justify-center items-center gap-[10px] mb-[30px] border-b border-[#0000002b] pb-[10px]">
          <div
            :class="`cursor-pointer rounded-xl px-[10px] py-[5px] flex items-center justify-center transition-all duration-300 ${
              selectedOption === 'Particulier' ? 'bg-black text-white' : 'bg-transparent text-black'
            }`"
            @click="selectOption('Particulier')"
          >
            Particulier
          </div>
          <div class="h-[20px] w-[1px] bg-[#0000002b] flex-shrink-0"></div>
          <div
            :class="`cursor-pointer rounded-xl px-[10px] py-[5px] flex items-center justify-center transition-all duration-300 ${
              selectedOption === 'Etablissement' ? 'bg-black text-white' : 'bg-transparent text-black'
            }`"
            @click="selectOption('Etablissement')"
          >
            Etablissement
          </div>
        </div>

        <!-- Dropdown Select -->
        <div v-if="selectedOption === 'Etablissement'" class="w-full flex flex-col sm:flex-row items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">ETABLISSEMENT:</label>
          <select
            v-model="form.data.etablissement"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0"
          >
            <option value="" disabled selected>SELECT AN OPTION</option>
            <option value="etablissement1">Etablissement 1</option>
            <option value="etablissement2">Etablissement 2</option>
            <option value="etablissement3">Etablissement 3</option>
          </select>
        </div>



        <!-- E-mail/Phone -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">E-MAIL:</label>
          <input
            id="email"
            v-model="form.data.email"
            placeholder="EMAIL*"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0"
            required
          />
        </div>

        <!-- Password -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-6 relative">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4">PASSWORD:</label>
          <input
            id="pass"
            v-model="form.data.password"
            placeholder="PASSWORD*"
            type="password"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0"
            required
          />
          <!-- Toggle Password Visibility -->
          <span class="absolute right-0 bottom-1">
            <NuxtImg 
              id="eye" 
              src="/images/new_eye.png" 
              alt="eye" 
              width="30" 
              height="30" 
              class="cursor-pointer hidden pb-1" 
              @click="togglePassword" 
            />
            <NuxtImg 
              id="noeye" 
              src="/images/new_noeye.png" 
              alt="noeye" 
              width="27" 
              height="27" 
              class="cursor-pointer" 
              @click="togglePassword" 
            />
          </span>
        </div>

        <!-- Remember Me -->
        <div class="flex justify-between items-center w-full">
          <label class="flex items-center text-sm text-black">
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
            class="bg-black text-white py-2 px-4 w-full text-center rounded-full hover:bg-[#3b3b3b] transition-colors duration-300 max-w-[200px]"
            @click="onLoginClick"
          >
            LOGIN
          </button>
        </div>

        <div class="flex justify-center items-center gap-[20px] max-md:flex-col mt-4">
            <a href="signUp" class="text-sm text-black hover:underline">Sign Up</a>
            <a href="#" class="text-sm text-black hover:underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input::placeholder {
  color: black; /* Placeholder in white */
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
  background-color: black; /* Slider in white */
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
  background-color: #ffff; /* Button in black */
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #00760a; /* Slider in black when checked */
}

input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
