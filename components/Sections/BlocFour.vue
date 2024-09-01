<template>
    <div class="w-full h-[100vh] bg-blue text-white flex flex-col justify-center items-center gap-[120px] relative" style="font-family: Montserrat;">
        <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
            <source src="/public/videos/video_04.mp4" type="video/mp4" />
        </video>
        
        <!-- Overlay Layer -->
        <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

        
        <!-- Content Elements -->
        <p class="text-white z-20" style="font-weight: 300;letter-spacing: 8px;font-size: 35px; margin-top:200px">YOUR JOURNEY STARTS, <span class="font-bold">NOW</span></p>
        <div class="flex gap-[120px] w-full justify-center items-center z-20">
            <nuxt-link to="/" class="text-white border-[1px] border-white py-[10px] px-[90px] text-center" style="font-weight: 300;">JOIN</nuxt-link>
            <nuxt-link to="/"  class="text-white border-[1px] border-white py-[10px] px-[90px] text-center" style="font-weight: 300;">JOIN</nuxt-link>
        </div>

        <div class="absolute top-[100px] left-[50px] text-center gap-[120px] w-[50%] justify-center items-center z-20">
            <p class="text-white" style="font-weight: 300;letter-spacing: 5px;font-size: 17px">WE MONITOR YOUR CALORIE BURN, WORKOUT INTENSITY, AND NUTRITION INTAKE TO STAY ON TARGET.</p>
        </div>
    </div>
</template>