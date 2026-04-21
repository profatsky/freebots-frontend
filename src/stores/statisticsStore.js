import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    statistics: null,
    isLoading: false,
  }),

  actions: {
    async getStatistics() {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get('/statistics')
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.statistics = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    }
  }
});
