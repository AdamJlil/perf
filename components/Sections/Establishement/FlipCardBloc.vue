<template>
  <div class="flip-container relative w-[20%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px]">
        <div class="flipper">

          <!-- Front Side -->
          <div class="front absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl":style="frontStyle">
               
            <div v-if="title" class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 lg:text-xl max-md:text-[18px] sm:text-[16px] text-black w-full"
                 style="font-weight: 600; letter-spacing: 0px;">
                 {{ title }}
            </div>
          </div>
          <!-- Back Side -->
          <div class="back absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
            <div class="text-black text-[15px] lg:text-[20px] bg-[#dedcd4] w-full h-full rounded-[80px] max-lg:rounded-[50px] flex justify-center items-center p-[10px]"
                 style="font-weight: 400; letter-spacing: 0px;">
                 {{ backText }}
            </div>
          </div>
        </div>
        <div v-if="outsideTitle" class="w-full my-8 lg:text-xl max-md:text-[18px] sm:text-[16px] text-black uppercase  tracking-2 font-medium" >
                 {{ outsideTitle }}
          </div>
      </div>
      
</template>

<script>
export default {
  name: "FlipCard",
  props: {
    frontImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    outsideTitle: {
      type: String,
      required: true,
    },
    backText: {
      type: String,
      required: true,
    },
  },
  computed: {
    frontStyle() {
      return {
        backgroundImage: `url(${this.frontImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
  },
};
</script>

<style scoped>
.flip-container {
  perspective: 1000px;
}

.flipper {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-container:hover .flipper {
  transform: rotateY(180deg);
}

.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.back {
  transform: rotateY(180deg);
}
</style>
