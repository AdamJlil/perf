<template>
  <div class="flip-container relative w-[25%] max-sm:w-[150px] max-md:w-[300px] min-w-[220px] max-w-[350px] aspect-[7/8] max-h-[400px]">
    <div class="flipper">
      <!-- Front Side -->
      <div class="front absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl"
           :style="frontStyle">
        <!-- Bottom Text -->
        <div class="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 lg:text-xl max-md:text-[18px] sm:text-[16px] text-black w-full"
             style="font-weight: 600; letter-spacing: 0px;">
          {{ outsideTitle }}
        </div>
      </div>
      <!-- Back Side -->
      <div class="back absolute inset-0 border border-[#00000094] rounded-[80px] max-lg:rounded-[50px] shadow-2xl bg-[#EFEFEC] flex justify-center items-center">
        <div class="text-black text-[15px] lg:text-[20px] bg-[#dedcd4] h-full rounded-[80px] max-lg:rounded-[50px] flex justify-center items-center p-[10px]"
             style="font-weight: 400; letter-spacing: 0px;">
          {{ backText }}
        </div>
      </div>
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

<style scoped>C
.flip-container {
  perspective: 1000px;
}

.flip-container:hover .flipper {
  transform: rotateY(180deg);
}

.flipper {
  transition: 0.6s;
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden; /* Safari */
}

.back {
  transform: rotateY(180deg);
}
</style>
