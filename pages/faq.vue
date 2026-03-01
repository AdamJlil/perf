<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-40 pb-24 px-6" style="font-family: 'Montserrat'">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-20">
        <h1 class="text-2xl md:text-3xl font-normal uppercase tracking-[8px] text-gray-800 mb-4">Frequently Asked Questions</h1>
        <div class="w-20 h-1 bg-[#D05E33] mx-auto"></div>
      </div>

      <div class="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-sm border border-white/20 text-gray-700">
        <section class="space-y-12">
          <div v-for="(item, index) in [
            { id: '01', q: 'What is PERF?', a: 'PERF is a mobile wellness solution that transforms any room or private space into a personal gym — offering your guests fitness, recovery, and relaxation without needing a traditional fitness facility.' },
            { id: '02', q: 'Do I need a gym in my establishment to use PERF?', a: 'Not at all. PERF is designed for properties with & without gyms. It brings the full wellness experience directly into the guest room or suite.' },
            { id: '03', q: 'How does PERF generate revenue for my business?', a: 'You can offer PERF as a premium in-room amenity or charge per session. It increases perceived value and creates a new income stream — with no need for construction or extra space.' },
            { id: '04', q: 'What\'s included in a PERF kit?', a: 'Each unit includes compact, high-quality fitness tools and access to a library of guided workouts, recovery sessions, and mindfulness routines.' },
            { id: '05', q: 'How do I get started?', a: 'Just contact us or request a demo. Once your account is activated, we provide full setup support and help integrate PERF into your rooms or guest spaces.' },
            { id: '06', q: 'Is there training or support for staff?', a: 'Yes. We offer onboarding and optional training so your team can present and manage PERF easily and professionally.' }
          ]" :key="item.id">
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-start gap-4 leading-tight">
              <span class="text-[#D05E33] shrink-0">{{ item.id }}</span> 
              <span>{{ item.q }}</span>
            </h2>
            <p class="text-sm md:text-base leading-relaxed pl-10 text-gray-600 font-medium">
              {{ item.a }}
            </p>
          </div>

          <div class="pt-12 border-t border-gray-100 text-center">
            <p class="text-sm uppercase tracking-[2px] font-bold text-gray-400 mb-4">Still have questions?</p>
            <a href="mailto:perf912@gmail.com" class="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-[2px] text-[10px] hover:bg-[#D05E33] transition-all duration-300 shadow-lg active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email us at perf912@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
