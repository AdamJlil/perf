<script lang="ts" setup>
import { reactive, ref } from "vue";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const formSubmitted = ref(false);
const formError = ref(false);

const submitForm = () => {
  if (!formData.name || !formData.email || !formData.message) {
    formError.value = true;
    return;
  }

  // Here you would typically send the data to your backend
  console.log("Form submitted:", formData);
  formSubmitted.value = true;
  formError.value = false;
};
</script>

<template>
  <div class="w-full h-[40vh] bg-white flex justify-center items-center"></div>

  <div class="w-full p-10" style="font-family: Montserrat">
    <h1 class="text-4xl font-bold text-gray-900 uppercase text-center">
      ALWAYS HAPPY & READY TO ANSWER YOUR QUESTIONS !
    </h1>

    <div class="w-full flex justify-center items-center pt-20 gap-10 flex-wrap">
      <div class="w-full md:w-1/3 lg:w-1/4 mb-10 md:mb-0">
        <div class="w-full flex items-center gap-6 mb-8">
          <img src="/images/icon-location.png" alt="Location" class="w-[60px] h-auto" />
          <p class="text-gray-900 text-2xl">Adress adress adress adres adress</p>
        </div>

        <div class="w-full flex items-center gap-6 mb-8">
          <img src="/images/icon-phone.png" alt="Phone" class="w-[60px] h-auto" />
          <p class="text-gray-900 text-2xl">02 02 02 02 02</p>
        </div>

        <div class="w-full flex items-center gap-6 mb-8">
          <img src="/images/icon-mail.png" alt="Email" class="w-[60px] h-auto" />
          <p class="text-gray-900 text-2xl">email@email.com</p>
        </div>
      </div>

      <div class="w-full md:w-1/3 lg:w-1/4">
        <div
          class="w-full h-[550px] rounded-[40px] bg-white flex flex-col justify-center items-center text-black relative"
        >
          <h1 class="text-2xl font-bold text-gray-900 uppercase text-center absolute top-5">SEND A MESSAGE</h1>
          <!-- Form with hover effects and validation -->
          <form @submit.prevent="submitForm" class="">
            <div class="w-full mb-6">
              <input
                v-model="formData.name"
                type="text"
                placeholder="Name"
                class="text-black text-xl placeholder:text-gray-800 p-3 border-b-1.5 hover:border-b-3 focus:border-b-3 border-black transition-all duration-300 outline-none"
              />
            </div>
            <div class="w-full mb-6">
              <input
                v-model="formData.email"
                type="email"
                placeholder="Email"
                class="text-black text-xl placeholder:text-gray-800 p-3 border-b-1.5 hover:border-b-3 focus:border-b-3 border-black transition-all duration-300 outline-none"
              />
            </div>
            <div class="mb-6">
              <textarea
                v-model="formData.message"
                placeholder="Message"
                rows="4"
                class="text-black text-xl placeholder:text-gray-800 p-3 border-b-1.5 hover:border-b-3 focus:border-b-3 border-black transition-all duration-300 outline-none resize-none"
              ></textarea>
            </div>

            <div class="w-full flex justify-center mt-8 mb-8">
              <button
                type="submit"
                class="py-2 px-10 border-2 border-black text-black font-normal uppercase hover:cursor-pointer  transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </form>

          <!-- Success message -->
          <div v-if="formSubmitted" class="w-full text-center bg-green-100 text-green-800 rounded">
            Thank you for your message! We'll get back to you soon.
          </div>

          <!-- Error message -->
          <div v-if="formError" class="w-full text-center bg-red-100 text-red-800 rounded">
            Please fill in all fields before submitting.
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full flex justify-center items-center bg-white rounded-[40px]">
    <!-- Map Section -->
    <div class="w-[50vw] h-[40vh] mt-10 mb-20 rounded-xl ">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615509614!3d48.85837007928746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1651868653115!5m2!1sen!2sfr"
        width="100%"
      height="100%"
      style="border: 0; border-radius: 40px; filter: saturate(0.3)"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    >
    </iframe>
  </div>
</div>
</template>
