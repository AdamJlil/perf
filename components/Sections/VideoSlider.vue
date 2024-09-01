<template>
    <div class="w-full h-[40vh] bg-black overflow-hidden relative" style="font-family: Montserrat;">
      <div class="flex h-full gap-[8px] bg-black animate-scroll">
        <!-- Premier ensemble de vidéos -->
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_01.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_02.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_03.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_04.mp4" type="video/mp4" />
          </video>
        </div>
  
        <!-- Deuxième ensemble de vidéos (duplication) -->
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_01.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_02.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_03.mp4" type="video/mp4" />
          </video>
        </div>
        <div class="flex-shrink-0 h-full w-[250px] bg-black">
          <video autoplay muted loop class="h-full w-full object-cover">
            <source src="/videos/slider_videos/slider-video_04.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
  
  .animate-scroll {
    animation: scroll 25s linear infinite;
  }
  </style>
  