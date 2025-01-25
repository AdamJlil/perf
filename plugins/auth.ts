export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run me() on client-side
  if (process.client) {
    const { me } = useAuth();
    await me();
  }
});
