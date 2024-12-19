<script lang="ts" setup>
import Header from "~/components/Sections/Nutrition/Header.vue";
import Bloc1 from "~/components/Sections/Nutrition/BlocOne.vue";
import Bloc2 from "~/components/Sections/Nutrition/BlocTwo.vue";
import Bloc3 from "~/components/Sections/Nutrition/BlocThree.vue";
import Bloc4 from "~/components/Sections/Nutrition/BlocFour.vue";
import HomeFour from '~/components/home/HomeFour.vue';
</script>

<template>
  <Bloc4 class="pt-[250px] pb-[150px]" :isbuttons="false" headingText="YOUR COMPLETE ECOSYSTEM, <br /> DESIGNED FOR RESULTS" />
  <Bloc2  />
  <Bloc1 class="my-[150px]" :reversed='true' image="/images/coach.png" headingText="“HEY THERE👋,<br/>READY TO BECOME THE BEST VERSION OF YOURSELF”" />
  <HomeFour  image1="/images/work1.png" link="/login" buttonText="TRANSFORM NOW" image2="/images/work2.png" headingText="TESTED, GUARENTEED,</br> ACHIEVABLE."/>
  <Bloc1 class="my-[150px]" :reversed='false' image="/images/amjad.png" headingText="“PLANNING HEALTHY MEALS CAN BE A CHALLENGE,<br/> LET ME DO IT FOR YOU !”" />
  <Header />
  <Bloc3 />
  <Bloc4 class="my-[150px]" :isbuttons='true' headingText="EITHER YOU JOIN, <br /> OR YOU GET LEFT BEHIND" />
  <HomeFour image1="/images/blockfour1.jpg" link="/login" buttonText="MORE" image2="/images/blockfour2.jpg" headingText="AT HOME, OUTDOORS, </br> OR WHILE TRAVELING!"/>
</template>
