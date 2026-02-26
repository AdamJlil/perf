<script lang="ts" setup>
const users = ref([
  { id: "1", email: "admin@perf.com", roles: ["founder"] },
  { id: "2", email: "establishment@luxury-hotel.com", roles: ["establishment"] },
]);

const currentUser = ref({
  email: "admin@perf.com",
  roles: ["founder"]
});
</script>

<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-32 pb-20 px-4" style="font-family: Montserrat">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-2xl font-normal text-center mb-16 uppercase tracking-[6px] text-gray-800">
        System Users
      </h1>

      <div class="bg-white/40 backdrop-blur-md p-10 rounded-[30px] shadow-sm border border-white/20">
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="py-4 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase text-gray-400">ID</th>
                <th class="py-4 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase text-gray-400">Email</th>
                <th class="py-4 px-6 text-left text-[10px] font-bold tracking-[2px] uppercase text-gray-400">Roles</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="user in users" :key="user.id" class="hover:bg-white/40 transition-colors">
                <td class="py-4 px-6 text-sm text-gray-500">#{{ user.id }}</td>
                <td class="py-4 px-6 text-sm font-bold text-gray-800">{{ user.email }}</td>
                <td class="py-4 px-6">
                  <span v-for="role in user.roles" :key="role" class="px-2 py-1 bg-gray-100 text-gray-600 text-[9px] font-bold tracking-[1px] uppercase rounded-md border border-gray-200 mr-2">
                    {{ role }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
