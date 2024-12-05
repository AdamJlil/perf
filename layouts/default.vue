<template>
  <div class="mx-auto min-w-[430px] min-h-screen flex flex-col relative bg-[#d4d4d4]">
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
