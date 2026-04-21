<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import HeaderNavigation from '@/components/Main/HeaderNavigation.vue';
import FooterNavigation from '@/components/Main/FooterNavigation.vue';
import AuthForm from '@/components/Main/AuthForm.vue';
import GradientButton from '@/components/UI/GradientButton.vue';
import '@/style.css';

const router = useRouter();

const showAuthForm = ref(false);

const openAuthFormHandler = async () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    router.push({ path: '/projects' })
  }
  else {
    showAuthForm.value = true;
  }
};

const closeAuthFormHandler = () => {
  showAuthForm.value = false;
};

const openTelegramHandler = () => {
  window.open('https://t.me/profatsky', '_blank');
};
</script>

<template>
  <HeaderNavigation 
    @openAuthForm="openAuthFormHandler"
  />
  <main>
    <AppModal 
      v-if="showAuthForm" 
      @close-modal="closeAuthFormHandler"
    >
      <AuthForm/>
    </AppModal>

    <div class="container">
      <section id="main-section">
        <div class="hero-content">
          <div class="hero-left">
            <h1 class="hero__title">
              <span style="color:var(--primary-dark)">Создайте</span>&nbsp;Telegram-бота<br>
              Получите&nbsp;<span style="color:var(--primary)">готовый&nbsp;код</span>
            </h1>
            <p class="hero__description">
              Создайте бота за пару кликов и получите его в полное владение. Код и данные клиентов под вашим контролем.
            </p>
            <GradientButton 
              size="large"
              class="hero__btn"
              @click="openAuthFormHandler"
            >
              Создать бота
            </GradientButton>
          </div>
          <div class="hero-right">
            <div class="hero-visual">
              <div class="visual-card">
                <div class="visual-card__icon">💻</div>
                <div class="visual-card__text">Код в ваших руках</div>
              </div>
              <div class="visual-card">
                <div class="visual-card__icon">🚀</div>
                <div class="visual-card__text">Запуск за 5 минут</div>
              </div>
              <div class="visual-card">
                <div class="visual-card__icon">🔒</div>
                <div class="visual-card__text">Полная приватность</div>
              </div>
            </div>
          </div>
        </div>
        <div class="steps">
          <div class="step">
            <div class="step__number">01</div>
            <h4 class="step__title">Регистрация</h4>
            <p class="step__description">
              Быстрый и простой вход через чат-бота в Telegram
            </p>
          </div>
          <div class="step">
            <div class="step__number">02</div>
            <h4 class="step__title">Создание</h4>
            <p class="step__description">
              Широкий выбор функций поможет решить вашу задачу
            </p>
          </div>
          <div class="step">
            <div class="step__number">03</div>
            <h4 class="step__title">Генерация кода</h4>
            <p class="step__description">
              Бесплатно получите готовый код вашего чат-бота
            </p>
          </div>
          <div class="step">
            <div class="step__number">04</div>
            <h4 class="step__title">Запуск</h4>
            <p class="step__description">
              Наше руководство поможет вам легко запустить чат-бота
            </p>
          </div>
        </div>
      </section>
      
      <section id="advantages-section">
        <h3 class="secondary-title">Возможности платформы</h3>
        <h2 class="primary-title">Наши преимущества</h2>
        <div class="advantages">
          <div class="advantage">
            <span class="advantage__icon">⭐</span>
            <h4 class="advantage__title">Полная независимость</h4>
            <p class="advantage__description">
              Создали и скачали — теперь вы решаете, где и как работает чат-бот.
            </p>
          </div>
          <div class="advantage">
            <span class="advantage__icon">🔒</span>
            <h4 class="advantage__title">Приватность</h4>
            <p class="advantage__description">
              Только вы имеете доступ к вашей клиентской базе.
            </p>
          </div>
          <div class="advantage">
            <span class="advantage__icon">👨‍💻</span>
            <h4 class="advantage__title">Без программирования</h4>
            <p class="advantage__description">
              Создать чат-бота может любой. Просто клики — и готово.
            </p>
          </div>
          <div class="advantage">
            <span class="advantage__icon">📋</span>
            <h4 class="advantage__title">Шаблоны чат-ботов</h4>
            <p class="advantage__description">
              Шаблоны с базовой структурой для эффективного создания чат-ботов.
            </p>
          </div>
          <div class="advantage">
            <span class="advantage__icon">🧩</span>
            <h4 class="advantage__title">Плагины</h4>
            <p class="advantage__description">
              Легко добавляйте готовые функции для решения типовых задач.
            </p>
          </div>
          <div class="advantage">
            <span class="advantage__icon">📚</span>
            <h4 class="advantage__title">Простое руководство</h4>
            <p class="advantage__description">
              Чёткие шаги, чтобы запустить чат-бота даже без опыта.
            </p>
          </div>
        </div>
      </section>

      <section id="use-cases-section">
        <h3 class="secondary-title">Решение реальных задач</h3>
        <h2 class="primary-title">Популярные кейсы</h2>
        <div class="use-case">
          <img src="@/assets/img/lead-use-case.png" class="use-case__img"></img>
          <div class="use-case__offer">
            <h4 class="use-case__title"><span style="color:var(--primary)">Собирайте заявки</span> клиентов за 2 клика!</h4>
            <p class="use-case__description">Ваш Telegram-бот автоматически собирает контакты и передаёт их в CRM или Excel. Больше лидов без звонков и ручной работы!</p>
            <GradientButton 
              size="medium"
              class="use-case__btn"
              @click="openAuthFormHandler"
            >
              Создать лид-бота
            </GradientButton>
          </div>
        </div>
        <div class="use-case use-case--reversed">
          <img src="@/assets/img/support-use-case.png" class="use-case__img"></img>
          <div class="use-case__offer">
            <h4 class="use-case__title"><span style="color:var(--primary)">Снижайте нагрузку</span> на операторов поддержки!</h4>
            <p class="use-case__description">Мгновенные ответы на частые вопросы и передача сложных случаев оператору поддержки.</p>
            <GradientButton 
              size="medium"
              class="use-case__btn"
              @click="openAuthFormHandler"
            >
              Создать бота-оператора
            </GradientButton>
          </div>
        </div>
        <div class="use-case">
          <img src="@/assets/img/shop-use-case.png" class="use-case__img"></img>
          <div class="use-case__offer">
            <h4 class="use-case__title"><span style="color:var(--primary)">Продавайте</span> прямо в Telegram!</h4>
            <p class="use-case__description">Ваш бот показывает товары и связывает с покупателем — без сайта и лишних приложений.</p>
            <GradientButton 
              size="medium"
              class="use-case__btn"
              @click="openAuthFormHandler"
            >
              Создать бота-магазин
            </GradientButton>
          </div>
        </div>
      </section>

      <section id="pricing-section">
        <h3 class="secondary-title">Тарифы и цены</h3>
        <h2 class="primary-title">Выберите подходящий план</h2>
        <div class="pricing-cards">
          <div class="pricing-card">
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">Базовый</h3>
              <div class="pricing-card__price">
                <span class="price-amount">0 ₽</span>
                <span class="price-period">/мес</span>
              </div>
            </div>
            <ul class="pricing-card__features">
              <li>Генерация и скачивание кода</li>
              <li>1 чат-бот</li>
              <li>1 сценарий в боте</li>
              <li>Каталог шаблонов сценариев</li>
            </ul>
            <GradientButton 
              size="medium"
              class="pricing-card__btn"
              @click="openAuthFormHandler"
            >
              Начать бесплатно
            </GradientButton>
          </div>

          <div class="pricing-card pricing-card--featured">
            <div class="pricing-card__badge">Популярный</div>
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">Pro</h3>
              <div class="pricing-card__price">
                <span class="price-amount">490 ₽</span>
                <span class="price-period">/мес</span>
              </div>
            </div>
            <ul class="pricing-card__features">
              <li>Все из Базового</li>
              <li>5 чат-ботов</li>
              <li>10 сценариев в боте</li>
              <li>Каталог готовых функций (плагинов)</li>
              <li>Круглосуточная тех.поддержка</li>
            </ul>
            <GradientButton 
              size="medium"
              class="pricing-card__btn"
              @click="openAuthFormHandler"
            >
              Оформить Pro
            </GradientButton>
          </div>

          <div class="pricing-card">
            <div class="pricing-card__header">
              <h3 class="pricing-card__title">Кастом</h3>
              <div class="pricing-card__price">
                <span class="price-amount">от 15 000 ₽</span>
              </div>
            </div>
            <div class="pricing-card__description">
              Нужен бот, выходящий за рамки стандартных возможностей?
              Создадим решение под ключ: интеграции, сложные сценарии, CRM, админ-панель - всё, что нужно именно вам.
            </div>
            <GradientButton 
              size="medium"
              class="pricing-card__btn"
              @click="openTelegramHandler"
            >
              Оставить заявку
            </GradientButton>
          </div>
        </div>
      </section>

      <section id="social-proof-section">
        <h3 class="secondary-title">Доверие клиентов</h3>
        <h2 class="primary-title">Почему выбирают нас</h2>
        <div class="social-proof">
          <div class="proof-item">
            <div class="proof-number">100+</div>
            <div class="proof-label">Созданных ботов</div>
          </div>
          <div class="proof-item">
            <div class="proof-number">5 мин</div>
            <div class="proof-label">Среднее время создания</div>
          </div>
          <div class="proof-item">
            <div class="proof-number">24/7</div>
            <div class="proof-label">Техподдержка</div>
          </div>
          <div class="proof-item">
            <div class="proof-number">100%</div>
            <div class="proof-label">Бесплатно навсегда</div>
          </div>
        </div>
        <div class="testimonials">
          <div class="testimonial">
            <div class="testimonial__quote">
              "Очень удобная платформа. Сделал бота с интеграцией ИИ-модели и запустил у себя. Всё работает!"
            </div>
            <div class="testimonial__author">
              <strong>Александр М.</strong> — ИИ-бот
            </div>
          </div>
          <div class="testimonial">
            <div class="testimonial__quote">
              "Это первый конструктор чат-ботов, который дает исходный код! Все остальные платформы, не дают такой свободы."
            </div>
            <div class="testimonial__author">
              <strong>Дмитрий Б.</strong> — Интернет-магазин
            </div>
          </div>
        </div>
      </section>

      <section id="manual-section">
        <h3 class="secondary-title">Руководство пользователя</h3>
        <h2 class="primary-title">Быстрый запуск</h2>
        <p class="section-description">
          Всё, что нужно знать для успешной настройки и запуска чат-бота, собрано в нашем руководстве.
        </p>
        <GradientButton 
          size="medium"
          @click="$router.push('/manual')"
        >
          Перейти к руководству
        </GradientButton>
      </section>
      <section id="support-section">
        <h3 class="secondary-title">Техническая поддержка</h3>
        <h2 class="primary-title">Возникли вопросы?</h2>
        <p class="section-description">
          Наша команда поможет вам разобраться с трудностями на любом этапе: от создания бота до его запуска на сервере.
        </p>
        <div class="social-networks">
          <a class="social-network" href="https://vk.com/profatsky" target="_blank">
            <img src="@/assets/icons/vk.svg" class="social-network__icon">
            <p class="social-network__nickname">profatsky</p>
          </a>
          <a class="social-network" href="https://t.me/profatsky" target="_blank">
            <img src="@/assets/icons/telegram.svg" class="social-network__icon">
            <p class="social-network__nickname">profatsky</p>
          </a>
        </div>
      </section>
    </div>
  </main>
  <FooterNavigation/>
