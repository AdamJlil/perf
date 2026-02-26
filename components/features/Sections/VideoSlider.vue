<template>
  <div
    class="w-full md:h-[30vh] lg:h-[35vh] max-md:h-[20vh] bg-[#EFEFEC] overflow-hidden relative"
    style="font-family: Montserrat"
  >
    <div class="flex h-full gap-[8px] bg-[#EFEFEC] animate-scroll">
      <div v-for="(video, i) in duplicatedVideos" :key="i" class="flex-shrink-0 h-full w-[250px] bg-[#EFEFEC]">
        <video autoplay muted loop playsinline class="h-full w-full object-cover">
          <source :src="video" type="video/mp4" />
        </video>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const originalVideos: string[] = [
  "https://player.vimeo.com/external/371433846.sd.mp4?s=231da7317aaba13d573039ba33930ba78d82ca85&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/434045526.sd.mp4?s=c27cf1469027afed0d1ca1d5bc3840f2acdc5a3e&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/403737155.sd.mp4?s=74f03405935c772a2c09f1d0ca58f99051a57ca0&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/394165816.sd.mp4?s=43b11cf4ef86a32bc3aa44738da2f2f19989d109&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/434045526.sd.mp4?s=c27cf1469027afed0d1ca1d5bc3840f2acdc5a3e&profile_id=164&oauth2_token_id=57447761"
];

// On double la liste des vidéos avec concat()
const duplicatedVideos: string[] = Array(10).fill(originalVideos).flat();
</script>

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

@media (max-width: 750px) {
  .animate-scroll {
    animation: scroll 17s linear infinite;
  }
}

@media (max-width: 500px) {
  .animate-scroll {
    animation: scroll 10s linear infinite;
  }
}
</style>
