<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiUIToast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
// Ensure session is restored on mount
const { me } = useAuth();
onMounted(() => {
  me();
});
</script>
