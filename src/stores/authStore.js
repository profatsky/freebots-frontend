import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';
import router from '@/router/router.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('access_token'),
    isLoading: false,
  }),

  actions: {
    async loginViaTelegram(code) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);

      await apiClient.post('/login_via_telegram', {
        code: code,
      })
      .then(res => {
        response.value = res;

        if (res.data.access_token) {
          localStorage.setItem('access_token', res.data.access_token);
          this.isAuthenticated = true;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    logoutUser() {
      localStorage.removeItem('access_token');
      this.isAuthenticated = false;
      router.push('/');
    }
  }
});
