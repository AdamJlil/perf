<script lang="ts" setup>
import { reactive, ref } from "vue";

const isSubmitting = ref(false);

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const formSubmitted = ref(false);
const formError = ref(false);

const submitForm = async () => {
  if (!formData.name || !formData.email || !formData.message) {
    formError.value = true;
    return;
  }
  isSubmitting.value = true;

  // Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''

  try {
    // Send the form data to our API endpoint
    const response = await fetch(`${baseURL}/api/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    if (result.success) {
      isSubmitting.value = false;
      formSubmitted.value = true;
      formError.value = false;
      // Reset form after successful submission
      formData.name = '';
      formData.email = '';
      formData.message = '';
    } else {
      isSubmitting.value = false;
      formError.value = true;
      console.error('Error submitting form:', result.message);
    }
  } catch (error) {
    formError.value = true;
    console.error('Error submitting form:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

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
</style>


<template>
  <!-- Loading Overlay -->
  <div v-if="isSubmitting" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50">
    <div class="loader"></div>
  </div>
  <div class="w-full h-[15vh] bg-[#EFEFEC] flex justify-center items-center"></div>

  <div class="w-full p-4 sm:p-6 md:p-10" style="font-family: Montserrat">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 uppercase text-center">
      ALWAYS HAPPY & READY TO ANSWER YOUR QUESTIONS !
    </h1>

    <div class="w-full flex justify-center items-start pt-10 sm:pt-16 md:pt-20 gap-6 sm:gap-8 md:gap-10 lg:gap-16 flex-wrap">
      <div class="w-full md:w-3/5 lg:w-2/5 xl:w-1/4 mb-10 md:mb-0 px-4">
        <div class="w-full flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <img src="/images/icon-location.png" alt="Location" class="w-[40px] sm:w-[50px] md:w-[60px] h-auto" />
          <p class="text-gray-900 text-lg sm:text-xl md:text-2xl">Safi, Morocco</p>
        </div>

        <div class="w-full flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <img src="/images/icon-phone.png" alt="Phone" class="w-[40px] sm:w-[50px] md:w-[60px] h-auto" />
          <p class="text-gray-900 text-lg sm:text-xl md:text-2xl">+212 693-40429</p>
        </div>

        <div class="w-full flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <img src="/images/icon-mail.png" alt="Email" class="w-[40px] sm:w-[50px] md:w-[60px] h-auto" />
          <p class="text-gray-900 text-lg sm:text-xl md:text-2xl">contact@perf.ma</p>
        </div>
      </div>

      <div class="w-full md:w-3/5 lg:w-2/5 xl:w-1/4">
        <div
          class="w-full h-[450px] sm:h-[500px] md:h-[550px] rounded-[40px] bg-[#EFEFEC] flex flex-col justify-center items-center text-black relative px-4 sm:px-6 md:px-8"
        >
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 uppercase text-center absolute top-5">SEND A MESSAGE</h1>
          <!-- Form with hover effects and validation -->
          <form @submit.prevent="submitForm" class="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div class="w-full mb-4 sm:mb-6">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Name"
                class="w-full text-black text-base sm:text-lg md:text-xl placeholder:text-gray-800 p-2 sm:p-3 border-b-1.5 hover:border-b-3 focus:border-b-3 border-black transition-all duration-300 outline-none bg-[#EFEFEC]"
              />
            </div>
            <div class="w-full mb-4 sm:mb-6">
              <input
                v-model="formData.email"
                type="email"
                placeholder="Email"
                class="w-full text-black text-base sm:text-lg md:text-xl placeholder:text-gray-800 p-2 sm:p-3 border-b-1.5 hover:border-b-3 focus:border-b-3 border-black transition-all duration-300 outline-none bg-[#EFEFEC]"
              />
            </div>
            <div class="mb-4 sm:mb-6 w-full">
              <textarea
                v-model="formData.message"
                placeholder="Message"
                rows="4"
                class="w-full text-black text-base sm:text-lg md:text-xl placeholder:text-gray-800 p-2 sm:p-3 border-b-1.5 hover:border-b-3 focus:border-b-3 border-black transition-all duration-300 outline-none resize-none bg-[#EFEFEC]"
              ></textarea>
            </div>

            <div class="w-full flex justify-center mt-6 sm:mt-8 mb-6 sm:mb-8">
              <button
                type="submit"
                class="uppercase border border-black text-black bg-transparent font-light tracking-[5px] rounded-md hover:bg-black hover:text-white transition-colors duration-200 py-2 px-6 sm:px-10"
              >
                Submit
              </button>
            </div>
          </form>

          <!-- Success message -->
          <div v-if="formSubmitted" class="w-full text-center bg-green-100 text-green-800 rounded p-2">
            Thank you for your message! We'll get back to you soon.
          </div>

          <!-- Error message -->
          <div v-if="formError" class="w-full text-center bg-red-100 text-red-800 rounded p-2">
            There was an error processing your request. Please fill in all fields and try again.
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-center items-center bg-[#EFEFEC] rounded-[40px]">
    <!-- Map Section -->
    <div class="w-[85vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] h-[30vh] sm:h-[35vh] md:h-[40vh] mt-6 sm:mt-8 md:mt-10 mb-10 sm:mb-16 md:mb-20 rounded-xl">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13332.31580057437!2d-9.250000000000002!3d32.300000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb1cd1f7d2e1e6f%3A0x7f7c7c7c7c7c7c7c!2sSafi%2C%20Morocco!5e0!3m2!1sen!2sma!4v1715976000000!5m2!1sen!2sma"
        height="100%"
        width="100%"
        style="border: 0; border-radius: 40px; filter: saturate(0.3)"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      >
      </iframe>
    </div>
  </div>
</template>
