<template>
  <div class="mx-auto min-w-[430px] min-h-screen flex flex-col relative bg-[#EFEFEC]">
    <LayoutBaseHeader />
    <!-- Added pt-40 (160px) to provide ample space for the floating header -->
    <main class="w-full flex-1 text-[black] bg-[#EFEFEC] pt-35">
      <slot />
    </main>
    <LayoutBaseFooter />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "#app";

const isActive = (routePath: string): boolean => {
  const currentPath = useRoute().path;
  return routePath === "/" ? currentPath === "/" : currentPath.includes(routePath);
};
</script>

<style scoped>
/* Applique Montserrat à tout le document */
</style>
