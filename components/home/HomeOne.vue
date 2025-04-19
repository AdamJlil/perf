<template>
  <div class="banner-container overflow-x-hidden overflow-y-hidden relative w-full bg-blue text-white flex flex-col justify-center items-start gap-8 md:p-[90px] max-md:p-[20px]" style="font-family: Montserrat; height: 80vh;">
    
    <!-- Image as background -->
    <img 
      :src="backgroundImage" 
      :alt="imageAlt" 
      class="absolute top-0 left-0 w-full h-full object-cover z-[1]" 
    />

    <!-- Overlay Layer -->
    <!-- <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-1"></div> -->

    <!-- Content -->
    <div class="z-10 flex flex-col justify-center items-start gap-[20px] lg:gap-[100px] md:gap-[50px] w-full">
        <p class="texts text-white text-left text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight max-w-[90%]" style="font-weight: 200;" >
          {{ mainText }}
        </p>
    
        <div class="flex flex-col md:flex-row gap-4 md:gap-8 justify-start items-start">
          <nuxt-link :to="buttonLink" class="texts text-white tracking-normal border border-[#ffffff38] py-2 px-6 md:px-10 text-center text-sm w-[120px] md:w-[200px] lg:w-[250px] text-nowrap" style="font-weight: 300;">
            {{ buttonText }}
          </nuxt-link>
        </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  backgroundImage: {
    type: String,
    default: '/images/homeone.jpg'
  },
  imageAlt: {
    type: String,
    default: 'Background Image'
  },
  mainText: {
    type: String,
    default: 'READY TO GET FIT ?'
  },
  buttonText: {
    type: String,
    default: 'LOG IN'
  },
  buttonLink: {
    type: String,
    default: '/login'
  }
})
</script>

<style scoped>
.banner-container {
  height: 70vh !important;
}

@media (max-width: 768px) {
  .banner-container {
    height: 30vh !important;
    align-items: center !important;
  }
  
  .banner-container .texts {
    text-align: center !important;
    font-size: 16px !important;
    letter-spacing: 2px !important;
  }
  
  .banner-container > div {
    align-items: center !important;
  }
  
  .banner-container > div > div {
    justify-content: center !important;
    align-items: center !important;
    width: 100% !important;
  }
}

.texts {
  letter-spacing: 5px;
  z-index: 10;
}

/* Pour les tablettes */
@media (max-width: 1024px) {
  .texts {
    letter-spacing: 2px;
  }
}

/* Pour les mobiles */
@media (max-width: 360px) {
  .texts {
    letter-spacing: 4px;
  }
}
</style>
