<script setup>
const emits = defineEmits(['open-auth-form'])
const openAuthForm = () => {
  emits('open-auth-form');
};
</script>

<template>
  <header>
    <div class="container">
      <nav class="header-navbar">
        <div class="header-navbar__logo">
          <img src="@/assets/icons/logo.svg" class="logo__img">
          <p class="logo__text">
            <span style="color: var(--primary-dark)">Free</span>Bots
          </p>
        </div>
        <div class="header-navbar__menu">
          <ul class="header-navbar__menu-list">
            <li><a href="#advantages-section">Преимущества</a></li>
            <li><a href="#use-cases-section">Кейсы</a></li>
            <li><a href="#pricing-section">Тарифы</a></li>
            <li><a href="#social-proof-section">Отзывы</a></li>
            <li><a href="#manual-section">Руководство</a></li>
            <li><a href="#support-section">Поддержка</a></li>
          </ul>
        </div>
        <AppButton 
          size="medium" 
          importance="secondary"
          @click="openAuthForm"
          class="auth-btn"
        >
          Войти
        </AppButton>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-navbar {
  display: flex;
  padding: 23px 0;
  align-items: center;
}

.header-navbar__menu {
  flex-grow: 1;
}

.header-navbar__logo {
  display: flex;
  align-items: center;
  gap: 12px;
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

.header-navbar__menu-list {
  list-style: none;
  font-weight: 400;
  display: flex;
  justify-content: center;
  gap: 28px;
  padding: 0 40px;
}

.header-navbar__menu-list a:hover {
  color: var(--primary-dark);
}

@media (min-width: 1170px) and (max-width: 1350px) {
  .header-navbar__menu-list {
    gap: 20px;
    padding: 0 24px;
  }
}

@media (min-width: 768px) and (max-width: 1169px) {
  .header-navbar__menu-list {
    display: none;
  }
}

@media (max-width: 767px) {
  .header-navbar {
    padding: 12px 0;
  }

  .header-navbar__menu-list {
    display: none;
  }

  .header-navbar__logo {
    gap: 8px;
  }

  .logo__img {
    height: 28px;
  }

  .logo__text {
    font-size: 18px;
  }

  .auth-btn {
    display: none;
  }
}
</style>