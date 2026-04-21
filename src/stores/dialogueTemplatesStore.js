import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const useDialogueTemplatesStore = defineStore('dialogueTemplates', {
  state: () => ({
    templates: [],
    currentTemplate: null,
    isLoading: false,
  }),

  actions: {
    async getDialogueTemplates() {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get('/templates')
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.templates = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async getDialogueTemplate(templateId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get(`/templates/${templateId}`)
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.currentTemplate = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async createDialogueFromTemplate(projectId, templateId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);

      await apiClient.post(`/projects/${projectId}/templates`, { template_id: templateId })
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    }
  }
});
