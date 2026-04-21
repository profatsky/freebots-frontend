<script setup>
import { ref, computed } from 'vue';
import { debounce } from 'lodash';
import {useToast} from 'vue-toast-notification';

import { useProjectStore } from '@/stores/projectStore';
import { useDialoguesStore } from '@/stores/dialoguesStore';

import DialogueRowList from '@/components/Project/DialogueRow/DialogueRowList.vue';
import PluginRowList from '@/components/Project/PluginRow/PluginRowList.vue';
import ChangeNameForm from '@/components/Project/ChangeNameForm.vue';
import CollapsibleSection from '@/components/UI/CollapsibleSection.vue';
import AppModal from '@/components/UI/AppModal.vue';
import GradientButton from '@/components/UI/GradientButton.vue';

const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
});

const projectStore = useProjectStore();
const dialoguesStore = useDialoguesStore();
const project = computed(() => projectStore.projects.find(p => p.project_id === props.projectId));

const toast = useToast();

const showChangeNameForm = ref(false);
const openChangeNameForm = () => { showChangeNameForm.value = true; }
const closeChangeNameForm = () => { showChangeNameForm.value = false; }

const showHintModal = ref(false);
const hintTitle = ref('');
const hintContent = ref('');

const hintsData = {
  startMessage: {
    title: 'Стартовое сообщение',
    content: 'Введите текст, который чат-бот будет отправлять пользователям в главном меню. Советуем описать возможности чат-бота и доступные пользователям текстовые команды.'
  },
  keyboard: {
    title: 'Тип кнопок',
    content: 'Выберите тип кнопок для диалогов: кнопки под последним сообщением бота или кнопки внизу экрана под строкой ввода текста.'
  },
  dialogues: {
    title: 'Диалоги',
    content: 'При добавлении диалога необходимо указать на какое сообщение будет реагировать ваш чат-бот. На выбор представлены 3 типа событий: текстовое сообщение, команда, нажатие кнопки.'
  },
  plugins: {
    title: 'Плагины',
    content: 'Плагины - это готовые функции, которые можно добавить в вашего чат-бота.'
  }
};

const showHint = (hintType) => {
  const hint = hintsData[hintType];
  if (hint) {
    hintTitle.value = hint.title;
    hintContent.value = hint.content;
    showHintModal.value = true;
  }
};

const closeHintModal = () => {
  showHintModal.value = false;
};

const keyboardTypes = ref([
  { label: 'Под сообщением', value: 'inline_keyboard' },
  { label: 'Внизу экрана', value: 'reply_keyboard' },
]);

const updateProjectStartMessage = debounce(() => {
  projectStore.updateProject(project.value);
}, 500);

const updateProjectKeyboardType = debounce(() => {
  projectStore.updateProject(project.value);
}, 300);

const updateProjectName = async (name) => {
  if (!name || name.trim().length === 0) {
    toast.error('Название проекта не может быть пустым');
    return;
  }
  
  if (name.length > 256) {
    toast.error('Название проекта слишком длинное (максимум 256 символов)');
    return;
  }
  
  project.value.name = name.trim();
  await projectStore.updateProject(project.value);
  closeChangeNameForm();
};

const deleteProject = async () => {
  try {
    await projectStore.deleteProject(project.value.project_id);
    toast.success('Чат-бот успешно удалён');
  } catch {
    toast.error('Ошибка при удалении чат-бота');
  }
};

const downloadCode = async () => {
  try {
    await projectStore.downloadCode(project.value.project_id);
  } catch (e) {
    toast.error(e.message);
  }
};

const handleRemovePluginEvent = async (plugin) => {
  project.value.plugins = project.value.plugins.filter(p => p.plugin_id !== plugin.plugin_id);
  const { response, error } = await projectStore.removePluginFromProject(project.value.project_id, plugin.plugin_id);
  if (error) {
    toast.error('Что-то пошло не так...');
  } else {
    toast.success('Плагин успешно удален');
  }
};

const handleUpdateDialogueEvent = async (dialogue) => {
  if (dialogue.trigger.event_type == 'command') {
    if (dialogue.trigger.value.startsWith('/')) {
      toast.warning('Cимвол "/" в Команде будет подставлен автоматически');
      dialogue.trigger.value = dialogue.trigger.value.substring(1);
    };
    
    if (dialogue.trigger.value.includes(' ')) {
      toast.warning('Команда не должна содержать пробелов');
      dialogue.trigger.value = dialogue.trigger.value.replace(/\s/g, '');
    };
  };

  const { response, error } = await dialoguesStore.updateDialogueTrigger(
    project.value.project_id,
    dialogue.dialogue_id,
    dialogue.trigger.event_type,
    dialogue.trigger.value
  );
  if (error.value) {
    toast.error('Что-то пошло не так...');
  } else {
    const index = project.value.dialogues.findIndex(
      d => d.dialogue_id === dialogue.dialogue_id
    )
    const responseData = response.value.data;
    project.value.dialogues[index] = responseData;
  }
};

