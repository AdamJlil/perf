<template>
  <div
    class="w-full h-[100vh] max-md:h-fit bg-black text-white flex flex-col justify-between items-center relative p-4 py-[50px]"
    style="font-family: Montserrat;"
  >
    <!-- Bloc gauche avec les textes -->
    <div class="flex flex-col gap-4 text-center">
      <h2 class="text-4xl font-bold">23-08-2024</h2>
      <p class="text-lg">
        THIS 30-MINUTE <span class="font-bold underline">FULL-BODY</span> WORKOUT FOCUSING ON STRENGTH AND ENDURANCE. WE’LL TARGET YOUR MAJOR MUSCLE GROUPS WITH EXERCISES LIKE SQUATS, LUNGES, PUSH-UPS, AND ROWS. AND WE’LL FINISH WITH A QUICK CORE CIRCUIT TO WRAP IT UP.
      </p>
    </div>

    <!-- Bloc droit avec la vidéo -->
    <div class="w-full mt-[50px]">
      <video class="w-full h-auto" controls>
        <source src="/videos/video_01.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>
