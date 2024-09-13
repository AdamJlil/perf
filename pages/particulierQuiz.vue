<script lang="ts" setup>
definePageMeta({
  middleware: ["user-only"],
});

import { ref, onMounted } from 'vue';
import Start from '~/components/sections/quiz/start.vue';
import Quiz from '~/components/sections/quiz/Quiz.vue';   


const STORAGE_KEY_STEP = 'quiz_current_step';
const STORAGE_KEY_RESULTS = 'quiz_results';


const currentStep = ref<number>(0);


const quizOptions = ref([
  [
    { text: 'I\'M NEW TO THIS', choosed: true },
    { text: 'I USED TO WORKOUT AND WANT TO GET BACK INTO IT', choosed: false },
    { text: 'I CURRENTLY WORK OUT', choosed: false },
    { text: 'I AM A FITNESS ENTHUSIAST', choosed: false }
  ],
  [
    { text: 'LOSE WEIGHT', choosed: true },
    { text: 'GET TONED', choosed: false },
    { text: 'INCREASE MUSCLE MASS', choosed: false },
    { text: 'IMPROVE HEALTH AND LONGEVITY', choosed: false },
    { text: 'I’M NOT SURE', choosed: false }
  ],
  [
    { text: 'MALE', choosed: true },
    { text: 'FEMALE', choosed: false },
    { text: 'PREFERE NOT TO ANSWER', choosed: false }
  ],
  [
    { text: '20 S', choosed: true },
    { text: '30 S', choosed: false },
    { text: '40 S', choosed: false },
    { text: '50 S', choosed: false },
    { text: '60 S', choosed: false },
    { text: '70 S', choosed: false }
  ],
  [
    { text: 'HEIGHT', choosed: '' },
    { text: 'WEIGHT', choosed: '' }
  ],
  [
    { text: 'I HAVE AN INJURY', choosed: true },
    { text: 'I’M PREGNANT', choosed: false },
    { text: 'I HAD A BABY IN THE PAST YEAR', choosed: false },
    { text: 'I HAVE A HEALTH CONDITION', choosed: false },
    { text: 'I HAVE A PHYSICAL DISABILITY', choosed: false }
  ]
]);

onMounted(() => {
  localStorage.clear();
  const savedStep = localStorage.getItem(STORAGE_KEY_STEP);
  const savedResults = localStorage.getItem(STORAGE_KEY_RESULTS);
  if (savedStep) currentStep.value = parseInt(savedStep);
  if (savedResults) quizOptions.value = JSON.parse(savedResults);
});

// Fonction pour sauvegarder dans le localStorage
const saveProgress = () => {
  localStorage.setItem(STORAGE_KEY_STEP, currentStep.value.toString());
  localStorage.setItem(STORAGE_KEY_RESULTS, JSON.stringify(quizOptions.value));
};

// Gestion du clic sur le bouton "START"
const handleStartClick = () => {
  currentStep.value = 1;
  saveProgress();
};

// Fonction pour gérer le clic sur "NEXT" à chaque étape du quiz
const handleNextClick = (updatedOptions, quizIndex) => {
  // Mettre à jour les résultats du quiz actuel
  quizOptions.value[quizIndex] = updatedOptions;
  
  // Passer à l'étape suivante
  currentStep.value += 1;
  
  // Sauvegarder l'étape et les résultats
  saveProgress();
  
  console.log(quizOptions.value);
  // Si c'est le dernier quiz, console.log les résultats finaux
  if (currentStep.value > quizOptions.value.length) {
    console.log('Quiz complet! Résultats finaux:', quizOptions.value);
    const router = useRouter();
    router.push('/private');
  }
};
</script>

<template>
  <!-- Afficher le composant Start à l'étape 0 -->
  <Start 
    v-if="currentStep === 0"
    text="LET'S FIND THE BEST PROGRAM FOR YOU WITH THIS 3-MINUTES QUIZ"
    videoPath="/videos/video_01.mp4"
    @start-click="handleStartClick"
  />

  <!-- Afficher Quiz 1 -->
  <Quiz
    v-if="currentStep === 1"
    :videoPath="'/videos/video_01.mp4'"
    :options="quizOptions[0]"
    @next-click="(updatedOptions) => handleNextClick(updatedOptions, 0)"
    :id="'quiz-1'"
    :is-text-input="false"
  />

  <!-- Afficher Quiz 2 -->
  <Quiz
    v-if="currentStep === 2"
    :videoPath="'/videos/video_01.mp4'"
    :options="quizOptions[1]"
    @next-click="(updatedOptions) => handleNextClick(updatedOptions, 1)"
    :id="'quiz-2'"
    :is-text-input="false"
  />

  <!-- Afficher Quiz 3 -->
  <Quiz
    v-if="currentStep === 3"
    :videoPath="'/videos/video_01.mp4'"
    :options="quizOptions[2]"
    @next-click="(updatedOptions) => handleNextClick(updatedOptions, 2)"
    :id="'quiz-3'"
    :is-text-input="false"
  />

  <!-- Afficher Quiz 4 -->
  <Quiz
    v-if="currentStep === 4"
    :videoPath="'/videos/video_01.mp4'"
    :options="quizOptions[3]"
    @next-click="(updatedOptions) => handleNextClick(updatedOptions, 3)"
    :id="'quiz-4'"
    :is-text-input="false"
  />

  <!-- Afficher Quiz 5 -->
  <Quiz
    v-if="currentStep === 5"
    :videoPath="'/videos/video_01.mp4'"
    :options="quizOptions[4]"
    @next-click="(updatedOptions) => handleNextClick(updatedOptions, 4)"
    :id="'quiz-5'"
    :is-text-input="true"
  />

  <!-- Afficher Quiz 6 -->
  <Quiz
    v-if="currentStep === 6"
    :videoPath="'/videos/video_01.mp4'"
    :options="quizOptions[5]"
    @next-click="(updatedOptions) => handleNextClick(updatedOptions, 5)"
    :id="'quiz-6'"
    :is-text-input="false"
  />
</template>
