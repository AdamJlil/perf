// perf/plugins/mock-api.ts
import { api } from "~/services/mock/api";

export default defineNuxtPlugin(() => {
  if (process.client) {
    const originalFetch = window.fetch;
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();

      // Only intercept API calls
      if (url.includes("/api/")) {
        try {
          // Get establishmentId or userId from storage if needed for the mock
          const userStr = localStorage.getItem("user");
          let userData: any = null;
          if (userStr) {
            userData = JSON.parse(userStr);
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
