<script setup>
import { ref, onBeforeMount, onBeforeUpdate } from 'vue';
import BlockItem from '@/components/Block/BlockItem.vue';

const props = defineProps({
  blocks: {
    type: Array,
    required: true,
  }
});

const questionBlockNumbers = ref([]);

const numberQuestionBlocks = () => {
  const qustionBlocksLength = props.blocks.filter(block => block.type === 'question_block').length;
  questionBlockNumbers.value = Array.from({ length: qustionBlocksLength }, (_, index) => index + 1);
};

const getQuestionBlockCounter = (block) => {
  if (block.type !== 'question_block') {
    return 0;
  }
  return questionBlockNumbers.value.shift();
};

const emits = defineEmits(['update-block', 'delete-block', 'upload-image']);

const updateBlockEvent = (block) => {
  emits('update-block', block)
};

const deleteBlockEvent = (block) => {
  emits('delete-block', block)
};

const uploadImageEvent = (block, formData) => {
  emits('upload-image', block, formData)
};

onBeforeUpdate(() => { numberQuestionBlocks() });

onBeforeMount(() => { numberQuestionBlocks() });
</script>

<template>
  <div v-if="blocks.length > 0" class="block-list">
    <BlockItem
      v-for="block in blocks"
      :key="block.block_id"
      :block="block"
      :question-counter="getQuestionBlockCounter(block)"
      @upload-image="uploadImageEvent"
      @update-block="updateBlockEvent"
      @delete-block="deleteBlockEvent"
    />
  </div>
  <div v-else class="block-list__hint">
    <div class="hint-icon">📝</div>
    <p class="hint-text">В этом диалоге нет блоков</p>
  </div>
</template>

<style scoped>
.block-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.block-list__hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px 20px;
  color: var(--body-text);
}

.hint-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.hint-text {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  color: var(--body-text);
}

@media (min-width: 768px) and (max-width: 1169px) {
  .block-list {
    gap: 12px;
  }

  .block-list__hint {
    padding: 32px 16px;
  }

  .hint-icon {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .hint-text {
    font-size: 16px;
  }
}

@media (max-width: 767px) { 
  .block-list {
    gap: 8px;
  }

  .block-list__hint {
    padding: 24px 12px;
  }

  .hint-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }

  .hint-text {
    font-size: 14px;
  }
}
</style>