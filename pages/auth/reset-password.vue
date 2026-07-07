<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const token = ref("");
const password = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);
const showPassword = ref(false);
const isSuccess = ref(false);

onMounted(() => {
  token.value = route.query.token as string || "";
  if (!token.value) {
    useToast().error("Invalid or missing reset token");
    router.push("/auth/login");
  }
});

const handleResetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    useToast().error("Passwords do not match");
    return;
  }

  if (password.value.length < 8) {
    useToast().error("Password must be at least 8 characters");
    return;
  }

  isLoading.value = true;
  try {
    const res = await $fetch<any>("/api/auth/reset-password", {
      method: "POST",
      body: { 
        token: token.value,
        password: password.value 
      },
    });
    
    if (res.success) {
      isSuccess.value = true;
      useToast().success("Password updated! Please log in.");
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    }
  } catch (error: any) {
    useToast().error(error.statusMessage || "Failed to reset password");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] flex items-center justify-center p-4" style="font-family: Montserrat">
    <div class="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 md:p-12 border border-white/20 animate-fade-in">
      <div class="flex flex-col items-center text-center mb-10">
        <NuxtLink to="/">
          <img src="/images/pepe.png" alt="PERF Logo" class="h-12 w-auto mb-8" />
        </NuxtLink>
        <h1 class="text-2xl font-bold uppercase tracking-[4px] text-gray-800 mb-2">New Password</h1>
        <p class="text-[10px] font-bold text-[#D05E33] uppercase tracking-[3px]">Secure Credential Update</p>
      </div>

      <div v-if="!isSuccess">
        <form class="space-y-6" @submit.prevent="handleResetPassword">
          <div class="space-y-2">
            <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1">New Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:border-[#D05E33] transition-colors"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                @click="showPassword = !showPassword"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.43 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Confirm Password</label>
            <input
              v-model="confirmPassword"
              type="password"
              required
              class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:border-[#D05E33] transition-colors"
              placeholder="Repeat new password"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[3px] shadow-xl hover:bg-[#D05E33] transition-all duration-500 active:scale-95 flex items-center justify-center gap-3"
          >
            <div v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Update Password
          </button>
        </form>
      </div>

      <div v-else class="text-center py-6">
        <div class="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 uppercase tracking-tight mb-4">Security Updated</h3>
        <p class="text-xs text-gray-500 leading-relaxed mb-10">
          Your password has been reset successfully. Redirecting you to login...
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
