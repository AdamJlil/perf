<template>
  <div class="overflow-x-hidden overflow-y-hidden  relative w-full h-[90vh] max-md:h-[50vh] bg-blue text-white flex flex-col justify-center md:items-start max-md:items-center gap-8 md:p-[90px] max-md:p-[20px]" style="font-family: Montserrat;">
    
    <!-- Image as background -->
    <img 
      :src="backgroundImage" 
      :alt="imageAlt" 
      class="absolute top-0 left-0 w-full h-full object-cover z-[1]" 
    />

    <!-- Overlay Layer -->
    <!-- <div class="absolute top-0 left-0 w-full h-full bg-black opacity-10 z-1"></div> -->

    <!-- Content -->
    <div class="flex flex-col justify-center max-md:items-center items-start gap-[20px] lg:gap-[100px] md:gap-[50px] ">
        <p class="texts text-white z-9 text-left text-base sm:text-2xl md:text-3xl lg:text-4xl text-center font-medium tracking-tight" style="font-weight: 200;" >
          {{ mainText }}
        </p>
    
        <div class="flex flex-col md:flex-row gap-4 md:gap-8 justify-start items-start z-9">
          <nuxt-link :to="buttonLink" class="texts text-white tracking-normal border border-[#ffffff38] py-2 px-6 md:px-10 text-center  max-md:text-[10px] w-[112px] md:w-[200px] lg:w-[250px] z-9 text-nowrap" style="font-weight: 300;">
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
.bg-img {
  object-position: center;
}

.texts{
  letter-spacing: 5px;
}

/* Pour les tablettes */
@media (max-width: 1024px) {
  .texts{
    letter-spacing: 2px;
  }
}

/* Pour les mobiles */
@media (max-width: 768px) {
  .bg-img {
    scale: 1.3;
    transform: translateX(20px);
    transform: translateY(-68px);
  }
}

/* Pour les mobiles */
@media (max-width: 360px) {
  .texts{
    letter-spacing: 4px;
  }

  .bg-img {
    scale: 1.5;
    transform: translateX(33px);
    transform: translateY(-90px);
  }
}
</style>
