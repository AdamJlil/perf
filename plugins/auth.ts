export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run me() on client-side to restore session
  if (process.client) {
    const { me } = useAuth();
    await me();
  }
});
