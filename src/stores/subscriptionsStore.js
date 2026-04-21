import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const useSubscriptionsStore = defineStore('subscriptions', {
  state: () => ({
    subscriptions: [],
    activeSubscription: null,
    isLoading: false,
  }),

  actions: {
    async getUserSubscriptions(userId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get(`/users/${userId}/subscriptions`)
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.subscriptions = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async getActiveSubscription(userId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get(`/users/${userId}/subscriptions/active`)
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.activeSubscription = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },
    async adminCreateSubscription(userId, durationDays, tariff = 'pro') {
      this.isLoading = true;
      const error = ref(null);
      
      await apiClient.post(`/users/${userId}/subscriptions`, {
        tariff,
        duration_days: durationDays,
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response: ref(null), error };
    },
  }
});
