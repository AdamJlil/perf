import { computed } from 'vue';

export const useAdmin = () => {
  const { user } = useAuth();

  return computed(() => {
    if (!user.value) return false;
    
    // Check if roles exists before trying to use includes
    return user.value.roles ? user.value.roles.includes("founder") : false;
  });
};
