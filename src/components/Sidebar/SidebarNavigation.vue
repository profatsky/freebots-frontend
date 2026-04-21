<script setup>
import { onMounted, onUnmounted } from 'vue';
import { collapsed, toggleSidebar, sidebarWidth, resizeSidebar } from '@/components/Sidebar/sidebarUtils';
import SidebarLink from '@/components/Sidebar/SidebarLink.vue';

onMounted(() => {
  window.addEventListener('resize', resizeSidebar);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeSidebar);
});
</script>

<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">

    <div class="logo" @click="$router.push('/')">
      <img src="@/assets/icons/logo.svg" class="logo__img">
      <Transition name="logo-text">
        <p v-if="!collapsed" class="logo__text">
          <span style="color: var(--primary-dark)">Free</span>Bots
        </p>
      </Transition>
    </div>
    <SidebarLink to="/projects" icon="🤖">Ваши боты</SidebarLink>
    <SidebarLink to="/templates" icon="📋">Шаблоны</SidebarLink>
    <SidebarLink to="/plugins" icon="🧩">Плагины</SidebarLink>
    <SidebarLink to="/manual" icon="📚" external>Руководство</SidebarLink>
    <SidebarLink to="/profile" icon="👤">Профиль</SidebarLink>
    <span
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <img src="@/assets/icons/arrows.svg">
    </span>
  </div>
</template>

<style scoped>
.logo-text-enter-active,
.logo-text-leave-active {
  transition: opacity 0.2s;
}

.logo-text-enter-from,
.logo-text-leave-to {
  opacity: 0;
}

.sidebar {
  color: var(--body-text);
  background-color: var(--main-white);
  box-shadow: 0 0 16px 0 rgba(17, 17, 17, 0.04);

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 36px 0px 28px 28px;
  cursor: pointer;
}

.logo__img {
  height: 50px;
}

.logo__text {
  font-size: 32px;
  font-weight: 600;
  color: var(--primary);
  font-family: 'Roboto', 'sans-serif';
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 32px;

  transition: 0.2s linear;
}

.collapse-icon img {
  height: 32px;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .logo {
    margin: 32px 0px 24px 24px;
    gap: 14px;
  }

  .logo__img {
    height: 42px;
  }
  
  .logo__text {
    font-size: 28px;
  }

  .collapse-icon {
    padding: 28px;
  }

  .collapse-icon img {
    height: 30px;
  }
}

@media (max-width: 767px) {
  .logo {
    margin: 24px 0px 20px 16px;
    gap: 12px;
  }

  .logo__img {
    height: 36px;
  }

  .logo__text {
    font-size: 24px;
    line-height: 1.2;
  }

  .collapse-icon {
    padding: 20px;
  }

  .collapse-icon img {
    height: 28px;
  }
}
</style>