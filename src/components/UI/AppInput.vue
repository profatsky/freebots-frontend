<script>
export default {
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<template>
  <input 
    :value="modelValue"
    @input="updateInput"
    class="input"
  >
</template>


<style>
.input {
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

.input:focus {
  border-color: var(--primary);
  outline: none;
}

.input::-webkit-input-placeholder {
  color: var(--placeholder); 
}

@media (min-width: 768px) and (max-width: 1169px) { 
  .input {
    font-size: 15px;
    line-height: 1.4;
    padding: 12px 20px;
    border-radius: 12px;
  }
}

@media (max-width: 767px) {
  .input {
    font-size: 16px;
    line-height: 1.4;
    padding: 12px 16px;
    border-radius: 12px;
  }
}
</style>