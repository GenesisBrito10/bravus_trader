<template>
  <AppLayout>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
      <div>
        <div class="text-2xl font-bold mb-1">{{ t.dashboard }}</div>
      </div>
      <div class="flex items-center w-full md:w-auto">
        <div class="relative language-dropdown w-full md:w-auto">
          <button @click="toggleLanguageDropdown"
            class="flex items-center space-x-2 bg-[#121212]/80 border border-gray-700/50 px-4 py-2 rounded-xl focus:outline-none hover:border-[#5A39F2] transition-colors text-sm w-full md:w-auto">
            <img :src="`/flags/${currentLanguage}.svg`" class="w-5 h-5 rounded-sm"
              :alt="languageNames[currentLanguage]">
            <span class="mx-2">{{ languageNames[currentLanguage] }}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </button>

          <div v-show="isLanguageDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-[#121212]/90 border border-gray-700 rounded-xl shadow-lg py-1 z-50">
            <button v-for="(name, code) in languageNames" :key="code" @click="selectLanguage(code)"
              class="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">
              <img :src="`/flags/${code}.svg`" class="w-5 h-5 rounded-sm" :alt="name">
              <span class="ml-2">{{ name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header Card -->
    <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div class="mb-4 sm:mb-0 w-full sm:w-auto">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas fa-user-circle text-[#5A39F2]"></i>
            <div class="text-sm text-gray-400">{{ t.welcome }}</div>
          </div>
          <div class="text-xl font-bold mb-4">{{ userDisplayName }}</div>
          <div class="flex items-center gap-3">
            <div
              :class="['text-3xl sm:text-4xl font-bold', accountType === 'demo' ? 'text-orange-400' : 'text-green-400']">
              {{ formatCurrency(balance) }}
            </div>
            <div class="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">+0%</div>
          </div>
          <div class="text-sm text-gray-400 flex items-center gap-2 mt-1">
            <i class="fas fa-wallet text-gray-400"></i>
            {{ accountType === 'real' || accountType === 'fake' ? t.realAccount : t.demoAccount }}
          </div>
        </div>
        <div class="w-full sm:w-auto">
          <div class="flex flex-col items-start sm:items-end">
            <div class="text-sm text-gray-400 mb-2">ID: {{ userDisplayName }}</div>
            <button @click="switchAccount" :class="[
              'transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-xl w-full sm:w-auto justify-center sm:justify-start',
              accountType === 'real' || accountType === 'fake' ? 'text-orange-400 hover:text-orange-300 bg-orange-500/10 hover:bg-orange-500/20' : 'text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20'
            ]">
              <i class="fas fa-exchange-alt"></i>
              {{ accountType === 'real' || accountType === 'fake' ? t.switchToDemo : t.switchToReal }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <!-- Stats Summary Card -->
      <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 col-span-2 shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
            <i class="fas fa-chart-pie text-[#5A39F2]"></i>
            {{ t.tradingStats }}
          </h3>
        </div>

        <div class="flex flex-wrap justify-between">
          <!-- Win Rate Circle -->
          <div class="mb-4 w-full sm:w-1/2 flex justify-center sm:justify-start">
            <div class="relative flex items-center justify-center h-28 sm:h-32 w-28 sm:w-32">
              <svg class="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" stroke="#222" stroke-width="6" fill="transparent" />
                <defs>
                  <linearGradient id="circle-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="0%" stop-color="#5A39F2" />
                    <stop offset="100%" stop-color="#3B82F6" />
                  </linearGradient>
                </defs>
                <circle cx="50%" cy="50%" r="45%" stroke="url(#circle-gradient)" stroke-width="6" fill="transparent"
                  :stroke-dasharray="283" :stroke-dashoffset="283 - (283 * (transactionStats.winPercent / 100))" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-xl font-bold">{{ transactionStats.winPercent }}%</span>
                <span class="text-xs text-gray-400">{{ t.winRate }}</span>
              </div>
            </div>
          </div>

          <!-- Summary List -->
          <div class="mb-4 w-full sm:w-1/2">
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-300">{{ t.wins }}</span>
              <span class="ml-auto font-medium">{{ transactionStats.wins }}</span>
            </div>
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-300">{{ t.losses }}</span>
              <span class="ml-auto font-medium">{{ transactionStats.losses }}</span>
            </div>
            <div class="flex items-center mb-2">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-300">{{ t.total }}</span>
              <span class="ml-auto font-medium">{{ transactionStats.total }}</span>
            </div>
            <div class="flex items-center mt-4 pt-4 border-t border-gray-800">
              <div class="w-3 h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-300">{{ t.profit }}</span>
              <span class="ml-auto font-medium text-green-400">{{ formatCurrency(transactionStats.totalProfit) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Card -->
      <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 col-span-2 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
            <i class="fas fa-chart-line text-[#5A39F2]"></i>
            {{ t.performance }}
          </h3>
          <div class="text-xs text-gray-500">
            {{ transactionStats.winPercent }}% / {{ transactionStats.lossPercent }}%
          </div>
        </div>

        <!-- Pie Chart -->
        <div class="flex items-center justify-center">
          <div class="relative w-32 h-32 sm:w-44 sm:h-44">
            <svg viewBox="0 0 100 100" class="w-full h-full">
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#222" stroke-width="10" />
              <!-- Wins -->
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#3B82F6" stroke-width="10"
                stroke-dasharray="282.7" :stroke-dashoffset="282.7 * (1 - transactionStats.winPercent / 100)"
                transform="rotate(-90 50 50)" />
              <!-- Losses -->
              <circle cx="50" cy="50" r="45" fill="transparent" stroke="#EF4444" stroke-width="10"
                stroke-dasharray="282.7" :stroke-dashoffset="282.7" transform="rotate(-90 50 50)" />
              <text x="50" y="45" text-anchor="middle" font-size="18" font-weight="bold" fill="white">
                {{ transactionStats.winPercent }}%
              </text>
              <text x="50" y="60" text-anchor="middle" font-size="8" fill="#6B7280">
                {{ t.totalOperations }}
              </text>
            </svg>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex justify-around mt-6">
          <div class="text-center">
            <div class="text-blue-400 text-lg font-bold">{{ transactionStats.wins }}</div>
            <div class="text-xs text-gray-400">{{ t.wins }} ({{ transactionStats.winPercent }}%)</div>
          </div>
          <div class="text-center">
            <div class="text-red-400 text-lg font-bold">{{ transactionStats.losses }}</div>
            <div class="text-xs text-gray-400">{{ t.losses }} ({{ transactionStats.lossPercent }}%)</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <!-- Bot Status Card -->
      <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
            <i class="fas fa-robot text-[#5A39F2]"></i>
            {{ t.botStatus }}
          </h3>
          <span :class="botStatus === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
            class="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <i class="fas fa-circle text-[8px]"></i>
            {{ botStatus === 'active' ? t.active : t.paused }}
          </span>
        </div>

        <div class="flex flex-col gap-4 mb-6">
          <h4 class="text-sm text-gray-400">{{ t.selectBroker }}:</h4>
          <div class="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-4">
            <div @click="selectedBroker = 'polarium'" :class="[
              'border rounded-xl p-2 sm:p-3 flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-900',
              selectedBroker === 'polarium' ? 'border-blue-500 bg-gray-900' : 'border-gray-800'
            ]">
              <img :src="Polarium" alt="Polarium" class="h-8 sm:h-10">
            </div>


          </div>

          <div
            :class="['font-medium flex items-center gap-2 mt-2', accountType === 'demo' ? 'text-orange-400' : 'text-green-400']">
            <i class="fas fa-check-circle"></i>
            {{ accountType === 'real' ? t.realAccount : t.demoAccount }}
          </div>
          <div class="text-sm text-gray-400 mt-1 flex items-center">
            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400 mr-2">
              <span class="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
              {{ t.connected }}
            </span>
          </div>
        </div>

        <div class="mt-auto">
          <button @click="toggleStatus" :class="[
            'mt-auto py-3 px-4 rounded-xl font-medium w-full transition-colors duration-200 flex items-center justify-center gap-2',
            isActive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-[#5A39F2]/20 text-[#5A39F2] hover:bg-[#5A39F2]/30'
          ]">
            <i :class="isActive ? 'fas fa-stop-circle' : 'fas fa-play-circle'"></i>
            {{ isActive ? t.stop : t.start }}
          </button>
        </div>
      </div>

      <!-- ROI Card -->
      <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
            <i class="fas fa-chart-bar text-[#5A39F2]"></i>
            {{ t.roi }}
          </h3>
          <div class="text-xs text-gray-500">{{ t.last30Days }}</div>
        </div>

        <div class="flex items-center justify-center">
          <div class="relative flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28">
            <!-- Semicircular progress -->
            <svg class="w-full h-full -rotate-90">
              <circle cx="50%" cy="50%" r="45%" stroke="#222" stroke-width="6" fill="transparent" stroke-dasharray="157"
                stroke-dashoffset="0" transform="rotate(180 50% 50%)" />
              <defs>
                <linearGradient id="roi-gradient" gradientUnits="userSpaceOnUse" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#10B981" />
                  <stop offset="100%" stop-color="#3B82F6" />
                </linearGradient>
              </defs>

              <circle cx="50%" cy="50%" r="45%" stroke="url(#roi-gradient)" stroke-width="6" fill="transparent"
                stroke-dasharray="157" stroke-dashoffset="79" transform="rotate(180 50% 50%)" />
            </svg>
            <!-- Center text -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-lg sm:text-xl font-bold">3.88%</span>
              <span class="text-xs text-gray-400">{{ t.roi }}</span>
            </div>
          </div>
        </div>

        <div class="mt-4 text-center">
          <span class="text-sm text-gray-400">{{ t.accumulatedProfit }}</span>
          <div class="text-lg sm:text-xl font-bold text-green-400 mt-1">{{ formatCurrency(560.20) }}</div>
        </div>
      </div>

      <!-- Recent Trades Card -->
      <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
            <i class="fas fa-history text-[#5A39F2]"></i>
            {{ t.recentOperations }}
          </h3>
          <a href="#" @click.prevent="showTransactionHistory"
            class="text-xs text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
            <span>{{ t.viewHistory }}</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>

        <!-- Trade List -->
        <div class="space-y-2">
          <div v-for="(item, i) in history.slice(0, 3)" :key="item._id || i"
            class="flex justify-between items-center py-2 border-b border-gray-800">
            <div class="flex items-center gap-2 sm:gap-3">
              <div :class="item.payload.pnl >= 0 ? 'text-green-400' : 'text-red-400'">
                <i :class="item.payload.pnl >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              </div>
              <div>
                <div class="font-medium flex items-center gap-1 text-sm sm:text-base">
                  <span class="inline-flex h-4 w-4 overflow-hidden rounded-full border border-gray-700">
                    <img src="https://flagcdn.com/w20/eu.png" alt="EUR" class="h-full w-full object-cover" />
                  </span>
                  <span class="inline-flex h-4 w-4 -ml-1 overflow-hidden rounded-full border border-gray-700">
                    <img src="https://flagcdn.com/w20/us.png" alt="USD" class="h-full w-full object-cover" />
                  </span>
                  <span class="ml-1">
                    {{ item.payload.active?.name || 'N/A' }}
                  </span>
                </div>
                <div class="text-xs text-gray-400">
                  {{ new Date(item.payload.closeTime || item.createdAt).toLocaleDateString(t.language) }}
                </div>
              </div>
            </div>
            <div :class="item.payload.pnl >= 0 ? 'text-green-400' : 'text-red-400'"
              class="font-semibold text-sm sm:text-base">
              {{ item.payload.pnl >= 0 ? '+' : '-' }}{{ formatCurrency(Math.abs(item.payload.pnl)) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Daily Performance Chart -->
    <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-6">
        <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
          <i class="fas fa-chart-area text-[#5A39F2]"></i>
          {{ t.accountGrowth }}
        </h3>
        <div class="flex space-x-2 sm:space-x-4 text-xs sm:text-sm overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button class="tab-button active whitespace-nowrap">{{ t.growth }}</button>
          <button class="tab-button whitespace-nowrap">{{ t.balance }}</button>
          <button class="tab-button whitespace-nowrap">{{ t.profit }}</button>
        </div>
      </div>

      <!-- Area Chart -->
      <div class="h-48 sm:h-64 relative">
        <!-- Grid Lines -->
        <div class="absolute inset-0">
          <div class="h-full flex flex-col justify-between">
            <div class="border-b border-gray-800 h-1/5"></div>
            <div class="border-b border-gray-800 h-1/5"></div>
            <div class="border-b border-gray-800 h-1/5"></div>
            <div class="border-b border-gray-800 h-1/5"></div>
            <div class="border-b border-gray-800 h-1/5"></div>
          </div>
        </div>

        <!-- Blue area chart using SVG -->
        <div class="absolute inset-0 z-10">
          <svg class="w-full h-full" viewBox="0 0 1000 400" preserveAspectRatio="none">
            <defs>
              <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.4" />
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
              </linearGradient>
            </defs>

            <!-- Area fill -->
            <path
              d="M0,400 L0,300 C50,320 100,280 150,200 C200,150 250,180 300,220 C350,260 400,240 450,200 C500,160 550,100 600,150 C650,200 700,150 750,100 C800,50 850,80 900,60 C950,40 1000,100 1000,50 L1000,400 Z"
              fill="url(#area-gradient)" />

            <!-- Line on top -->
            <path
              d="M0,300 C50,320 100,280 150,200 C200,150 250,180 300,220 C350,260 400,240 450,200 C500,160 550,100 600,150 C650,200 700,150 750,100 C800,50 850,80 900,60 C950,40 1000,100 1000,50"
              fill="none" stroke="#3B82F6" stroke-width="3" />

            <!-- Points -->
            <circle cx="0" cy="300" r="4" fill="#3B82F6" />
            <circle cx="150" cy="200" r="4" fill="#3B82F6" />
            <circle cx="300" cy="220" r="4" fill="#3B82F6" />
            <circle cx="450" cy="200" r="4" fill="#3B82F6" />
            <circle cx="600" cy="150" r="4" fill="#3B82F6" />
            <circle cx="750" cy="100" r="4" fill="#3B82F6" />
            <circle cx="900" cy="60" r="4" fill="#3B82F6" />
            <circle cx="1000" cy="50" r="4" fill="#3B82F6" />
          </svg>
        </div>

        <!-- Y-axis values -->
        <div class="absolute top-0 left-0 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
          <div>5%</div>
          <div>4%</div>
          <div>3%</div>
          <div>2%</div>
          <div>1%</div>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="bg-[#121212]/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 sm:p-6 mb-8 shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base sm:text-lg font-bold flex items-center gap-2">
          <i class="fas fa-list text-[#5A39F2]"></i>
          {{ t.recentTransactions }}
        </h3>
        <a href="#" @click.prevent="showTransactionHistory"
          class="text-xs text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
          <span class="hidden sm:inline">{{ t.viewFullHistory }}</span>
          <span class="sm:hidden">{{ t.viewAll }}</span>
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>

      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-full">
          <thead>
            <tr>
              <th class="text-left text-xs font-medium text-gray-400 pb-3 pl-4 sm:pl-0">{{ t.pair }}</th>
              <th class="text-left text-xs font-medium text-gray-400 pb-3 hidden sm:table-cell">{{ t.date }}</th>
              <th class="text-right text-xs font-medium text-gray-400 pb-3 pr-4 sm:pr-0">{{ t.value }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in history.slice(0, 5)" :key="item._id || idx" class="border-b border-gray-800">
              <td class="py-3 pl-4 sm:pl-0">
                <div class="flex items-center">
                  <div :class="item.payload.pnl >= 0 ? 'text-green-400' : 'text-red-400'" class="mr-2">
                    <i :class="item.payload.pnl >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
                  </div>
                  <div class="flex items-center">
                    <span class="inline-flex h-4 w-4 overflow-hidden rounded-full border border-gray-700 mr-1">
                      <!-- pode usar uma bandeira dinâmica se tiver o código -->
                      <img :src="`/flags/${item.payload.active.name.split(' ')[0].toLowerCase()}.png`"
                        :alt="item.payload.active.name" class="h-full w-full object-cover" />
                    </span>
                    <span>{{ item.payload.active.name }}</span>
                  </div>
                </div>
              </td>
              <td class="py-3 text-gray-400 text-sm hidden sm:table-cell">
                {{ new Date(item.payload.closeTime || item.createdAt).toLocaleDateString(t.language) }}
              </td>
              <td class="py-3 text-right pr-4 sm:pr-0"
                :class="item.payload.pnl >= 0 ? 'text-green-400' : 'text-red-400'">
                {{ item.payload.pnl >= 0 ? '+' : '-' }}{{ formatCurrency(Math.abs(item.payload.pnl)) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import AppLayout from '@/components/AppLayout.vue'
import Polarium from '../assets/polarium.png'
import axios from 'axios'
import { io } from 'socket.io-client'
const router = useRouter()

// State variables
const userDisplayName = ref('Usuário(a)')
const balance = ref(5000)
const accountType = ref('real')
const botStatus = ref('paused')
const isActive = ref(false)
const selectedBroker = ref('homebroker')
const history = ref([])
const GALES = ref(3)

const transactionStats = computed(() => {
  const wins = history.value.filter(tx => tx.payload.pnl > 0).length
  const losses = history.value.filter(tx => tx.payload.pnl <= 0).length
  const total = wins + losses
  const winPercent = total ? Math.round((wins / total) * 100) : 0
  const totalProfit = history.value.reduce((sum, tx) => sum + tx.payload.pnl, 0)
  return {
    wins,
    losses,
    total,
    winPercent,
    lossPercent: total ? 100 - winPercent : 0,
    totalProfit
  }
})

// Computed: estatísticas de ROI
const roiStats = computed(() => {
  const totalProfit = transactionStats.value.totalProfit
  const totalInvest = history.value.reduce((sum, tx) => sum + (tx.payload.invest || 0), 0)
  const totalROI = totalInvest ? Math.round((totalProfit / totalInvest) * 100) : 0

  const upInvest = history.value
    .filter(tx => tx.payload.pnl > 0)
    .reduce((sum, tx) => sum + tx.payload.invest, 0)
  const downInvest = history.value
    .filter(tx => tx.payload.pnl <= 0)
    .reduce((sum, tx) => sum + tx.payload.invest, 0)

  const upROI = upInvest
    ? Math.round((history.value
      .filter(tx => tx.payload.pnl > 0)
      .reduce((sum, tx) => sum + tx.payload.pnl, 0) / upInvest) * 100)
    : 0

  const downROI = downInvest
    ? Math.round((Math.abs(history.value
      .filter(tx => tx.payload.pnl <= 0)
      .reduce((sum, tx) => sum + tx.payload.pnl, 0)) / downInvest) * 100)
    : 0

  return {
    totalROI,
    upROI,
    downROI,
    winRate: transactionStats.value.winPercent
  }
})
// Language related variables
const languageNames = {
  en: 'English',
  pt: 'Português',
  es: 'Español',
  ru: 'Русский'
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    welcome: 'Welcome,',
    realAccount: 'Real account',
    demoAccount: 'Demo account',
    switchToDemo: 'Switch to Demo',
    switchToReal: 'Switch to Real',
    tradingStats: 'Trading Statistics',
    winRate: 'Win Rate',
    wins: 'Wins',
    losses: 'Losses',
    total: 'Total',
    profit: 'Profit',
    performance: 'Performance',
    lastTransactions: 'Last Transactions',
    brokers: 'Brokers',
    totalOperations: 'Total Operations',
    botStatus: 'Bot Status',
    active: 'Active',
    paused: 'Paused',
    selectBroker: 'Select broker',
    connected: 'Connected',
    start: 'Start Bot',
    stop: 'Stop Bot',
    recentTransactions: 'Recent Transactions',
    viewFullHistory: 'View full history',
    viewAll: 'View all',
    pair: 'PAIR',
    date: 'DATE',
    value: 'VALUE',
    accountGrowth: 'Account Growth',
    growth: 'Growth',
    balance: 'Balance',
    transactionHistory: 'Transaction History',
    transactionHistoryMessage: 'Soon you will be able to view your complete transaction history here.',
    ok: 'OK',
    defaultUserName: 'User',
    accumulatedProfit: 'Accumulated Profit',
    last30Days: 'Last 30 days',
    recentOperations: 'Recent Operations',
    viewHistory: 'View history',
    roi: 'ROI',
    language: 'en-US'
  },
  pt: {
    dashboard: 'Dashboard',
    welcome: 'Bem-vindo(a),',
    realAccount: 'Conta real',
    demoAccount: 'Conta demo',
    switchToDemo: 'Trocar para Demo',
    switchToReal: 'Trocar para Real',
    tradingStats: 'Estatísticas de Trading',
    winRate: 'Win Rate',
    wins: 'Vitórias',
    losses: 'Derrotas',
    total: 'Total',
    profit: 'Lucro',
    performance: 'Performance',
    lastTransactions: 'Últimas Transações',
    brokers: 'Corretoras',
    totalOperations: 'Total Operações',
    botStatus: 'Status do Bot',
    active: 'Ativo',
    paused: 'Parado',
    selectBroker: 'Selecione a corretora',
    connected: 'Conectado',
    start: 'Iniciar Bot',
    stop: 'Parar Bot',
    recentTransactions: 'Transações Recentes',
    viewFullHistory: 'Ver histórico completo',
    viewAll: 'Ver tudo',
    pair: 'PAR',
    date: 'DATA',
    value: 'VALOR',
    accountGrowth: 'Crescimento da Conta',
    growth: 'Crescimento',
    balance: 'Saldo',
    transactionHistory: 'Histórico de Transações',
    transactionHistoryMessage: 'Em breve você poderá visualizar seu histórico completo de transações aqui.',
    ok: 'OK',
    defaultUserName: 'Usuário(a)',
    accumulatedProfit: 'Lucro Acumulado',
    last30Days: 'Últimos 30 dias',
    recentOperations: 'Operações Recentes',
    viewHistory: 'Ver histórico',
    roi: 'ROI',
    language: 'pt-BR'
  },
  es: {
    dashboard: 'Panel',
    welcome: 'Bienvenido(a),',
    realAccount: 'Cuenta real',
    demoAccount: 'Cuenta demo',
    switchToDemo: 'Cambiar a Demo',
    switchToReal: 'Cambiar a Real',
    tradingStats: 'Estadísticas de Trading',
    winRate: 'Tasa de Éxito',
    wins: 'Victorias',
    losses: 'Derrotas',
    total: 'Total',
    profit: 'Beneficio',
    performance: 'Rendimiento',
    lastTransactions: 'Últimas Transacciones',
    brokers: 'Corredores',
    totalOperations: 'Total Operaciones',
    botStatus: 'Estado del Bot',
    active: 'Activo',
    paused: 'Pausado',
    selectBroker: 'Seleccione corredor',
    connected: 'Conectado',
    start: 'Iniciar Bot',
    stop: 'Detener Bot',
    recentTransactions: 'Transacciones Recientes',
    viewFullHistory: 'Ver historial completo',
    viewAll: 'Ver todo',
    pair: 'PAR',
    date: 'FECHA',
    value: 'VALOR',
    accountGrowth: 'Crecimiento de la Cuenta',
    growth: 'Crecimiento',
    balance: 'Saldo',
    transactionHistory: 'Historial de Transacciones',
    transactionHistoryMessage: 'Pronto podrás ver tu historial completo de transacciones aquí.',
    ok: 'OK',
    defaultUserName: 'Usuario(a)',
    accumulatedProfit: 'Beneficio Acumulado',
    last30Days: 'Últimos 30 días',
    recentOperations: 'Operaciones Recientes',
    viewHistory: 'Ver historial',
    roi: 'ROI',
    language: 'es-ES'
  },
  ru: {
    dashboard: 'Панель',
    welcome: 'Добро пожаловать,',
    realAccount: 'Реальный счет',
    demoAccount: 'Демо счет',
    switchToDemo: 'Переключиться на Демо',
    switchToReal: 'Переключиться на Реальный',
    tradingStats: 'Статистика торговли',
    winRate: 'Винрейт',
    wins: 'Победы',
    losses: 'Поражения',
    total: 'Всего',
    profit: 'Прибыль',
    performance: 'Производительность',
    lastTransactions: 'Последние Транзакции',
    brokers: 'Брокеры',
    totalOperations: 'Всего Операций',
    botStatus: 'Статус Бота',
    active: 'Активен',
    paused: 'Приостановлен',
    selectBroker: 'Выберите брокера',
    connected: 'Подключено',
    start: 'Запустить Бот',
    stop: 'Остановить Бот',
    recentTransactions: 'Недавние Транзакции',
    viewFullHistory: 'Посмотреть полную историю',
    viewAll: 'Показать все',
    pair: 'ПАРА',
    date: 'ДАТА',
    value: 'СУММА',
    accountGrowth: 'Рост Счёта',
    growth: 'Рост',
    balance: 'Баланс',
    transactionHistory: 'История Транзакций',
    transactionHistoryMessage: 'Скоро вы сможете просматривать полную историю транзакций здесь.',
    ok: 'ОК',
    defaultUserName: 'Пользователь',
    accumulatedProfit: 'Накопленная Прибыль',
    last30Days: 'Последние 30 дней',
    recentOperations: 'Недавние Операции',
    viewHistory: 'Просмотр истории',
    roi: 'ROI',
    language: 'ru-RU'
  }
}

const currentLanguage = ref(localStorage.getItem('language') || 'pt')
const isLanguageDropdownOpen = ref(false)

const t = computed(() => translations[currentLanguage.value])

// Watch for language changes
watch(currentLanguage, (newLang, oldLang) => {
  localStorage.setItem('language', newLang)

  // Dispatch event only if this wasn't triggered by an event
  if (newLang !== oldLang) {
    // Dispatch custom event to notify other components about language change
    setTimeout(() => {
      const event = new CustomEvent('app:language-changed', {
        detail: { language: newLang, previousLanguage: oldLang }
      })
      window.dispatchEvent(event)
    }, 0)
  }
}, { immediate: true })

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

const selectLanguage = (lang) => {
  // Store previous language
  const previousLang = currentLanguage.value

  // Update current language
  currentLanguage.value = lang

  // Update localStorage
  localStorage.setItem('language', lang)

  // Close dropdown
  isLanguageDropdownOpen.value = false

  // Dispatch custom event to notify other components about language change
  // Use setTimeout to ensure this runs after current execution
  setTimeout(() => {
    const event = new CustomEvent('app:language-changed', {
      detail: { language: lang, previousLanguage: previousLang }
    })
    window.dispatchEvent(event)
  }, 0)

  // Forçar atualização da interface
  nextTick()
}

// UI Functions
const formatCurrency = (value) => {
  const currencySettings = {
    pt: { locale: 'pt-BR', currency: 'BRL' },
    en: { locale: 'en-US', currency: 'USD' },
    es: { locale: 'es-ES', currency: 'EUR' },
    ru: { locale: 'ru-RU', currency: 'RUB' }
  }

  const { locale, currency } = currencySettings[currentLanguage.value]

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value)
}

const switchAccount = async () => {
  accountType.value = accountType.value === 'demo' ? 'real' : 'demo'

  // Fetch all balances and update according to selected account type
  try {
    const balancesData = await getAccountBalance()
    if (balancesData && Array.isArray(balancesData.balances)) {
      // Find the balance for the current account type
      const found = balancesData.balances.find(b => b.type === accountType.value)
      if (found) {
        balance.value = found.amount
      } else {
        balance.value = 0
      }
    } else {
      console.error('Failed to fetch account balances')
      balance.value = 0
    }
  } catch (error) {
    console.error('Error fetching account balances:', error)
    balance.value = 0
  }

  // Static statistics for demo/real account
  if (accountType.value === 'real') {
    transactionStats.value = {
      total: 75,
      wins: 60,
      losses: 15,
      winPercent: 80,
      lossPercent: 20,
      totalProfit: 25000
    }
    roiStats.value = {
      totalROI: 90,
      upROI: 85,
      downROI: 15,
      winRate: 80
    }
  } else {
    transactionStats.value = {
      total: 142,
      wins: 98,
      losses: 44,
      winPercent: 69,
      lossPercent: 31,
      totalProfit: 42580.75
    }
    roiStats.value = {
      totalROI: 85,
      upROI: 72,
      downROI: 28,
      winRate: 69
    }
  }
}



const toggleStatus = () => {
  isActive.value = !isActive.value
  botStatus.value = isActive.value ? 'active' : 'paused'
}

// Transaction History Modal
const showTransactionHistory = () => {
  Swal.fire({
    title: t.transactionHistory,
    text: t.transactionHistoryMessage,
    icon: 'info',
    confirmButtonColor: '#3085d6',
    confirmButtonText: t.ok
  })
}

const startSdk = async () => {
  const email = localStorage.getItem('userEmail')
  const password = localStorage.getItem('userPassword')

  if (email && password) {
    try {
      const response = await axios.post('/api/sdk/start', {
        email,
        password
      }, {
        headers: { 'Content-Type': 'application/json' }
      })
      console.log(response.data)
    } catch (error) {
      console.error('Failed to start SDK:', error)
    }
  } else {
    console.warn('No user credentials found in localStorage.')
  }
}

/**
 * Executes a digital buy order.
 * @param {Object} params - The order parameters.
 * @param {string} params.assetName - The asset name (e.g., 'EURUSD-OTC').
 * @param {number} params.operationValue - The value of the operation.
 * @param {string} params.direction - The direction ('CALL' or 'PUT').
 * @param {string} params.account_type - The account type ('real' or 'demo').
 * @returns {Promise<Object>} The response data from the API.
 */
const buyDigital = async ({ assetName, operationValue, direction, account_type }) => {
  const email = localStorage.getItem('userEmail')
  const password = localStorage.getItem('userPassword')

  if (!email || !password) {
    throw new Error('User credentials not found in localStorage.')
  }

  const payload = {
    email,
    password,
    assetName,
    operationValue,
    direction,
    account_type
  }

  try {
    const { data } = await axios.post(
      '/api/trade/digital/buy',
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    )
    return data
  } catch (error) {
    return error
  }
}

/**
 * Checks the status of an order.
 * @param {number} orderId - The order ID to check.
 * @returns {Promise<Object>} The response data from the API.
 */
const checkOrderStatus = async (orderId) => {
  const email = localStorage.getItem('userEmail')
  const password = localStorage.getItem('userPassword')

  if (!email || !password) {
    throw new Error('User credentials not found in localStorage.')
  }

  // Ensure orderId is a number
  const numericOrderId = Number(orderId)

  if (isNaN(numericOrderId)) {
    throw new Error('orderId must be a number')
  }

  try {
    const { data } = await axios.get(
      '/api/order',
      {
        params: { email, password, orderId: numericOrderId }
      }
    )
    return data
  } catch (error) {
    console.error('[checkOrderStatus] API error:', error)
    return error
  }
}

/**
 * Fetches the account balance from the backend API.
 * @returns {Promise<Object>} The response data containing the balance.
 */
const getAccountBalance = async () => {
  const email = localStorage.getItem('userEmail')
  const password = localStorage.getItem('userPassword')

  if (!email || !password) {
    throw new Error('User credentials not found in localStorage.')
  }

  try {
    const { data } = await axios.post(
      '/api/account/balance',
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    )
    return data
  } catch (error) {
    console.error('[getAccountBalance] API error:', error)
    throw error
  }
}

const getHistory = async () => {
  const email = localStorage.getItem('userEmail')

  if (!email) {
    throw new Error('User credentials not found in localStorage.')
  }

  try {
    const { data } = await axios.get(
      '/api/order/history',
      {
        params: { email },
        headers: { 'Content-Type': 'application/json' }
      }
    )
    return data
  } catch (error) {
    console.error('[getHistory] API error:', error)
    throw error
  }
}

const updateBalance = async () => {
  try {
    const balancesData = await getAccountBalance()
    if (balancesData && Array.isArray(balancesData.balances)) {

      const found = balancesData.balances.find(b => b.type === accountType.value)
      if (found) {

        balance.value = found.amount
        console.log('Balance updated:', balance.value)
      } else {
        balance.value = 0
      }
    } else {
      console.error('Failed to fetch account balances')
      balance.value = 0
    }
  } catch (error) {
    console.error('Error fetching account balances:', error)
    balance.value = 0
  }
}




// Component Initialization
onMounted(async () => {

  try {
    await startSdk()
  } catch (error) {
    console.error('Erro ao iniciar SDK:', error)
  }

  await switchAccount()
  try {
    const historyData = await getHistory()
    history.value = Array.isArray(historyData) ? historyData : []
  } catch (err) {
    console.error('Erro ao buscar histórico:', err)
    history.value = []
  }
  console.log('Transaction History:', history.value)
  await updateBalance()




  /* let data
  try {
    data = await buyDigital({
    assetName: 'EURUSD-OTC',
    operationValue: 10,
    direction: 'CALL',
    account_type: 'demo'
    })
  } catch (error) {
    console.error('Erro ao executar buyDigital:', error)
  }

  try {
    const result = await checkOrderStatus(data.order.id)
    console.log('Order Status:', result)
  } catch (error) {
    console.error('Erro ao verificar status da ordem:', error)
  } */

  const storedName = localStorage.getItem('userName')
  if (storedName) {
    userDisplayName.value = storedName
  } else {
    // Default name based on language
    userDisplayName.value = t.defaultUserName
  }


  // Close language dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const languageDropdown = document.querySelector('.language-dropdown')
    if (languageDropdown && !languageDropdown.contains(e.target)) {
      isLanguageDropdownOpen.value = false
    }
  })

  // Listen for language changes from other components
  window.addEventListener('app:language-changed', (event) => {
    if (event.detail && event.detail.language && event.detail.language !== currentLanguage.value) {
      currentLanguage.value = event.detail.language
    }
  })

  // --- Webhook ---

  const socket = io('https://api-polarium.gbetss.com.br', {
    path: '/socket.io',
    transports: ['polling'],
    secure: true
  })

  socket.on('connect', async () => {
    console.log('Socket.io conectado para webhook!')
  })

  socket.on('trade', async (data) => {
    console.log('Nova transação recebida:', data)
    if (!data) {
      console.error('Dados inválidos recebidos no webhook:', data)
      return
    }

    if (!data.pair || !data.direction) {
      console.error('Dados incompletos recebidos no webhook:', data)
      return
    }
    if (!['CALL', 'PUT'].includes(data.direction)) {
      console.error('Direção inválida recebida no webhook:', data.direction)
      return
    }
    if (!accountType.value) {
      console.error('Tipo de conta não definido:', accountType.value)
      return
    }
    if (balance.value <= 0) {
      console.error('Saldo insuficiente para realizar operações.')
      return
    }
    console.log(`Iniciando operação para ${data.pair} com direção ${data.direction} na conta ${accountType.value}`)

    const maxAttempts = GALES.value + 1
    let operationValue = Math.max(1, Math.floor(balance.value * 0.1))
    let orderId = null
    await updateBalance()


    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`Tentativa ${attempt} — valor de operação: ${operationValue}`)
        orderId = await buyDigital({
          assetName: data.pair,
          operationValue: operationValue,
          direction: data.direction,
          account_type: accountType.value
        })
        console.log('Ordem executada:', orderId)

        const orderStatus = await checkOrderStatus(orderId.order.id)
        console.log('Status da ordem verificado:', orderStatus)

        if (!orderStatus || !orderStatus.status) {
          console.error('Erro ao verificar status da ordem:', orderStatus)
          break
        }

        console.log(`Resultado PnL: ${orderStatus.pnl}`)

        if (orderStatus.pnl >= 0) {

          console.log('Operação bem-sucedida, não serão mais tentativas.')
          break
        }

        if (attempt < maxAttempts) {
          operationValue *= 2
          const historyData = await getHistory()
          history.value.push(
            historyData.find(item => item.orderId === orderId.order.id) || {}
          )
        } else {
          console.log('Máximo de tentativas alcançado.')
        }

      } catch (err) {
        console.error('Erro durante a tentativa:', err)
        break
      }
    }
    await new Promise(resolve => setTimeout(resolve, 1500))

    const historyData = await getHistory()
    history.value.push(
      historyData.find(item => item.orderId === orderId.order.id) || {}
    )
    await updateBalance()

  })


  socket.on('disconnect', async () => {
    console.log('Socket.io desconectado do webhook.')
  })




})

onUnmounted(async () => {
  // Remove event listeners
  document.removeEventListener('click', (e) => {
    const languageDropdown = document.querySelector('.language-dropdown')
    if (languageDropdown && !languageDropdown.contains(e.target)) {
      isLanguageDropdownOpen.value = false
    }
  })

  window.removeEventListener('app:language-changed', (event) => {
    if (event.detail && event.detail.language && event.detail.language !== currentLanguage.value) {
      currentLanguage.value = event.detail.language
    }
  })

  // Stop SDK on page close
  const email = localStorage.getItem('userEmail')
  if (email) {
    try {
      await axios.delete('/api/sdk/stop', {
        data: { email },
        headers: { 'Content-Type': 'application/json' }
      })
      console.log('SDK stopped successfully.')
    } catch (error) {
      console.error('Failed to stop SDK:', error)
    }
  }
})


</script>

<style scoped>
/* Additional styles for tab selectors */
.tab-button {
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.tab-button:hover {
  background-color: rgba(55, 65, 81, 0.5);
}

.tab-button.active {
  background-color: rgba(90, 57, 242, 0.2);
  color: #5A39F2;
}
</style>