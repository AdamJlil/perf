<template>
  <div
    class="w-full bg-cover bg-center text-black flex flex-col justify-center items-center relative p-4 pt-[100px] bg-[#EFEFEC] my-0"
    style="font-family: Montserrat"
  >
    <div class="w-full max-w-6xl flex max-md:flex-col justify-between items-start gap-8 mt-[160px] h-fit">
      <!-- Payment Form -->
      <div class="w-full lg:w-1/2 flex flex-col items-center">
        <div class="w-full flex max-md:justify-center md:justify-between h-full">
          <h2 class="text-lg uppercase font-medium tracking-1 mb-8 underline text-underline-offset-4">
            COMPANY INFOS :
          </h2>
        </div>

        <div class="w-full mt-10">
          <!-- Name -->
          <div class="w-full flex sm:flex-row items-start justify-end">
            <label class="text-base font-medium text-black py-0 mr-1 text-nowrap">NAME :</label>
            <div class="w-full p-0 text-base font-medium bg-transparent text-black">PERF Fitness</div>
          </div>

          <!-- Address -->
          <div class="w-full flex flex-col sm:flex-row items-start justify-end">
            <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">ADRESSE:</label>
            <div class="w-full p-0 text-base font-medium bg-transparent text-black">123 Fitness Avenue, Casablanca</div>
          </div>

          <!-- City -->
          <div class="w-full flex flex-col sm:flex-row items-start justify-end">
            <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">CITY :</label>
            <div class="w-full p-0 text-base font-medium bg-transparent text-black">Casablanca</div>
          </div>

          <!-- Phone -->
          <div class="w-full flex flex-col sm:flex-row items-start justify-end">
            <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">PHONE:</label>
            <div class="w-full p-0 text-base font-medium bg-transparent text-black">+212 522 123 456</div>
          </div>

          <!-- Email -->
          <div class="w-full flex flex-col sm:flex-row items-start justify-end">
            <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">EMAIL:</label>
            <div class="w-full p-0 text-base font-medium bg-transparent text-black">contact@perffitness.ma</div>
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
          <div class="w-full">
            <!-- Bank Information -->
            <div v-if="form.paymentMethod === 'bank'" class="w-full flex flex-col border border-gray-700 p-4">
              <!-- Bank of Africa -->
              <div class="">
                <label class="text-base font-medium italic text-black mb-2">Bank of Africa </label>
                <div class="">
                  <div class="w-full flex sm:flex-row items-stert">
                    <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">Account number :</label>
                    <div class="w-full p-0 text-base font-medium bg-transparent text-black">123456789012345678901234</div>
                  </div>
                  <div class="w-full flex sm:flex-row items-start">
                    <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">RIB :</label>
                    <div class="w-full p-0 text-base font-medium bg-transparent text-black">000 780 00012345678901234 56</div>
                  </div>
                </div>
              </div>

              <!-- CIH -->
              <div>
                <label class="text-base font-medium italic text-black mb-2">CIH </label>
                <div class="">
                  <div class="w-full flex sm:flex-row items-start">
                    <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">Account number :</label>
                    <div class="w-full p-0 text-base font-medium bg-transparent text-black">987654321098765432109876</div>
                  </div>
                  <div class="w-full flex sm:flex-row items-start">
                    <label class="text-base font-medium text-black py-0 sm:mr-1 text-nowrap">RIB :</label>
                    <div class="w-full p-0 text-base font-medium bg-transparent text-black">230 450 00098765432109876 32</div>
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
        <img
          v-if="selectedPlan.title === 'PLATINUM'"
          src="/public/images/pricing-popular.png"
          alt="most popular"
          class="absolute top-[2px] left-[3px] w-[116px] -translate-y-2.3 -translate-x-2.3"
        />

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
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { plans } from "~/types/plans";

// Define the Plan interface to fix TypeScript errors
interface Plan {
  title: string;
  duration: string;
  features: Array<{ text: string; isDisabled?: boolean }>;
  price: string;
  discount: string;
}

const route = useRoute();

const form = reactive({
  paymentMethod: "",
});

const selectedPlan = ref<Plan | null>(null);

onMounted(() => {
  try {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get("first_name") || "";
    const name = urlParams.get("name") || "";
    const email = urlParams.get("email") || "";
    const userType = urlParams.get("userType") || "";
    const planName = urlParams.get("plan") || "";
    const price = urlParams.get("price") || "";

    console.log("URL Parameters:", { firstName, name, email, userType, planName, price });

    // Set default payment method
    form.paymentMethod = "bank";

    // If we don't have all the necessary parameters, try to fetch them from the API
    if (!firstName || !name || !email || !userType || !planName || !price) {
      console.log("Missing parameters, will try to fetch from API");
      fetchUserData();
    } else {
      // Create a plan object based on URL parameters
      createPlanObject(planName, userType, price);
    }
  } catch (error: any) {
    console.error("Error in onMounted:", error);
  }
});

