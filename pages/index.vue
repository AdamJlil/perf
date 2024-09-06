<script lang="ts" setup>
const currentUser = useAuthUser();
import BlocOne from '~/components/sections/BlocOne.vue';
import BlocTwo from '~/components/sections/BlocTwo.vue';
import BlocThree from '~/components/sections/BlocThree.vue';
import BlocFour from '~/components/sections/BlocFour.vue';
import BlocFive from '~/components/sections/BlocFive.vue';
import VideoSlider from '~/components/sections/VideoSlider.vue';
import VideoSliderReviews from '~/components/sections/VideoSliderReviews.vue';


</script>

<template>
    <BlocOne />
    <VideoSlider/>
    <BlocTwo />
    <BlocThree />
    <BlocFour/>
    <BlocFive/>
    <VideoSliderReviews/>
</template>