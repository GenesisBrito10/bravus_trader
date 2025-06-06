<template>
  <div class="bg-pattern text-white min-h-screen relative overflow-hidden">
    <!-- Efeito de glow nas bordas -->
    <div class="absolute inset-0 bg-gradient-radial from-[#5A39F2]/20 via-transparent to-transparent opacity-50"></div>
    <div class="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-[#5A39F2]/20 via-transparent to-transparent opacity-40 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-[#5A39F2]/10 via-transparent to-transparent opacity-40 blur-3xl"></div>
    <div class="relative z-10">
      <!-- Mobile Menu Button -->
      <button @click="toggleSidebar"
        class="fixed top-4 right-4 z-[60] p-3 bg-[#121212]/80 border border-gray-700 rounded-lg md:hidden text-white hover:bg-[#1A1A1A] transition-colors">
        <i :class="['fas', isSidebarOpen ? 'fa-times' : 'fa-bars', 'text-xl']"></i>
      </button>

      <!-- Mobile Overlay -->
      <transition name="fade">
        <div v-if="isSidebarOpen" @click="toggleSidebar"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[45] md:hidden"></div>
      </transition>

      <div class="flex min-h-screen">
        <!-- Sidebar -->
        <transition name="slide">
          <aside :class="[
            'fixed md:static w-64 bg-[#121212]/80 shadow-xl flex flex-col m-4 rounded-3xl border border-gray-700 backdrop-blur-xl z-[55] h-[calc(100vh-2rem)] md:h-[calc(100vh-2rem)]',
            { 'translate-x-0': isSidebarOpen },
            { 'md:translate-x-0': !isSidebarOpen }
          ]">
            <div class="p-6 mb-4 flex items-center">
              <img :src="logoUrl" alt="AiBot" class="h-8 w-25">
            </div>

            <nav class="flex-1 px-4 space-y-2 overflow-y-auto pb-4">
              <router-link to="/dashboard"
                class="flex items-center space-x-3 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200"
                :class="{ 'bg-[#1A1A1A] border-l-4 border-[#5A39F2]': $route.path === '/dashboard' }">
                <div class="w-8 h-8 bg-gradient-to-r from-[#5A39F2] to-blue-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-home"></i>
                </div>
                <span class="font-medium">{{ t.dashboard }}</span>
              </router-link>

              <a href="https://www.homebroker.com/pt/invest" target="_blank"
                class="flex items-center space-x-3 text-gray-400 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200">
                <div class="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-chart-line text-white"></i>
                </div>
                <span class="font-medium">{{ t.tradeStation }}</span>
                <i class="fas fa-external-link-alt ml-auto text-xs"></i>
              </a>

              <a href="https://www.homebroker.com/pt/deposit" target="_blank"
                class="flex items-center space-x-3 text-gray-400 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200">
                <div class="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-wallet text-white"></i>
                </div>
                <span class="font-medium">{{ t.deposit }}</span>
                <i class="fas fa-external-link-alt ml-auto text-xs"></i>
              </a>

              <a href="https://www.homebroker.com/pt/my-account/withdraw" target="_blank"
                class="flex items-center space-x-3 text-gray-400 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200">
                <div class="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                  <i class="fas fa-money-bill-alt text-white"></i>
                </div>
                <span class="font-medium">{{ t.withdraw }}</span>
                <i class="fas fa-external-link-alt ml-auto text-xs"></i>
              </a>

              <div class="pt-4 mt-4 border-t border-gray-800/50 space-y-2">
                <router-link to="/settings"
                  class="flex items-center space-x-3 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200"
                  :class="{ 'bg-[#1A1A1A] border-l-4 border-[#5A39F2]': $route.path === '/settings' }">
                  <div class="w-8 h-8 bg-gray-700 rounded-xl flex items-center justify-center">
                    <i class="fas fa-cog text-white"></i>
                  </div>
                  <span class="font-medium">{{ t.settings }}</span>
                </router-link>

                <router-link to="/tutorials"
                  class="flex items-center space-x-3 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200"
                  :class="{ 'bg-[#1A1A1A] border-l-4 border-[#5A39F2]': $route.path === '/tutorials' }">
                  <div class="w-8 h-8 bg-gray-700 rounded-xl flex items-center justify-center">
                    <i class="fas fa-book text-white"></i>
                  </div>
                  <span class="font-medium">{{ t.tutorials }}</span>
                </router-link>

                <a href="https://t.me/SuporteAiBote" target="_blank"
                  class="flex items-center space-x-3 text-gray-400 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200">
                  <div class="w-8 h-8 bg-gray-700 rounded-xl flex items-center justify-center">
                    <i class="fas fa-headset text-white"></i>
                  </div>
                  <span class="font-medium">{{ t.support }}</span>
                </a>

                <a href="https://t.me/AiBote" target="_blank"
                  class="flex items-center space-x-3 text-gray-400 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200">
                  <div class="w-8 h-8 bg-gray-700 rounded-xl flex items-center justify-center">
                    <i class="fas fa-paper-plane text-white"></i>
                  </div>
                  <span class="font-medium">{{ t.community }}</span>
                  <i class="fas fa-external-link-alt ml-auto text-xs"></i>
                </a>

                <a @click="logout" href="#"
                  class="flex items-center space-x-3 text-gray-400 hover:bg-[#1A1A1A] p-3 rounded-xl transition-all duration-200">
                  <div class="w-8 h-8 bg-gray-700 rounded-xl flex items-center justify-center">
                    <i class="fas fa-sign-out-alt text-white"></i>
                  </div>
                  <span class="font-medium">{{ t.logout }}</span>
                </a>
              </div>
            </nav>
          </aside>
        </transition>

        <!-- Main Content -->
        <main class="flex-1 p-4 md:p-8 mt-4">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '../assets/logo.png'
import { translations } from '@/locales'

const router = useRouter()
const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = () => {
  localStorage.clear()
  router.push('/login')
}

// Sistema de tradução
const currentLanguage = ref(localStorage.getItem('language') || 'pt')

// Escuta mudanças de idioma vindas de outros componentes
const updateLanguageFromEvent = (event) => {
  if (event.detail && event.detail.language) {
    currentLanguage.value = event.detail.language
  }
}

// Computed property para traduções
const t = computed(() => {
  return translations[currentLanguage.value]
})

// Lifecycle hooks
onMounted(() => {
  // Add direct event listener for language changes
  window.addEventListener('app:language-changed', updateLanguageFromEvent)
})

// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('app:language-changed', updateLanguageFromEvent)
})
</script>

<style scoped>
.bg-pattern {
  background-color: #0c0c0f;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(90, 57, 242, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(90, 57, 242, 0.05) 0%, transparent 50%),
    linear-gradient(180deg, #0c0c0f 0%, #12121a 100%);
  position: relative;
  overflow: hidden;
}

/* Ajustes para o menu mobile */
@media (max-width: 768px) {
  aside {
    position: fixed;
    left: 0;
    top: 0;
    max-height: 90vh;
    height: auto;
    width: 280px;
    transform: translateX(-100%);
    transition: all 0.3s ease-in-out;
    z-index: 50;
    visibility: hidden;
    opacity: 0;
    overflow-y: auto;
    margin: 1rem;
    border-radius: 1.5rem;
  }

  aside.translate-x-0 {
    transform: translateX(0);
    visibility: visible;
    opacity: 1;
  }

  aside.translate-x-full {
    transform: translateX(-100%);
    visibility: hidden;
    opacity: 0;
  }
}

/* Transições */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
}
</style>