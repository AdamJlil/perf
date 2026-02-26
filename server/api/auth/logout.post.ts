export default defineEventHandler(async (event) => {
  deleteCookie(event, process.env.NUXT_COOKIE_NAME || "__session");
  return {
    message: "Logged out successfully",
  };
});
