<template>
    <div class="bg-pattern min-h-screen flex flex-col items-center justify-center px-4 relative">
      <!-- Language Selector -->
      <!-- <div class="absolute top-4 right-4">
        <div class="relative language-dropdown">
          <button 
            @click="toggleLanguageDropdown"
            class="flex items-center space-x-2 bg-[#0a0a1f] border border-gray-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none hover:border-gray-600 transition-colors text-sm"
          >
            <img 
              :src="`/flags/${currentLanguage}.svg`"
              class="w-5 h-5 rounded-sm"
              :alt="languageNames[currentLanguage]"
            >
            <span class="mx-2">{{ languageNames[currentLanguage] }}</span>
            <i class="fas fa-chevron-down text-xs"></i>
          </button>
  
          <div 
            v-show="isLanguageDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-[#0a0a1f] border border-gray-800 rounded-lg shadow-lg py-1 z-50"
          >
            <button 
              v-for="(name, code) in languageNames" 
              :key="code"
              @click="selectLanguage(code)"
              class="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
            >
              <img :src="`/flags/${code}.svg`" class="w-5 h-5 rounded-sm" :alt="name">
              <span class="ml-2">{{ name }}</span>
            </button>
          </div>
        </div>
      </div> -->
  
      <div class="mb-8">
        <img :src="logoUrl" class="w-60 h-30">
      </div>
  
      <!-- Login Form -->
      <div class="w-full max-w-md bg-black p-8 rounded-2xl">
        <h2 class="text-white text-2xl font-bold text-center mb-8">{{ t.login }}</h2>
        
        <div class="space-y-6">
          <div class="relative">
            <i class="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input 
              type="email" 
              v-model="email"
              :placeholder="t.email" 
              class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-gray-600 transition-colors"
            >
          </div>
  
          <div class="relative">
            <i class="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input 
              type="password" 
              v-model="password"
              :placeholder="t.password" 
              class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-gray-600 transition-colors"
            >
          </div>
  
          <!-- <div class="text-center">
            <a href="#" class="text-gray-400 text-sm hover:text-white transition-colors">
              <i class="fas fa-key mr-2 text-xs"></i>{{ t.passwordRecovery }}
            </a>
          </div> -->
  
          <button 
            @click="handleLogin"
            :disabled="isLoading"
            class="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-[#3cd45b] hover:opacity-90 flex items-center justify-center"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <i v-else class="fas fa-sign-in-alt mr-2"></i>
            {{ isLoading ? t.signingIn : t.signIn }}
          </button>
  
          <button 
            @click="$router.push('/register')"
            class="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-black border border-gray-800 hover:bg-gray-900 flex items-center justify-center"
          >
            <i class="fas fa-user-plus mr-2"></i>
            {{ t.createAccount }}
          </button>
        </div>
      </div>
  
      <!-- Compatible Brokers -->
      <div class="mt-8 text-center">
        <p class="text-gray-500 text-sm mb-4">{{ t.compatibleBrokers }}</p>
        <div class="flex justify-center items-center gap-8">
          <img :src="Polarium" alt="Polarium" class="h-6 opacity-70 hover:opacity-100 transition-opacity">
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import logoUrl from '../assets/logo.png'
  import Polarium from '../assets/polarium.png'

  import { translations, languageNames } from '@/locales'
  
  const router = useRouter()
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const currentLanguage = ref(localStorage.getItem('language') || 'pt')
  const isLanguageDropdownOpen = ref(false)
  
  const t = computed(() => translations[currentLanguage.value])
  
  const toggleLanguageDropdown = () => {
    isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
  }
  
  const selectLanguage = (lang) => {
    currentLanguage.value = lang
    localStorage.setItem('language', lang)
    isLanguageDropdownOpen.value = false
  }
  
  onMounted(() => {
    document.addEventListener('click', (e) => {
      const dropdown = document.querySelector('.language-dropdown')
      if (dropdown && !dropdown.contains(e.target)) {
        isLanguageDropdownOpen.value = false
      }
    })
  })
  
  const showToast = (message, isError = false) => {
    Swal.fire({
      text: message,
      icon: isError ? 'error' : 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: 'rgba(26, 31, 53, 0.95)',
      color: '#fff',
      customClass: {
        popup: 'custom-toast ' + (isError ? 'error' : 'success')
      }
    })
  }

  
  
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      isLoading.value = true

      // Save credentials to localStorage
      localStorage.setItem('userEmail', email.value)
      localStorage.setItem('userPassword', password.value)

      // Try to start SDK (login)
      const response = await axios.post('/api/sdk/start', {
        email: email.value,
        password: password.value
      }, {
        headers: { 'Content-Type': 'application/json' }
      })

      if (response.status === 200) {
        showToast(t.value.loginSuccess)
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      } else {
        showToast(t.value.loginError, true)
      }
    } catch (error) {
      console.error('Login error:', error)
      // Check for array of messages in error response
      const messages = error.response?.data?.message
      if (Array.isArray(messages) && messages.length > 0) {
        messages.forEach(msg => showToast(msg, true))
      } else {
        showToast(error.response?.data?.error || t.value.loginError, true)
      }
    } finally {
      isLoading.value = false
    }
  }
  
  /* document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  },);
  
  document.addEventListener("keydown", function (e) {
    if (e.key === "F12") {
      e.preventDefault();
    }
    // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "I") {
      e.preventDefault();
    }
    // Ctrl+Shift+J
    if (e.ctrlKey && e.shiftKey && e.key.toUpperCase() === "J") {
      e.preventDefault();
    }
    // Ctrl+U
    if (e.ctrlKey && e.key.toUpperCase() === "U") {
      e.preventDefault();
    }
  }); */
  </script>
  
  <style scoped>
  .bg-pattern {
    background: #000000;
    position: relative;
    overflow: hidden;
  }
  
  .bg-pattern::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(100% 50% at left center, rgba(60, 212, 91, 0.15), transparent),
      radial-gradient(100% 50% at right center, rgba(60, 212, 91, 0.15), transparent);
    pointer-events: none;
  }
  
  .bg-pattern::after {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(50% 100% at top center, rgba(60, 212, 91, 0.15), transparent),
      radial-gradient(50% 100% at bottom center, rgba(60, 212, 91, 0.15), transparent);
    pointer-events: none;
  }
  
  @keyframes moveGlow {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.5;
    }
  }
  
  .input-style {
    background: black;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  
  .input-style:focus {
    background: rgba(0, 0, 0, 0.7);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  .custom-toast {
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    border-radius: 8px;
    padding: 12px 24px;
  }
  
  .custom-toast.success {
    border-left: 4px solid #10B981;
  }
  
  .custom-toast.error {
    border-left: 4px solid #EF4444;
  }
  </style> 