<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import { marked } from 'marked';

import { useDialogueTemplatesStore } from '@/stores/dialogueTemplatesStore';
import { useProjectStore } from '@/stores/projectStore';
import apiClient from '@/api/apiClient';

import SidebarNavigation from '@/components/Sidebar/SidebarNavigation.vue';
import ProjectRowForm from '@/components/Project/ProjectRow/ProjectRowForm.vue'

const toast = useToast();
const route = useRoute();
const router = useRouter();
const dialogueTemplatesStore = useDialogueTemplatesStore();
const projectStore = useProjectStore();
const dialogueTemplate = ref({});
const projects = ref([]);
const readmeContent = ref('');

const renderer = new marked.Renderer();
const originalImageRenderer = renderer.image.bind(renderer);

renderer.image = (token) => {
  let href;
  
  if (typeof token === 'object') {
    href = token.href;
    
    if (href && typeof href === 'string' && !href.startsWith('http://') && !href.startsWith('https://')) {
      href = `${apiClient.defaults.baseURL}/media/${href}`;
    }
    
    return originalImageRenderer({ ...token, href });
  } else {
    href = token;
    
    if (href && typeof href === 'string' && !href.startsWith('http://') && !href.startsWith('https://')) {
      href = `${apiClient.defaults.baseURL}/media/${href}`;
    }
    
    return originalImageRenderer(href, arguments[1], arguments[2]);
  }
};

marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer,
});

onBeforeMount(async () => {
  const { response, error } = await dialogueTemplatesStore.getDialogueTemplate(route.params.templateId);
  if (error.value) {
    router.push('/templates');
  } else {
    const responseData = response.value.data;
    dialogueTemplate.value = responseData;
    
    if (responseData.readme_file_path) {
      await loadReadme(responseData.readme_file_path);
    }
  }
});

const absolutizeMediaSrcs = (html) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  el.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || '';
    if (src && !/^https?:\/\//i.test(src) && !src.startsWith('data:')) {
      img.setAttribute('src', `${apiClient.defaults.baseURL}/media/${src}`);
    }
  });
  return el.innerHTML;
};

const loadReadme = async (readmePath) => {
  try {
    const response = await apiClient.get(`/media/${readmePath}`);
    const parsedHtml = marked(response.data);
    readmeContent.value = absolutizeMediaSrcs(parsedHtml);
  } catch (error) {
    console.error('Failed to load README:', error);
    toast.error('Не удалось загрузить описание шаблона');
  }
};

const showProjectsListModal = ref(false);
const openProjectsListForm = () => {
  showProjectsListModal.value = true;
};
const closeProjectsListModal = () => {
  showProjectsListModal.value = false;
};

