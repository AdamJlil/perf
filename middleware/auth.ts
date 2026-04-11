export default defineNuxtRouteMiddleware(async (to, from) => {
  const { me, user } = useAuth();
  
  console.log("Auth Middleware: checking access for", to.path);

  // If we don't have a user in state, try to fetch from session cookie
  if (!user.value) {
    console.log("Auth Middleware: No user in state, fetching session...");
    try {
      await me();
    } catch (e) {
      console.error("Auth Middleware: Error fetching user session", e);
    }
  }

  // After attempt, if still no user, redirect to login
  if (!user.value) {
    console.warn("Auth Middleware: Access denied, redirecting to login");
    return navigateTo("/auth/login");
  }

  // LOCKDOWN MODE: If we are coming from /establishment/program, 
  // prevent navigating to other sensitive establishment pages
  if (from.path === "/establishment/program" && to.path !== "/establishment/program") {
    // Only allow navigating to /auth/login (logout) or the same page
    if (to.path.startsWith("/establishment/") || to.path === "/myPlan") {
      console.warn("Auth Middleware: Guest Lockdown active. Navigation blocked.");
      return navigateTo(from.fullPath);
    }
  }

  console.log("Auth Middleware: Access granted for", user.value.email);
});
