<template>
  <div class="w-full min-h-screen bg-[#EFEFEC] pt-32 pb-20 px-4 md:px-10" style="font-family: Montserrat">
    <div class="max-w-[1400px] mx-auto">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1
            class="text-2xl md:text-4xl font-light uppercase tracking-[6px] md:tracking-[10px] text-gray-800 mb-2 leading-tight"
          >
            Master Console
          </h1>
          <p class="text-[10px] font-bold text-[#D05E33] uppercase tracking-[4px]">
            Full Read/Write Database Authority
          </p>
        </div>
        <div class="flex items-center gap-4">
          <button
            class="flex items-center gap-2 px-6 py-3 bg-white/60 hover:bg-white transition-all rounded-full border border-white/40 shadow-sm text-[10px] font-black uppercase tracking-[2px]"
            @click="fetchAdminData"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              :class="{ 'animate-spin': isLoading }"
            >
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            Refresh DB
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && data.users.length === 0" class="flex flex-col items-center justify-center py-40 gap-6">
        <div class="w-16 h-16 border-4 border-gray-200 border-t-[#D05E33] rounded-full animate-spin"></div>
        <p class="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Loading Master Registry...</p>
      </div>

      <div v-else class="space-y-10 animate-fade-in">
        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[25px] md:rounded-[35px] border border-white/40 shadow-sm transition-transform hover:scale-[1.02] duration-500 flex flex-col justify-center items-center text-center"
          >
            <p
              class="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[2px] md:tracking-[3px] mb-2 leading-tight"
            >
              {{ stat.label }}
            </p>
            <p class="text-2xl md:text-4xl font-bold text-gray-800">{{ stat.value }}</p>
            <p v-if="stat.details" class="text-[8px] md:text-[9px] font-bold text-[#D05E33] uppercase mt-2">
              {{ stat.details }}
            </p>
          </div>
        </div>

        <!-- Priority Signals Feed -->
        <div v-if="activeSignals.length > 0" class="space-y-6">
          <div class="flex items-center gap-3 ml-4">
            <div class="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
            <h2 class="text-[10px] font-black uppercase tracking-[4px] text-gray-800">Priority Signals</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="signal in activeSignals"
              :key="signal.id"
              class="bg-white p-8 rounded-[35px] border-2 border-[#D05E33]/10 shadow-xl relative overflow-hidden group"
            >
              <div
                class="absolute -right-4 -top-4 w-24 h-24 bg-[#D05E33]/5 rounded-full group-hover:scale-150 transition-transform duration-700"
              ></div>
              <div class="relative z-10 space-y-6">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-400 border border-white shadow-sm overflow-hidden flex-shrink-0"
                  >
                    <img
                      v-if="signal.profile_picture"
                      :src="signal.profile_picture"
                      class="w-full h-full object-cover"
                    />
                    <span v-else>{{ signal.first_name[0] }}</span>
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs font-black text-gray-800 uppercase tracking-tight truncate">
                      {{ signal.first_name }} {{ signal.name }}
                    </p>
                    <p class="text-[10px] text-gray-400 font-medium truncate">{{ signal.email }}</p>
                  </div>
                </div>
                <div
                  class="bg-[#EFEFEC]/50 p-4 rounded-2xl border border-gray-100 min-h-[60px] flex flex-col justify-center"
                >
                  <p class="text-[8px] font-black text-[#D05E33] uppercase tracking-[2px] mb-1">Status Report</p>
                  <p class="text-[11px] font-bold text-gray-700 leading-relaxed">
                    <template v-if="signal.requested_plan"
                      >Requested upgrade to
                      <span class="bg-yellow-100 px-2 py-0.5 rounded ml-1 text-black">{{
                        signal.requested_plan
                      }}</span></template
                    >
                    <template v-else-if="signal.requested_cancel"
                      >Requested <span class="bg-red-50 px-2 py-0.5 rounded text-red-600">Cancellation</span></template
                    >
                    <template v-else-if="!signal.paid"
                      >New
                      <span class="bg-orange-50 px-2 py-0.5 rounded text-orange-600 italic"
                        >Awaiting Payment</span
                      ></template
                    >
                  </p>
                </div>
                <div class="flex gap-3 pt-2">
                  <button
                    class="flex-1 bg-black text-white py-4 rounded-2xl text-[9px] font-black uppercase tracking-[2px] hover:bg-[#D05E33] transition-all shadow-lg active:scale-95"
                    @click="processSignal(signal, 'accept')"
                  >
                    Accept
                  </button>
                  <button
                    class="flex-1 border-2 border-gray-100 text-gray-400 py-4 rounded-2xl text-[9px] font-black uppercase tracking-[2px] hover:bg-gray-50 transition-all active:scale-95"
                    @click="processSignal(signal, 'deny')"
                  >
                    Deny
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Admin Management -->
        <div v-if="adminUsers.length > 0" class="space-y-6">
          <div class="flex items-center justify-between ml-4">
            <h2 class="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Admin System Access</h2>
            <button
              v-if="currentUser?.isMaster"
              class="px-6 py-3 bg-black text-white hover:bg-[#D05E33] transition-all rounded-full shadow-lg text-[9px] font-black uppercase tracking-[2px] flex items-center gap-2"
              @click="openCreateUserModal('admin')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="16" x2="22" y1="11" y2="11" />
              </svg>
              Add New Admin
            </button>
          </div>

          <div v-for="admin in adminUsers" :key="admin.id" class="group">
            <div
              class="relative bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[30px] border border-white/40 shadow-sm cursor-pointer transition-all duration-500 group-hover:bg-white group-hover:shadow-xl"
              @click="openMasterEditor(admin, 'user')"
            >
              <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div class="flex items-center gap-5">
                  <div
                    class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#EFEFEC] border-2 border-white shadow-inner overflow-hidden flex-shrink-0"
                  >
                    <img v-if="admin.profile_picture" :src="admin.profile_picture" class="w-full h-full object-cover" />
                    <span
                      v-else
                      class="w-full h-full flex items-center justify-center font-bold text-gray-300 text-xl"
                      >{{ admin.first_name[0] }}</span
                    >
                  </div>
                  <div>
                    <h3 class="text-base md:text-xl font-bold text-gray-800 uppercase tracking-tight">
                      {{ admin.first_name }} {{ admin.name }}
                    </h3>
                    <p class="text-[10px] md:text-xs text-gray-400 font-medium tracking-wide">{{ admin.email }}</p>
                    <div class="flex gap-2 mt-2">
                      <span class="text-[8px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase"
                        >ID: {{ admin.id }}</span
                      >
                      <span class="text-[8px] font-black bg-purple-100 text-purple-600 px-2 py-0.5 rounded uppercase">{{
                        admin.isMaster ? "Master Node" : "System Admin"
                      }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center gap-3 ml-auto">
                  <button
                    v-if="canDeleteUser(admin)"
                    class="p-3 rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center"
                    title="Delete Admin Account"
                    @click.stop="quickDelete(admin, 'user')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" x2="10" y1="11" y2="17" />
                      <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                  </button>

                  <button
                    class="px-6 py-3 rounded-full bg-black text-white hover:bg-[#D05E33] transition-all shadow-lg text-[9px] font-black uppercase tracking-[2px] flex items-center gap-2"
                    @click.stop="openMasterEditor(admin, 'user')"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    </svg>
                    Edit Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Master List (Establishments) -->
        <div class="space-y-6">
          <div class="flex items-center justify-between ml-4">
            <h2 class="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Establishment Registry</h2>
            <button
              class="px-6 py-3 bg-black text-white hover:bg-[#D05E33] transition-all rounded-full shadow-lg text-[9px] font-black uppercase tracking-[2px] flex items-center gap-2"
              @click="openCreateUserModal('establishment')"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <rect width="7" height="9" x="14" y="10" rx="1" />
                <path d="M14 14h7" />
                <path d="M14 17h7" />
              </svg>
              Add New Establishment
            </button>
          </div>

          <div v-for="est in establishmentUsers" :key="est.id" class="group">
            <div
              class="relative bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-[30px] border border-white/40 shadow-sm cursor-pointer transition-all duration-500 group-hover:bg-white group-hover:shadow-xl"
              :class="{ 'ring-2 ring-[#D05E33]/20 bg-white shadow-lg mb-4': expandedEst === est.id }"
              @click="toggleEstablishment(est.id)"
            >
              <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div class="flex items-center gap-5">
                  <div
                    class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#EFEFEC] border-2 border-white shadow-inner overflow-hidden flex-shrink-0"
                  >
                    <img v-if="est.profile_picture" :src="est.profile_picture" class="w-full h-full object-cover" />
                    <span
                      v-else
                      class="w-full h-full flex items-center justify-center font-bold text-gray-300 text-xl"
                      >{{ est.first_name[0] }}</span
                    >
                  </div>
                  <div>
                    <h3 class="text-base md:text-xl font-bold text-gray-800 uppercase tracking-tight">
                      {{ est.first_name }} {{ est.name }}
                    </h3>
                    <p class="text-[10px] md:text-xs text-gray-400 font-medium tracking-wide">{{ est.email }}</p>
                    <div class="flex gap-2 mt-2">
                      <span class="text-[8px] font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase"
                        >ID: {{ est.id }}</span
                      >
                      <span
                        v-if="est.isAdmin"
                        class="text-[8px] font-black bg-purple-100 text-purple-600 px-2 py-0.5 rounded uppercase"
                        >System Admin</span
                      >
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-4 md:gap-8 w-full lg:w-auto">
                  <div v-if="!est.isAdmin" class="flex flex-col items-start">
                    <span class="text-[8px] font-black text-gray-400 uppercase tracking-[2px]">Plan</span>
                    <span class="text-xs font-bold text-gray-800">{{ est.plan }}</span>
                  </div>
                  <div v-if="!est.isAdmin" class="flex flex-col gap-2">
                    <span
                      :class="est.paid ? 'bg-emerald-500' : 'bg-orange-500'"
                      class="px-4 py-1 rounded-full text-white text-[8px] font-black uppercase tracking-[1px]"
                    >
                      {{ est.paid ? "PAID" : "UNPAID" }}
                    </span>
                  </div>

                  <div class="flex items-center gap-3 ml-auto">
                    <!-- Quick Delete Establishment -->
                    <button
                      v-if="canDeleteUser(est)"
                      class="p-3 rounded-full bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm flex items-center justify-center"
                      :title="est.isAdmin ? 'Delete Admin Account' : 'Delete Establishment'"
                      @click.stop="quickDelete(est, 'user')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>

                    <button
                      v-if="canEditUser(est)"
                      class="px-6 py-3 rounded-full bg-black text-white hover:bg-[#D05E33] transition-all shadow-lg text-[9px] font-black uppercase tracking-[2px] flex items-center gap-2"
                      @click.stop="openMasterEditor(est, 'user')"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                      {{ est.isAdmin ? "Edit Admin" : "Edit Establishment" }}
                    </button>
                    <div class="transition-transform duration-500" :class="{ 'rotate-180': expandedEst === est.id }">
                      <div class="w-10 h-10 rounded-full bg-[#EFEFEC] flex items-center justify-center text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Nested Customers Content -->
              <Transition name="expand">
                <div v-if="expandedEst === est.id" class="mt-8 pt-8 border-t border-gray-100 space-y-6" @click.stop>
                  <div class="flex justify-between items-center px-2">
                    <h4 class="text-[10px] font-black uppercase tracking-[3px] text-gray-400">
                      Associated Customer Records
                    </h4>
                    <span class="text-[9px] font-bold text-[#D05E33] bg-[#D05E33]/5 px-3 py-1 rounded-full"
                      >{{ est.customers.length }} Active Documents</span
                    >
                  </div>

                  <div v-if="est.customers.length === 0" class="py-10 text-center text-gray-300 italic text-sm">
                    No customers found for this account.
                  </div>

                  <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div
                      v-for="c in est.customers"
                      :key="c.id"
                      class="bg-white/80 p-5 rounded-[25px] border border-white shadow-sm hover:shadow-md transition-all group/cust"
                    >
                      <div class="flex justify-between items-start mb-4">
                        <div class="flex items-center gap-4">
                          <div
                            class="w-12 h-12 rounded-full overflow-hidden bg-[#EFEFEC] border border-white shadow-sm flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-400"
                          >
                            <img v-if="c.profile_picture" :src="c.profile_picture" class="w-full h-full object-cover" />
                            <span v-else>{{ c.firstName[0] }}{{ c.lastName[0] }}</span>
                          </div>
                          <div>
                            <p class="text-xs font-bold text-gray-800 uppercase tracking-tight leading-none mb-1">
                              {{ c.firstName }} {{ c.lastName }}
                            </p>
                            <p class="text-[9px] text-gray-400 font-medium truncate max-w-[120px]">{{ c.email }}</p>
                          </div>
                        </div>
                        <div class="flex items-center gap-2">
                          <button
                            class="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            @click="quickDelete(c, 'customer')"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>
                          <button
                            class="p-2 rounded-lg bg-black text-white hover:bg-[#D05E33] transition-all shadow-sm"
                            @click="openMasterEditor(c, 'customer')"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="3"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50 text-center">
                        <div class="bg-gray-50/50 p-2 rounded-lg">
                          <p class="text-[7px] font-black text-gray-400 uppercase mb-1">Sessions</p>
                          <p class="text-[10px] font-bold text-gray-800">{{ Object.keys(c.burnedCalories).length }}</p>
                        </div>
                        <div class="bg-gray-50/50 p-2 rounded-lg">
                          <p class="text-[7px] font-black text-gray-400 uppercase mb-1">Status</p>
                          <span
                            :class="c.hasAccess ? 'text-emerald-600' : 'text-red-600'"
                            class="text-[9px] font-black uppercase"
                            >{{ c.hasAccess ? "ONLINE" : "LOCKED" }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Video Management Center -->
        <div class="space-y-6">
          <div class="flex items-center justify-between ml-4">
            <div>
              <h2 class="text-[10px] font-black uppercase tracking-[4px] text-gray-400">Workout Video Registry</h2>
              <p class="text-[8px] font-bold text-[#D05E33] uppercase mt-1">
                Drag and drop cards to change session order
              </p>
            </div>
            <button
              class="px-6 py-3 bg-black text-white hover:bg-[#D05E33] transition-all rounded-full shadow-lg text-[9px] font-black uppercase tracking-[2px] flex items-center gap-2"
              @click="showAddVideoModal = true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
                <rect width="14" height="12" x="2" y="6" rx="2" />
                <line x1="12" x2="12" y1="11" y2="13" />
                <line x1="11" x2="13" y1="12" y2="12" />
              </svg>
              Add New Video
            </button>
          </div>

          <!-- Drag and Drop Info Card -->
          <div
            class="bg-black text-white p-6 rounded-[35px] border-2 border-dashed border-white/20 mb-6 flex items-center gap-6"
          >
            <div class="w-12 h-12 bg-[#D05E33] rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
              </svg>
            </div>
            <div>
              <p class="text-[10px] font-black uppercase tracking-[2px] mb-1">Session Sequence Strategy</p>
              <p class="text-[9px] text-white/70 font-medium leading-relaxed uppercase tracking-tight">
                The order below directly determines the workout flow for customers.
                <span class="text-[#D05E33] font-bold">Position #1</span> is their 1st session,
                <span class="text-[#D05E33] font-bold">Position #2</span> is their 2nd, and so on. Simply drag any video
                card to swap its priority.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="(video, index) in data.videos"
              :key="video.id"
              draggable="true"
              class="bg-white p-6 rounded-[35px] border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-move relative"
              :class="{ 'opacity-50 scale-95': draggedVideoIndex === index }"
              @dragstart="onDragStart(index)"
              @dragover="onDragOver"
              @drop="onDrop(index)"
            >
              <!-- Order Badge -->
              <div
                class="absolute -top-3 -left-3 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-[10px] shadow-xl border-4 border-[#EFEFEC] z-10"
              >
                #{{ index + 1 }}
              </div>

              <div
                class="relative aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100 border border-gray-50"
              >
                <iframe
                  :src="video.url"
                  class="absolute inset-0 w-full h-full pointer-events-none"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
                <div
                  class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3"
                >
                  <button 
                    class="bg-white text-black px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[1px] hover:bg-[#D05E33] hover:text-white transition-all shadow-xl flex items-center gap-2"
                    @click.stop="selectedPreviewVideo = video"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    Watch Video
                  </button>
                  <p class="text-white text-[8px] font-bold uppercase tracking-widest opacity-60">Hold & Drag to Swap</p>
                </div>
              </div>
              <div class="flex justify-between items-center px-2">
                <div>
                  <h3 class="text-xs font-bold text-gray-800 uppercase tracking-tight truncate max-w-[150px]">
                    {{ video.title }}
                  </h3>
                  <p class="text-[8px] font-bold text-[#D05E33] uppercase mt-0.5">Session Order Active</p>
                </div>
                <button
                  class="p-3 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  @click.stop="deleteVideo(video.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Management Center (ALL DATA CRUD) -->
    <Transition name="fade">
      <div
        v-if="editingItem"
        class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      >
        <div
          class="bg-white rounded-[40px] shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/20 animate-scale-up"
        >
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-[#D05E33] text-white rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold uppercase tracking-[2px] text-gray-800">
                  {{
                    editingType === "user"
                      ? editForm.isAdmin
                        ? "Admin Account"
                        : "Establishment Registry"
                      : "Customer Document"
                  }}
                </h2>
                <p class="text-[9px] font-bold text-[#D05E33] uppercase tracking-[3px]">
                  {{
                    editingType === "user"
                      ? editForm.isAdmin
                        ? "Master Authority Override"
                        : "Full Data Access"
                      : "Activity Records"
                  }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <button
                v-if="editingType === 'customer' || canDeleteUser(editForm)"
                class="px-6 py-3 rounded-full border-2 border-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-[9px] font-black uppercase tracking-[2px]"
                @click="confirmDelete"
              >
                Delete
                {{ editingType === "user" ? (editForm.isAdmin ? "Admin Account" : "Establishment") : "Customer" }}
              </button>
              <button
                class="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                @click="editingItem = null"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10">
            <div class="flex flex-col items-center justify-center gap-6 pb-8 border-b border-gray-100">
              <div class="relative group cursor-pointer" @click="triggerFileInput">
                <div
                  class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#EFEFEC] shadow-2xl bg-white flex items-center justify-center"
                >
                  <img
                    v-if="editForm.profile_picture"
                    :src="editForm.profile_picture"
                    class="w-full h-full object-cover"
                  />
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D05E33"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <div
                  class="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                </div>
                <input ref="masterFileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload" />
              </div>
              <p class="text-[9px] font-black text-gray-400 uppercase tracking-[3px]">Replace Photo</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div v-for="(val, key) in filteredFormFields" :key="key" class="space-y-2">
                <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1">{{
                  key.replace(/([A-Z])/g, " $1")
                }}</label>

                <div v-if="typeof val === 'boolean'" class="relative">
                  <select
                    v-model="editForm[key]"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none appearance-none"
                  >
                    <option :value="true">YES / ENABLED</option>
                    <option :value="false">NO / DISABLED</option>
                  </select>
                </div>

                <div
                  v-else-if="['plan', 'type', 'gender', 'ageRange', 'weightRange', 'requested_plan'].includes(key)"
                  class="relative"
                >
                  <select
                    v-model="editForm[key]"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none appearance-none"
                  >
                    <template v-if="key === 'plan' || key === 'requested_plan'">
                      <option v-if="key === 'requested_plan'" :value="null">NONE / NO REQUEST</option>
                      <option value="EXPLORER">EXPLORER</option>
                      <option value="EXPERIENCE">EXPERIENCE</option>
                      <option value="SIGNATURE">SIGNATURE</option>
                    </template>
                    <template v-else-if="key === 'type'">
                      <option value="ESTABLISHEMENT">ESTABLISHEMENT</option>
                      <option value="PARTICULIER">PARTICULIER</option>
                    </template>
                    <template v-else-if="key === 'gender'">
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </template>
                    <option v-else :value="editForm[key]">{{ editForm[key] }}</option>
                  </select>
                </div>

                <input
                  v-else-if="typeof val === 'number'"
                  v-model.number="editForm[key]"
                  type="number"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none"
                />
                <input
                  v-else
                  v-model="editForm[key]"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none"
                />
              </div>

              <!-- Manual Password Field for Users -->
              <div v-if="editingType === 'user' && canChangePassword(editForm)" class="space-y-2">
                <label class="block text-[8px] font-black text-[#D05E33] uppercase tracking-[2px] ml-1"
                  >Change Password</label
                >
                <div class="relative">
                  <input
                    v-model="editForm.password"
                    :type="showEditPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 bg-orange-50/30 border border-[#D05E33]/20 rounded-xl text-xs font-bold outline-none"
                    placeholder="Enter new password..."
                  />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    @click="showEditPassword = !showEditPassword"
                  >
                    <svg
                      v-if="!showEditPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.43 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="editingType === 'customer'" class="pt-10 border-t border-gray-100">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-[10px] font-black uppercase tracking-[4px] text-gray-400">
                  Activity Registry (Calorie Logs)
                </h3>
                <button class="text-[9px] font-black uppercase text-[#D05E33] hover:underline" @click="addCalorieDay">
                  + Add Entry
                </button>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  v-for="(kcal, day) in editForm.burnedCalories"
                  :key="day"
                  class="flex flex-col gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 group/log"
                >
                  <div class="flex justify-between items-center">
                    <span class="text-[8px] font-black text-gray-400 uppercase tracking-widest">{{ day }}</span>
                    <button class="text-red-400 hover:text-red-600" @click="removeCalorieDay(day)">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>
                  <div class="flex items-end gap-2">
                    <input
                      v-model.number="editForm.burnedCalories[day]"
                      type="number"
                      class="bg-transparent border-b-2 border-gray-200 outline-none text-sm font-bold w-full pb-1"
                    />
                    <span class="text-[10px] font-bold text-gray-300">kcal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
            <button
              class="px-10 py-4 rounded-2xl border border-gray-200 text-[10px] font-black uppercase tracking-[2px] hover:bg-gray-100"
              @click="editingItem = null"
            >
              Cancel
            </button>
            <button
              :disabled="isSaving"
              class="px-12 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[2px] hover:bg-[#D05E33] shadow-2xl transition-all flex items-center gap-2"
              @click="saveMasterChanges"
            >
              <div
                v-if="isSaving"
                class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              Commit Changes
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Create Video Modal -->
    <Transition name="fade">
      <div
        v-if="showAddVideoModal"
        class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      >
        <div
          class="bg-white rounded-[40px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/20 animate-scale-up"
        >
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.934a.5.5 0 0 0-.777-.416L16 11" />
                  <rect width="14" height="12" x="2" y="6" rx="2" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold uppercase tracking-[2px] text-gray-800">Register New Video</h2>
                <p class="text-[9px] font-bold text-[#D05E33] uppercase tracking-[3px]">DB Content Addition</p>
              </div>
            </div>
            <button class="p-3 hover:bg-gray-100 rounded-full text-gray-400" @click="showAddVideoModal = false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8">
            <div class="space-y-6">
              <div class="space-y-2">
                <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1"
                  >Video Title</label
                >
                <input
                  v-model="newVideo.title"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none"
                  placeholder="e.g. Morning Yoga Flow"
                />
              </div>
              <div class="space-y-2">
                <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1"
                  >Video URL (Embed Link)</label
                >
                <input
                  v-model="newVideo.url"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none"
                  placeholder="https://www.youtube.com/embed/..."
                />
                <p class="text-[8px] text-gray-400 italic">Please use embeddable URLs for proper rendering.</p>
              </div>
            </div>
          </div>
          <div class="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
            <button
              class="px-10 py-4 rounded-2xl border border-gray-200 text-[10px] font-black uppercase tracking-[2px]"
              @click="showAddVideoModal = false"
            >
              Cancel
            </button>
            <button
              :disabled="isSaving"
              class="px-12 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[2px] shadow-2xl flex items-center gap-2"
              @click="addVideo"
            >
              <div
                v-if="isSaving"
                class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
              Register Video
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Create User Modal -->
    <Transition name="fade">
      <div
        v-if="showCreateModal"
        class="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      >
        <div
          class="bg-white rounded-[40px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/20 animate-scale-up"
        >
          <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-bold uppercase tracking-[2px] text-gray-800">
                  {{ createType === "admin" ? "Establish New Admin" : "Initialize Establishment Account" }}
                </h2>
                <p class="text-[9px] font-bold text-[#D05E33] uppercase tracking-[3px]">
                  {{ createType === "admin" ? "System Operator Registry" : "Master Authority Override" }}
                </p>
              </div>
            </div>
            <button class="p-3 hover:bg-gray-100 rounded-full text-gray-400" @click="showCreateModal = false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-8 lg:p-12 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                v-for="(field, key) in { first_name: 'First Name', name: 'Last Name', email: 'Email Address' }"
                :key="key"
                class="space-y-2"
              >
                <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1">{{
                  field
                }}</label>
                <input
                  v-model="createUserForm[key]"
                  type="text"
                  class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none"
                  placeholder="Required field..."
                />
              </div>
              <div class="space-y-2">
                <label class="block text-[8px] font-black text-gray-400 uppercase tracking-[2px] ml-1"
                  >Password (Temporary)</label
                >
                <div class="relative">
                  <input
                    v-model="createUserForm.password"
                    :type="showPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold outline-none"
                    placeholder="Required field..."
                  />
                  <button
                    type="button"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    @click="showPassword = !showPassword"
                  >
                    <svg
                      v-if="!showPassword"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.43 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div v-if="createType === 'establishment'" class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <select
                v-model="createUserForm.type"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
              >
                <option value="ESTABLISHEMENT">ESTABLISHEMENT</option>
                <option value="PARTICULIER">PARTICULIER</option>
              </select>
              <select
                v-model="createUserForm.plan"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
              >
                <option value="EXPLORER">EXPLORER</option>
                <option value="EXPERIENCE">EXPERIENCE</option>
                <option value="SIGNATURE">SIGNATURE</option>
              </select>
              <select
                v-model="createUserForm.paid"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold"
              >
                <option :value="true">ALREADY PAID</option>
                <option :value="false">PENDING PAYMENT</option>
              </select>
            </div>

            <div v-if="createType === 'admin'" class="bg-[#D05E33]/5 p-8 rounded-[30px] border border-[#D05E33]/10">
              <div class="flex gap-8">
                <div class="flex items-center gap-4">
                  <input v-model="createUserForm.isMaster" type="checkbox" /><span
                    class="text-[10px] font-black uppercase tracking-[1px] text-purple-600"
                    >Grant Master Level Authority</span
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
            <button
              class="px-10 py-4 rounded-2xl border border-gray-200 text-[10px] font-black uppercase tracking-[2px]"
              @click="showCreateModal = false"
            >
              Cancel
            </button>
            <button
              :disabled="isSaving"
              class="px-12 py-4 rounded-2xl bg-black text-white text-[10px] font-black uppercase tracking-[2px] shadow-2xl flex items-center gap-2"
              @click="saveNewUser"
            >
              {{ createType === "admin" ? "Initialize Admin" : "Establish Account" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Video Preview Modal -->
    <Transition name="fade">
      <div
        v-if="selectedPreviewVideo"
        class="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl"
        @click="selectedPreviewVideo = null"
      >
        <div class="w-full max-w-5xl aspect-video relative bg-black rounded-[30px] overflow-hidden shadow-2xl border-4 border-white/10" @click.stop>
          <button 
            class="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all backdrop-blur-md"
            @click="selectedPreviewVideo = null"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <div class="absolute top-6 left-10 z-10">
            <p class="text-[10px] font-black text-[#D05E33] uppercase tracking-[4px] mb-1">Session Preview</p>
            <h3 class="text-white text-xl font-bold uppercase tracking-tight">{{ selectedPreviewVideo.title }}</h3>
          </div>

          <iframe
            :src="selectedPreviewVideo.url"
            class="w-full h-full"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </Transition>

    <!-- Delete Confirm -->
    <Transition name="fade">
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-3xl"
      >
        <div class="bg-white p-10 rounded-[40px] max-w-md w-full shadow-2xl text-center border-2 border-red-50">
          <div class="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </div>
          <h2 class="text-2xl font-black uppercase tracking-[2px] text-gray-800 mb-4">Permanent Deletion?</h2>
          <p class="text-sm text-gray-500 mb-10 leading-relaxed italic">WARNING: This cannot be undone.</p>
          <div class="flex flex-col gap-3">
            <button
              class="w-full bg-black text-white py-5 rounded-2xl uppercase text-[10px] font-black tracking-[3px]"
              @click="showDeleteConfirm = false"
            >
              Abort Operation
            </button>
            <button
              class="w-full border-2 border-red-100 text-red-500 py-5 rounded-2xl uppercase text-[10px] font-black tracking-[3px]"
              @click="executeHardDelete"
            >
              Confirm Hard Delete
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";

definePageMeta({ middleware: ["admin"] });

const data = ref({ users: [] as any[], customers: [] as any[] });
const isLoading = ref(true);
const isSaving = ref(false);
const expandedEst = ref<string | null>(null);
const editingItem = ref<any>(null);
const editingType = ref<"user" | "customer">("user");
const editForm = ref<any>({});
const showDeleteConfirm = ref(false);
const showCreateModal = ref(false);
const createType = ref<"admin" | "establishment">("establishment");
const showAddVideoModal = ref(false);
const showPassword = ref(false);
const showEditPassword = ref(false);
const selectedPreviewVideo = ref<any>(null);

const canChangePassword = (u: any) => {
  if (currentUser.value?.isMaster) return true;
  if (u.id === currentUser.value?.id) return true;
  if (!u.isAdmin) return true; // Regular establishment
  return false; // Regular admin cannot change other admin or master password
};

const newVideo = reactive({
  url: "",
  title: "",
});

const addVideo = async () => {
  if (!newVideo.url) {
    useToast().error("URL is required");
    return;
  }
  isSaving.value = true;
  try {
    await $fetch("/api/admin/videos/add", { method: "POST", body: newVideo });
    useToast().success("Video added to registry.");
    newVideo.url = "";
    newVideo.title = "";
    showAddVideoModal.value = false;
    await fetchAdminData();
  } catch (e: any) {
    useToast().error("Failed to add video");
  } finally {
    isSaving.value = false;
  }
};

const deleteVideo = async (id: string) => {
  if (!confirm("Are you sure you want to delete this video?")) return;
  try {
    await $fetch("/api/admin/videos/delete", { method: "POST", body: { id } });
    useToast().success("Video removed.");
    await fetchAdminData();
  } catch (e: any) {
    useToast().error("Failed to delete video");
  }
};

const draggedVideoIndex = ref<number | null>(null);

const onDragStart = (index: number) => {
  draggedVideoIndex.value = index;
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault(); // Allow drop
};

const onDrop = async (index: number) => {
  if (draggedVideoIndex.value === null) return;
  const draggedIndex = draggedVideoIndex.value;
  if (draggedIndex === index) return;

  // Reorder locally
  const videos = [...data.value.videos];
  const item = videos.splice(draggedIndex, 1)[0];
  videos.splice(index, 0, item);
  data.value.videos = videos;

  draggedVideoIndex.value = null;

  // Persist to backend
  try {
    const videoOrders = data.value.videos.map((v, i) => ({ id: v.id, order: i }));
    await $fetch("/api/admin/videos/reorder", { method: "POST", body: { videoOrders } });
    useToast().success("Video order updated!");
  } catch (err: any) {
    useToast().error("Failed to save video order");
    await fetchAdminData(); // Refresh if failed
  }
};

const masterFileInput = ref<HTMLInputElement | null>(null);

const { user: currentUser } = useAuth();

const createUserForm = reactive({
  first_name: "",
  name: "",
  email: "",
  password: "",
  type: "ESTABLISHEMENT",
  plan: "EXPLORER",
  isAdmin: false,
  isMaster: false,
  paid: false,
});

const adminUsers = computed(() => {
  if (!data.value?.users) return [];
  return data.value.users
    .filter((u) => u.isAdmin)
    .filter((u) => {
      // 1. Master can see all admins
      if (currentUser.value?.isMaster) return true;
      // 2. System Admin can ONLY see themselves in the admin list
      return u.id === currentUser.value?.id;
    });
});

const establishmentUsers = computed(() => {
  if (!data.value?.users) return [];
  return data.value.users
    .filter((u) => !u.isAdmin)
    .map((user) => ({ ...user, customers: (data.value.customers || []).filter((c) => c.establishmentId === user.id) }));
});

const activeSignals = computed(() => {
  if (!data.value?.users) return [];
  return data.value.users.filter((u) => (u.requested_plan || u.requested_cancel || !u.paid) && !u.registration_denied);
});

const stats = computed(() => {
  const users = data.value.users || [];
  const customers = data.value.customers || [];

  const explorerCount = users.filter((u) => u.plan === "EXPLORER").length;
  const experienceCount = users.filter((u) => u.plan === "EXPERIENCE").length;
  const signatureCount = users.filter((u) => u.plan === "SIGNATURE").length;

  return [
    {
      label: "Total Establishments",
      value: users.filter((u) => u.type === "ESTABLISHEMENT").length,
      details: `${explorerCount} Explorer, ${experienceCount} Experience, ${signatureCount} Signature`,
    },
    { label: "Total Customers", value: customers.length },
    { label: "Total Admins", value: users.filter((u) => u.isAdmin).length },
  ];
});

const filteredFormFields = computed(() => {
  if (!editForm.value) return {};
  const skip = [
    "_id",
    "id",
    "__v",
    "password",
    "createdAt",
    "updatedAt",
    "establishmentId",
    "burnedCalories",
    "profile_picture",
    "customers",
  ];

  // If we're editing a User and they are an Admin, hide establishment-specific fields
  if (editingType.value === "user" && editForm.value.isAdmin) {
    skip.push("plan", "paid", "requested_plan", "requested_cancel", "registration_denied", "login_count", "type");
  }

  const fields: any = {};
  Object.keys(editForm.value).forEach((key) => {
    if (!skip.includes(key)) fields[key] = editForm.value[key];
  });
  return fields;
});

const fetchAdminData = async () => {
  isLoading.value = true;
  try {
    const res = await $fetch<any>("/api/admin/data");
    if (res.success) data.value = res.data;
  } catch (err: any) {
    useRouter().push("/");
  } finally {
    isLoading.value = false;
  }
};

const processSignal = async (user: any, action: "accept" | "deny") => {
  const updates: any = {};
  if (user.requested_plan) {
    updates.plan = action === "accept" ? user.requested_plan : user.plan;
    updates.requested_plan = null;
  } else if (user.requested_cancel) {
    updates.paid = action === "accept" ? false : true;
    updates.requested_cancel = false;
  } else if (!user.paid) {
    if (action === "accept") {
      updates.paid = true;
      updates.registration_denied = false;
    } else {
      // DENY for Unpaid: Hide it from the signals feed
      updates.registration_denied = true;
    }
  }

  try {
    await $fetch("/api/admin/users/update", { method: "POST", body: { id: user.id, updates } });
    useToast().success(`Signal ${action === "accept" ? "Processed" : "Dismissed"} Successfully`);
    await fetchAdminData();
  } catch (e: any) {
    useToast().error(`Signal Processing Failed`);
  }
};

const toggleEstablishment = (id: string) => {
  expandedEst.value = expandedEst.value === id ? null : id;
};
const openMasterEditor = (item: any, type: "user" | "customer") => {
  editingType.value = type;
  editForm.value = JSON.parse(JSON.stringify(item));
  editingItem.value = true;
};
const openCreateUserModal = (type: "admin" | "establishment") => {
  createType.value = type;
  showCreateModal.value = true;
  Object.assign(createUserForm, {
    first_name: "",
    name: "",
    email: "",
    password: "",
    type: "ESTABLISHEMENT",
    plan: "EXPLORER",
    isAdmin: type === "admin",
    isMaster: false,
    paid: type === "admin" ? true : false,
  });
};
const saveNewUser = async () => {
  isSaving.value = true;
  try {
    await $fetch("/api/auth/signup", { method: "POST", body: createUserForm });
    useToast().success("New account established.");
    showCreateModal.value = false;
    await fetchAdminData();
  } catch (e: any) {
    useToast().error("Creation Failed");
  } finally {
    isSaving.value = false;
  }
};
const saveMasterChanges = async () => {
  isSaving.value = true;
  try {
    const url = editingType.value === "user" ? "/api/admin/users/update" : "/api/admin/customers/update";
    await $fetch(url, { method: "POST", body: { id: editForm.value.id, updates: editForm.value } });
    useToast().success("Record committed.");
    editingItem.value = null;
    await fetchAdminData();
  } catch (e: any) {
    useToast().error("Commit Failed");
  } finally {
    isSaving.value = false;
  }
};
const executeHardDelete = async () => {
  try {
    const url = editingType.value === "user" ? "/api/admin/users/delete" : "/api/admin/customers/delete";
    await $fetch(url, { method: "POST", body: { id: editForm.value.id } });
    useToast().success("Purged.");
    showDeleteConfirm.value = false;
    editingItem.value = null;
    await fetchAdminData();
  } catch (e: any) {
    useToast().error("Purge Failed");
  }
};
const confirmDelete = () => {
  showDeleteConfirm.value = true;
};
const quickDelete = (item: any, type: "user" | "customer") => {
  editingType.value = type;
  editForm.value = JSON.parse(JSON.stringify(item));
  showDeleteConfirm.value = true;
};
const canEditUser = (u: any) => currentUser.value?.isMaster || u.id === currentUser.value?.id || !u.isAdmin;
const canDeleteUser = (u: any) => u.id !== currentUser.value?.id && (!u.isAdmin || currentUser.value?.isMaster);
const triggerFileInput = () => masterFileInput.value?.click();
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;
  const reader = new FileReader();
  reader.onload = () => {
    editForm.value.profile_picture = reader.result as string;
  };
  reader.readAsDataURL(target.files[0]);
};
const addCalorieDay = () => {
  const count = Object.keys(editForm.value.burnedCalories || {}).length + 1;
  if (!editForm.value.burnedCalories) editForm.value.burnedCalories = {};
  editForm.value.burnedCalories[`Day ${count}`] = 0;
};
const removeCalorieDay = (day: string) => {
  delete editForm.value.burnedCalories[day];
};

onMounted(() => {
  fetchAdminData();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.animate-scale-up {
  animation: scaleUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  max-height: 2000px;
  opacity: 1;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
