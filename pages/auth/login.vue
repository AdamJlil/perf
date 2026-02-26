<script lang="ts" setup>
const { login } = useAuth();
const toast = useToast();

const form = reactive({
  data: {
    email: "",
    password: "",
    rememberMe: false,
  },
  error: "",
  pending: false,
});

async function onLoginClick() {
  try {
    form.error = "";
    form.pending = true;

    // Call real backend API via useAuth
    const result = await login(form.data.email, form.data.password, form.data.rememberMe);

    if (result?.isFirstLogin) {
      toast.success(`Welcome, ${result.user?.first_name || 'User'}!`);
    } else {
      toast.success(`Welcome back, ${result.user?.first_name || 'User'}!`);
    }

    // Using a slight delay to ensure session state is correctly picked up
    setTimeout(async () => {
      await useRouter().push("/establishment/manage-customers");
    }, 500);
  } catch (error: any) {
    console.error("Login error:", error);
    const message = error?.data?.statusMessage || error?.statusMessage || "Invalid email or password";
    form.error = message;
    toast.error(message);
  } finally {
    form.pending = false;
  }
}

const isPasswordVisible = ref(false);

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<template>
  <div
    class="w-full min-h-screen flex flex-col justify-center items-center bg-[#EFEFEC] pb-40 px-4"
    style="font-family: Montserrat"
  >
    <div class="w-full max-w-md bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
      <h1 class="text-2xl font-normal text-center mb-12 uppercase tracking-[6px] text-gray-800">Login</h1>

      <form class="space-y-8" @submit.prevent="onLoginClick">
        <!-- Email -->
        <div class="relative group">
          <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1"> Email </label>
          <input
            id="email"
            v-model="form.data.email"
            type="email"
            class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
            placeholder="your@email.com"
            required
          />
        </div>

        <!-- Password -->
        <div class="relative group">
          <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1"> Password </label>
          <div class="relative">
            <input
              id="pass"
              v-model="form.data.password"
              :type="isPasswordVisible ? 'text' : 'password'"
              class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              class="absolute right-0 bottom-2 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none pr-2"
              @click="togglePassword"
            >
              <svg
                v-if="isPasswordVisible"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-off"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center justify-between pt-2">
          <label class="flex items-center gap-3 cursor-pointer group">
            <div class="relative">
              <input id="remember-me" v-model="form.data.rememberMe" type="checkbox" class="sr-only peer" />
              <div
                class="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#00760a] transition-colors duration-300"
              ></div>
              <div
                class="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"
              ></div>
            </div>
            <span
              class="text-xs font-medium tracking-[1px] uppercase text-gray-500 group-hover:text-black transition-colors"
            >
              Remember Me
            </span>
          </label>
        </div>

        <!-- Login Button -->
        <div class="pt-6">
          <button
            type="submit"
            :disabled="form.pending"
            class="w-full uppercase border border-black text-black bg-transparent py-3 px-6 font-medium tracking-[4px] rounded-md hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!form.pending">Enter</span>
            <span v-else class="flex items-center justify-center gap-2">
              <svg
                class="animate-spin h-4 w-4 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Verifying...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
