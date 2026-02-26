<script setup lang="ts">
import { useToast } from '~/composables/useToast';
const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[100000] flex flex-col items-center pointer-events-none p-4 md:p-6 gap-3">
    <TransitionGroup name="toast-pop-down">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto w-full max-w-xl rounded-[20px] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.25)] flex items-center justify-between p-4 md:p-5 border border-white/20 transition-all"
        :class="{
          'bg-[#00C853] text-white': toast.type === 'success',
          'bg-[#FF1744] text-white': toast.type === 'error',
          'bg-[#1A1A1A] text-white': toast.type === 'info',
        }"
      >
        <div class="flex items-center gap-4 flex-1">
          <!-- Refined Icon -->
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/10">
            <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>

          <!-- Refined Message -->
          <p class="text-white text-xs md:text-sm font-bold uppercase tracking-[2px] leading-tight mb-0">
            {{ toast.message }}
          </p>
        </div>

        <!-- Small Close -->
        <button
          class="flex-shrink-0 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all active:scale-90"
          @click="removeToast(toast.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-pop-down-enter-active {
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-pop-down-leave-active {
  transition: all 0.3s ease-in;
}

.toast-pop-down-enter-from {
  opacity: 0;
  transform: translateY(-100%) scale(0.95);
}

.toast-pop-down-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.98);
}

div, p, button {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
