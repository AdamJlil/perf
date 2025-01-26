<template>
<div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat;"
  >

  <div class="w-full max-w-6xl flex max-md:flex-col justify-between items-start gap-8 mt-[160px] h-fit">
    <!-- Payment Form -->
    <div class="w-full  lg:w-1/2 flex flex-col items-center">
      
      <div class="w-full flex max-md:justify-center md:justify-between h-full">
        <h2 class="text-lg uppercase font-medium tracking-1 mb-8 underline text-underline-offset-4">DELIVERY INFOS : </h2>
      </div>
      
      <div class="w-full mt-10 ">
        <!-- Name -->
        <div class="w-full flex  sm:flex-row items-start justify-end">
          <label class="text-base font-medium text-black  py-0 mr-1 text-nowrap">NAME :</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 "
            required
          />
        </div>

        <!-- Address -->
        <div class="w-full flex flex-col sm:flex-row items-start justify-end">
          <label class="text-base font-medium text-black  py-0 sm:mr-1 text-nowrap">ADRESSE:</label>
          <input
            v-model="form.address"
            type="text"
            class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
            required
          />
        </div>

        <!-- City -->
        <div class="w-full flex flex-col sm:flex-row items-start justify-end">
          <label class="text-base  font-medium text-black  py-0 sm:mr-1 text-nowrap">CITY :</label>
          <input
            v-model="form.city"
            type="text"
            class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
            required
          />
        </div>

        <!-- Phone -->
        <div class="w-full flex flex-col sm:flex-row items-start justify-end">
          <label class="text-base font-medium text-black  py-0 sm:mr-1 text-nowrap">PHONE:</label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
            required
          />
        </div>

        <!-- Shipping -->
        <div class="w-full flex flex-col sm:flex-row items-start justify-end">
          <label class="text-base font-medium text-black  py-0 sm:mr-1 text-nowrap">SHIPPING:</label>
          <input
            v-model="form.shipping"
            type="text"
            class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
          />
        </div>
      </div>

      <!-- Payment Method Section -->
      <div class="w-full flex flex-col items-start mt-8">
        <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">PAYMENT METHOD:</label>
        
        <div class="w-full flex flex-row justify-start mt-5">
          <button 
            @click="form.paymentMethod = 'bank'" 
            class="w-auto px-4 py-2 text-black uppercase tracking-wider transition-all duration-300"
            :class="form.paymentMethod === 'bank' ? 'bg-orange text-white' : 'hover:bg-orange hover:text-white'"
          >
            Bank deposit
          </button>
          <div id="gapper" class="w-4 bg-[#EFEFEC]" :class="{ 'scale-y-105': form.paymentMethod === 'bank' }"></div>
          <div id="divider" class="w-[1px] bg-gray-700"></div>
          <div id="gapper" class="w-4 bg-[#EFEFEC]" :class="{ 'scale-y-110': form.paymentMethod === 'cash' }"></div>
          <button 
            @click="form.paymentMethod = 'cash'" 
            class="w-auto px-4 py-2 text-black uppercase tracking-wider transition-all duration-300"
            :class="form.paymentMethod === 'cash' ? 'bg-orange text-white' : 'hover:bg-orange hover:text-white'"
          >
            Cash on delivery
          </button>
        </div>

        <!-- Payment Details -->
        <div class="w-full ">
          <!-- Bank Information -->
          <div v-if="form.paymentMethod === 'bank'" class="w-full flex flex-col border border-gray-700 p-4">
            <!-- Bank of Africa -->
            <div class="">
              <label class="text-base font-medium italic text-black mb-2">Bank of Africa </label>
              <div class="">
                <div class="w-full flex sm:flex-row items-stert">
                  <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">Account number :</label>
                  <input
                    v-model="form.BanqAfricaAccountNumber"
                    type="text"
                    class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
                    required
                  />
                </div>
                <div class="w-full flex sm:flex-row items-start">
                  <label class="text-base font-medium  text-black py-0 sm:mr-1 text-nowrap">RIB :</label>
                  <input
                    v-model="form.BanqAfricaRIB"
                    type="text"
                    class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
                    required
                  />
                </div>
              </div>
            </div>

            <!-- CIH -->
            <div>
              <label class="text-base font-medium italic text-black mb-2">CIH </label>
              <div class="">
                <div class="w-full flex sm:flex-row items-start">
                  <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">Account number :</label>
                  <input
                    v-model="form.CIHAccountNumber"
                    type="text"
                    class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
                    required
                  />
                </div>
                <div class="w-full flex sm:flex-row items-start">
                  <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">RIB :</label>
                  <input
                    v-model="form.Cihrib"
                    type="text"
                    class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0  "
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Cash Payment Information -->
          <div v-if="form.paymentMethod === 'cash'" class="w-full flex flex-col border border-gray-700 p-5">
            <label class="text-sm font-medium text-black py-0 sm:mr-1">
              Pay directly when you receive your order at the mentioned address above
            </label>
          </div>
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
      v-if="selectedPlan"
      class="w-full lg:w-1/3 relative h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8 transition-transform duration-300 hover:scale-105"
    >
      <img v-if="selectedPlan.title === 'PLATINUM'" src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3" />

      <h2 class="text-xl uppercase tracking-2">{{ selectedPlan.title }}</h2>
      <h5 class="pt-1 -tracking-0.3 opacity-80">{{ selectedPlan.duration }}</h5>

      <ul class="list-disc p-5 lg:w-50 sm:w-90 pt-5">
        <li
          v-for="(feature, i) in selectedPlan.features"
          :key="i"
          class="text-center lowercase tracking-1 py-3"
          :class="{ 'opacity-50': feature.isDisabled }"
        >
          {{ feature.text }}
        </li>
      </ul>

      <h2 class="pt-5 text-lg tracking-1">{{ selectedPlan.price }}</h2>
      <h2 class="text-[#D05E33] text-md uppercase line-through">{{ selectedPlan.discount }}</h2>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { plans } from '~/types/plans'

const route = useRoute()

const form = reactive({
  name: '',
  address: '',
  city: '',
  phone: '',
  shipping: '',
  paymentMethod: '',
  BanqAfricaAccountNumber: '',
  BanqAfricaRIB: '',
  CIHAccountNumber: '',
  Cihrib: ''
})

const selectedPlan = ref(null)

onMounted(() => {
  const planName = route.query.plan as string
  const userType = route.query.userType as string
  
  if (planName && userType) {
    const planSet = userType === 'PARTICULIER' ? plans.particular : plans.ESTABLISHEMENT
    
    // Find the matching plan
    Object.entries(planSet.plans).forEach(([key, plan]) => {
      if (plan.title === planName) {
        selectedPlan.value = plan
      }
    })
  }
})

const handlePayment = () => {
  console.log('Payment details:', {
    ...form,
    plan: selectedPlan.value?.title,
    price: selectedPlan.value?.price
  })
}
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

.bg-orange {
  background-color: #D05E33;
}
</style>
