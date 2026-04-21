import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const useUsersStore = defineStore('users', {
  state: () => ({
    userProfile: null,
    isLoading: false,
  }),

  actions: {
    async getUserProfile() {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get('/users/me')
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.userProfile = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    }
  }
});