const handleDeleteDialogueEvent = async (dialogue) => {
  project.value.dialogues = project.value.dialogues.filter(d => d.dialogue_id !== dialogue.dialogue_id);
  const { response, error } = await dialoguesStore.deleteDialogue(project.value.project_id, dialogue.dialogue_id);
  if (error.value) {
    toast.error('Что-то пошло не так...');
  } else {
    toast.success('Диалог успешно удален');
  }
};

const handleCreateDialogueEvent = async () => {
  if (project.value.dialogues.length >= 10) {
    toast.error('В этом чат-боте максимальное количество диалогов!');
    return;
  };

  const dialogue = {
    triggerEventType: 'text',
    triggerValue: '',
  };
  
  const { response, error } = await dialoguesStore.createDialogue(
    project.value.project_id, 
    dialogue.triggerEventType, 
    dialogue.triggerValue
  );
  if (error.value) {
    toast.error(error.value.response.data.detail);
  } else {
    const responseData = response.value.data;
    project.value.dialogues.push(responseData);
    toast.success('Диалог успешно создан');
  }
};
</script>

<template>
  <AppModal
    v-if="showChangeNameForm"
    @closeModal="closeChangeNameForm"
  >
    <ChangeNameForm
      :projectName="project.name"
      @update-project="updateProjectName"
    />
  </AppModal>

  <AppModal
    v-if="showHintModal"
    @closeModal="closeHintModal"
  >
    <div class="hint-modal">
      <h3>{{ hintTitle }}</h3>
      <p>{{ hintContent }}</p>
    </div>
  </AppModal>

  <div class="project">
    <div class="project__header">
      <div class="header__main">
        <img src="@/assets/icons/telegram-purple.svg" class="header__img">
        <h2 class="header__text">{{ project.name }}</h2>
      </div>
      <div class="header__quick-actions">
        <GradientButton 
          size="small" 
          @click="downloadCode" 
          title="Скачать код чат-бота"
        >
          <img src="@/assets/icons/export-gray.svg" class="download-btn-icon">
          Скачать код
        </GradientButton>
        <button class="quick-action" @click="openChangeNameForm" title="Изменить название">
          <img src="@/assets/icons/pencil-gray.svg" class="quick-action__img">
        </button>
        <button class="quick-action danger" @click="deleteProject" title="Удалить чат-бота">
          <img src="@/assets/icons/remove-gray.svg" class="quick-action__img">
        </button>
      </div>
    </div>

    <div class="project__stats">
      <div class="stat">
        <span class="stat__label">Диалоги</span>
        <span class="stat__value">{{ project.dialogues.length }}</span>
      </div>
      <div class="stat">
        <span class="stat__label">Плагины</span>
        <span class="stat__value">{{ project.plugins.length }}</span>
      </div>
    </div>

    <div class="project__sections">
      <CollapsibleSection title="1) Настройка стартового экрана чат-бота" :default-open="true">
        <div class="menu-message">
          <label class="field-label">
            Стартовое сообщение
            <button class="hint-btn" @click="showHint('startMessage')">?</button>
          </label>
          <AppTextarea 
            v-model="project.start_message"
            placeholder="Введите текст сообщения"
            class="textarea" 
            required
            @input="updateProjectStartMessage"
            maxlength="4000"
          />
        </div>
        
        <div class="project__keyboard">
          <label class="field-label">
            Тип кнопок в главном меню
            <button class="hint-btn" @click="showHint('keyboard')">?</button>
          </label>
          <AppSelect 
            v-model="project.start_keyboard_type"
            :options="keyboardTypes"
            required
            @change="updateProjectKeyboardType"
          />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="2) Настройка диалогов (сценариев)" :default-open="true">
        <label class="field-label">
          Управление диалогами
          <button class="hint-btn" @click="showHint('dialogues')">?</button>
        </label>
        <DialogueRowList
          :dialogues="project.dialogues"
          :projectID="project.project_id"
          @update-dialogue="handleUpdateDialogueEvent"
          @delete-dialogue="handleDeleteDialogueEvent"
        />
        <AppButton 
          size="medium" 
          importance="secondary"
          class="dialogue__add-btn"
          @click="handleCreateDialogueEvent"
        >
          Добавить диалог
        </AppButton>
      </CollapsibleSection>

      <CollapsibleSection title="3) Плагины (готовые функции)" :default-open="true">
        <label class="field-label">
          Управление плагинами
          <button class="hint-btn" @click="showHint('plugins')">?</button>
        </label>
        <PluginRowList 
          :plugins="project.plugins"
          @remove-plugin="handleRemovePluginEvent"
        />
        <AppButton 
          size="medium" 
          importance="secondary"
          class="plugin__add-btn"
          @click="$router.push(`/plugins`)"
        >
          Добавить плагин
        </AppButton>
      </CollapsibleSection>
    </div>
  </div>
