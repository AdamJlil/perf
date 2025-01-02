<template>
<div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat;"
  >

  <div class="w-full max-w-6xl flex max-md:flex-col justify-center items-start gap-8 mt-[160px] h-fit">
    <!-- Payment Form -->
    <div class="w-full lg:w-1/2 flex flex-col items-center">
      
      <div class="w-full flex max-md:justify-center md:justify-between h-full">
        <h2 class="text-lg uppercase tracking-1 mb-8 underline text-underline-offset-4">DELIVERY INFOS : </h2>
      </div>
      
      <div class="w-full">
        <!-- Name -->
        <div class="w-full flex flex-col sm:flex-row items-center">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 sm:mr-4">NAME:</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 max-md:mb-[40px]"
            required
          />
        </div>

        <!-- Address -->
        <div class="w-full flex flex-col sm:flex-row items-center">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40  sm:mr-4">ADRESSE:</label>
          <input
            v-model="form.address"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 max-md:mb-[40px]"
            required
          />
        </div>

        <!-- City -->
        <div class="w-full flex flex-col sm:flex-row items-center">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 sm:mr-4 text-nowrap">CITY:</label>
          <input
            v-model="form.city"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 max-md:mb-[40px]"
            required
          />
        </div>

        <!-- Phone -->
        <div class="w-full flex flex-col sm:flex-row items-center">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 sm:mr-4 text-nowrap">PHONE:</label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 max-md:mb-[40px]"
            required
          />
        </div>

        <!-- Shipping -->
        <div class="w-full flex flex-col sm:flex-row items-center">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 sm:mr-4 text-nowrap">SHIPPING:</label>
          <input
            v-model="form.shipping"
            type="text"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 max-md:mb-[40px]"
            required
          />
        </div>

        <!-- Payment Method Dropdown -->
        <div class="w-full flex flex-col sm:flex-row items-center md:gap-[30px]">
          <label class="text-sm md:text-base lg:text-lg font-light text-black w-full sm:w-40 sm:mr-4 text-nowrap">PAYMENT METHOD:</label>
          <select
            v-model="form.paymentMethod"
            class="w-full sm:flex-1 p-1 border-b-1 border-[#0000002b] bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 max-md:mb-[40px]"
            required
          >
            <option value="" disabled>Select payment method</option>
            <option value="card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
        
      </div>

      <!-- Complete Order Button -->
      <button 
          @click="handlePayment"
          class="w-full mt-8 border border-black text-black py-3 px-6 uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
        >
          COMPLETE ORDER
        </button>
    </div>

    <!-- Plan Card -->
    <div 
      id="Bronze" 
      class="w-full lg:w-1/3 h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8 transition-transform duration-300 hover:scale-105"
      @click="$emit('planSelected', 'BRONZE')"
    >
      <h2 class="text-xl uppercase tracking-2">{{ plan_1.title }}</h2>
      <h5 class="pt-1 -tracking-0.3 opacity-80">{{ plan_1.duration }}</h5>

      <ul class="list-disc p-5 lg:w-50 sm:w-90 pt-5">
        <li
          v-for="(feature, i) in plan_1.features"
          :key="i"
          class="text-center uppercase tracking-1 py-3"
          :class="{ 'opacity-50': feature.isDisabled }"
        >
          {{ feature.text }}
        </li>
      </ul>

      <h2 class="pt-5 text-lg tracking-1">{{ plan_1.price }}</h2>
      <h2 class="text-[#D05E33] text-md uppercase line-through">{{ plan_1.discount }}</h2>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const form = reactive({
  name: '',
  address: '',
  city: '',
  phone: '',
  shipping: '',
  paymentMethod: ''
})

const plan_1 = ref({
  title: 'BRONZE',
  duration: '3 MONTHS',
  features: [
    { text: 'Monthly one-to-one consultation', isDisabled: false },
    { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
    { text: 'Personalized workout plans', isDisabled: false },
    { text: '2 free dumbbells', isDisabled: true },
    { text: 'Priority support', isDisabled: true }
  ],
  price: '59.99 MAD',
  discount: '99.99 MAD'
})

// Update plan details based on URL query parameter
const updatePlanDetails = () => {
  const selectedPlan = route.query.plan as string
  
  switch(selectedPlan) {
    case 'PLATINUM':
      plan_1.value = {
        title: 'PLATINUM',
        duration: '6 MONTHS',
        features: [
          { text: 'Monthly one-to-one consultation', isDisabled: false },
          { text: 'Nutrition plan adjustments: 2 times', isDisabled: false },
          { text: 'Personalized workout plans', isDisabled: false },
          { text: '2 free dumbbells', isDisabled: false },
          { text: 'Priority support', isDisabled: false }
        ],
        price: '89.99 MAD',
        discount: '149.99 MAD'
      }
      break
    case 'GOLD':
      plan_1.value = {
        title: 'GOLD',
        duration: '12 MONTHS',
        features: [
          { text: 'Monthly one-to-one consultation', isDisabled: false },
          { text: 'Unlimited nutrition plan adjustments', isDisabled: false },
          { text: 'Personalized workout plans', isDisabled: false },
          { text: '2 free dumbbells', isDisabled: false },
          { text: 'Priority support', isDisabled: false }
        ],
        price: '129.99 MAD',
        discount: '199.99 MAD'
      }
      break
  }
}

const handlePayment = () => {
  // Here you can handle the payment with both form and plan data
  console.log('Payment details:', {
    firstName: form.firstName,
    lastName: form.lastName,
    plan: plan_1.value.title,
    price: plan_1.value.price
  })
}

// Call updatePlanDetails when component mounts
updatePlanDetails()
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: rgba(0, 0, 0, 0.5);
}

input::placeholder {
  color: #888;
}
input:focus, select:focus {
  outline: none;
  border-color: rgba(0, 0, 0, 0.5);
}

input::placeholder {
  color: #888;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1em;
}
</style>