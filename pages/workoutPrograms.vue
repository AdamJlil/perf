<script lang="ts" setup>
const currentUser = useAuthUser();
import Header from '~/components/sections/Header.vue';
import VideoWithText from '~/components/sections/VideoWithText.vue';
</script>

<template>
    <Header text="YOUR JOURNEY STARTS NOW" videoPath="/videos/video_02.mp4" />
    <VideoWithText text="DAILY, PERSONALIZED WORKOUTS THAT ELIMINATE GUESSWORK AND FOCUS ON WHAT WORKS FOR YOU." videoPath="/videos/video_wp_01.mp4" :is-right="false" />
    <VideoWithText text="DAILY WORKOUTS TAILORED TO YOUR FITNESS LEVEL, ENSURING STEADY PROGRESS" videoPath="/videos/video_wp_02.mp4" :is-right="true" />
    <Header text="WHAT ARE YOU WAITING FOR?" videoPath="/videos/video_01.mp4" />
</template>