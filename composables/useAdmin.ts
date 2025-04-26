export const useAdmin = () => {
  const authUser = useAuthUser();

  return computed(() => {
    if (!authUser.value) return false;
    
    // Check if roles exists before trying to use includes
    return authUser.value.roles ? authUser.value.roles.includes("ADMIN") : false;
  });
};
