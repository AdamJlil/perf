<script lang="ts" setup>
import { reactive, ref } from "vue";

const isSubmitting = ref(false);
const toast = useToast();

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const formSubmitted = ref(false);
const formError = ref(false);

const submitForm = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!formData.name.trim() || formData.name.trim().length < 2) {
    toast.error("Please enter a valid full name");
    return;
  }
  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }
  if (!formData.message.trim() || formData.message.trim().length < 10) {
    toast.error("Message must be at least 10 characters long");
    return;
  }
  
  isSubmitting.value = true;

  try {
    const result: any = await $fetch("/api/contact/submit", {
      method: "POST",
      body: formData,
    });

    if (result.success) {
      isSubmitting.value = false;
      formSubmitted.value = true;
      formError.value = false;
      toast.success("Message sent successfully!");
      formData.name = "";
      formData.email = "";
      formData.message = "";
    } else {
      isSubmitting.value = false;
      formError.value = true;
      toast.error(result.message || "Failed to send message");
    }
  } catch (error: any) {
    formError.value = true;
    toast.error(error.statusMessage || "An error occurred. Please try again.");
    console.error("Error submitting form:", error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-12 pb-20 px-4" style="font-family: Montserrat">
    <!-- Loading Overlay -->
    <div v-if="isSubmitting" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="loader"></div>
    </div>

    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-normal text-center mb-20 uppercase tracking-[8px] text-gray-800">
        Contact Us
      </h1>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <!-- Contact Info -->
        <div class="space-y-12 px-4">
          <div class="flex items-center gap-8 group">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <img src="/images/icon-location.png" alt="Location" class="w-8 h-8 object-contain" />
            </div>
            <div>
              <p class="text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Address</p>
              <p class="text-xl text-gray-800">Safi, Morocco</p>
            </div>
          </div>

          <div class="flex items-center gap-8 group">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <img src="/images/icon-phone.png" alt="Phone" class="w-8 h-8 object-contain" />
            </div>
            <div>
              <p class="text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Phone</p>
              <p class="text-xl text-gray-800">+212 693-40429</p>
            </div>
          </div>

          <div class="flex items-center gap-8 group">
            <div class="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
              <img src="/images/icon-mail.png" alt="Email" class="w-8 h-8 object-contain" />
            </div>
            <div>
              <p class="text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Email</p>
              <p class="text-xl text-gray-800">perf912@gmail.com</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
          <h2 class="text-xl font-normal mb-10 uppercase tracking-[4px] text-gray-700">
            Send a message
          </h2>

          <form class="space-y-8" @submit.prevent="submitForm">
            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Your Name</label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="Full Name"
                required
              />
            </div>

            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Your Email</label>
              <input
                v-model="formData.email"
                type="email"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300"
                placeholder="email@example.com"
                required
              />
            </div>

            <div class="relative group">
              <label class="block text-xs font-medium tracking-[2px] uppercase text-gray-500 mb-1">Your Message</label>
              <textarea
                v-model="formData.message"
                rows="4"
                class="w-full py-2 bg-transparent border-b border-gray-300 focus:border-[#D05E33] focus:outline-none transition-all duration-300 text-black placeholder-gray-300 resize-none"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            <div class="pt-6">
              <button
                type="submit"
                class="w-full uppercase border border-[#D05E33] text-[#D05E33] bg-transparent py-4 px-6 font-bold tracking-[4px] rounded-md hover:bg-[#D05E33] hover:text-white transition-all duration-300"
              >
                Submit Message
              </button>
            </div>
          </form>

          <Transition name="fade">
            <div v-if="formSubmitted" class="mt-8 p-4 bg-green-50 text-green-700 text-sm font-medium tracking-[1px] rounded-md border border-green-100 text-center italic">
              Thank you! Your message has been sent successfully.
            </div>
          </Transition>

          <Transition name="fade">
            <div v-if="formError" class="mt-8 p-4 bg-red-50 text-red-600 text-sm font-medium tracking-[1px] rounded-md border border-red-100 text-center italic">
              ** Please fill in all fields correctly.
            </div>
          </Transition>
        </div>
      </div>

      <!-- Map Section -->
      <div class="mt-32 w-full h-[450px] rounded-[40px] overflow-hidden shadow-sm grayscale hover:grayscale-0 transition-all duration-700">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13332.31580057437!2d-9.250000000000002!3d32.300000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb1cd1f7d2e1e6f%3A0x7f7c7c7c7c7c7c7c!2sSafi%2C%20Morocco!5e0!3m2!1sen!2sma!4v1715976000000!5m2!1sen!2sma"
          height="100%"
          width="100%"
          style="border: 0;"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #d05e33;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
