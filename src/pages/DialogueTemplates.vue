<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

import { useDialogueTemplatesStore } from '@/stores/dialogueTemplatesStore';
import { useProjectStore } from '@/stores/projectStore';

import SidebarNavigation from '@/components/Sidebar/SidebarNavigation.vue';
import ProjectRowForm from '@/components/Project/ProjectRow/ProjectRowForm.vue'
import DialogueTemplateList from '@/components/DialogueTemplate/DialogueTemplateList.vue';

const toast = useToast();
const dialogueTemplatesStore = useDialogueTemplatesStore();
const projectStore = useProjectStore();
const dialogueTemplates = ref([]);
const isDialogueTemplatesLoading = ref(true);
const projects = ref([]);
const chosenDialogueTemplate = ref({});

onMounted(async () => {
  const { response, error } = await dialogueTemplatesStore.getDialogueTemplates();
  if (error.value) {
    toast.error('Что-то пошло не так...');
  } else {
    isDialogueTemplatesLoading.value = false;
    dialogueTemplates.value = response.value.data;
  }
});

const showProjectsListModal = ref(false);
const openProjectsListForm = () => {
  showProjectsListModal.value = true;
};
const closeProjectsListModal = () => {
  showProjectsListModal.value = false;
};

const handleCreateDialogueFromTemplateEvent = async (dialogueTemplate) => {
  const { response, error } = await projectStore.getUserProjects();
  if (error.value) {
    toast.error('Что-то пошло не так...');
    return;
  };
  
  projects.value = response.value.data;
  if (projects.value.length === 0) {
    toast.error('Вы еще не создали ни одного чат-бота!');
    return;
  };
  
  projects.value = projects.value.filter(p => p.dialogues.length < 10);
  if (projects.value.length === 0) {
    toast.error('Все ваши чат-боты имеют максимальное количество диалогов!');
    return;
  };

  chosenDialogueTemplate.value = dialogueTemplate;
  openProjectsListForm();
};

const handleChooseProjectEvent = async (project) => {
  const { response, error } = await dialogueTemplatesStore.createDialogueFromTemplate(project.project_id, chosenDialogueTemplate.value.template_id);
  if (error.value) {
    toast.error(error.value.response.data.detail);
  } else {
    toast.success('Диалог создан с помощью шаблона');
  }
  closeProjectsListModal();
};
</script>

<template>
  <AppModal
    v-if="showProjectsListModal"
    @close-modal="closeProjectsListModal"
  >
    <ProjectRowForm
      :projects="projects"
      @choose-project="handleChooseProjectEvent"
    >
      Добавить диалог в чат-бота
    </ProjectRowForm>
  </AppModal>

  <SidebarNavigation/>
  <main>
    <div class="container">
      <div class="page__content">
        <div class="page__header">
          <h1 class="header__title">📋 Шаблоны диалогов</h1>
        </div>
        <p class="page__hint">
          Шаблоны помогают быстро добавить в чат-бота заготовленный диалог, решающий определенную задачу. При необходимости вы  можете изменить содержимое созданного из шаблона диалога под свои нужды.
        </p>
        <DialogueTemplateList
          v-if="!isDialogueTemplatesLoading"
          :dialogue-templates="dialogueTemplates"
          @create-dialogue="handleCreateDialogueFromTemplateEvent"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.page__header {
  margin: 40px 0px 28px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  font-size: 32px;
  line-height: 40px;
}

.page__hint {
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  letter-spacing: 0.75px;
  color: var(--body-text);
  margin-bottom: 28px;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .page__header {
    margin: 28px 0px 20px 0px;
  }

  .header__title {
    font-size: 28px;
    line-height: 1.2;
  }

  .page__hint {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 20px;
  }
}

@media (max-width: 767px) {
  .page__header {
    margin: 18px 0px 12px 0px;
  }

  .header__title {
    font-size: 24px;
    line-height: 1.2;
  }

  .page__hint {
    font-size: 14px;
    line-height: 1.4;
    letter-spacing: 0.5px;
    margin-bottom: 16px;
    width: 100%;
  }
}
</style>