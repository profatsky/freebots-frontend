<script setup>
import { reactive, ref, nextTick } from 'vue';
import KeyValueTable from '@/components/Block/BlockInstance/BlockInstancePart/KeyValueTable.vue';

const props = defineProps({
  block: {
    type: Object,
    required: true,
  }
});

const editedBlock = reactive({ ...props.block });

const emits = defineEmits(['update-text-in-block', 'update-block', 'delete-block']);

// JSON input state
const jsonInput = ref('');
const jsonError = ref('');
const textareaRef = ref(null);

// Initialize JSON input from body object
const initializeJsonInput = () => {
  if (editedBlock.body && Object.keys(editedBlock.body).length > 0) {
    jsonInput.value = JSON.stringify(editedBlock.body, null, 2);
  } else {
    jsonInput.value = '{\n  \n}';
  }
};

// Initialize on component mount
initializeJsonInput();

const updateBlockTextEvent = () => {
  emits('update-text-in-block', editedBlock);
};

const updateBlockHttpMethodEvent = () => {
  emits('update-block', editedBlock);
};

const updateBlockHeadersEvent = (headers) => {
  editedBlock.headers = headers;
  emits('update-block', editedBlock);
};

const updateBlockBodyFromJson = () => {
  try {
    const parsedJson = JSON.parse(jsonInput.value);
    editedBlock.body = parsedJson;
    jsonError.value = '';
    emits('update-block', editedBlock);
  } catch (error) {
    jsonError.value = 'Неверный формат JSON: ' + error.message;
  }
};

const formatJson = () => {
  try {
    const parsedJson = JSON.parse(jsonInput.value);
    jsonInput.value = JSON.stringify(parsedJson, null, 2);
    jsonError.value = '';
    updateBlockBodyFromJson();
  } catch (error) {
    jsonError.value = 'Неверный формат JSON: ' + error.message;
  }
};

const handleKeyDown = (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const textarea = event.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Insert 2 spaces at cursor position
    const newValue = jsonInput.value.substring(0, start) + '  ' + jsonInput.value.substring(end);
    jsonInput.value = newValue;
    
    // Set cursor position after the inserted spaces
    nextTick(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 2;
    });
  }
};

const handlePaste = (event) => {
  // Allow default paste behavior, then format if it's valid JSON
  setTimeout(() => {
    try {
      JSON.parse(jsonInput.value);
      formatJson();
    } catch (error) {
      // Not valid JSON, keep as is
    }
  }, 0);
};

const deleteBlockEvent = () => {
  emits('delete-block', editedBlock);
};
</script>

<template>
  <div class="block">
    <button 
      @click="deleteBlockEvent" 
      class="block__close-button"
    >
      <img src="@/assets/icons/close.svg">
    </button>
    <div class="block__header">
      <img src="@/assets/icons/blocks/request-purple.svg" class="block__img">
      <p class="block__type">API запрос</p>
    </div>

    <AppInput
      class="input"
      v-model="editedBlock.url"
      placeholder="Введите ссылку"
      required
      @input="updateBlockTextEvent"
    />

    <div class="block__http-method">
      <p class="block__hint">
        Выберите метод HTTP-запроса
      </p>
      <div class="answer-type__select">
        <input 
          type="radio" 
          :id="`GET${editedBlock.block_id}`" 
          value="GET" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`GET${editedBlock.block_id}`">GET</label>

        <input 
          type="radio" 
          :id="`POST${editedBlock.block_id}`" 
          value="POST" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`POST${editedBlock.block_id}`">POST</label>

        <input 
          type="radio" 
          :id="`PUT${editedBlock.block_id}`" 
          value="PUT" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`PUT${editedBlock.block_id}`">PUT</label>

        <input 
          type="radio" 
          :id="`DELETE${editedBlock.block_id}`" 
          value="DELETE" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`DELETE${editedBlock.block_id}`">DELETE</label>

        <input 
          type="radio" 
          :id="`PATCH${editedBlock.block_id}`" 
          value="PATCH" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`PATCH${editedBlock.block_id}`">PATCH</label>

        <input 
          type="radio" 
          :id="`CONNECT${editedBlock.block_id}`" 
          value="CONNECT" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`CONNECT${editedBlock.block_id}`">CONNECT</label>

        <input 
          type="radio" 
          :id="`HEAD${editedBlock.block_id}`" 
          value="HEAD" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`HEAD${editedBlock.block_id}`">HEAD</label>

        <input 
          type="radio" 
          :id="`OPTIONS${editedBlock.block_id}`" 
          value="OPTIONS" 
          v-model="editedBlock.http_method"
          @change="updateBlockHttpMethodEvent"
        >
        <label :for="`OPTIONS${editedBlock.block_id}`">OPTIONS</label>
      </div>
    </div>

    <div class="block__headers">
      <p class="block__hint">
        Укажите заголовки запроса
      </p>
    
      <KeyValueTable
        :key-value-data="editedBlock.headers"
        @update-data="updateBlockHeadersEvent"
      >
        <template v-slot:keyColumnTitle>Заголовок</template>
        <template v-slot:valueColumnTitle>Значение</template>
      </KeyValueTable>
    </div>

    <div class="block__request-body">
      <div class="block__request-body-header">
        <p class="block__hint">
          Укажите содержимое тела запроса в формате JSON
        </p>
        <div class="json-actions">
          <button 
            type="button"
            class="format-btn"
            @click="formatJson"
            :disabled="!!jsonError"
          >
            Форматировать
          </button>
        </div>
      </div>

      <div class="json-input-container">
        <textarea
          ref="textareaRef"
          v-model="jsonInput"
          @input="updateBlockBodyFromJson"
          @keydown="handleKeyDown"
          @paste="handlePaste"
          placeholder="Введите JSON объект..."
          class="json-textarea"
          :class="{ error: jsonError }"
          spellcheck="false"
        />
        <div v-if="jsonError" class="json-error">
          {{ jsonError }}
        </div>
        <div class="json-hint">
          💡 Используйте Tab для отступов, Ctrl+A для выделения всего текста
        </div>
      </div>
    </div>
  
    <p class="block__hint block__hint--last">
      Вы можете отправить в тексте сообщения значение из ответа от API, для этого указывайте в тексте: &ltresponse[“ключ”]&gt. Например: &ltresponse[“id”]&gt
    </p>
  </div>
