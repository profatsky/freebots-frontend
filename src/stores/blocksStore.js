import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const useBlocksStore = defineStore('blocks', {
  state: () => ({
    blocks: [],
    isLoading: false,
  }),

  actions: {
    async createBlock(projectId, dialogueId, block) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);

      await apiClient.post(`/projects/${projectId}/dialogues/${dialogueId}/blocks`, block)
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async getBlocks(projectId, dialogueId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);

      await apiClient.get(`/projects/${projectId}/dialogues/${dialogueId}/blocks`)
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.blocks = res.data;
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async updateBlock(projectId, dialogueId, block) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);

      await apiClient.put(`/projects/${projectId}/dialogues/${dialogueId}/blocks/${block.block_id}`, block)
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async deleteBlock(projectId, dialogueId, blockId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.delete(`/projects/${projectId}/dialogues/${dialogueId}/blocks/${blockId}`)
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async uploadImage(projectId, dialogueId, blockId, formData) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.post(
        `/projects/${projectId}/dialogues/${dialogueId}/blocks/${blockId}/upload-image`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        },
      )
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    }
  }
});
