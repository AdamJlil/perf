<template>
  <div
    class="w-full bg-white text-black flex flex-col items-center gap-20 md:gap-40 relative p-8 md:p-12 lg:p-16"
    style="font-family: Montserrat;"
  >
      <h1 class="text-2xl md:text-3xl lg:text-3xl uppercase text-center tracking-1">Either you join, or get left behind</h1>

      <div id="choice-pricing" class="w-full max-w-6xl flex flex-col md:flex-row justify-center items-start md:items-end gap-8 md:gap-5">

        <!-- BRONZE -->
        <div id="Bronze" class="w-full md:w-1/3 h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 md:p-8">

        <h2 class="text-xl uppercase tracking-2">Bronze</h2>
        <h5 class="pt-1 -tracking-0.3 opacity-80">3 mounths</h5>

        <ul class="list-disc p-5 lg:w-60 md:w-50 sm:w-90 pt-5">
          <li class="text-center uppercase tracking-1 py-3">Monthly one-to-one consultation</li>
          <li class="text-center uppercase tracking-1 py-3">nutrition plan adjustements : 1 time</li>
          <li class="text-center uppercase tracking-1 py-3">personalized workout plans</li>
          <li class="text-center uppercase tracking-1 py-3 opacity-50">2 free dumbbells</li>
          <li class="text-center uppercase tracking-1 py-3 opacity-50">priority support</li>

        </ul>

        <h2 class="pt-5 text-lg tracking-1">999 dh</h2>
        <h2 class="text-red text-md  uppercase line-through">1300 dh</h2>

        </div>
        
        <!-- Platinium -->
        <div id="Platinum" class="relative w-full md:w-1/3 h-full font-medium border border-black rounded-10 flex flex-col items-center p-6 md:p-8">

          <img src="/public/images/pricing-popular.png" alt="most popular" class="absolute top-0 left-0 -translate-y-2.3 -translate-x-2.3">
            

            <h2 class="text-xl  uppercase tracking-2">Platinium</h2>
            <h5 class="pt-1 -tracking-0.3 opacity-80">6 mounths</h5>

            <ul class="list-disc p-5 lg:w-60 md:w-50 sm:w-90 pt-15">
              <li class="text-center uppercase tracking-1 py-3">Monthly one-to-one consultation</li>
              <li class="text-center uppercase tracking-1 py-3">nutrition plan adjustements : 1 time</li>
              <li class="text-center uppercase tracking-1 py-3">personalized workout plans</li>
              <li class="text-center uppercase tracking-1 py-3 ">2 free dumbbells</li>
              <li class="text-center uppercase tracking-1 py-3 opacity-50">priority support</li>

            </ul>

            <h2 class="pt-5 text-lg tracking-1">1582 dh</h2>
            <h2 class="text-red text-md">save 410 dh</h2>

        </div>

        <!-- GOLD -->
        <div id="Gold" class="w-full md:w-1/3 h-full font-medium border border-gray-500 rounded-10 flex flex-col items-center p-6 md:p-8">

            <h2 class="text-xl  uppercase tracking-2">GOld</h2>
            <h5 class="pt-1 -tracking-0.3 opacity-80">1 year</h5>

            <ul class="list-disc p-5 lg:w-60 md:w-50 sm:w-90 pt-5">
              <li class="text-center uppercase tracking-1 py-3">Monthly one-to-one consultation</li>
              <li class="text-center uppercase tracking-1 py-3">nutrition plan adjustements : 1 time</li>
              <li class="text-center uppercase tracking-1 py-3">personalized workout plans</li>
              <li class="text-center uppercase tracking-1 py-3">2 free dumbbells</li>
              <li class="text-center uppercase tracking-1 py-3">priority support</li>

            </ul>

            <h2 class="pt-5 text-lg tracking-1">999 dh</h2>
            <h2 class="text-red text-md">save 1006 dh</h2>

        </div>


   
      </div>

  </div>

</template>
