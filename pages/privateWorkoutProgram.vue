<script lang="ts" setup>
import Workout_block1 from '~/components/sections/private/workout_block1.vue';
import VideoBlock from '~/components/sections/private/videoBlock.vue';


definePageMeta({
  middleware: ["user-only"],
});

const currentUser = useAuthUser();
</script>

<template>
  <div>
    <Workout_block1 />
    <VideoBlock />
  </div>
</template>
