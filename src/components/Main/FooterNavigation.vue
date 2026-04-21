<script setup>
</script>

<template>
  <footer>
    <div class="container">
      <div class="footer">
        <div class="footer__top">
          <div class="footer__logo" @click="$router.push('/')">
            <img src="@/assets/icons/logo.svg" class="logo__img">
            <p class="logo__text">
              <span style="color: var(--primary-dark)">Free</span>Bots
            </p>
          </div>
          <div class="footer__links">
            <div class="footer__links-column">
              <h4 class="footer__links-title">Разделы</h4>
              <ul class="footer__links-list">
                <li><a href="#advantages-section">Преимущества</a></li>
                <li><a href="#use-cases-section">Кейсы</a></li>
                <li><a href="#pricing-section">Тарифы</a></li>
                <li><a href="#social-proof-section">Отзывы</a></li>
                <li><a href="#manual-section">Руководство</a></li>
                <li><a href="#support-section">Поддержка</a></li>
              </ul>
            </div>
            <div class="footer__links-column">
              <h4 class="footer__links-title">О проекте</h4>
              <ul class="footer__links-list">
                <li><a href="https://t.me/freebotsru" target="_blank" rel="noopener">Telegram-канал</a></li>
                <li><a href="https://t.me/freebots_auth_bot" target="_blank" rel="noopener">Telegram-бот</a></li>
                <li><a href="https://github.com/profatsky/freebots" target="_blank" rel="noopener">GitHub-репозиторий</a></li>
              </ul>
            </div>
            <div class="footer__links-column">
              <h4 class="footer__links-title">Тех.поддержка</h4>
              <ul class="footer__links-list">
                <li><a href="https://vk.com/profatsky" target="_blank" rel="noopener">ВКонтакте</a></li>
                <li><a href="https://t.me/profatsky" target="_blank" rel="noopener">Telegram</a></li>
              </ul>
            </div>
            <div class="footer__links-column">
              <h4 class="footer__links-title">Документы</h4>
              <ul class="footer__links-list">
                <li><router-link to="/offer">Публичная оферта</router-link></li>
                <li><router-link to="/privacy">Политика конфиденциальности</router-link></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">developed by <a href="https://жыбийрыр.рф" target="_blank" rel="noopener">жыбийрыр.рф</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  flex-direction: column;
  padding: 40px 0 24px 0;
  gap: 32px;
}

.footer__top {
  display: flex;
  gap: 60px;
  align-items: flex-start;
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex-shrink: 0;
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

.footer__links {
  display: flex;
  gap: 80px;
  flex-grow: 1;
}

.footer__links-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer__links-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--main-black);
  margin: 0;
}

.footer__links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__links-list a {
  font-size: 16px;
  color: var(--body-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__links-list a:hover {
  color: var(--primary);
}

.footer__bottom {
  border-top: 1px solid var(--gray-lines);
  padding-top: 24px;
  text-align: center;
}

.footer__copyright {
  font-size: 16px;
  margin: 0;
  color: var(--body-text);
}

.footer__copyright a {
  color: var(--primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__copyright a:hover {
  text-decoration: underline;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .footer {
    padding: 32px 0 20px 0;
    gap: 28px;
  }

  .footer__top {
    flex-wrap: wrap;
    gap: 40px;
  }

  .footer__links {
    gap: 60px;
    order: 1;
    width: 100%;
  }

  .footer__bottom {
    padding-top: 20px;
  }

  .footer__copyright {
    font-size: 14px;
  }
}

@media (max-width: 767px) {
  .footer {
    padding: 24px 0 16px 0;
    gap: 24px;
  }

  .footer__top {
    flex-direction: column;
    gap: 24px;
  }

  .footer__logo {
    gap: 8px;
  }

  .logo__img {
    height: 28px;
  }

  .logo__text {
    font-size: 18px;
  }

  .footer__links {
    flex-direction: column;
    gap: 24px;
  }

  .footer__links-title {
    font-size: 14px;
  }

  .footer__links-list a {
    font-size: 14px;
  }

  .footer__bottom {
    padding-top: 16px;
  }

  .footer__copyright {
    font-size: 12px;
  }
}
</style>