// Function to fetch user data from the API
const fetchUserData = async () => {
  try {
    // Get email from URL if available
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (!email) {
      console.error("No email parameter found in URL");
      return;
    }

    // Call the API to get user data
    const response = await fetch(`http://localhost:3001/api/users/by-email?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData = await response.json();
    console.log("Fetched user data:", userData);

    if (userData && userData.user) {
      // Determine price based on plan
      let price = "";
      if (userData.user.plan) {
        const planTitle =
          typeof userData.user.plan === "string"
            ? JSON.parse(userData.user.plan).title || ""
            : userData.user.plan.title || "";

        if (userData.user.type === "ESTABLISHEMENT") {
          if (planTitle === "BRONZE") price = "2999";
          else if (planTitle === "PLATINUM") price = "4999";
          else if (planTitle === "GOLD") price = "8999";
        } else {
          // PARTICULIER prices
          if (planTitle === "BRONZE") price = "999";
          else if (planTitle === "PLATINUM") price = "1582";
          else if (planTitle === "GOLD") price = "999";
        }
      }

      // Create plan object
      if (userData.user.plan) {
        const planTitle =
          typeof userData.user.plan === "string"
            ? JSON.parse(userData.user.plan).title || ""
            : userData.user.plan.title || "";

        createPlanObject(planTitle, userData.user.type, price);
      }
    }
  } catch (error: any) {
    console.error("Error fetching user data:", error);
  }
};

// Function to create a plan object
const createPlanObject = (planName: string, userType: string, price: string) => {
  try {
    selectedPlan.value = {
      title: planName,
      price: price ? `${price} dh` : "",
      duration: planName === "BRONZE" ? "3 months" : planName === "PLATINUM" ? "6 months" : "1 year",
      features: [
        { text: userType === "ESTABLISHEMENT" ? "Member accounts" : "Monthly consultation", isDisabled: false },
        { text: userType === "ESTABLISHEMENT" ? "Analytics dashboard" : "Nutrition plan", isDisabled: false },
        { text: userType === "ESTABLISHEMENT" ? "Email support" : "Workout plans", isDisabled: false },
        {
          text: userType === "ESTABLISHEMENT" ? "Custom branding" : "Free equipment",
          isDisabled: planName === "BRONZE",
        },
        { text: "Priority support", isDisabled: planName !== "GOLD" },
      ],
      discount:
        userType === "ESTABLISHEMENT"
          ? planName === "BRONZE"
            ? "3500 dh"
            : planName === "PLATINUM"
              ? "Save 1000 dh"
              : "Save 2000 dh"
          : planName === "BRONZE"
            ? "1300 dh"
            : planName === "PLATINUM"
              ? "Save 410 dh"
              : "Save 1006 dh",
    };

    console.log("Created plan object:", selectedPlan.value);
  } catch (error: any) {
    console.error("Error creating plan object:", error);
  }
};

const handlePayment = async () => {
  try {
    // Get URL parameters for payment information
    const urlParams = new URLSearchParams(window.location.search);
    const first_name = urlParams.get("first_name") || "";
    const name = urlParams.get("name") || "";
    const email = urlParams.get("email") || "";
    const userType = urlParams.get("userType") || "";
    const plan = urlParams.get("plan") || "";
    const price = urlParams.get("price") || "";

    // Prepare payment data for email notification
    const paymentData = {
      first_name,
      name,
      email,
      userType,
      plan,
      price,
      paymentMethod: form.paymentMethod,
      orderDate: new Date().toISOString(),
    };

    console.log("Sending payment notification with data:", paymentData);

    // Send email notification directly to the server
    // Make sure the server is running on port 3001
    try {
      const response = await fetch("http://localhost:3001/api/payment/notify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert("Your payment has been processed successfully!");
        // Redirect to home page or dashboard
        window.location.href = "/";
      } else {
        alert(`Error: ${data.message || "Unknown error"}`);
      }
    } catch (error: any) {
      console.error("Error sending payment notification:", error);
      alert(`Error: ${error.message || "Failed to process payment"}`);
    }
  } catch (error: any) {
    console.error("Error in handlePayment:", error);
    alert(`Error: ${error.message || "An unexpected error occurred"}`);
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
input:focus,
select:focus {
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
  background-color: #d05e33;
}
</style>
