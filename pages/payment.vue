<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center relative p-4 md:pt-[100px] bg-[#EFEFEC] my-0"
  >

    <div class="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start gap-8 mt-[160px] h-fit">
      <!-- Payment Form -->
      <div class="w-full lg:w-1/2 flex flex-col items-center">
        
        <div class="w-full flex max-md:justify-center md:justify-between h-full">
          <h2 class="text-lg uppercase font-medium tracking-1 mb-8 underline text-underline-offset-4">
            DELIVERY INFOS :
          </h2>
        </div>
        
        <div class="w-full mt-10 space-y-4">
          <!-- Pre-filled Data Alert -->
          <Transition name="fade">
            <div v-if="showConfirmationMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 max-md:text-sm md:text-base">
              Your Payment Informations Have Been Received, an email confirmation has been sent to you.
            </div>
          </Transition>

          <!-- Sending Information Alert -->
          <Transition name="fade">
            <div v-if="sendingInformation" class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4 max-md:text-sm md:text-base flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending Payment Information...
            </div>
          </Transition>
          
          <!-- Error Alert -->
          <div v-if="form.error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 max-md:text-sm md:text-base">
            {{ form.error }}
          </div>

          <!-- Address -->
          <div class="w-full flex flex-col sm:flex-row items-center">
            <label class="sm:w-[88px] text-base font-medium text-black text-nowrap mb-1 sm:mb-0 sm:mr-2">ADRESSE :</label>
            <div class="flex-1 flex flex-col w-full">
              <input
                v-model="form.address"
                type="text"
                class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 border-b border-black"
                :class="{'border-red-500': form.errors.address, 'bg-green-100': dataPreFilled && form.address}"
                required
              />
              <span v-if="form.errors.address" class="text-sm text-red-500 mt-1">{{ form.errors.address }}</span>
            </div>
          </div>

          <!-- City -->
          <div class="w-full flex flex-col sm:flex-row items-center">
            <label class="sm:w-[88px] text-base font-medium text-black text-nowrap mb-1 sm:mb-0 sm:mr-2">CITY :</label>
            <div class="flex-1 flex flex-col w-full">
              <input
                v-model="form.city"
                type="text"
                class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 border-b border-black"
                :class="{'border-red-500': form.errors.city, 'bg-green-100': dataPreFilled && form.city}"
                required
              />
              <span v-if="form.errors.city" class="text-sm text-red-500 mt-1">{{ form.errors.city }}</span>
            </div>
          </div>

          <!-- Phone -->
          <div class="w-full flex flex-col sm:flex-row items-center">
            <label class="sm:w-[88px] text-base font-medium text-black text-nowrap mb-1 sm:mb-0 sm:mr-2">PHONE :</label>
            <div class="flex-1 flex flex-col w-full">
              <input
                v-model="form.phone"
                type="tel"
                class="w-full p-0 text-base font-medium bg-transparent text-black placeholder-gray-300 focus:outline-none focus:ring-0 border-b border-black"
                :class="{'border-red-500': form.errors.phone, 'bg-green-100': dataPreFilled && form.phone}"
                required
              />
              <span v-if="form.errors.phone" class="text-sm text-red-500 mt-1">{{ form.errors.phone }}</span>
            </div>
          </div>
        </div>


        <!-- Payment Method Section -->
        <div class="w-full flex flex-col items-start mt-8">
          <label class="text-base font-medium text-black py-0 sm:mr-1">
            PAYMENT METHOD:
          </label>
          
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
          <span v-if="form.errors.paymentMethod" class="text-sm text-red-500 mt-1">{{ form.errors.paymentMethod }}</span>

          <!-- Payment Details -->
          <div class="w-full ">
            <!-- Bank Information -->
            <div v-if="form.paymentMethod === 'bank'" class="w-full flex flex-col border border-gray-700 p-4">
              <!-- Bank of Africa -->
              <div class="flex flex-col gap-3">
                <div class="flex flex-col gap-1">
                  <div class="text-base">
                    <span class="font-semibold">Compte Chèque Particulier:</span> M AMJAD ARKHIS
                  </div>
                  <div class="text-base">
                    <span class="font-semibold">Banking details:</span> 011 590 0000112000002178 72
                  </div>
                  <div class="text-base">
                    <span class="font-semibold">IBAN:</span> MA64 0115 9000 0011 2000 0021 7872
                  </div>
                  <div class="text-base">
                    <span class="font-semibold">BIC:</span> BMCEMAMC
                  </div>
                </div>
                <div class="mt-3 text-sm italic text-gray-700">
                  Please include your name and subscription plan in the transfer description
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

        <!-- General Error Message (if any) -->
        <div v-if="form.error" class="w-full mt-4 p-3 bg-red-100 text-red-700 text-sm rounded">
          {{ form.error }}
        </div>

        <!-- Complete Order Button -->
        <button 
          @click="handlePayment"
          class="w-full mt-8 border border-black text-black py-3 px-6 uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-300"
          :disabled="form.submitting"
        >
          <span v-if="form.submitting">PROCESSING...</span>
          <span v-else>COMPLETE ORDER</span>
        </button>
      </div>
      
      <!-- Plan Card -->
      <div 
        v-if="selectedPlan"
        class="w-full lg:w-1/3 relative h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 lg:p-8 transition-transform duration-300 hover:scale-105"
      >
        <img v-if="selectedPlan.title === 'SIGNATURE'" src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3" />

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

// Define the Plan interface to fix TypeScript errors
interface Plan {
  title: string;
  duration: string;
  features: Array<{text: string; isDisabled?: boolean}>;
  price: string;
  discount: string;
}

const route = useRoute()

const form = reactive({
  address: '',
  city: '',
  phone: '',
  paymentMethod: '',
  submitting: false,
  error: '',
  errors: {
    address: '',
    city: '',
    phone: '',
    paymentMethod: ''
  }
})

const selectedPlan = ref<Plan | null>(null)

const dataPreFilled = ref(false);
const updateSuccessful = ref(false);
const showConfirmationMessage = ref(false);
const sendingInformation = ref(false);

// Function to display confirmation message with timer
const showTimedConfirmationMessage = () => {
  showConfirmationMessage.value = true;
  setTimeout(() => {
    showConfirmationMessage.value = false;
  }, 7000);
};

onMounted(async () => {
  try {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('first_name') || '';
    const name = urlParams.get('name') || '';
    const email = urlParams.get('email') || '';
    const userType = urlParams.get('userType') || '';
    const planName = urlParams.get('plan') || '';
    const price = urlParams.get('price') || '';
    
    console.log('URL Parameters:', { firstName, name, email, userType, planName, price });
    
    // Set default payment method
    form.paymentMethod = 'bank';
    
    // Always try to fetch user data to get the latest values
    if (email) {
      console.log('Fetching user data with email:', email);
      await fetchUserData();
    } else {
      console.log('No email parameter, cannot fetch user data');
      createPlanObject(planName, userType, price);
    }
    
    // Check localStorage for token and user ID
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        if (userData && userData.user && userData.user.id) {
          // Try a direct API call to get user data
          await fetchUserDataById(userData.user.id, userData.token);
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
    
    // Show confirmation message for 7 seconds if data is pre-filled
    if (dataPreFilled.value) {
      showTimedConfirmationMessage();
    }
  } catch (error) {
    console.error('Error in onMounted:', error);
  }
});

// Function to fetch user data from the API
const fetchUserData = async () => {
  try {
    // Get email from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (!email) {
      console.error('No email parameter found in URL');
      return;
    }
    
    console.log('Fetching user data for email:', email);
    
    // Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''

    // Call the API to get user data
    const response = await fetch(`${baseURL}/api/users/by-email?email=${encodeURIComponent(email)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const userData = await response.json();
    console.log('Fetched user data (FULL RESPONSE):', JSON.stringify(userData, null, 2));
    
    if (userData && userData.user) {
      const user = userData.user;
      console.log('User object structure:', Object.keys(user));
      console.log('Address field value:', user.address);
      console.log('City field value:', user.city);
      console.log('Phone field value:', user.phone);
      console.log('Payment type field value:', user.payment_type);
      
      // Check if we have any data to pre-fill
      let hasPreFilledData = false;
      
      // Pre-fill form with existing data if available
      if (user.address) {
        form.address = user.address;
        console.log('Pre-filled address:', user.address);
        hasPreFilledData = true;
      }
      
      if (user.city) {
        form.city = user.city;
        console.log('Pre-filled city:', user.city);
        hasPreFilledData = true;
      }
      
      if (user.phone) {
        form.phone = user.phone;
        console.log('Pre-filled phone:', user.phone);
        hasPreFilledData = true;
      }
      
      if (user.payment_type) {
        form.paymentMethod = user.payment_type;
        console.log('Pre-filled payment method:', user.payment_type);
        hasPreFilledData = true;
      } else {
        // Set default payment method if not available
        form.paymentMethod = 'bank';
      }
      
      // Force reactivity update
      form.address = user.address || '';
      form.city = user.city || '';
      form.phone = user.phone || '';
      form.paymentMethod = user.payment_type || 'bank';
      
      // Update the pre-filled status
      dataPreFilled.value = hasPreFilledData;
      
      // Also check if user has access to localStorage data
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        // If user data is not in localStorage, store it
        localStorage.setItem('userId', user.id);
        // Store minimal user data to avoid localStorage size limits
        localStorage.setItem('user', JSON.stringify({
          token: userData.token || '',
          user: {
            id: user.id,
            email: user.email
          }
        }));
      }
      
      // Create plan object
      if (user.plan) {
        try {
          const planData = typeof user.plan === 'string' ? JSON.parse(user.plan) : user.plan;
          createPlanObject(planData.title, user.type, planData.price);
        } catch (e) {
          console.error('Error parsing plan data:', e);
        }
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Function to directly fetch user data by ID
const fetchUserDataById = async (userId: string, token: string) => {
  try {
    if (!userId || !token) {
      console.error('Missing userId or token for direct fetch');
      return;
    }
    
    console.log('Directly fetching user data by ID:', userId);
    
    // Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''

    // Direct API call to get user by ID
    const response = await fetch(`${baseURL}/api/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Direct user data fetch result:', JSON.stringify(result, null, 2));
    
    if (result && result.user) {
      const user = result.user;
      
      // Log all relevant fields
      console.log('DIRECT FETCH - All user fields:', Object.keys(user));
      console.log('DIRECT FETCH - Address:', user.address);
      console.log('DIRECT FETCH - City:', user.city);
      console.log('DIRECT FETCH - Phone:', user.phone);
      console.log('DIRECT FETCH - Payment type:', user.payment_type);
      
      // Force update form values regardless of whether they were set before
      if (user.address) {
        form.address = user.address;
        console.log('Pre-filled address from direct fetch:', user.address);
      }
      
      if (user.city) {
        form.city = user.city;
        console.log('Pre-filled city from direct fetch:', user.city);
      }
      
      if (user.phone) {
        form.phone = user.phone;
        console.log('Pre-filled phone from direct fetch:', user.phone);
      }
      
      if (user.payment_type) {
        form.paymentMethod = user.payment_type;
        console.log('Pre-filled payment method from direct fetch:', user.payment_type);
      }
      
      // Update pre-filled status if we found any data
      const hasPreFilledData = !!(user.address || user.city || user.phone || user.payment_type);
      dataPreFilled.value = hasPreFilledData;
      
      // Add a small delay to ensure Vue reactivity has updated
      setTimeout(() => {
        console.log('Form values after delay:', {
          address: form.address,
          city: form.city,
          phone: form.phone,
          paymentMethod: form.paymentMethod
        });
      }, 100);
    }
  } catch (error) {
    console.error('Error in direct user data fetch:', error);
  }
};

// Function to create a plan object
const createPlanObject = (planName: string, userType: string, price: string) => {
  try {
    selectedPlan.value = {
      title: planName,
      price: price ? `${price} dh` : '',
      duration: planName === 'EXPLORER' ? 'Less than 10 rooms' : 
               planName === 'EXPERIENCE' ? 'Between 10-20 rooms' : 'More than 20 rooms',
      features: [
        { text: userType === 'ESTABLISHEMENT' ? 'Member accounts' : 'Monthly consultation', isDisabled: false },
        { text: userType === 'ESTABLISHEMENT' ? 'Analytics dashboard' : 'Nutrition plan', isDisabled: false },
        { text: userType === 'ESTABLISHEMENT' ? 'Email support' : 'Workout plans', isDisabled: false },
        { text: userType === 'ESTABLISHEMENT' ? 'Custom branding' : 'Free equipment', isDisabled: planName === 'EXPLORER' },
        { text: 'Priority support', isDisabled: planName !== 'SIGNATURE' }
      ],
      discount: userType === 'ESTABLISHEMENT' ? 
              (planName === 'EXPLORER' ? '6500 dh' : 
               planName === 'EXPERIENCE' ? 'Save 7500 dh' : 'Save 8000 dh') :
              (planName === 'EXPLORER' ? '6500 dh' : 
               planName === 'EXPERIENCE' ? 'Save 7500 dh' : 'Save 8000 dh')
    };
    
    console.log('Created plan object:', selectedPlan.value);
  } catch (error: any) {
    console.error('Error creating plan object:', error);
  }
};

// Clear all form errors
const clearErrors = () => {
  form.errors.address = '';
  form.errors.city = '';
  form.errors.phone = '';
  form.errors.paymentMethod = '';
  form.error = '';
};

const handlePayment = async () => {
  try {
    // Clear all previous errors
    clearErrors();
    
    // Validate form fields
    let isValid = true;
    
    if (!form.address) {
      form.errors.address = 'Please enter your address';
      isValid = false;
    }
    
    if (!form.city) {
      form.errors.city = 'Please enter your city';
      isValid = false;
    }
    
    if (!form.phone) {
      form.errors.phone = 'Please enter your phone number';
      isValid = false;
    }
    
    if (!form.paymentMethod) {
      form.errors.paymentMethod = 'Please select a payment method';
      isValid = false;
    }
    
    // If validation fails, stop here
    if (!isValid) {
      return;
    }
    
    form.submitting = true;
    form.error = '';
    
    // STEP 1: Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');
    
    // STEP 2: Get user data from localStorage
    let token = '';
    let userId = '';
    const userStr = localStorage.getItem('user');
    
    console.log('User data from localStorage:', userStr ? 'Found' : 'Not found');
    
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        // Check if we have a token in the parsed data
        if (userData.token) {
          token = userData.token;
          console.log('Token found in localStorage');
        }
        
        // Check if we have user ID in the parsed data
        if (userData.user && userData.user.id) {
          userId = userData.user.id;
          console.log('User ID found in localStorage:', userId);
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
      }
    }
    
    // If we couldn't get a token or userId from localStorage, check for a token directly
    if (!token) {
      const directToken = localStorage.getItem('token');
      if (directToken) {
        token = directToken;
        console.log('Token found directly in localStorage');
      }
    }
    
    if (!userId) {
      const directUserId = localStorage.getItem('userId');
      if (directUserId) {
        userId = directUserId;
        console.log('User ID found directly in localStorage:', userId);
      }
    }
    
    // STEP 3: If we don't have a user ID but have an email, try to get the user ID from the API
    if (!userId && emailFromUrl) {
      console.log('No user ID found, trying to get it from the API using email:', emailFromUrl);
      
      try {
        if (!token) {
          throw new Error('No authentication token available');
        }
        
        // Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''
  
        const userResponse = await fetch(`${baseURL}/api/users/by-email?email=${encodeURIComponent(emailFromUrl)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userResponse.ok) {
          throw new Error(`Failed to get user: ${userResponse.status}`);
        }
        
        const userData = await userResponse.json();
        console.log('User data from API:', userData);
        
        if (userData && userData.user && userData.user.id) {
          userId = userData.user.id;
          console.log('User ID found from API:', userId);
        } else {
          throw new Error('User not found in API response');
        }
      } catch (error) {
        console.error('Error fetching user ID from API:', error);
        form.error = 'Could not find user information. Please log in again.';
        form.submitting = false;
        return;
      }
    }
    
    // Final check: Make sure we have a token and userId
    if (!token) {
      form.error = 'Authentication required. Please log in again.';
      form.submitting = false;
      return;
    }
    
    if (!userId) {
      form.error = 'User ID not found. Please try logging in again.';
      form.submitting = false;
      return;
    }
    
    // Prepare data for API update
    const updateData = {
      address: form.address,
      city: form.city,
      phone: form.phone,
      payment_type: form.paymentMethod
    };
    
    console.log('Updating user data:', updateData);
    console.log('User ID:', userId);
    
    // Send update to API
    try {
      console.log('About to send payment update request with data:', JSON.stringify(updateData));
      
      // Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''

      // Use our brand new direct payment update route
      const response = await fetch(`${baseURL}/api/users/${userId}/update-payment`, {
        method: 'POST',  // Note: using POST as specified in the new route
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      console.log('Update request sent with:', {
        url: `${baseURL}/api/users/${userId}/update-payment`,
        method: 'POST',
        headers: {
          'Authorization': 'Bearer [TOKEN]',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from API:', errorText);
        throw new Error(`Failed to update user: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('API update response:', result);
      
      // Check the updated data to verify it's been saved correctly
      const verifyResponse = await fetch(`${baseURL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (verifyResponse.ok) {
        const updatedUserData = await verifyResponse.json();
        console.log('User data after update:', updatedUserData);
      }
      
      console.log('Payment process completed successfully');
      updateSuccessful.value = true;
      
      // Show sending information message
      sendingInformation.value = true;
      
      // Send payment notification email
      try {
        // Get necessary data for notification
        const urlParams = new URLSearchParams(window.location.search);
        const planName = urlParams.get('plan') || '';
        const userType = urlParams.get('userType') || '';
        const price = urlParams.get('price') || '';
        const email = urlParams.get('email') || '';
        const firstName = urlParams.get('first_name') || '';
        const name = urlParams.get('name') || '';
        
        // Create notification data with extended type
        interface NotificationData {
          email: string;
          name: string;
          first_name: string;
          plan: string;
          price: string;
          address: string;
          city: string;
          phone: string;
          shipping: string;
          paymentMethod: string;
          orderDate: string;
          bankInfo?: {
            bankName: string;
            accountHolder: string;
            accountNumber: string;
            iban: string;
            swift: string;
          };
          paymentMessage?: string;
        }
        
        const notificationData: NotificationData = {
          email: email,
          name: name,
          first_name: firstName,
          plan: planName,
          price: price,
          address: form.address,
          city: form.city,
          phone: form.phone,
          shipping: 'Standard',
          paymentMethod: form.paymentMethod,
          orderDate: new Date().toISOString()
        };
        
        // Add specific payment instructions based on payment method
        if (form.paymentMethod === 'bank') {
          // Bank transfer details and formal message for establishments
          notificationData.bankInfo = {
            bankName: 'Bank of Africa',
            accountHolder: 'M AMJAD ARKHIS',
            accountNumber: '011 590 0000112000002178 72',
            iban: 'MA64 0115 9000 0011 2000 0021 7872',
            swift: 'BMCEMAMC'
          };
          
          notificationData.paymentMessage = `
Dear ${name},

Thank you for choosing PERF for your establishment's fitness journey. We are delighted to welcome you to our distinguished network of partners.

To finalize your subscription to our ${planName} plan, please complete a bank transfer using the following details:

Bank: Bank of Africa
Account Holder: M AMJAD ARKHIS
Banking details: 011 590 0000112000002178 72
IBAN: MA64 0115 9000 0011 2000 0021 7872
BIC: BMCEMAMC
Reference: PERF-${planName}-${email}

Upon confirmation of your payment, our dedicated account manager will personally contact you within 24 hours to activate your access and provide a comprehensive onboarding to maximize the benefits of your new partnership.

We look forward to a successful collaboration in elevating the fitness experience at your establishment.

Warm regards,
The PERF Management Team
          `;
        } else if (form.paymentMethod === 'cash') {
          // Pay on delivery message
          notificationData.paymentMessage = `
Dear ${name},

Thank you for choosing PERF as your fitness partner. We are pleased to confirm your order for the ${planName} plan.

Your PERF training box has been prepared and will be delivered to:
${form.address}
${form.city}
Phone: ${form.phone}

Upon delivery to this address, our representative will present your complete PERF training equipment and materials. You will have the opportunity to inspect your order before making your payment of ${price} dh directly to our delivery agent.

Once payment is confirmed, your full access to PERF services will be immediately activated, and you can begin your fitness journey with us.

We are committed to providing you with an exceptional training experience and look forward to supporting you in achieving your fitness goals.

Should you have any questions regarding your delivery, please do not hesitate to contact our customer support team.

Warm regards,
The PERF Team
          `;
        }
        
        console.log('Sending payment notification with data:', notificationData);
        
        // Get runtime config
const config = useRuntimeConfig()

// Define API base URL based on environment
// Use a safe check for detecting localhost that works in both client and server
const baseURL = (typeof window !== 'undefined' &&
                (window.location.hostname === 'localhost' ||
                 window.location.hostname === '127.0.0.1'))
  ? 'http://localhost:3001'
  : ''

        // Send notification to API
        const notifyResponse = await fetch(`${baseURL}/api/payment/notify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(notificationData)
        });
        
        console.log('Notification request sent to:', `${baseURL}/api/payment/notify`);
        
        if (!notifyResponse.ok) {
          const errorText = await notifyResponse.text();
          console.error('Error sending notification:', errorText);
          throw new Error(`Failed to send notification: ${notifyResponse.status}`);
        }
        
        const notifyResult = await notifyResponse.json();
        console.log('Notification result:', notifyResult);
        
      } catch (notifyError) {
        console.error('Error sending payment notification:', notifyError);
        // Don't fail the whole process if notification fails
      } finally {
        // Hide sending indicator and show confirmation message regardless of email success/failure
        sendingInformation.value = false;
        showTimedConfirmationMessage();
      }
      
    } catch (error) {
      console.error('Error updating user:', error);
      form.error = 'Failed to update payment information. Please try again.';
    }
  } catch (error) {
    console.error('Payment error:', error);
    form.error = error instanceof Error ? error.message : 'An error occurred during payment processing. Please try again.';
  } finally {
    form.submitting = false;
  }
};
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

/* Animation classes for fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