</template>

<style scoped>
section {
  margin-bottom: 80px;
}

#advantages-section,
#manual-section,
#support-section,
#use-cases-section,
#social-proof-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

#main-section {
  margin-top: 80px;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 80px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-right {
  flex: 0.8;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.hero-visual {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
}

.visual-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-radius: 16px;
  border: 1px solid var(--gray-lines);
  background: var(--main-white);
  box-shadow: var(--shadow-secondary);
  transition: all 0.3s ease;
  position: relative;
}

.visual-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-secondary-hover);
}

.visual-card:nth-child(1) {
  margin-left: 0;
}

.visual-card:nth-child(2) {
  margin-left: 40px;
}

.visual-card:nth-child(3) {
  margin-left: 80px;
}

.visual-card__icon {
  font-size: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--light-gray);
}

.visual-card__text {
  font-size: 16px;
  font-weight: 500;
  color: var(--main-black);
}

.hero__title {
  font-weight: 700;
  font-size: 42px;
  letter-spacing: 1px;
  text-align: left;
  width: 100%;
  margin: 0;
  line-height: 1.2;
}

.hero__description {
  font-weight: 400;
  font-size: 20px;
  letter-spacing: 0.5px;
  line-height: 1.5;
  color: var(--body-text);
  text-align: left;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 32px;
}

