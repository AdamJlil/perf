// perf/plugins/mock-api.ts
import { api } from "~/services/mock/api";

export default defineNuxtPlugin(() => {
  if (process.client) {
    const originalFetch = window.fetch;
    const authUser = useAuthUser();

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();

      // Only intercept API calls, but exclude real backend routes (auth, users, contact, admin)
      if (
        url.includes("/api/") && 
        !url.includes("/api/auth/") && 
        !url.includes("/api/users/") && 
        !url.includes("/api/contact/") &&
        !url.includes("/api/admin/") &&
        !url.includes("/api/videos")
      ) {
        try {
          // Get establishmentId or userId from reactive state first, then fallback to storage
          let userData: any = null;
          if (authUser.value) {
            userData = { user: authUser.value };
          } else {
            const userStr = localStorage.getItem("user");
            if (userStr) {
              userData = JSON.parse(userStr);
            }
          }

          const options = {
            ...init,
            establishmentId: userData?.user?.id,
            userId: userData?.user?.id,
          };

          const data = await api.request(url, options);

          // Mimic a fetch response
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
            },
          });
        } catch (error: any) {
          console.error("Mock Fetch Error:", error);
          return new Response(JSON.stringify({ error: error.message || "API Error" }), {
            status: 500,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }
      }

      return originalFetch(input, init);
    };
  }
});
