<script lang="ts" setup>
const currentUser = useAuthUser();
import Header from '~/components/sections/Header.vue';
import BlocTwo from '~/components/sections/BlocTwo.vue';
import BlocThree from '~/components/sections/BlocThree.vue';
import BlocFour from '~/components/sections/BlocFour.vue';
import BlocFive from '~/components/sections/BlocFive.vue';
import VideoSlider from '~/components/sections/VideoSlider.vue';
import VideoSliderReviews from '~/components/sections/VideoSliderReviews.vue';

</script>

<template>
    <Header text="READY TO GET FIT?" videoPath="/videos/video_01.mp4" />
    <VideoSlider/>
    <BlocTwo />
    <BlocThree />
    <BlocFour/>
    <BlocFive/>
    <VideoSliderReviews/>
</template>