<script lang="ts" setup>
const { login } = useAuth();

const form = reactive({
  data: {
    email: "admin1@gmail.com",
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

    await login(form.data.email, form.data.password, form.data.rememberMe);

    const redirect = isAdmin.value ? "/admin" : "/private";
    await navigateTo(redirect);
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

const activeTab = ref<'connexion' | 'inscription'>('connexion')

const switchTab = (tab: 'connexion' | 'inscription') => {
  activeTab.value = tab
}
</script>

<template>
  <div class="flex">
    <div class="bg-black h-[89vh] w-full flex items-center justify-center">
      <div class="w-full max-w-md p-8">
        <!-- En-tête avec les options "Connexion" et "Inscription" -->
        <div class="flex justify-around mb-10">
          <div 
            class="w-[140px] flex flex-col items-center cursor-pointer text-white"
            :class="{ 'text-white': activeTab !== 'connexion', 'text-white': activeTab === 'connexion' }"
            @click="switchTab('connexion')"
          >
            <span class="font-bold text-lg">CONNEXION</span>
            <div 
              class="h-[1px] bg-white"
              :class="{ 'w-full': activeTab === 'connexion', 'w-0': activeTab !== 'connexion' }"
              :style="{ transition: 'width 0.3s ease' }"
            ></div>
          </div>
          <div 
            class="w-[140px] flex flex-col items-center cursor-pointer text-white"
            :class="{ 'text-white': activeTab !== 'inscription', 'text-white': activeTab === 'inscription' }"
            @click="switchTab('inscription')"
          >
            <span class="font-bold text-lg">INSCRIPTION</span>
            <div 
              class="h-[1px] bg-white"
              :class="{ 'w-full': activeTab === 'inscription', 'w-0': activeTab !== 'inscription' }"
              :style="{ transition: 'width 0.3s ease' }"
            ></div>
          </div>
        </div>
        
        <!-- Formulaire de connexion -->
        <form @submit.prevent="onLoginClick">
          <div class="mb-4">
            <input 
              id="email" 
              v-model="form.data.email"
              placeholder="EMAIL*" 
              type="email" 
              class="w-full border-b border-white bg-transparent p-1 text-white" 
              required 
            />
          </div>
          <div class="mb-6 relative">
            <input 
              id="pass" 
              v-model="form.data.password" 
              placeholder="MOT DE PASSE*" 
              type="password" 
              class="w-full border-b border-white bg-transparent p-1 text-white" 
              required 
            />
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
          <div class="flex justify-between items-center">
            <label class="flex items-center text-sm text-white">
              RESTER CONNECTÉ(E)
              <label class="switch ml-2">
                <input 
                  id="remember-me" 
                  v-model="form.data.rememberMe"
                  type="checkbox" 
                />
                <span class="slider"></span>
              </label>
            </label>
            <a href="#" class="text-sm text-white">MOT DE PASSE OUBLIÉ ?</a>
          </div>
          <p class="text-[#ff0d0d] mt-2" v-if="form.error">**Veuillez saisir un email et un mot de passe valides.</p>
          <div class="w-full flex justify-center mt-10">
            <button 
              type="submit" 
              :disabled="form.pending"
              class="bg-white text-black py-2 px-4 w-full text-center rounded-full hover:bg-[#fff5e1] transition-colors duration-300 max-w-[200px]"
            >
              CONNEXION
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="bg-white h-[89vh] w-full flex items-center justify-center">
      <NuxtImg src="/logo4.svg" alt="logo" width="500" height="500" />
    </div>
  </div>
</template>



<style scoped>
input::placeholder {
  color: #ffffff; /* Placeholder en blanc */
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
  background-color: #ffffff; /* Slider en blanc */
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
  background-color: #000000; /* Bouton du slider en noir */
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #525252; /* Slider en noir quand coché */
}

input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
