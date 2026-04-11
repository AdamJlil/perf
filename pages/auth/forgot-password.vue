<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const isLoading = ref(false);
const isSent = ref(false);

const handleForgotPassword = async () => {
  if (!email.value) {
    useToast().error("Please enter your email address");
    return;
  }

  isLoading.value = true;
  try {
    const res = await $fetch<any>("/api/auth/forgot-password", {
      method: "POST",
      body: { email: email.value },
    });
    
    if (res.success) {
      isSent.value = true;
      useToast().success("Request processed. Check your email!");
    }
  } catch (error: any) {
    useToast().error(error.statusMessage || "Failed to process request");
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
        <h1 class="text-2xl font-bold uppercase tracking-[4px] text-gray-800 mb-2">Recover Access</h1>
        <p class="text-[10px] font-bold text-[#D05E33] uppercase tracking-[3px]">Password Reset Protocol</p>
      </div>

      <div v-if="!isSent">
        <p class="text-xs text-gray-500 mb-8 text-center leading-relaxed">
          Enter your email address below and we'll send you a link to reset your password.
        </p>

        <form class="space-y-6" @submit.prevent="handleForgotPassword">
          <div class="space-y-2">
            <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1">Email Address</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold outline-none focus:border-[#D05E33] transition-colors"
              placeholder="e.g. manager@hotel.com"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[3px] shadow-xl hover:bg-[#D05E33] transition-all duration-500 active:scale-95 flex items-center justify-center gap-3"
          >
            <div v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Send Reset Link
          </button>
        </form>
      </div>

      <div v-else class="text-center py-6">
        <div class="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-800 uppercase tracking-tight mb-4">Request Received</h3>
        <p class="text-xs text-gray-500 leading-relaxed mb-10">
          If your email is registered, you will receive an instruction link within the next few minutes.
        </p>
      </div>

      <div class="mt-10 pt-8 border-t border-gray-100 text-center">
        <NuxtLink to="/auth/login" class="text-[9px] font-black text-gray-400 uppercase tracking-[2px] hover:text-black transition-colors">
          Return to Secure Login
        </NuxtLink>
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
