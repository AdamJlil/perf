<template>
    <div
      class="w-full h-[100vh] bg-blue text-white flex flex-col justify-center items-center gap-[60px] relative p-[50px]"
      style="font-family: Montserrat; background-image: url('/images/image_05.jpg'); background-repeat: no-repeat; background-size: cover;"
    >
      <!-- Overlay Layer -->
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-1"></div>
  
      <div class="flex w-full justify-center items-center gap-[20px] z-2 h-full flex-wrap lg:flex-nowrap">
        <div class="w-full lg:w-[55%] lg:h-full max-lg:h-[50%] min-w-[250px] flex max-lg:justify-center">
          <nuxt-img
            src="/images/right_03_05.jpg"
            alt="Image"
            class="max-lg:h-full lg:h-[90%] lg:w-[90%] object-cover rounded-[40px] max-lg:mx-auto"
          />
        </div>
        <div class="w-full lg:w-[45%] flex max-lg:flex-col-reverse gap-[40px] justify-center items-center flex-wrap lg:flex-nowrap">
            <div class="flex lg:flex-col gap-[20px] justify-center items-center w-full lg:w-auto">
                <nuxt-img src="/images/right_01_05.jpg" alt="Image" class="min-w-[200px] w-full max-w-[300px] h-auto object-cover rounded-[10px]"  />
                <nuxt-img src="/images/right_02_05.jpg" alt="Image" class="min-w-[200px] w-full max-w-[300px] h-auto object-cover rounded-[10px]" />
                <nuxt-img src="/images/left_image_05.jpg" alt="Image" class="min-w-[200px] w-full max-w-[300px] h-auto object-cover rounded-[10px]" />
            </div>
            <div class="flex flex-col gap-[40px] justify-center items-center w-full lg:w-auto">
                <p class="z-2 max-w-[700px] text-center px-4 text-sm" style="letter-spacing: 4px;">
                    100% HANDCRAFTED LEATHER DUMBBELL TO ELEVATE YOUR FITNESS ROUTINE WITH STYLE AND SOPHISTICATION
                </p>
                <div class="max-lg:hidden text-white flex justify-center items-center border-[1px] border-white py-[10px] px-[20px] text-center z-2 w-[150px]" style="font-weight: 300;">
                    MORE
                </div>
            </div>
        </div>
        <div class="lg:hidden text-white flex justify-center items-center border-[1px] border-white py-[10px] px-[20px] text-center z-2 w-[250px] mt-[15px]" style="font-weight: 300;">
            MORE
        </div>
      </div>
    </div>
  </template>
  