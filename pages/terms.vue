<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-40 pb-24 px-6" style="font-family: 'Montserrat'">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-20">
        <h1 class="text-2xl md:text-3xl font-normal uppercase tracking-[8px] text-gray-800 mb-4">Terms of Service</h1>
        <div class="w-20 h-1 bg-[#D05E33] mx-auto"></div>
      </div>

      <div class="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-sm border border-white/20 text-gray-700">
        <p class="text-sm md:text-base leading-relaxed mb-12 italic text-gray-500">
          Welcome to PERF! By using our platform, services, and content, you agree to the following Terms and Conditions.
          Please read them carefully as they govern your relationship with PERF.
        </p>

        <section class="space-y-12">
          <div v-for="section in [
            { id: '01', title: 'Acceptance of Terms', content: 'By accessing or using PERF (including our website, mobile app, or any related services), you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services.' },
            { id: '02', title: 'Eligibility', content: 'You must be at least 18 years old or have parental/guardian consent to use PERF. By registering, you confirm that all information you provide is accurate and complete.' }
          ]" :key="section.id">
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">{{ section.id }}</span> {{ section.title }}
            </h2>
            <p class="text-sm md:text-base leading-relaxed">{{ section.content }}</p>
          </div>

          <div>
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">03</span> User Accounts & Security
            </h2>
            <ul class="space-y-3 pl-2 text-sm md:text-base leading-relaxed">
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>You are responsible for maintaining the confidentiality of your account credentials.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>Notify us immediately of any unauthorized use of your account.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>PERF is not liable for any loss or damage resulting from unauthorized account use.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">04</span> Health Disclaimer
            </h2>
            <p class="text-sm md:text-base leading-relaxed">
              PERF provides fitness, nutrition, and wellness information for educational purposes. Consult a healthcare
              professional before starting any program. PERF is not responsible for injuries or health issues resulting from
              the use of our content or services.
            </p>
          </div>

          <div>
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">05</span> Payments & Subscriptions
            </h2>
            <ul class="space-y-3 pl-2 text-sm md:text-base leading-relaxed">
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>Some features require payment or subscription. All fees are clearly disclosed before purchase.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>Payments are processed securely. You agree to provide valid payment information.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>Subscriptions automatically renew unless cancelled before the renewal date.</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-[#D05E33] font-bold mt-1">•</span>
                <span>No refunds are provided for unused subscription periods unless required by law.</span>
              </li>
            </ul>
          </div>

          <div v-for="section in [
            { id: '06', title: 'User Conduct', content: 'Do not use PERF for unlawful, harmful, or abusive purposes. Do not post or share offensive, misleading, or infringing content. PERF reserves the right to suspend or terminate accounts that violate these terms.' },
            { id: '07', title: 'Intellectual Property', content: 'All content, trademarks, and materials on PERF are the property of PERF or its licensors. You may not reproduce, distribute, or create derivative works without our written consent.' },
            { id: '08', title: 'Modifications to Service', content: 'PERF may update, modify, or discontinue services at any time. We will provide notice of significant changes via our website or email.' },
            { id: '09', title: 'Limitation of Liability', content: 'PERF is not liable for indirect, incidental, or consequential damages arising from your use of our services. Our total liability is limited to the amount paid by you (if any) in the past 12 months.' },
            { id: '10', title: 'Governing Law', content: 'These Terms are governed by the laws of Morocco. Any disputes will be resolved in the courts of Safi, Morocco.' }
          ]" :key="section.id">
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">{{ section.id }}</span> {{ section.title }}
            </h2>
            <p class="text-sm md:text-base leading-relaxed">{{ section.content }}</p>
          </div>

          <div class="pt-8 border-t border-gray-100">
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">11</span> Contact
            </h2>
            <p class="text-sm md:text-base leading-relaxed flex flex-wrap items-center gap-2">
              For questions regarding these Terms, contact us at:
              <a href="mailto:perf912@gmail.com" class="text-[#D05E33] font-bold hover:underline">perf912@gmail.com</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
