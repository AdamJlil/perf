<script lang="ts" setup>
import Bloc3Establishment from '~/components/Sections/Establishement/BlocThree.vue';
</script>

<template>


<div class="relative flex justify-center items-start mt-[20px]" style="z-index:2;">
        <div class="relative w-full mx-[15px] mt-8 rounded-[40px] overflow-hidden shadow-lg" style="height:600px;">
          <img 
            src="/images/123.png" 
            alt="Background Image" 
            class="absolute inset-0 w-full h-full object-cover z-0 scale-[1.2]" 
          />
          <div class="absolute top-0 left-0 w-full h-full bg-[#8C740712] z-10"></div>
        </div>
      </div>

<div class="w-full h-[40vh] relative" >
  
  <div class="w-full md:h-[30vh] bg-[#EFEFEC] flex justify-center absolute bottom-0 left-0 right-0">

    <div class="w-full md:w-[90vw] lg:w-[80vw] h-full flex flex-col md:flex-row justify-between items-center p-4 md:p-0">

      <div class="w-full md:w-40 flex justify-between flex-col mb-6 md:mb-0">
        <div>
          <h1 class="w-full text-2xl md:text-3xl font-bold text-gray-600 uppercase text-center leading-none">Get in touch with us</h1>
        </div>
        <div>
          <div class="flex justify-center items-center gap-6 pt-5">
            <a href="#" aria-label="Facebook">
              <img
                src="/facebook-svgrepo-com.svg"
                alt="Facebook"
                class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200 invert dark:invert-0"
              />
            </a>
            <a href="#" aria-label="Twitter">
              <img
                src="/x-social-media-round-icon.svg"
                alt="Twitter"
                class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200"
              />
            </a>  
            <a href="#" aria-label="Instagram">
              <img
                src="/instagram-round-svgrepo-com.svg"
                alt="Instagram"
                class="object-cover w-6 lg:w-8 hover:scale-110 transition-all duration-200 invert dark:invert-0"
              />
            </a>
          </div>
        </div>
      </div>


      <div class="w-full md:w-100 h-full flex flex-col p-3 mb-6 md:mb-0">
        <div id="title">
          <p class="text-xl md:text-2xl font-bold text-gray-800 text-left">Our Mission</p>
        </div>

        <div id="title">
          <p class="font-normal text-gray-800 text-left">At PERF, we're dedicated to making fitness accessible to everyone. Our innovative solutions help individuals and establishments embrace healthier lifestyles while contributing to a more sustainable planet.</p>
        </div>
      </div>

      <div class="w-full md:w-100 h-full flex flex-col bg-gray-200 p-3">
        <div id="title">
          <p class="text-xl md:text-2xl font-bold text-gray-600 text-left">Upcoming events</p>
        </div>
        <div id="title">
          <p class="text-base md:text-xl font-normal text-gray-800 text-left">Join us for our monthly fitness workshops and eco-friendly product launches. Check back regularly for updates on our exciting events.</p>
        </div>
      </div>


    </div>

  </div>
</div>


<div class="w-full py-10 md:py-20 px-5 md:px-20 text-gray-800 font-medium" style="font-family: 'Montserrat'">
  
  <div class="w-full flex flex-col md:flex-row gap-10 md:gap-20">
    <div class="w-full md:w-4/7">
      <p class="text-left text-base md:text-[1.2rem]">
        <span class="uppercase text-[80px] md:text-[165px] font-bold text-gray-800 leading-none float-left mr-5 align-top">WE</span>
        <br>
         envision a world where health and
          fitness are accessible to everyone,
          everywhere. We believe that fitness
          shouldn't be confined to a specific
          space or time—it should seamlessly </p>
        
     
          <p class="text-left text-base md:text-[1.2rem] text-gray-800 mt-4">integrate into your lifestyle, whether you're at home, outdoors,
            or on the move.</p>
    </div>


    <div class="w-full md:w-3/7 mt-8 md:mt-5">
      <p class="text-left text-base md:text-[1.2rem] text-gray-800">
        At PERF, we Our mission is to empower
      individuals and establishments to embrace
      a healthier way of living while contributing
      to a more sustainable planet.
      </p>
    </div>

  </div>

