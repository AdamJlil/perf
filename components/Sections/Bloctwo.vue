<template>
    <div class="w-full h-[100vh] bg-blue text-white flex flex-col justify-center items-center gap-[60px] relative" style="font-family: Montserrat;">
        <video autoplay muted loop class="absolute top-0 left-0 w-full h-full object-cover z-1">
            <source src="/public/videos/video_02.mp4" type="video/mp4" />
        </video>

         <!-- Overlay Layer -->
         <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>

         <div class="flex justify-center items-center gap-[60px] z-2">
             <p class="z-2 max-w-[700px] text-center" style="letter-spacing: 7px;font-size: 17px">“I KNOW YOUR WORKDAY'S BEEN CRAZY,SO I SHORTENED YOUR WORKOUT. CONSISTENCY IS OUR MOTTO! LET'S KEEP THAT STREAK GOING.”</p>
             <div
                class="w-[200px] h-[200px] rounded-full"
                style="background-image: url('/images/soufiane.png'); background-repeat: no-repeat; background-size: cover;background-size: 136%; background-position-x: -42px;"
                >
            </div>
         </div>

        <p class="z-2 max-w-[700px] text-center" style="letter-spacing: 3px;font-size: 15px">HEAD COACH SOUFIANE</p>
        
        <div class="text-white border-[1px] border-white py-[10px] px-[90px] text-center z-2" style="font-weight: 300;">MORE</div>
    </div>
</template>