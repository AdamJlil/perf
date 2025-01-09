<!-- components/Sections/Nutrition/StarIcon.vue -->
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="`h-5 w-5 ${filled ? 'text-[#D05E33]' : 'text-gray-300'}`"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.172c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.785.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.23 9.397c-.783-.57-.38-1.81.588-1.81h4.172a1 1 0 00.95-.69l1.286-3.97z" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  filled: boolean;
}>()
</script>

<style scoped>
/* Optional: Add any additional styles if necessary */
</style>