</div>

<div class="w-full pb-10 md:pb-16 lg:pb-20">
      <div class="w-full p-4 sm:p-6 md:p-10 flex justify-center items-center flex-col gap-4 sm:gap-6 md:gap-10" style="font-family: Montserrat;">
      <h1 class="font-bold text-center text-2xl sm:text-3xl md:text-4xl text-gray-700 uppercase pb-6 sm:pb-10 md:pb-16 lg:pb-20">STUFF WE ARE GOOD AT</h1>
      <div class="w-32 sm:w-40 md:w-60 lg:w-80 h-1 sm:h-2 md:h-3 lg:h-4 bg-gray-400"></div>

      <div class="flex justify-center items-center flex-col p-3 sm:p-4 md:p-5 w-full max-w-4xl mx-auto">
        <div class="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-5 md:gap-8 lg:gap-10 mb-6 sm:mb-8 w-full">
          <div class="hidden md:block"><img class="w-6 sm:w-7 md:w-8 lg:w-10" src="/images/angle-right-svgrepo-com.png" alt=""></div>
          <p class="text-gray-800 text-base sm:text-lg md:text-xl w-full md:w-60 lg:w-72 text-center md:text-left">Eco-friendly Fitness Solutions</p>
          <p class="text-gray-800 text-base sm:text-lg md:text-xl w-full md:w-60 lg:w-72 text-center md:text-right">Training and nutrition Support</p>
          <div class="hidden md:block"><img class="w-6 sm:w-7 md:w-8 lg:w-10" src="/images/angle-left-svgrepo-com.png" alt=""></div>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-5 md:gap-8 lg:gap-10 mb-6 sm:mb-8 w-full">
          <div class="hidden md:block"><img class="w-6 sm:w-7 md:w-8 lg:w-10" src="/images/angle-right-svgrepo-com.png" alt=""></div>
          <p class="text-gray-800 text-base sm:text-lg md:text-xl w-full md:w-60 lg:w-72 text-center md:text-left">Space Optimization</p>
          <p class="text-gray-800 text-base sm:text-lg md:text-xl w-full md:w-60 lg:w-72 text-center md:text-right">Digital Platforms</p>
          <div class="hidden md:block"><img class="w-6 sm:w-7 md:w-8 lg:w-10" src="/images/angle-left-svgrepo-com.png" alt=""></div>
        </div>

        <div class="flex flex-col md:flex-row justify-center items-center gap-4 sm:gap-5 md:gap-8 lg:gap-10 w-full">
          <div class="hidden md:block"><img class="w-6 sm:w-7 md:w-8 lg:w-10" src="/images/angle-right-svgrepo-com.png" alt=""></div>
          <p class="text-gray-800 text-base sm:text-lg md:text-xl w-full md:w-60 lg:w-72 text-center md:text-left">Customer Experience</p>
          <p class="text-gray-800 text-base sm:text-lg md:text-xl w-full md:w-60 lg:w-72 text-center md:text-right">Sustainable Practices</p>
          <div class="hidden md:block"><img class="w-6 sm:w-7 md:w-8 lg:w-10" src="/images/angle-left-svgrepo-com.png" alt=""></div>
        </div>
        
      </div>

      <div class="w-32 sm:w-40 md:w-60 lg:w-80 h-1 sm:h-2 md:h-3 lg:h-4 bg-gray-400 mt-4 sm:mt-5 md:mt-6 lg:mt-8"></div>

     
    </div>
    </div>


    <div class="w-full">
       <!-- Why PERF -->
       <div class="bg-[#EFEFEC] py-[40px] lg:py-[100px] px-4">
      <!-- DESKTOP: 10% OVERLAP VENN LAYOUT -->
      <div class="hidden lg:flex justify-center relative h-[320px] w-full">
        <div class="relative w-[896px] h-80">
          <!-- Left Circle -->
          <div class="absolute top-0 left-0 w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-neutral-900">
            UNDERSTAN
          </div>
          <!-- Middle Circle -->
          <div class="absolute top-0 left-[288px] w-80 h-80 bg-[#e66939cc] rounded-full z-20 flex items-center justify-center font-bold text-lg text-neutral-900">
            CREATE
          </div>
          <!-- Right Circle -->
          <div class="absolute top-0 left-[576px] w-80 h-80 bg-[#e66939cc] rounded-full z-10 flex items-center justify-center font-bold text-lg text-neutral-900">
            ELEVATE
          </div>
        </div>
      </div>

      <!-- MOBILE/TABLET: VERTICAL LAYOUT -->
      <div class="flex flex-col gap-10 lg:hidden mt-10 text-neutral-900 text-sm items-center text-center">
        <!-- DISCOVER -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-80 h-80 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-lg">
            UNDERSTAND
          </div>
          <p class="max-w-xs">
            We start by understanding your space, your guests, and your vision — to craft a fitness experience that truly fits your establishment.
          </p>
        </div>
        <!-- DESIGN -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-80 h-80 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-lg">
            CREATE
          </div>
          <p class="max-w-xs">
            We design elegant, space-saving equipment and digital training videos that blends seamlessly into your rooms — adding value without requiring renovation.          
          </p>
          </div>
        <!-- DELIVER -->
        <div class="flex flex-col items-center gap-4">
          <div class="w-80 h-80 bg-[#e66939cc] rounded-full flex items-center justify-center font-bold text-lg">
            ELEVATE
          </div>
          <p class="max-w-xs">
            From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the difference — and your reviews reflect it.         
          </p>
          </div>
      </div>

      <!-- DESKTOP TEXT BELOW CIRCLES -->
      <div class="w-[896px] mx-auto hidden lg:flex flex-row justify-between mt-[-30px] text-sm md:mt-[50px] text-neutral-900">
        <div class="w-[260px] flex flex-col">
          <p>
            We start by understanding your space, your guests, and your vision — to craft a fitness experience that truly fits your establishment.
          </p>
        </div>
        <div class="w-[260px] flex flex-col">
          <p>
            We design elegant, space-saving equipment and digital training videos that blends seamlessly into your rooms — adding value without requiring renovation.
          </p>
        </div>
        <div class="w-[260px] flex flex-col">
          <p>
            From setup to staff training, we handle it all. You offer a new wellness experience, your guests feel the difference — and your reviews reflect it.          
          </p>
        </div>
      </div>
    </div>
    </div>

     <div class="w-full">

     <Bloc3Establishment 
      image1="/images/about-us-img1.png" 
      link="" 
      TitleText="WHY WE ARE DIFFERENT ?"
      DescText="Guided by Our philosophy, we aim to
