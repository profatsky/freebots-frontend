<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  defaultOpen: {
    type: Boolean,
    default: false
  }
})

const isOpen = ref(props.defaultOpen)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="collapsible-section">
    <button 
      class="section-header"
      @click="toggle"
      :aria-expanded="isOpen"
      :aria-controls="`section-${title.toLowerCase().replace(/\s+/g, '-')}`"
    >
      <h3 class="section-title">{{ title }}</h3>
      <div class="section-chevron">
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2"
          :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }"
        >
          <polyline points="6,9 12,15 18,9"></polyline>
        </svg>
      </div>
    </button>
    
    <transition name="slide-down">
      <div 
        v-show="isOpen" 
        class="section-content"
        :id="`section-${title.toLowerCase().replace(/\s+/g, '-')}`"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.collapsible-section {
  border: 1px solid var(--gray-lines);
  border-radius: 8px;
  margin-bottom: 16px;
  overflow: hidden;
}

.section-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: var(--main-white);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.section-header:hover {
  background-color: var(--light-gray);
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.75px;
  color: var(--primary);
  text-transform: uppercase;
  margin: 0;
}

.section-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
}

.section-content {
  padding: 20px;
  background-color: var(--main-white);
}

/* Анимация для раскрытия/сворачивания */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 500px;
  opacity: 1;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .section-header {
    padding: 14px 16px;
  }
  
  .section-title {
    font-size: 15px;
  }
  
  .section-content {
    padding: 16px;
  }
}

@media (max-width: 767px) {
  .section-header {
    padding: 12px 16px;
  }
  
  .section-title {
    font-size: 14px;
  }
  
  .section-content {
    padding: 12px;
  }
}
</style>
