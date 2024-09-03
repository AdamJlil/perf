<template>
  <div
    class="w-full h-[100vh] bg-cover bg-center text-white flex flex-col justify-center items-center gap-8 relative p-4"
    style="font-family: Montserrat; background-image: url('/images/blocThree.jpg');"
  >
    <!-- Dark Overlay -->
    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

    <!-- Main Content -->
    <div class="z-10 flex flex-col items-center">
      <!-- Main Heading -->
      <p class="text-white text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide mt-8" style="font-weight: 200;">
        Easy nutrition plans.<br />
        Lasting results.
      </p>

      <!-- Input Fields -->
      <div class="flex flex-col items-center w-full max-w-xs mt-12">
        <div class="w-full flex items-center mb-4">
          <label class="text-sm md:text-base lg:text-lg font-light text-white w-40 flex-shrink-0">E-MAIL/PHONE:</label>
          <input
            type="text"
            class="flex-1 p-1 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-white"
          />
        </div>
        <div class="w-full flex items-center mb-6">
          <label class="text-sm md:text-base lg:text-lg font-light text-white w-40 flex-shrink-0">PASSWORD:</label>
          <input
            type="password"
            class="flex-1 p-1 border-b-2 border-white bg-transparent text-white placeholder-gray-300 focus:outline-none focus:ring-0 focus:border-white"
          />
        </div>

        <!-- Smaller, Square Login Button -->
        <button class="w-full max-w-[200px] border border-white bg-transparent text-white py-2 hover:bg-white hover:text-black transition-colors mt-4">
          Login
        </button>
      </div>

      <!-- Footer Text -->
      <div class="absolute bottom-6 w-full text-center z-20 px-4">
      </div>
    </div>
  </div>
</template>
