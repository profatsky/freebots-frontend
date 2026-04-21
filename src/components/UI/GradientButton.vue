<template>
  <button 
    :class="buttonClass"
    @click="$emit('click', $event)"
    :disabled="disabled"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const buttonClass = computed(() => {
  return [
    'gradient-button',
    `gradient-button--${props.size}`,
    `gradient-button--${props.variant}`,
    {
      'gradient-button--disabled': props.disabled,
      'gradient-button--full-width': props.fullWidth
    }
  ];
});
</script>

<style scoped>
.gradient-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 12px;
  border: 2px solid var(--primary);
  background: var(--gradient-primary);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  box-shadow: var(--shadow-primary);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.gradient-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: var(--gradient-shine);
  transition: left 0.5s;
}

.gradient-button:hover::before {
  left: 100%;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-primary-hover);
  border-color: var(--primary-light);
}

.gradient-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-primary-active);
}

.gradient-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
}

.gradient-button--disabled:hover {
  transform: none !important;
  box-shadow: var(--shadow-primary);
}

.gradient-button--full-width {
  width: 100%;
}

/* Sizes */
.gradient-button--small {
  padding: 8px 12px;
  height: 36px;
  font-size: 14px;
  border-radius: 8px;
}

.gradient-button--medium {
  padding: 12px 20px;
  height: 48px;
  font-size: 16px;
  border-radius: 10px;
}

.gradient-button--large {
  padding: 16px 24px;
  height: 56px;
  font-size: 18px;
  border-radius: 12px;
}

/* Variants */
.gradient-button--secondary {
  border-color: var(--gray-lines);
  background: var(--gradient-secondary);
  color: var(--main-black);
  box-shadow: var(--shadow-secondary);
}

.gradient-button--secondary:hover {
  box-shadow: var(--shadow-secondary-hover);
  border-color: var(--primary);
}

.gradient-button--secondary:active {
  box-shadow: var(--shadow-secondary-active);
}
</style>