const handleCreateDialogueFromTemplateEvent = async () => {
  const { response, error } = await projectStore.getUserProjects();
  if (error.value) {
    toast.error(error.value.response.data.detail);
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

  openProjectsListForm();
};

const handleChooseProjectEvent = async (project) => {
  const { response, error } = await dialogueTemplatesStore.createDialogueFromTemplate(project.project_id, dialogueTemplate.value.template_id);
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
    @closeModal="closeProjectsListModal"
  >
    <ProjectRowForm
      :projects="projects"
      @choose-project="handleChooseProjectEvent"
    >
      Добавить диалог в проект
    </ProjectRowForm>
  </AppModal>

  <SidebarNavigation/>
  <main>
    <div class="container">
      <div class="page__content">
        <div class="page__header">
          <h1 class="header__title"></h1>
          <AppButton
            size="medium"
            importance="secondary"
            @click="handleCreateDialogueFromTemplateEvent"
          >
            Добавить
          </AppButton>
        </div>
        <div v-if="readmeContent" class="dialogue-template__description" v-html="readmeContent"></div>
        <div v-else-if="dialogueTemplate.description" class="dialogue-template__description" v-html="dialogueTemplate.description"></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.page__header {
  margin: 32px 0px 28px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  font-size: 32px;
  line-height: 1.2;
}

:deep(.dialogue-template__description p) {
  font-size: 16px;
  line-height: 1.4;
  color: var(--body-text);
  margin-bottom: 12px;
}

:deep(.dialogue-template__description li) {
  font-size: 16px;
  line-height: 1.4;
  color: var(--body-text);
  margin: 0px 0px 8px 20px;
}

:deep(.dialogue-template__description code) {
  background-color: var(--light-gray);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
}

:deep(.dialogue-template__description h1),
:deep(.dialogue-template__description h2),
:deep(.dialogue-template__description h3) {
  margin-top: 24px;
  margin-bottom: 12px;
  line-height: 1.3;
}

:deep(.dialogue-template__description img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px auto;
  display: block;
}

:deep(.dialogue-template__description pre) {
  background-color: #1e1e1e;
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 16px 0;
}

:deep(.dialogue-template__description pre code) {
  background-color: transparent;
  color: #d4d4d4;
  padding: 0;
}

:deep(.dialogue-template__description table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border: 1px solid var(--gray-lines);
  border-radius: 8px;
  overflow: hidden;
}

:deep(.dialogue-template__description th),
:deep(.dialogue-template__description td) {
  padding: 12px 16px;
  border: 1px solid var(--gray-lines);
  text-align: left;
  font-size: 15px;
  line-height: 1.5;
}

:deep(.dialogue-template__description th) {
  background-color: var(--light-gray);
  font-weight: 600;
  color: var(--main-black);
}

:deep(.dialogue-template__description td) {
  color: var(--body-text);
}

:deep(.dialogue-template__description blockquote) {
  border-left: 4px solid var(--primary);
  padding-left: 16px;
  margin: 16px 0;
  color: var(--body-text);
  font-style: italic;
}

:deep(.dialogue-template__description a) {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

:deep(.dialogue-template__description a:hover) {
  color: var(--primary-dark);
  text-decoration: underline;
}

:deep(.dialogue-template__description hr) {
  border: none;
  border-top: 2px solid var(--gray-lines);
  margin: 24px 0;
}

:deep(.dialogue-template__description strong) {
  font-weight: 600;
  color: var(--main-black);
}

:deep(.dialogue-template__description em) {
  font-style: italic;
}

:deep(.dialogue-template__description ul),
:deep(.dialogue-template__description ol) {
  margin: 0 0 16px 0;
  padding-left: 24px;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .page__header {
    margin: 28px 0px 24px 0px;
  }

  .header__title {
    font-size: 28px;
    line-height: 1.2;
  }

  :deep(.dialogue-template__description p) {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 12px;
  }

  :deep(.dialogue-template__description li) {
    font-size: 16px;
    line-height: 1.4;
    margin: 0px 0px 8px 18px;
  }

  :deep(.dialogue-template__description th),
  :deep(.dialogue-template__description td) {
    padding: 10px 14px;
    font-size: 14px;
  }
}

@media (max-width: 767px) {
  .page__header {
    margin: 18px 0px 14px 0px;
  }

  .header__title {
    font-size: 24px;
    line-height: 1.2;
  }

  :deep(.dialogue-template__description p) {
    font-size: 14px;
    line-height: 1.4;
    color: var(--body-text);
    margin-bottom: 12px;
  }

  :deep(.dialogue-template__description li) {
    font-size: 14px;
    line-height: 1.4;
    margin: 0px 0px 8px 18px;
  }

  :deep(.dialogue-template__description table) {
    display: block;
    overflow-x: auto;
    margin: 16px 0;
  }

  :deep(.dialogue-template__description th),
  :deep(.dialogue-template__description td) {
    padding: 8px 12px;
    font-size: 13px;
  }

  :deep(.dialogue-template__description pre) {
    padding: 12px;
    margin: 12px 0;
  }

  :deep(.dialogue-template__description img) {
    margin: 12px auto;
  }

  :deep(.dialogue-template__description blockquote) {
    padding-left: 12px;
    margin: 12px 0;
    font-size: 14px;
  }
}
</style>