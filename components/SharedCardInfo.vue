<template>
  <div :id="containerId" class="p-10">
    <div :id="titleId" class="flex flex-col justify-items-start items-center p-4 sm:flex sm:flex-row sm:justify-items-start sm:items-center sm:p-4 ">
      <h1 class="uppercase text-xs lg:text-2xl font-bold tracking-0.2 text-gray-800 sm:text-base md:text-xl">{{ mainTitle }}</h1>
      <div class="lg:px-1 md:px-0.5 sm:px-0.2 px-0.2"></div>
      <p class="sm:text-base md:text-xl lg:text-2xl text-gray-600 text-sm ">{{ mainSubtitle }}</p>
    </div>

    <!-- Content Text -->
    <div :id="contentId" class="w-full">
      <div class="w-full rounded-10 border-1 border-gray-800 flex h-auto flex flex-col justify-around sm:flex-row sm:justify-normal sm:h-[30vh] md:h-[35vh] lg:h-[45vh] gap-5 sm:p-10 sm:pr-0 p-5 ">
        <div id="content-text" class="w-full sm:w-2/5 flex flex-col justify-center">
          <transition name="fade" mode="out-in" appear>
            <p class="uppercase text-red-700 text-center sm:text-start" :key="displayedItem.id + '-price'">
              {{ displayedItem.price }}
            </p>
          </transition>

          <transition name="fade" mode="out-in" appear>
            <h1 class="font-bold  sm:text-sm md:text-lg lg:text-lg text-sm text-center sm:text-start" :key="displayedItem.id + '-title'">
              {{ displayedItem.title }}
            </h1>
          </transition>
          <p class="mt-8 text-xs md:text-base text-center sm:text-start" v-html="displayedItem.description"></p>
        </div>
        <div class="w-full sm:w-3/5 gap-5 flex justify-center flex-wrap">
          <div
            v-for="col in collection"
            :key="col.id"
            class="aspect-square w-[20%] max-w-60 self-center rounded-full overflow-hidden shadow-2xl transition duration-800 ease-in-out relative p-2"
            :class="{
              'w-[20%] sm:w-[40%] ': (col.isActive && !hoveredItemId) || hoveredItemId === col.id,
              'hover:scale-100': true,
              'shadow-xl': col.isActive && !hoveredItemId,
            }"
            :style="{
              backgroundImage: `url(${col.image})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
            }"
            @click="setActive(col.id)"
            @mouseover="handleHover(col.id)"
            @mouseleave="handleHover(null)"
          >
            <!-- OVERLAY HOVER DOT -->
            <transition name="fade" mode="out-in" appear>
              <div v-if="hoveredItemId === col.id" class="absolute inset-0 flex justify-center">
                <span class="w-1 h-1 bg-gray-500 absolute -bottom-3 sm:-bottom-5 rounded opacity-100 transition"></span>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

interface CollectionItem {
  id: number;
  price: string;
  title: string;
  description: string;
  image: string;
  isActive: boolean;
}

export default defineComponent({
  name: "BreakfastVariations",
  props: {
    collection: {
      type: Array as () => CollectionItem[],
      required: true,
    },
    mainTitle: {
      type: String,
      default: "breakfast variations",
    },
    mainSubtitle: {
      type: String,
      default: "( choose 1 variation / day )",
    },
    containerId: {
      type: String,
      default: "container",
    },
    titleId: {
      type: String,
      default: "title",
    },
    contentId: {
      type: String,
      default: "content",
    },
  },
  setup(props, { emit }) {
    const hoveredItemId = ref<number | null>(null);

    const activeItem = computed(() => {
      return props.collection.find((item) => item.isActive) || props.collection[0];
    });

    const displayedItem = computed(() => {
      if (hoveredItemId.value) {
        return props.collection.find((item) => item.id === hoveredItemId.value) || activeItem.value;
      }
      return activeItem.value;
    });

    const setActive = (itemId: number) => {
      // Emit an event to update the active item in the parent
      emit("update:activeItem", itemId);
    };

    const handleHover = (itemId: number | null) => {
      hoveredItemId.value = itemId;
    };

    return {
      hoveredItemId,
      displayedItem,
      setActive,
      handleHover,
    };
  },
});
</script>

<style scoped>
/* Fade Transition Classes Using Tailwind CSS */
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-200 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-50;
}

.fade-enter-to,
.fade-leave-from {
  @apply opacity-100;
}

/* Ensure Hover Overlay Transitions */
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  @apply transition-opacity duration-500 ease-in-out;
}

.fade-overlay-enter-from,
.fade-overlay-leave-to {
  @apply opacity-0;
}

.fade-overlay-enter-to,
.fade-overlay-leave-from {
  @apply opacity-100;
}

/* Optional: Enhance the Span Appearance */
.absolute {
  position: absolute;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.flex {
  display: flex;
}
.justify-center {
  justify-content: center;
}
.w-1 {
  width: 0.25rem; /* 1 * 0.25rem = 0.25rem */
}
.h-1 {
  height: 0.25rem;
}
.bg-gray-500 {
  background-color: #6b7280; /* Tailwind's gray-500 color */
}
.rounded {
  border-radius: 0.25rem;
}
.opacity-100 {
  opacity: 1;
}
.transition {
  transition: all 0.4s ease;
}
</style>
