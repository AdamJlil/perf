export default defineNuxtRouteMiddleware(async (to, from) => {
  const { me, user } = useAuth();
  
  console.log("Auth Middleware: checking access for", to.path);

  // If we don't have a user in state, try to fetch from session cookie
  if (!user.value) {
    console.log("Auth Middleware: No user in state, fetching session...");
    await me();
  }

  // After attempt, if still no user, redirect to login
  if (!user.value) {
    console.warn("Auth Middleware: Access denied, redirecting to login");
    return navigateTo("/auth/login");
  }

  console.log("Auth Middleware: Access granted for", user.value.email);
});
