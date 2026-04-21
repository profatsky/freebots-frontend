import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const usePluginsStore = defineStore('plugins', {
  state: () => ({
    plugins: [],
    currentPlugin: null,
    isLoading: false,
  }),

  actions: {
    async getPlugins() {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get('/plugins')
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.plugins = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async getPlugin(pluginId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get(`/plugins/${pluginId}`)
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.currentPlugin = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async addPluginToProject(projectId, pluginId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);

      await apiClient.post(`/projects/${projectId}/plugins`, { plugin_id: pluginId })
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    }
  }
});
