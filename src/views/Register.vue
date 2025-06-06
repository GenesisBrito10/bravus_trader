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
      </div>
   -->
      <div class="mb-8">
        <img :src="logoUrl" class="w-60 h-30">
      </div>
  
      <!-- Register Form -->
      <div class="w-full max-w-md bg-black p-8 rounded-2xl">
        <h2 class="text-white text-2xl font-bold text-center mb-8">{{ t.createAccount }}</h2>
        
        <div class="space-y-6">
          <div class="relative">
            <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input 
              type="text" 
              v-model="firstName"
              :placeholder="t.firstName" 
              class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-gray-600 transition-colors"
            >
          </div>

          <div class="relative">
            <i class="fas fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <input 
              type="text" 
              v-model="lastName"
              :placeholder="t.lastName" 
              class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-gray-600 transition-colors"
            >
          </div>

          <div class="relative">
            <i class="fas fa-globe absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
            <select
              v-model="country"
              class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-gray-600 transition-colors appearance-none"
            >
              <option value="Brasil">
                <img src="/flags/br.svg" class="w-5 h-5 rounded-sm" alt="Brasil">
                Brasil
              </option>
            </select>
          </div>
          
          <p class="text-gray-400 text-sm">{{ t.confirmResidency }}</p>

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
              @input="validatePassword"
              :placeholder="t.password" 
              class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-xl focus:outline-none focus:border-gray-600 transition-colors"
            >
          </div>

          <div class="flex">
            <div class="relative w-1/3">
              <i class="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <select
                v-model="phoneCode"
                class="w-full bg-black border border-gray-800 text-white p-4 pl-12 rounded-l-xl focus:outline-none focus:border-gray-600 transition-colors appearance-none"
              >
                <option value="+55">
                  <img src="/flags/br.svg" class="w-5 h-5 rounded-sm" alt="Brasil">
                  +55
                </option>
              </select>
            </div>
            <input 
              type="tel" 
              v-model="phoneNumber"
              :placeholder="t.phoneNumber" 
              class="w-full bg-black border border-gray-800 text-white p-4 rounded-r-xl focus:outline-none focus:border-gray-600 transition-colors border-l-0"
            >
          </div>

          <div class="flex items-start">
            <input 
              type="checkbox" 
              id="termsCheckbox" 
              v-model="termsAccepted"
              class="mt-1"
            >
            <label for="termsCheckbox" class="ml-2 text-gray-400 text-sm">
              {{ t.confirmAge }}
              <a href="#" class="text-blue-500 hover:text-blue-400">{{ t.termsAndConditions }}</a>,
              <a href="#" class="text-blue-500 hover:text-blue-400">{{ t.privacyPolicy }}</a>
              {{ t.and }}
              <a href="#" class="text-blue-500 hover:text-blue-400">{{ t.executionPolicy }}</a>
            </label>
          </div>
  
          <button 
            @click="handleRegister"
            :disabled="isLoading || !isFormValid"
            class="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 bg-[#3cd45b] hover:opacity-90 flex items-center justify-center"
            :class="{'opacity-50 cursor-not-allowed': !isFormValid}"
          >
            <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <i v-else class="fas fa-user-plus mr-2"></i>
            {{ isLoading ? t.creatingAccount : t.openFreeAccount }}
          </button>
  
          <div class="text-center">
            <router-link to="/login" class="text-gray-400 text-sm hover:text-white transition-colors inline-flex items-center">
              <i class="fas fa-arrow-left mr-2"></i>
              {{ t.backToLogin }}
            </router-link>
          </div>
          
          <!-- Compatible Brokers -->
          <div class="mt-4 text-center">
            <p class="text-gray-500 text-sm mb-4">{{ t.compatibleBrokers }}</p>
            <div class="flex justify-center items-center gap-8">
              <img :src="Polarium" alt="Polarium" class="h-6 opacity-70 hover:opacity-100 transition-opacity">
            </div>
          </div>
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
  const firstName = ref('')
  const lastName = ref('')
  const country = ref('Brasil')
  const email = ref('')
  const password = ref('')
  const phoneCode = ref('+55')
  const phoneNumber = ref('')
  const termsAccepted = ref(false)
  const isLoading = ref(false)
  const currentLanguage = ref(localStorage.getItem('language') || 'pt')
  const isLanguageDropdownOpen = ref(false)
  const hasMinLength = ref(false)
  const hasNumber = ref(false)
  
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
  
  const validatePassword = () => {
    hasMinLength.value = password.value.length >= 8
    hasNumber.value = /\d/.test(password.value)
  }
  
  const isFormValid = computed(() => {
    return firstName.value && lastName.value && email.value && password.value && 
           phoneNumber.value && termsAccepted.value && hasMinLength.value && hasNumber.value
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
  
  const handleRegister = async (event) => {
    event.preventDefault()
    
    if (!isFormValid.value) {
      showToast(t.value.fillFields, true)
      return
    }
  
    try {
      isLoading.value = true
      const response = await axios.post('/api/register', {
        firstName: firstName.value,
        lastName: lastName.value,
        country: country.value,
        email: email.value,
        password: password.value,
        phoneNumber: phoneCode.value + phoneNumber.value
      })
  
      showToast(t.value.accountCreated)
      setTimeout(() => {
        router.push('/login')
      }, 1000)
    } catch (error) {
      console.error('Register error:', error)
      showToast(error.response?.data?.error || t.value.errorCreating, true)
    } finally {
      isLoading.value = false
    }
  }
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