.hero__btn {
  width: 280px;
  margin-top: 0;
}

.steps {
  margin-top: 80px;
  display: flex;
  gap: 27px;
}

.step {
  background: var(--main-white);
  border: 1px solid var(--gray-lines);
  border-radius: 16px;
  padding: 16px 34px;
  width: 272px;
  height: 235px;
}

.step__number {
  font-family: 'Roboto Mono', sans-serif;
  font-weight: 500;
  font-size: 64px;
  color: var(--primary-dark);
}

.step__title {
  font-weight: 500;
  font-size: 24px;
  margin-top: 16px;
  margin-bottom: 0;
}

.step__description {
  font-size: 18px;
  color: var(--body-text);
  margin-top: 16px;
  margin-bottom: 24px;
}

.primary-title {
  font-size: 48px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 28px;
  text-align: center;
}

.secondary-title {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 3px;
  color: var(--body-text);
  text-transform: uppercase;
  margin-bottom: 8px;
  text-align: center;
}

.section-description {
  font-size: 24px;
  line-height: 1.4;
  letter-spacing: 1px;
  color: var(--body-text);
  text-align: center;
  margin-top: 0;
  margin-bottom: 36px;
}

.advantages {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 100%;
}

.advantage {
  background: var(--main-white);
  border: 1px solid var(--gray-lines);
  width: 300px;
  height: 110px;
  border-radius: 16px;
  padding: 28px 32px;
}

