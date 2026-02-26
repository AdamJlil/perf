<script lang="ts" setup>
import type { UserWithoutPassword } from "~/types/index";

defineProps<{ user: UserWithoutPassword | null }>();
</script>

<template>
  <p class="block mb-3 text-lg">
    Person Connected Infos : 
    <br> role : {{ user?.roles.join(", ") }}
    <br> email  {{ user?.email }}, 
    <br> ID :  {{ user?.id }}, 
  </p>
</template>
