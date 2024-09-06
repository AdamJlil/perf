<template>
  <div class="mx-auto min-w-[300px] min-h-screen flex flex-col bg-white relative">
    <BaseHeader />
    <main class="w-full flex-1  text-[black]">
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped>
/* Applique Montserrat à tout le document */

</style>
