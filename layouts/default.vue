<template>
  <div class="mx-auto min-w-[430px] min-h-screen flex flex-col relative bg-white">
    <BaseHeader />
    <main class="w-full flex-1 text-[black] bg-white bg-white">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped>
/* Applique Montserrat à tout le document */

</style>
<script lang="ts" setup>
const isActive = (route: string): boolean => {
  const currentPath = useRoute().path;
  return route === "/" ? currentPath === "/" : currentPath.includes(route);
};
</script>
