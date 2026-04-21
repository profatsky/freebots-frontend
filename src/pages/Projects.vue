<script setup>
import { onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import SidebarNavigation from '@/components/Sidebar/SidebarNavigation.vue';
import ProjectList from '@/components/Project/ProjectList.vue';
import { useProjectStore } from '@/stores/projectStore';

const toast = useToast();
const projectStore = useProjectStore();

const handleCreate = async () => {
  try {
    const { response, error } = await projectStore.createProject();
    if (error.value) {
      toast.error(error.value.response.data.detail)
    } else {
      toast.success('Новый чат-бот успешно создан');
    }
  } catch (e) {
    toast.error(e.message || 'Ошибка при создании чат-бота');
  }
};

onMounted(async () => {
  try {
    await projectStore.getUserProjects();
  } catch {
    toast.error('Не удалось загрузить чат-ботов');
  }
});
</script>

<template>
  <SidebarNavigation/>
  <main>
    <div class="container">
      <div class="page__content">
        <div class="page__header">
          <h1 class="header__title">🤖 Чат-боты</h1>
          <AppButton
            size="medium" 
            importance="secondary"
            @click="handleCreate"
          >
            Создать чат-бота
          </AppButton>
        </div>
        <div class="page__hint">
          Чат-боты - это автоматизированные собеседники, которые выполняют различные задачи: отвечают на вопросы, продают товары, предоставляют информацию и т.д.
        </div>
        <ProjectList
          v-if="!projectStore.isLoading"
          :projects="projectStore.projects"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.page__header {
  margin: 32px 0px 20px 0px;
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