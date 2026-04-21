import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/api/apiClient';

const normalizeProject = (project) => ({
  ...project,
  dialogues: Array.isArray(project?.dialogues) ? project.dialogues : [],
  plugins: Array.isArray(project?.plugins) ? project.plugins : [],
});

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    isLoading: false,
  }),

  actions: {
    async getUserProjects() {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.get('/projects')
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.projects = res.data.map(normalizeProject);
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async createProject() {
      if (this.projects.length >= 5) {
        throw new Error('У вас максимальное количество чат-ботов!');
      }
      
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.post('/projects', {
        name: 'Новый чат-бот',
        start_message: '',
        start_keyboard_type: 'reply_keyboard',
      })
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.projects.push(normalizeProject(res.data));
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async updateProject(editedProject) {
      const { response, error } = await apiClient.put(`/projects/${editedProject.project_id}`, {
        name: editedProject.name,
        start_message: editedProject.start_message,
        start_keyboard_type: editedProject.start_keyboard_type,
      })
      .then(res => ({ response: res, error: null }))
      .catch(err => ({ response: null, error: err }));

      if (!error) {
        const index = this.projects.findIndex(p => p.project_id === editedProject.project_id);
        if (index !== -1) {
          this.projects[index] = { ...editedProject };
        }
      }
    },

    async deleteProject(projectId) {
      this.isLoading = true;
      const response = ref(null);
      const error = ref(null);
      
      await apiClient.delete(`/projects/${projectId}`)
      .then(res => {
        response.value = res;
        if (!error.value) {
          this.projects = this.projects.filter(p => p.project_id !== projectId);
        }
      })
      .catch(err => error.value = err);

      this.isLoading = false;
      return { response, error };
    },

    async removePluginFromProject(projectId, pluginId) {
      const { response, error } = await apiClient.delete(`/projects/${projectId}/plugins/${pluginId}`)
      .then(res => ({ response: res, error: null }))
      .catch(err => ({ response: null, error: err }));

      return { response, error };
    },

    async downloadCode(projectId) {
      const { response, error } = await apiClient.get(`/projects/${projectId}/code`, {
        responseType: 'blob'
      })
      .then(res => ({ response: res, error: null }))
      .catch(err => ({ response: null, error: err }));

      if (!error) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'bot.zip');
        document.body.appendChild(link);
        link.click();
      } else {
        const errorMessage = JSON.parse(await error.response.data.text()).detail
        throw new Error(errorMessage);
      }
    }
  }
});
