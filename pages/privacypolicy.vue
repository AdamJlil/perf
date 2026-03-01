<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-40 pb-24 px-6" style="font-family: 'Montserrat'">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-20">
        <h1 class="text-2xl md:text-3xl font-normal uppercase tracking-[8px] text-gray-800 mb-4">Privacy Policy</h1>
        <div class="w-20 h-1 bg-[#D05E33] mx-auto"></div>
      </div>

      <div class="bg-white/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] shadow-sm border border-white/20 text-gray-700">
        <p class="text-sm md:text-base leading-relaxed mb-12 italic text-gray-500">
          At PERF, we respect your privacy and are committed to protecting the personal information you share with us.
          This Privacy Policy outlines how we collect, use, store, and protect your data.
        </p>

        <section class="space-y-12">
          <div>
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">01</span> Information We Collect
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed">
              <p>We may collect personal information when you:</p>
              <ul class="space-y-3 pl-2">
                <li v-for="item in [
                  'Subscribe to our newsletter or mailing list',
                  'Fill out a contact or inquiry form',
                  'Purchase a product or service',
                  'Interact with us via email or WhatsApp',
                  'Use our website (via cookies and analytics tools)'
                ]" :key="item" class="flex items-start gap-3">
                  <span class="text-[#D05E33] font-bold mt-1">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
              <p class="pt-4 font-medium text-gray-600">
                This may include your name, email address, phone number, hotel/business name, location, and payment information.
              </p>
            </div>
          </div>

          <div>
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">02</span> How We Use Your Information
            </h2>
            <div class="space-y-4 text-sm md:text-base leading-relaxed">
              <p>We use your data to:</p>
              <ul class="space-y-3 pl-2">
                <li v-for="item in [
                  'Communicate with you regarding our services',
                  'Provide support, product information, and updates',
                  'Process payments and manage your account',
                  'Send marketing content (only if you’ve opted in)',
                  'Improve our services and website performance'
                ]" :key="item" class="flex items-start gap-3">
                  <span class="text-[#D05E33] font-bold mt-1">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <div v-for="(section, index) in [
            { id: '03', title: 'Sharing of Information', content: 'We do not sell, trade, or rent your personal data. We may share it with trusted third-party services (e.g., payment processors, CRM/email platforms) necessary to operate our business — and only under confidentiality agreements.' },
            { id: '04', title: 'Data Security', content: 'We take reasonable measures to protect your data using encryption, secure storage, and limited access protocols. However, no system is 100% secure, and we cannot guarantee absolute security.' },
            { id: '05', title: 'Your Rights', content: 'You have the right to access your personal data, request correction or deletion, withdraw consent at any time, or opt out of marketing emails. To exercise any of these rights, contact us at: perf912@gmail.com' },
            { id: '06', title: 'Cookies and Analytics', content: 'Our website may use cookies and analytics tools (e.g., Google Analytics) to collect usage data and enhance user experience. You can adjust your browser settings to disable cookies if you prefer.' }
          ]" :key="section.id">
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">{{ section.id }}</span> {{ section.title }}
            </h2>
            <p class="text-sm md:text-base leading-relaxed">{{ section.content }}</p>
          </div>

          <div class="pt-8 border-t border-gray-100">
            <h2 class="text-lg font-bold uppercase tracking-[2px] text-gray-800 mb-6 flex items-center gap-4">
              <span class="text-[#D05E33]">07</span> Contact
            </h2>
            <p class="text-sm md:text-base leading-relaxed flex flex-wrap items-center gap-2">
              For any questions or requests related to this policy:
              <a href="mailto:perf912@gmail.com" class="text-[#D05E33] font-bold hover:underline">perf912@gmail.com</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
