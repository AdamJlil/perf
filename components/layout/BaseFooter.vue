<!-- components/layout/BaseFooter.vue -->
<template>
  <footer class="w-full bg-[#EFEFEC] pt-10 pb-10 px-4" style="font-family: Montserrat">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start pb-12 border-b border-gray-200">
        <!-- Logo & Mission -->
        <div class="md:col-span-5 space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
          <NuxtLink to="/" class="inline-block">
            <NuxtImg src="/images/pepe.png" alt="PERF" class="h-10 w-auto grayscale contrast-125" />
          </NuxtLink>
          <p class="text-xs font-medium text-gray-500 uppercase tracking-[2px] leading-relaxed max-w-sm">
            Elevating hospitality through seamless wellness integration. Premium fitness solutions tailored for the modern establishment.
          </p>
          <div class="flex items-center gap-4 pt-2">
            <a v-for="social in socials" :key="social.name" :href="social.link" class="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:text-[#D05E33] hover:border-[#D05E33] transition-all duration-300">
              <span :class="social.icon" class="w-4 h-4"></span>
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="md:col-span-3 space-y-6 text-center md:text-left">
          <h3 class="text-[10px] font-bold tracking-[3px] uppercase text-black">Menu</h3>
          <ul class="space-y-3">
            <li v-for="item in navItems" :key="item.path">
              <NuxtLink :to="item.path" class="text-xs font-medium text-gray-500 hover:text-[#D05E33] transition-colors uppercase tracking-[1px]">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal & Contact -->
        <div class="md:col-span-4 space-y-6 text-center md:text-left">
          <h3 class="text-[10px] font-bold tracking-[3px] uppercase text-black">Legal & Support</h3>
          <ul class="space-y-3">
            <li v-for="item in legalItems" :key="item.path">
              <NuxtLink :to="item.path" class="text-xs font-medium text-gray-500 hover:text-[#D05E33] transition-colors uppercase tracking-[1px]">
                {{ item.name }}
              </NuxtLink>
            </li>
            <li class="pt-2">
              <p class="text-[10px] font-bold text-black uppercase tracking-[2px] mb-1">Inquiries</p>
              <a href="mailto:contact@perf.ma" class="text-xs font-medium text-[#D05E33] underline tracking-[1px]">contact@perf.ma</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p class="text-[9px] font-bold text-gray-400 uppercase tracking-[3px]">
          &copy; {{ new Date().getFullYear() }} PERF. All rights reserved.
        </p>
        <div class="flex items-center gap-8">
          <span class="text-[9px] font-bold text-gray-300 uppercase tracking-[2px]">Crafted for excellence</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'Hospitality', path: '/' },
  { name: 'About Us', path: '/aboutUs' },
  { name: 'Contact', path: '/contact' },
  { name: 'Dashboard', path: '/establishment/manage-customers' }
];

const legalItems = [
  { name: 'Privacy Policy', path: '/privacypolicy' },
  { name: 'Terms of Service', path: '/terms' },
  { name: 'FAQ', path: '/faq' }
];

const socials = [
  { name: 'Instagram', icon: 'i-lucide-instagram', link: '#' },
  { name: 'Twitter', icon: 'i-lucide-twitter', link: '#' },
  { name: 'Facebook', icon: 'i-lucide-facebook', link: '#' }
];
</script>

<style scoped>
footer {
  border-top: 1px solid rgba(0,0,0,0.05);
}
</style>