</template>

<style scoped>
.input {
  box-sizing: border-box;
  width: 100%;
  resize: none;
  margin-bottom: 20px;
}

.block__http-method {
  margin-bottom: 8px;
}

.block__headers {
  margin-bottom: 20px;
}

.block__request-body-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.json-actions {
  display: flex;
  gap: 8px;
}

.format-btn {
  padding: 6px 12px;
  border: 1px solid var(--primary);
  background: transparent;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--primary);
}

.format-btn:hover:not(:disabled) {
  background-color: var(--primary);
  color: var(--main-white);
}

.format-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.json-input-container {
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

.json-textarea {
  width: 100%;
  min-height: 150px;
  font-family: 'RobotoMono', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
  border: 1px solid var(--gray-lines);
  border-radius: 8px;
  padding: 16px;
  resize: vertical;
  background-color: #fafafa;
  tab-size: 2;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-break: break-word;
  overflow-x: hidden;
  box-sizing: border-box;
}

.json-textarea:focus {
  outline: none;
  border-color: var(--primary);
  background-color: var(--main-white);
  box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.1);
}

.json-textarea.error {
  border-color: #e74c3c;
  background-color: #fdf2f2;
}

.json-textarea.error:focus {
  box-shadow: 0 0 0 2px rgba(231, 76, 60, 0.1);
}

.json-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 8px;
  font-weight: 500;
}

.json-hint {
  color: var(--body-text);
  font-size: 11px;
  margin-top: 8px;
  opacity: 0.7;
  font-style: italic;
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label {
  display: inline-block;
  padding: 5px 16px;
  margin-right: 8px ;
  margin-bottom: 12px;

  border: 2px solid var(--primary);
  border-radius: 20px;
  
  font-size: 12px;  
  font-weight: 500;
  line-height: 18px;
  color: var(--primary);

  cursor: pointer;
}

input[type="radio"]:checked + label {
  background-color: var(--primary);
  color: var(--main-white);
}

@media (min-width: 768px) and (max-width: 1169px) {
  .input {
    margin-bottom: 16px;
  }

  .block__headers {
    margin-bottom: 16px;
  }

  .block__request-body-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .format-btn {
    font-size: 10px;
    padding: 4px 8px;
  }

  .json-textarea {
    min-height: 120px;
    font-size: 12px;
    padding: 12px;
    max-width: 100%;
  }

  input[type="radio"] + label {
    font-size: 10px;
    padding: 3px 16px;
    margin-right: 6px ;
    margin-bottom: 8px;
  }
}

@media (max-width: 767px) {
  .input {
    margin-bottom: 8px;
  }

  .block__headers {
    margin-bottom: 8px;
  }

  .block__request-body-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .format-btn {
    font-size: 8px;
    padding: 3px 6px;
  }

  .json-textarea {
    min-height: 100px;
    font-size: 11px;
    padding: 10px;
    max-width: 100%;
  }

  input[type="radio"] + label {
    font-size: 8px;
    line-height: 12px;
    padding: 2px 14px;
    margin-right: 4px;
    margin-bottom: 6px;
  }
}
</style>