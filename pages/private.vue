<script lang="ts" setup>
definePageMeta({
  middleware: ["user-only"],
});

const currentUser = useAuthUser();

const isParticlier_workoutProgram = ref(false);
const isParticlier_nutritionProgram = ref(false);
const isEtablissement_workoutProgram = ref(false);
const isEtablissement_nutritionProgram = ref(false);
</script>

<template>
  <div class="pt-[100px]">
    <PageTitle title="VIDEOS page" />
    <PageDescription description="This VIDEOS page should only be visible if user is connected" />
  </div>
</template>