.advantage__icon {
  font-size: 32px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.advantage__title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px; 
  margin-bottom: 0;
}

.advantage__description {
  font-size: 14px;
  font-weight: 400;
  margin-top: 8px;
  color: var(--body-text);
}

.use-case {
  display: flex;
  align-items: center;
  gap: 60px;
}

.use-case__img {
  width: 550px;
  flex-shrink: 0;
}

.use-case--reversed {
  flex-direction: row-reverse;
}

.use-case__offer {
  display: flex;
  flex-direction: column;
  gap: 26px;
  flex: 1;
  max-width: 500px;
}

.use-case__title {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 1.3;
}

.use-case__description {
  font-size: 20px;
  letter-spacing: 1px;
  line-height: 1.4;
  color: var(--body-text);
}

.use-case__btn {
  width: 100%;
}


.social-networks {
  display: flex;
  justify-content: space-between;
  gap: 40px
}

.social-network {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  height: 32px;
  align-items: center;
}

.social-network__icon {
  width: 32px;
  height: 32px;
}

.social-network__nickname {
  font-size: 24px;
  letter-spacing: 1px;
  color: var(--primary);
}

.pricing-cards {
  display: flex;
  justify-content: center;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--main-white);
  border: 1px solid var(--gray-lines);
  border-radius: 20px;
  padding: 40px 32px;
  flex: 1;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s ease;
}

.pricing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(95, 46, 234, 0.15);
}

.pricing-card--featured {
  border: 2px solid var(--primary);
  box-shadow: 0 8px 32px rgba(95, 46, 234, 0.12);
}

.pricing-card__badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--main-white);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 6px 16px;
  border-radius: 20px;
}

.pricing-card__header {
  text-align: center;
  margin-bottom: 32px;
}

.pricing-card__title {
  font-size: 28px;
  font-weight: 600;
  color: var(--main-black);
  margin: 0 0 16px 0;
}

.pricing-card__price {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.price-amount {
  font-size: 42px;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.price-period {
  font-size: 18px;
  font-weight: 500;
  color: var(--body-text);
}

.pricing-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  flex-grow: 1;
}

.pricing-card__features li {
  font-size: 16px;
  line-height: 1.5;
  color: var(--body-text);
  padding: 12px 0 12px 28px;
  border-bottom: 1px solid var(--light-gray);
  position: relative;
}

.pricing-card__features li:last-child {
  border-bottom: none;
}

.pricing-card__features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 700;
  font-size: 18px;
}

.pricing-card__description {
  font-size: 16px;
  line-height: 1.6;
  color: var(--body-text);
  margin-bottom: 32px;
  flex-grow: 1;
  text-align: center;
}

