<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
});

const emits = defineEmits(['update:modelValue']);

function updateTextarea(event) {
  emits('update:modelValue', event.target.value)
}
</script>

<template>
  <textarea
    :value="modelValue"
    @input="updateTextarea"
    class="textarea"
  >
  </textarea>
</template>

<style scoped>
.textarea {
  background-color: var(--main-white);
  border-radius: 16px;
  border: 2px solid var(--gray-lines);
  padding: 14px 24px;

  font-family: 'Montserrat';
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0.75px;
  color: var(--body-text);
}

.textarea:focus {
  border-color: var(--primary);
  outline: none;
}

.textarea::-webkit-input-placeholder {
  color: var(--placeholder); 
}

@media (min-width: 768px) and (max-width: 1169px) { 
  .textarea {
    border-radius: 12px;
    padding: 12px 20px;
    font-size: 15px;
    line-height: 1.4;
  }
}

@media (max-width: 767px) {
  .textarea {
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 14px;
    line-height: 1.4;
  }
}

</style>