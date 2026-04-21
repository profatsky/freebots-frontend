import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export const useDialoguesStore = defineStore('dialogues', {
  state: () => ({
    dialogues: [],
    isLoading: false,
  }),

  actions: {
    async createDialogue(projectID, triggerEventType, triggerValue) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.post(`/projects/${projectID}/dialogues`, {
        project_id: projectID,
        trigger: {
          event_type: triggerEventType,
          value: triggerValue,
        }
      })
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async updateDialogueTrigger(projectID, dialogueID, triggerEventType, triggerValue) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.put(`/projects/${projectID}/dialogues/${dialogueID}`, {
        project_id: projectID, 
        dialogue_id: dialogueID, 
        event_type: triggerEventType, 
        value: triggerValue,
      })
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async deleteDialogue(projectID, dialogueID) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.delete(`/projects/${projectID}/dialogues/${dialogueID}`)
      .then(res => response.value = res)
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    }
  }
});