break down the barriers to fitness. We
believe that everyone deserves access to
tools and resources that promote well-
being, regardless of their background or
environment. Our mission is to make
health an achievable goal for all."
      EndText=""
      :TitleStyle="{ color: '#545454', fontWeight: 700, padding: '20px 0px 0px 20px', '@media (min-width: 768px)': { padding: '50px 0px 0px 50px' } }"
      :DescStyle="{ color: '#545454', fontWeight: 500, padding: '20px 0px 0px 20px', '@media (min-width: 768px)': { padding: '50px 0px 0px 50px' } }"
      buttonText="MORE" 
      image2="" 
      headingText="INDOORS & OUTDOORS"
      :image1Style="{ filter: 'contrast(120%) brightness(90%)' }"
      :buttonStyle="{  fontWeight: '600', border: '2px solid', shadow: '2px 2px 8px rgba(0, 0, 0, 1)', display: 'none'}"
      :headingStyle="{ textShadow: '1px 1px 5px black', display: 'none' }"
    />
</div>

    <!-- <div class="w-full py-6 md:py-8 bg-[#EFEFEC] flex flex-wrap items-center justify-center gap-6 md:gap-[80px] mt-[10px] sm:mt-[20px]">
      <NuxtImg src="/images/forsea.png" alt="Background Image" class="w-[100px] md:w-[150px] h-auto object-contain" />
      <NuxtImg src="/images/sofitel.png" alt="Background Image" class="w-[100px] md:w-[150px] h-auto object-contain" />
      <NuxtImg src="/images/riuu.png" alt="Background Image" class="w-[100px] md:w-[150px] h-auto object-contain" />
    </div> -->


