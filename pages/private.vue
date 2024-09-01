<script lang="ts" setup>
definePageMeta({
  middleware: ["user-only"],
});

const currentUser = useAuthUser();
</script>

<template>
  <div>
    <PageTitle title="VIDEOS page" />
    <PageDescription description="This VIDEOS page should only be visible if user is connected" />
    <!-- <PageUser :user="currentUser" /> -->
  </div>
</template>
