<script lang="ts" setup>
definePageMeta({
  middleware: ["user-only"],
});

const currentUser = useAuthUser();
</script>

<template>
  <div class="pt-[100px]">
    <PageTitle title="VIDEOS page" />
    <PageDescription description="This VIDEOS page should only be visible if user is connected" />
  </div>
</template>
