<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Header from "~/components/Sections/Nutrition/Header.vue";
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import Bloc2 from "~/components/Sections/Nutrition/BlocTwo.vue";
import Bloc3 from "~/components/Sections/Nutrition/BlocThree.vue";
import Bloc4 from "~/components/Sections/Nutrition/BlocFour.vue";
import HomeFour from '~/components/home/HomeFour.vue';
import PricingBloc from '~/components/sections/Join/PricingBloc.vue';

const currentUser = useAuthUser();
const router = useRouter();
const route = useRoute();


// Redirect establishment users to their customer management page
onMounted(() => {
  if (currentUser.value?.type === 'ETABLISSEMENT') {
    router.push({
      path: '/establishementCRUDCostumer',
      query: { userId: currentUser.value.id }
    });
  }
});

const handlePlanSelection = (plan: string) => {
    // Get all existing query parameters
    const currentQuery = { ...route.query };
    
    // Add the selected plan to the query parameters
    router.push({
    path: '/signUp',
    query: {
        ...currentQuery, // This spreads all existing params
        plan,            // Add the selected plan
        userType: 'Particulier' // Override or add the userType query param
    }
})

};
</script>

<template>
  <div>
    <Bloc4 class="md:pt-[80px] md:pb-[5px] max-md:pt-[20px] max-md:pb-[0px]" :isbuttons="false" headingText="YOUR COMPLETE ECOSYSTEM, <br /> DESIGNED FOR RESULTS" />
    <Bloc2  />
    <Bloc1 class="my-[150px]" :reversed='true' image="/images/coach.png" headingText="“HEY THERE👋,<br/>READY TO BECOME THE BEST VERSION OF YOURSELF”" />
    <HomeFour  image1="/images/work1.png" link="" buttonText="TRANSFORM NOW" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE."/>
    <Bloc1 class="my-[100px]" :reversed='false' image="/images/amjad.png" headingText="“PLANNING HEALTHY MEALS CAN BE A CHALLENGE,<br/> LET ME DO IT FOR YOU !”" />
   
    <Header />
    <Bloc3 />

    <PricingBloc 
        @planSelected="handlePlanSelection"
        title="Either you join, or get left behind" 
        :plan_1="{
            title: 'Bronze',
            duration: '3 months',
            features: [
            { text: 'Monthly one-to-one consultation', isDisabled: false },
            { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
            { text: 'Personalized workout plans', isDisabled: false },
            { text: '2 free dumbbells', isDisabled: true },
            { text: 'Priority support', isDisabled: true }
            ],
            price: '999 dh',
            discount: '1300 dh'
        }"
        :plan_2="{
            title: 'Platinum',
            duration: '6 months',
            features: [
            { text: 'Monthly one-to-one consultation', isDisabled: false },
            { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
            { text: 'Personalized workout plans', isDisabled: false },
            { text: '2 free dumbbells', isDisabled: false },
            { text: 'Priority support', isDisabled: true }
            ],
            price: '1582 dh',
            discount: 'Save 410 dh'
        }"
        :plan_3="{
            title: 'Gold',
            duration: '1 year',
            features: [
            { text: 'Monthly one-to-one consultation', isDisabled: false },
            { text: 'Nutrition plan adjustments: 1 time', isDisabled: false },
            { text: 'Personalized workout plans', isDisabled: false },
            { text: '2 free dumbbells', isDisabled: false },
            { text: 'Priority support', isDisabled: false }
            ],
            price: '999 dh',
            discount: 'Save 1006 dh'
          }"
    />
    <Bloc4 class="my-[150px]" :isbuttons='true' headingText="EITHER YOU JOIN, <br /> OR YOU GET LEFT BEHIND" />
    <HomeFour image1="/images/blockfour1.jpg" link="/products" buttonText="MORE" image2="/images/blockfour2.jpg" headingText="AT HOME, OUTDOORS, </br> OR WHILE TRAVELING!"/>
  </div>
</template>