</template>

<style scoped>
.textarea {
  box-sizing: border-box;
  width: 100%;
  height: 112px;
  resize: none;
}

.project {
  background-color: var(--light-gray);
  padding: 44px 48px;
  margin-bottom: 48px;
  border-radius: 16px;
  box-shadow: 0 0 16px 0 rgba(17, 17, 17, 0.04);
}

.project__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header__main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header__img {
  width: 32px;
  height: 32px;
}

.header__text {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  margin: 0;
}

.header__quick-actions {
  display: flex;
  gap: 8px;
}

.quick-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--gray-lines);
  background-color: var(--main-white);
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-action:hover {
  border-color: var(--primary);
  background-color: var(--light-gray);
}

.quick-action.danger:hover {
  border-color: var(--error);
  background-color: var(--error-light);
}

.quick-action__img {
  width: 20px;
  height: 20px;
}

.download-btn-icon {
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(1);
}

.project__stats {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  padding: 20px;
  background-color: var(--main-white);
  border-radius: 12px;
  border: 1px solid var(--gray-lines);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.stat__label {
  font-size: 12px;
  color: var(--body-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.stat__value {
  font-size: 18px;
  font-weight: 600;
  color: var(--main-black);
}


.project__sections {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--main-black);
}

.hint-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 600;
  cursor: help;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.hint-btn:hover {
  background: var(--primary-dark);
}

.section-header-info {
  margin-bottom: 16px;
}

.hint-modal h3 {
  color: var(--primary);
  margin-bottom: 12px;
  font-size: 18px;
}

.hint-modal p {
  color: var(--body-text);
  line-height: 1.6;
  margin: 0;
}

.menu-message,
.project__keyboard {
  margin-bottom: 24px;
  padding: 16px;
}


.dialogue__add-btn,
.plugin__add-btn {
  min-width: 220px;
  white-space: nowrap;
  margin-top: 16px;
  background-color: var(--main-white);
  border: 2px solid var(--primary);
  box-shadow: 0 2px 8px rgba(95, 46, 234, 0.1);
}

@media (min-width: 768px) and (max-width: 1169px) { 
  .project {
    padding: 20px 24px;
    margin-bottom: 28px;
    border-radius: 12px;
  }

  .project__header {
    margin-bottom: 16px;
  }

  .header__img {
    width: 30px;
    height: 30px;
  }

  .header__text {
    font-size: 20px;
  }


  .quick-action {
    width: 36px;
    height: 36px;
  }

  .quick-action__img {
    width: 18px;
    height: 18px;
  }

  .download-btn-icon {
    width: 16px;
    height: 16px;
  }

  .project__stats {
    gap: 24px;
    padding: 16px;
    margin-bottom: 24px;
  }

  .stat__value {
    font-size: 16px;
  }

  .textarea {
    height: 84px;
  }

  .menu-message,
  .project__keyboard {
    margin-bottom: 20px;
  }

  .dialogue__add-btn,
  .plugin__add-btn {
    min-width: 180px;
    white-space: nowrap;
  }
}

@media (max-width: 767px) {
  .project {
    padding: 12px 16px;
    margin-bottom: 20px;
    border-radius: 8px;
  }

  .project__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 16px;
  }

  .header__main {
    gap: 8px;
  }

  .header__img {
    width: 24px;
    height: 24px;
  }

  .header__text {
    font-size: 18px;
  }


  .header__quick-actions {
    align-self: stretch;
    justify-content: space-between;
  }

  .quick-action {
    flex: 1;
    max-width: 80px;
    height: 36px;
  }

  .quick-action__img {
    width: 16px;
    height: 16px;
  }

  .download-btn-icon {
    width: 14px;
    height: 14px;
  }

  .project__stats {
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .stat {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .stat__label {
    font-size: 11px;
  }

  .stat__value {
    font-size: 14px;
  }

  .field-label {
    font-size: 13px;
  }

  .hint-btn {
    width: 18px;
    height: 18px;
    font-size: 11px;
  }

  .textarea {
    height: 64px;
  }

  .menu-message,
  .project__keyboard {
    margin-bottom: 16px;
  }

  .dialogue__add-btn,
  .plugin__add-btn {
    min-width: 140px;
    white-space: nowrap;
  }
}
</style>