export default defineNuxtRouteMiddleware(async () => {
  const { user, me } = useAuth();

  if (!user.value) {
    await me();
  }

  if (user.value) {
    if (process.server) return navigateTo("/");

    return abortNavigation();
  }
});
