<script lang="ts" setup>
const { login } = useAuth();

const form = reactive({
  data: {
    // email: "particuier1@gmail.com",
    email: "elmehdi.arkhis@gmail.com",
    password: "elmehdi@123",
    rememberMe: false,
    etablissement: "",
  },
  error: "",
  pending: false,
});
// email: "tester2@gmail.com",
// password: "tester2@gmail.com",
const isAdmin = useAdmin();

async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;

    const isEtablissement = ref(false);
    const isParticulier = ref(false);
    const isFinishedOnboarding = ref(false);
    const user = await login(form.data.email, form.data.password, form.data.rememberMe);
    
    // Check if the user needs to make a payment
    if (user.value?.needsPayment && user.value?.redirectUrl) {
      console.log("User needs to make a payment, redirecting to payment page");
      await navigateTo(user.value.redirectUrl);
      return;
    }
    
    // Check if user is admin - being in the Admins table automatically makes them an admin
    if (user.value?.is_admin) {
      console.log("Admin user detected, redirecting to admin dashboard");
      await navigateTo({
        path: "/admindash",
        query: { userId: user.value?.id },
      });
      return;
    }
    
    // Set user type based on the returned user data
    if (user.value?.type === "ESTABLISHEMENT") {
      isEtablissement.value = true;
    } else if (user.value?.type === "PARTICULIER") {
      isParticulier.value = true;
    }
    console.log(user.value);
    isFinishedOnboarding.value = user.value?.is_finished_onboarding;

    if (isAdmin.value) {
      await navigateTo({
        path: "/admin",
        query: { userId: user.value?.id },
      });
    } else {
      if (isEtablissement.value) {
        await navigateTo({
          path: "/establishementCRUDCostumer",
          query: { userId: user.value?.id },
        });
      } else {
        // For PARTICULIER users, check if quiz is already filled
        const isQuizFilled = user.value?.age && user.value?.height && user.value?.weight;
        if (!isQuizFilled) {
          await navigateTo({
            path: "/quizParticulier",
            query: { userId: user.value?.id },
          });
        } else {
          await navigateTo({
            path: "/particulierProgram",
            query: { userId: user.value?.id },
          });
        }
      }
    }
  } catch (error: any) {
    console.error("Login error:", error);
    form.error =
      error?.response?.data?.error ||
      error?.message ||
      "An error occurred during login";
  } finally {
    form.pending = false;
  }
}

const isPasswordVisible = ref(false);

const togglePassword = () => {
  const passwordField = document.getElementById("pass") as HTMLInputElement;
  const eyeIcon = document.getElementById("eye") as HTMLImageElement;
  const noEyeIcon = document.getElementById("noeye") as HTMLImageElement;

  isPasswordVisible.value = !isPasswordVisible.value;

  if (isPasswordVisible.value) {
    passwordField.type = "text";
    eyeIcon.classList.remove("hidden");
    noEyeIcon.classList.add("hidden");
  } else {
    passwordField.type = "password";
    eyeIcon.classList.add("hidden");
    noEyeIcon.classList.remove("hidden");
  }
};
</script>

<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center gap-8 relative p-4 pt-[100px] bg-[#EFEFEC]"
    style="font-family: Montserrat"
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
      <div class="flex flex-col items-center w-full max-w-md my-[100px] max-md:my-[20px]">
        <h1 class="text-[20px] leading-loose font-normal text-center mb-0 py-15 uppercase text-black dark:text-white">
          <span>READY FOR SOME PROGRESS?</span>
        </h1>

        <!-- E-mail/Phone -->
        <div class="w-full flex flex-col sm:flex-row items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4"
            >E-MAIL:</label
          >
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
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 mb-2 sm:mb-0 sm:mr-4"
            >PASSWORD:</label
          >
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
              src="/images/eye-p.png"
              alt="eye"
              width="30"
              height="30"
              class="cursor-pointer hidden pb-1 mb-[-6px]"
              @click="togglePassword"
            />
            <NuxtImg
              id="noeye"
              src="/images/eye_hide.png"
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
              <input id="remember-me" v-model="form.data.rememberMe" type="checkbox" />
              <span class="slider"></span>
            </label>
          </label>
        </div>

        <!-- Error Message -->
        <p class="text-[#ff0d0d] mt-2" v-if="form.error">**{{ form.error }}</p>

        <!-- Login Button -->
        <div class="w-full flex justify-center mt-10">
          <button
            type="submit"
            :disabled="form.pending"
            class="border-[1px] border-black text-black py-2 px-4 w-full text-center hover:bg-[#00000008] transition-colors duration-300 max-w-[200px]"
            @click="onLoginClick"
          >
            LOGIN
          </button>
        </div>

        <!-- <div class="flex justify-center items-center gap-[20px] max-md:flex-col mt-4">
          <nuxt-link to="/signUp" class="text-sm text-black underline">DONT HAVE AN ACCOUNT YET ?</nuxt-link>
        </div> -->
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