<div class="w-full pt-15 md:pt-30 pb-10 md:pb-20" style="font-family: 'Montserrat'">
  <div id="title">
    <p class="text-3xl md:text-5xl font-bold text-gray-800 text-center uppercase">Who we are !</p>
  </div>
  <div class="flex justify-center items-center pt-10 md:pt-20">
    <div class="flex flex-col gap-8 w-full max-w-5xl mx-auto">
      <!-- First row: 3 members -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[20px] w-full">
        <div class="flex flex-col items-center justify-center flex-1">
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-full" style="background-image: url('./images/mjdAbout.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
          <p class="text-gray-900 font-semibold text-lg md:text-xl text-center p-4 whitespace-nowrap mx-auto">AMJAD ARKHIS</p>
          <p class="text-gray-500 uppercase text-base md:text-lg text-center whitespace-nowrap mx-auto">Co-founder</p>
        </div>
        <div class="flex flex-col items-center justify-center flex-1">
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-full" style="background-image: url('./images/saad.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
          <p class="text-gray-900 font-semibold text-lg md:text-xl text-center p-4 whitespace-nowrap mx-auto">SAAD TANTAOUI</p>
          <p class="text-gray-500 uppercase text-base md:text-lg text-center whitespace-nowrap mx-auto">Co-founder</p>
        </div>
        <div class="flex flex-col items-center justify-center flex-1">
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-full" style="background-image: url('./images/mehdiAbout.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
          <p class="text-gray-900 font-semibold text-lg md:text-xl text-center p-4 whitespace-nowrap mx-auto">MEHDI ARKHIS</p>
          <p class="text-gray-500 uppercase text-base md:text-lg text-center whitespace-nowrap mx-auto">Front-end Developer</p>
        </div>
      </div>
      <!-- Second row: 2 members, centered under the 3 above -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[20px] w-full md:w-2/3 mx-auto justify-center">
        <div class="flex flex-col items-center justify-center flex-1">
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-full" style="background-image: url('./images/adamAbout.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
          <p class="text-gray-900 font-semibold text-lg md:text-xl text-center p-4 whitespace-nowrap mx-auto">ADAM JLIL</p>
          <p class="text-gray-500 uppercase text-base md:text-lg text-center whitespace-nowrap mx-auto">Back-end Developer</p>
        </div>
        <div class="flex flex-col items-center justify-center flex-1">
          <div class="w-32 h-32 md:w-44 md:h-44 rounded-full" style="background-image: url('./images/anasAbout.png'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
          <p class="text-gray-900 font-semibold text-lg md:text-xl text-center p-4 whitespace-nowrap mx-auto">ANAS ORKHIS</p>
          <p class="text-gray-500 uppercase text-base md:text-lg text-center whitespace-nowrap mx-auto">Back-end Developer</p>
        </div>
      </div>
    </div>
    </div>
  </div>

<div class="w-full py-10 md:py-20 bg-[#EFEFEC">
  <div class="container mx-auto px-4">
    <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">OUR VALUES</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-bold text-gray-700 mb-3">Innovation</h3>
        <p class="text-gray-600">We constantly seek new ways to make fitness more accessible, effective, and environmentally friendly.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-bold text-gray-700 mb-3">Sustainability</h3>
        <p class="text-gray-600">Every product and service we offer is designed with environmental impact in mind.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-bold text-gray-700 mb-3">Inclusivity</h3>
        <p class="text-gray-600">We believe fitness should be accessible to everyone, regardless of background or circumstances.</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <h3 class="text-xl font-bold text-gray-700 mb-3">Excellence</h3>
        <p class="text-gray-600">We strive for the highest quality in everything we do, from customer service to product design.</p>
      </div>
    </div>
  </div>
</div>

</template>
