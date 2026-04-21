<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { collapsed } from '@/components/Sidebar/sidebarUtils.js';

const props = defineProps({
  to: { type: String, required: true },
  icon: { type: String, required: true },
  external: { type: Boolean, default: false },
});

const route = useRoute();
const isActive = computed(() => route.path === props.to)

</script>

<template name="fade">
    <div v-if="external">
      <a :href="to" target="_blank" class="link">
        <span class="link-icon">{{ props.icon }}</span>
        <transition name="fade">
          <div v-if="!collapsed"><slot /></div>
        </transition>
      </a>
    </div>
  <div v-else>
    <router-link :to="to" class="link" :class="{ active: isActive }">
      <span class="link-icon">{{ props.icon }}</span>
      <transition name="fade">
        <div v-if="!collapsed"><slot /></div>
      </transition>
    </router-link>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.link {
  display: flex;
  align-items: center;
  gap: 12px;

  font-size: 20px;
  letter-spacing: 0.75px;
  line-height: 1.4;
  font-weight: 600;
  color: var(--body-text);

  padding: 24px 32px;
  height: 34px;
}

.link-icon {
  font-size: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.link:hover {
  background-color: var(--light-gray);
}

@media (min-width: 768px) and (max-width: 1169px) {
  .link {
    gap: 12px;

    font-size: 18px;
    line-height: 1.4;

    padding: 20px 24px;
    height: 32px;
  }

  .link-icon {
    font-size: 30px;
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 767px) {
  .link {
    gap: 10px;
    
    font-size: 16px;
    line-height: 1.4;

    padding: 16px 20px;
    height: 28px;
  }

  .link-icon {
    font-size: 24px;
    width: 24px;
    height: 24px;
  }
}
</style>