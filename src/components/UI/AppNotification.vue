<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value) => ['error', 'success', 'primary', 'warning'].includes(value)
  },
});

const computedClasses = computed(() => ({
  'notification': true,
  'success': props.status === 'success',
  'error': props.status === 'error',
  'primary': props.status === 'primary',
  'warning': props.status === 'warning',
}));

</script>

<template>
  <div :class="computedClasses">
    <div class="notification__title">
      <slot name="title"></slot>
    </div>
    <div class="notification__description">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<style scoped>

.notification {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  border-radius: 16px;
  padding: 20px 24px;
  width: 100%;
  max-width: 685px;
}

.notification__title {
  font-size: 16px;
  letter-spacing: 0.25px;
  line-height: 20px;
  font-weight: 600;
  margin-bottom: 16px;
}

.success {
  background-color: var(--success-light);
  border: 2px solid var(--success);
}

.success .notification__title {
  color: var(--success-dark);
}

.error {
  background-color: var(--error-light);
  border: 2px solid var(--error);
}

.error .notification__title {
  color: var(--error-dark);
}

.primary {
  background-color: var(--main-white);
  border: 2px solid var(--primary);
}

.primary .notification__title {
  color: var(--primary-dark);
}

.warning {
  background-color: var(--warning-light);
  border: 2px solid var(--warning);
}

.warning .notification__title {
  color: var(--warning-dark);
}

.notification__description {
  font-size: 16px;
  letter-spacing: 0.75px;
  line-height: 24px;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .notification {
    padding: 16px 20px;
    max-width: 100%;
  }

  .notification__title {
    font-size: 16px;
    margin-bottom: 12px;
  }

  .notification__description {
    font-size: 14px;
    line-height: 20px;
  }
}

@media (max-width: 767px) {
  .notification {
    padding: 12px 16px;
    max-width: 100%;
  }

  .notification__title {
    line-height: 18px;
    font-size: 14px;
    margin-bottom: 8px;
    letter-spacing: 0.25px;
  }

  .notification__description {
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.5px;
  }
}
</style>