.pricing-card__btn {
  width: 100%;
}

.social-proof {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 60px;
  padding: 40px;
  background: var(--main-white);
  border-radius: 20px;
  border: 1px solid var(--gray-lines);
}

.proof-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
}

.proof-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
  margin-bottom: 8px;
}

.proof-label {
  font-size: 14px;
  color: var(--body-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

.testimonials {
  display: flex;
  gap: 40px;
  max-width: 800px;
}

.testimonial {
  flex: 1;
  padding: 32px;
  background-color: var(--main-white);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(17, 17, 17, 0.08);
  border: 1px solid rgba(95, 46, 234, 0.1);
}

.testimonial__quote {
  font-size: 18px;
  line-height: 1.6;
  color: var(--body-text);
  font-style: italic;
  margin-bottom: 20px;
}

.testimonial__author {
  font-size: 14px;
  color: var(--primary);
  font-weight: 500;
}

@media (min-width: 768px) and (max-width: 1169px) {
  section {
    margin-bottom: 72px;
  }

  #main-section {
    margin-top: 80px;
  }

  .hero-content {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }

  .hero-left {
    align-items: center;
  }

  .hero-right {
    order: -1;
  }

  .hero-visual {
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .visual-card {
    margin-left: 0 !important;
    padding: 16px 20px;
    min-width: 140px;
  }

  .visual-card__icon {
    font-size: 20px;
    width: 32px;
    height: 32px;
  }

  .visual-card__text {
    font-size: 14px;
  }

  .hero__title {
    font-size: 36px;
    line-height: 1.2;
    text-align: center;
    width: 100%;
  }

  .hero__description {
    font-size: 18px;
    line-height: 1.4;
    margin-top: 20px;
    margin-bottom: 28px;
    text-align: center;
    width: 100%;
  }

  .hero__btn {
    margin-top: 0;
    width: 240px;
  }

  .steps {
    margin: 80px 60px 0px 60px;
    flex-wrap: wrap;
  }

  .step {
    width: 204px;
    flex-shrink: 0;
  }

  .primary-title {
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: 36px;
  }

  .secondary-title {
    margin-bottom: 4px;
  }

  .section-description {
    font-size: 18px;
    line-height: 1.4;
    margin-bottom: 36px;
  }

  .advantages {
    gap: 28px;
  }

  .advantage {
    width: 230px;
    height: 104px;
    padding: 28px;
  }

  .advantage__title {
    font-size: 18px;
  }

  .advantage__description {
    font-size: 12px;
  }

  .use-case,
  .use-case--reversed {
    flex-direction: column;
    gap: 32px;
    margin-bottom: 48px;
  }

  .use-case:last-child,
  .use-case--reversed:last-child {
    margin-bottom: 0;
  }

  .use-case__img {
    width: 100%;
    max-width: 450px;
    height: auto;
  }

  .use-case__offer {
    text-align: center;
    max-width: 600px;
  }

  .use-case__title {
    font-size: 28px;
    line-height: 1.3;
  }

  .use-case__description {
    font-size: 18px;
    line-height: 1.4;
  }

  .use-case__btn {
    width: auto;
    align-self: center;
  }

  .social-proof {
    gap: 24px;
    padding: 24px;
    margin-bottom: 40px;
  }

  .proof-number {
    font-size: 28px;
  }

  .testimonials {
    flex-direction: column;
    gap: 24px;
  }

  .testimonial {
    padding: 24px;
  }

  .testimonial__quote {
    font-size: 16px;
  }

  .pricing-cards {
    gap: 20px;
    flex-wrap: wrap;
  }

  .pricing-card {
    padding: 32px 24px;
    min-width: 220px;
    flex: 1 1 calc(33.333% - 20px);
  }

  .pricing-card__title {
    font-size: 24px;
  }

  .price-amount {
    font-size: 36px;
  }

  .price-period {
    font-size: 16px;
  }

  .pricing-card__features li {
    font-size: 15px;
    padding: 10px 0 10px 24px;
  }

  .pricing-card__features li::before {
    font-size: 16px;
  }

  .pricing-card__description {
    font-size: 15px;
  }
}

@media (max-width: 767px) {
  section {
    margin-bottom: 48px;
  }

  #main-section {
    margin-top: 20px;
  }

  .hero-content {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }

  .hero-left {
    align-items: center;
  }

  .hero-right {
    order: -1;
  }

  .hero-visual {
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .visual-card {
    margin-left: 0 !important;
    padding: 12px 16px;
    min-width: 100px;
    flex: 1;
    max-width: 120px;
  }

  .visual-card__icon {
    font-size: 16px;
    width: 24px;
    height: 24px;
  }

  .visual-card__text {
    font-size: 11px;
    text-align: center;
  }

  .hero__title {
    font-size: 26px;
    line-height: 1.3;
    text-align: center;
    width: 100%;
    word-break: keep-all;
    hyphens: none;
  }

  .hero__description {
    font-size: 16px;
    line-height: 1.4;
    margin-top: 16px;
    margin-bottom: 24px;
    text-align: center;
    width: 100%;
  }


  .hero__btn {
    margin-top: 0;
    width: 100%;
    max-width: 280px;
  }




  .steps {
    margin-top: 44px;
    gap: 24px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .step {
    width: 152px;
    height: 176px;
    padding: 12px 24px;
  }

  .step__number {
    font-size: 44px;
  }

  .step__title {
    font-size: 18px;
  }

  .step__description {
    font-size: 14px;
    margin-top: 12px;
  }

  .primary-title {
    font-size: 28px;
    line-height: 1.2;
    margin-bottom: 20px;
  }

  .secondary-title {
    font-size: 10px;
    letter-spacing: 2px;
    line-height: 1.4;
    margin-bottom: 0;
  }

  .section-description {
    font-size: 16px;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  .advantages {
    gap: 20px;
  }

  .advantage {
    width: 208px;
    height: 99px;
    padding: 22px 26px;
  }

  .advantage__icon {
    font-size: 24px;
    width: 24px;
    height: 24px;
  }

  .advantage__title {
    font-size: 16px;
    margin-top: 8px;
  }

  .advantage__description {
    font-size: 12px;
    margin-top: 4px;
  }

  .social-networks {
    gap: 32px
  }

  .social-network {
    gap: 6px;
    height: 20px;
    align-items: center;
  }
  
  .social-network__icon {
    width: 20px;
    height: 20px;
  }

  .social-network__nickname {
    font-size: 14px;
    letter-spacing: 0px;
  }

  .use-case,
  .use-case--reversed {
    flex-direction: column;
    gap: 24px;
    text-align: center;
    margin-bottom: 40px;
  }

  .use-case:last-child,
  .use-case--reversed:last-child {
    margin-bottom: 0;
  }

  .use-case__img {
    width: 100%;
    max-width: 320px;
    height: auto;
  }

  .use-case__offer {
    gap: 20px;
    max-width: 100%;
  }

  .use-case__title {
    font-size: 24px;
    line-height: 1.3;
  }

  .use-case__description {
    font-size: 16px;
    line-height: 1.4;
  }

  .use-case__btn {
    width: auto;
    align-self: center;
  }

  .social-proof {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    margin-bottom: 32px;
  }

  .proof-number {
    font-size: 24px;
  }

  .proof-label {
    font-size: 12px;
  }

  .testimonials {
    flex-direction: column;
    gap: 16px;
  }

  .testimonial {
    padding: 20px;
  }

  .testimonial__quote {
    font-size: 16px;
    margin-bottom: 16px;
  }

  .testimonial__author {
    font-size: 13px;
  }

  .pricing-cards {
    flex-direction: column;
    gap: 24px;
    padding: 0 16px;
  }

  .pricing-card {
    max-width: 100%;
    padding: 28px 20px;
  }

  .pricing-card__badge {
    font-size: 10px;
    padding: 4px 12px;
  }

  .pricing-card__header {
    margin-bottom: 24px;
  }

  .pricing-card__title {
    font-size: 22px;
    margin-bottom: 12px;
  }

  .price-amount {
    font-size: 32px;
  }

  .price-period {
    font-size: 14px;
  }

  .pricing-card__features {
    margin-bottom: 24px;
  }

  .pricing-card__features li {
    font-size: 14px;
    padding: 8px 0 8px 24px;
  }

  .pricing-card__features li::before {
    font-size: 16px;
  }

  .pricing-card__description {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 24px;
  }
}
</style>