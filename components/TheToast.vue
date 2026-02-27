<script setup lang="ts">
import { useToast } from '~/composables/useToast';
const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[100000] flex flex-col items-center pointer-events-none p-6 gap-4">
    <TransitionGroup name="toast-luxury">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto w-full max-w-2xl rounded-[25px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] flex items-center justify-between p-5 border backdrop-blur-2xl transition-all"
        :class="{
          'bg-white/90 border-emerald-100 text-emerald-900': toast.type === 'success',
          'bg-white/90 border-red-100 text-red-900': toast.type === 'error',
          'bg-white/90 border-[#D05E33]/20 text-[#D05E33]': toast.type === 'info',
        }"
      >
        <div class="flex items-center gap-5 flex-1">
          <!-- Themed Icon Container -->
          <div 
            class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
            :class="{
              'bg-emerald-500 text-white': toast.type === 'success',
              'bg-red-500 text-white': toast.type === 'error',
              'bg-[#D05E33] text-white': toast.type === 'info',
            }"
          >
            <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </div>

          <!-- Sophisticated Message -->
          <p class="text-[11px] md:text-xs font-bold uppercase tracking-[2px] leading-tight mb-0">
            {{ toast.message }}
          </p>
        </div>

        <!-- Minimalist Close -->
        <button
          class="flex-shrink-0 w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center transition-all active:scale-90 opacity-40 hover:opacity-100"
          @click="removeToast(toast.id)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-luxury-enter-active {
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.toast-luxury-leave-active {
  transition: all 0.4s ease-in;
}

.toast-luxury-enter-from {
  opacity: 0;
  transform: translateY(-100%) scale(0.98);
}

.toast-luxury-leave-to {
  opacity: 0;
  transform: translateY(-20px) scale(0.99);
}

div, p, button {
  font-family: 'Montserrat', sans-serif !important;
}
</style>
