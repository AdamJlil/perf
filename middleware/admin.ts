export default defineNuxtRouteMiddleware(async (to, from) => {
  const { me, user } = useAuth();
  
  if (!user.value) {
    await me();
  }

  if (!user.value || !user.value.isAdmin) {
    return navigateTo("/");
  }
});
