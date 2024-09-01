<script lang="ts" setup>
const currentUser = useAuthUser();
const isAdmin = useAdmin();
const { logout } = useAuth();

const form = reactive({
  pending: false,
});

async function onLogoutClick() {
  try {
    form.pending = true;

    await logout();

    await navigateTo("/");
  } catch (error) {
    console.error(error);
  } finally {
    form.pending = false;
  }
}
</script>

<template>
  <header class="color-white absolute top-0 left-0 right-0 z-10 mt-[30px]"" style="font-family: Montserrat;">
    <div class="p-3 w-full flex items-center justify-center">
      <nav class="flex gap-3 relative">
        <!-- <NuxtLink to="/" class="flex flex-col text-center justify-center">
          <NuxtImg src="/logo3.svg" alt="logo" width="100" height="100" style="position: absolute;;transform: rotate(-90deg)" />
        </NuxtLink> -->
        <div class="ml-auto flex items-center gap-3">
          <template v-if="currentUser">
            <NuxtLink to="/private" class="px-3 font-semibold">Private</NuxtLink>
            <NuxtLink v-if="isAdmin" to="/admin" class="px-3 font-semibold">Admin</NuxtLink>
            <button
              class="py-1.5 px-3 rounded bg-light-100 font-semibold text-sm text-slate-950 hover:bg-light-700 transition-colors"
              :disabled="form.pending"
              @click="onLogoutClick"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/" class="px-3 font-bold">HOME</NuxtLink>
            <NuxtLink to="/" class="px-3">WORKOUT PROGRAMS</NuxtLink>
            <NuxtLink to="/" class="px-3">NUTRITION PLANS</NuxtLink>
            <NuxtLink to="/" class="px-3">OUR PRODUCTS</NuxtLink>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>
