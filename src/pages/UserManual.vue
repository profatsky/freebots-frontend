<script setup>
import { ref } from 'vue';
import SimpleHeader from '@/components/SimpleHeader.vue';
import SimpleFooter from '@/components/SimpleFooter.vue';

const activeSection = ref('overview');
const activeTab = ref('windows');
const openFaqItem = ref(null);

const toggleSection = (sectionId) => {
  activeSection.value = activeSection.value === sectionId ? null : sectionId;
};

const switchTab = (tabId) => {
  activeTab.value = tabId;
};

const toggleFaqItem = (itemId) => {
  openFaqItem.value = openFaqItem.value === itemId ? null : itemId;
};
</script>

<template>
  <SimpleHeader/>
  <main>
    <div class="container">
      <div class="page__content">
        <!-- Заголовок -->
        <div class="page__header">
          <div class="header__content">
            <h1 class="header__title">Руководство пользователя</h1>
            <p class="header__subtitle">Пошаговое руководство по созданию и запуску Telegram-бота</p>
          </div>
        </div>

        <!-- Оглавление с иконками -->
        <div class="toc-container">
          <h2 class="toc-title">Содержание</h2>
          <div class="toc-grid">
            <div class="toc-item" @click="toggleSection('overview')">
              <div class="toc-icon">🤖</div>
              <div class="toc-content">
                <h3>Обзор платформы</h3>
                <p>Основные понятия и возможности</p>
              </div>
            </div>
            <div class="toc-item" @click="toggleSection('create')">
              <div class="toc-icon">⚡</div>
              <div class="toc-content">
                <h3>Создание бота</h3>
                <p>Работа с диалогами и плагинами</p>
              </div>
            </div>
            <div class="toc-item" @click="toggleSection('download')">
              <div class="toc-icon">📥</div>
              <div class="toc-content">
                <h3>Скачивание кода</h3>
                <p>Получение готового кода бота</p>
              </div>
            </div>
            <div class="toc-item" @click="toggleSection('config')">
              <div class="toc-icon">⚙️</div>
              <div class="toc-content">
                <h3>Настройка конфига</h3>
                <p>Конфигурация для запуска</p>
              </div>
            </div>
            <div class="toc-item" @click="toggleSection('run')">
              <div class="toc-icon">🚀</div>
              <div class="toc-content">
                <h3>Запуск бота</h3>
                <p>Docker или ручная установка</p>
              </div>
            </div>
            <div class="toc-item" @click="toggleSection('faq')">
              <div class="toc-icon">❓</div>
              <div class="toc-content">
                <h3>Частые вопросы</h3>
                <p>FAQ и решения проблем</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Основной контент -->
        <div class="tutorial-content">
          
          <!-- Обзор платформы -->
          <section v-show="activeSection === 'overview'" class="tutorial-section">
            <div class="section-header">
              <h2>🤖 Обзор платформы</h2>
            </div>
            
            <div class="info-cards">
              <div class="info-card">
                <div class="card-icon">💬</div>
                <h3>Диалоги</h3>
                <p>Сценарии общения с чат-ботом. Каждый диалог реагирует на определенный тип сообщения.</p>
              </div>
              <div class="info-card">
                <div class="card-icon">🧩</div>
                <h3>Блоки</h3>
                <p>Действия, которые выполняет чат-бот. 6 типов блоков для различных задач.</p>
              </div>
              <div class="info-card">
                <div class="card-icon">🔌</div>
                <h3>Плагины</h3>
                <p>Готовые модули с дополнительным функционалом, который легко добавить в бота.</p>
              </div>
              <div class="info-card">
                <div class="card-icon">🧑‍💻</div>
                <h3>Шаблоны диалогов</h3>
                <p>Шаблоны с базовой структурой диалогов для эффективного создания чат-ботов.</p>
              </div>
            </div>

            <div class="warning-box">
              <div class="warning-icon">⚠️</div>
              <div class="warning-content">
                <h4>Важно знать</h4>
                <p>Чат-бот реагирует на 3 типа сообщений: текст, команды (начинающиеся с "/") и нажатия кнопок.</p>
              </div>
            </div>

            <div class="tip-box">
              <div class="tip-icon">💡</div>
              <div class="tip-content">
                <h4>Совет для новичков</h4>
                <p>Начните с простого приветственного диалога, который реагирует на кнопку. Это поможет понять основы работы платформы.</p>
              </div>
            </div>
        </section>
        
          <!-- Создание бота -->
          <section v-show="activeSection === 'create'" class="tutorial-section">
            <div class="section-header">
              <h2>⚡ Создание бота</h2>
            </div>

            <div class="step-by-step">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Перейдите на страницу "Чат-боты"</h3>
                  <p>Откройте <a href="/projects" target="_blank">страницу проектов</a> и нажмите на кнопку "Создать чат-бота"</p>
                  <div class="screenshot-container">
                    <img src="@/assets/img/tutorial/create-project.png" alt="Создание нового проекта" class="tutorial-screenshot">
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Настройте стартовый экран чат-бота</h3>
                  <p>Укажите текст сообщения, которое будет отправляться пользователям при старте, и тип кнопок в главном меню.</p>
                  <div class="screenshot-container">
                    <img src="@/assets/img/tutorial/start-message.png" alt="Настройка стартового экрана чат-бота" class="tutorial-screenshot">
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h3>Создайте диалоги</h3>
                  <p>Создайте для бота сценарии общения, которые будут запускаться при различных сообщениях от пользователей.</p>
                  <div class="tip-box">
                    <div class="tip-icon">💡</div>
                    <div class="tip-content">
                      <h4>Совет:</h4>
                      <p>Начните с простого приветственного диалога, который реагирует на кнопку.</p>
                    </div>
                  </div>
                  <div class="screenshot-container">
                    <img src="@/assets/img/tutorial/create-dialogue.png" alt="Интерфейс создания диалогов" class="tutorial-screenshot">
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">4</div>
                <div class="step-content">
                  <h3>Настройте диалоги</h3>
                  <p>Нажмите на стрелочку рядом с диалогом, чтобы наполнить его блоками действий.</p>
                  <div class="screenshot-container">
                    <img src="@/assets/img/tutorial/configure-dialogue.png" alt="Интерфейс настройки диалога" class="tutorial-screenshot">
                  </div>
                </div>
              </div>
            </div>
        </section>

          <!-- Скачивание кода -->
          <section v-show="activeSection === 'download'" class="tutorial-section">
            <div class="section-header">
              <h2>📥 Скачивание кода</h2>
            </div>

            <div class="step-by-step">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Выберите бота и получите код</h3>
                  <p>На странице проектов выберите созданного вами чат-бота и нажмите на кнопку "Скачать код".</p>
                  <div class="screenshot-container">
                    <img src="@/assets/img/tutorial/download-code.png" alt="Скачивание кода чат-бота" class="tutorial-screenshot">
                  </div>
                </div>
              </div>
            </div>
        </section>
        
          <!-- Настройка конфига -->
          <section v-show="activeSection === 'config'" class="tutorial-section">
            <div class="section-header">
              <h2>⚙️ Настройка конфига</h2>
            </div>

            <div class="step-by-step">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h3>Создайте папку проекта</h3>
                  <p>Создайте отдельную папку и распакуйте в неё все файлы из ZIP-архива.</p>
                  <div class="screenshot-container">
                    <img src="@/assets/img/tutorial/project-files.png" alt="Структура файлов проекта" class="tutorial-screenshot">
                  </div>
                </div>
              </div>

              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h3>Настройте файл .env</h3>
                  <p>Переименуйте <code>.env.example</code> в <code>.env</code> и заполните необходимые данные.</p>
                  
                  <div class="config-section">
                    <h4>📱 Получение токена бота</h4>
                    <ol>
                      <li>Перейдите в официального Telegram-бота для создания бота <a href="https://t.me/BotFather" target="_blank">@BotFather</a></li>
                      <li>Отправьте команду <code>/newbot</code></li>
                      <li>Следуйте инструкциям для создания бота</li>
                      <li>Скопируйте полученный токен</li>
          </ol>
                  </div>

                  <div class="config-section">
                    <h4>🆔 Получение вашего ID</h4>
                    <ol>
                      <li>Перейдите к <a href="https://t.me/getmyid_bot" target="_blank">@getmyid_bot</a></li>
                      <li>Отправьте любое сообщение</li>
                      <li>Скопируйте ваш Telegram ID</li>
          </ol>
                  </div>

                  <div class="code-block">
                    <code># Пример содержимого файла .env</code>
                    <code>BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz</code>
                    <code>ADMIN_ID=123456789</code>
                  </div>

                  <div class="warning-box">
                    <div class="warning-icon">⚠️</div>
                    <div class="warning-content">
                      <h4>Безопасность</h4>
                      <p>Никогда не делитесь ни с кем токеном бота!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Запуск бота -->
          <section v-show="activeSection === 'run'" class="tutorial-section">
            <div class="section-header">
              <h2>🚀 Запуск бота</h2>
            </div>

            <!-- Docker способ -->
            <div class="method-section">
              <h3>🐳 Способ 1: Запуск через Docker (рекомендуется)</h3>
              
              <div class="prerequisite-box">
                <div class="prerequisite-icon">📋</div>
                <div class="prerequisite-content">
                  <h4>Требования</h4>
                  <p>Установите Docker на ваш компьютер.</p>
                </div>
              </div>

              <div class="step-by-step">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>Откройте терминал и перейдите в директорию с чат-ботом</h4>
                    <div class="code-block">
                      <code>cd bot</code>
                    </div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>Создайте Docker образ</h4>
                    <div class="code-block">
                      <code>docker build . -t my-telegram-bot</code>
                    </div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>Запустите контейнер</h4>
                    <div class="code-block">
                      <code>docker run -d my-telegram-bot</code>
                    </div>
                    <div class="success-box">
                      <div class="success-icon">🎉</div>
                      <div class="success-content">
                        <h4>Поздравляем!</h4>
                        <p>Ваш бот запущен и готов к работе!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Ручная установка -->
            <div class="method-section">
              <h3>🔧 Способ 2: Ручная установка</h3>
              
              <div class="prerequisite-box">
                <div class="prerequisite-icon">📋</div>
                <div class="prerequisite-content">
                  <h4>Требования</h4>
                  <p>Установите Python версии 3.10 или выше с <a href="https://www.python.org/downloads/" target="_blank">официального сайта</a>.</p>
                </div>
              </div>

              <div class="os-tabs">
                <div class="os-tab" :class="{ active: activeTab === 'windows' }" @click="switchTab('windows')">Windows</div>
                <div class="os-tab" :class="{ active: activeTab === 'linux' }" @click="switchTab('linux')">Linux/macOS</div>
              </div>

              <div class="os-content" v-show="activeTab === 'windows'">
                <div class="step-by-step">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>Создайте виртуальное окружение</h4>
                      <div class="code-block">
                        <code>python -m venv venv</code>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>Активируйте окружение</h4>
                      <div class="code-block">
                        <code>venv\Scripts\activate</code>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>Установите пакеты</h4>
                      <div class="code-block">
                        <code>pip install -r requirements.txt</code>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>Запустите бота</h4>
                      <div class="code-block">
                        <code>python main.py</code>
                      </div>
                      <div class="success-box">
                        <div class="success-icon">🎉</div>
                        <div class="success-content">
                          <h4>Отлично!</h4>
                          <p>Бот запущен! Проверьте работу в Telegram.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="os-content" v-show="activeTab === 'linux'">
                <div class="step-by-step">
                  <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                      <h4>Создайте виртуальное окружение</h4>
                      <div class="code-block">
                        <code>python3 -m venv venv</code>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                      <h4>Активируйте окружение</h4>
                      <div class="code-block">
                        <code>source venv/bin/activate</code>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                      <h4>Установите пакеты</h4>
                      <div class="code-block">
                        <code>pip install -r requirements.txt</code>
                      </div>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                      <h4>Запустите бота</h4>
                      <div class="code-block">
                        <code>python3 main.py</code>
                      </div>
                      <div class="success-box">
                        <div class="success-icon">🎉</div>
                        <div class="success-content">
                          <h4>Отлично!</h4>
                          <p>Бот запущен! Проверьте работу в Telegram.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- FAQ секция -->
          <section v-show="activeSection === 'faq'" class="tutorial-section">
            <div class="section-header">
              <h2>❓ Часто задаваемые вопросы</h2>
            </div>
            
            <div class="faq-accordion">
              <div class="faq-item" :class="{ active: openFaqItem === 'restart' }">
                <div class="faq-question" @click="toggleFaqItem('restart')">
                  <h3>Как перезапустить бота?</h3>
                  <div class="faq-icon">{{ openFaqItem === 'restart' ? '−' : '+' }}</div>
                </div>
                <div class="faq-answer" v-show="openFaqItem === 'restart'">
                  <p>Если используете Docker: <code>docker restart container_name</code>. Если вручную - просто запустите <code>python main.py</code> снова.</p>
                </div>
              </div>
              
              <div class="faq-item" :class="{ active: openFaqItem === 'no-response' }">
                <div class="faq-question" @click="toggleFaqItem('no-response')">
                  <h3>Бот не отвечает</h3>
                  <div class="faq-icon">{{ openFaqItem === 'no-response' ? '−' : '+' }}</div>
                </div>
                <div class="faq-answer" v-show="openFaqItem === 'no-response'">
                  <p>Проверьте правильность токена в файле .env и убедитесь, что бот не заблокирован в <a href="https://t.me/BotFather" target="_blank">@BotFather</a>.</p>
                </div>
              </div>
              
              <div class="faq-item" :class="{ active: openFaqItem === 'update' }">
                <div class="faq-question" @click="toggleFaqItem('update')">
                  <h3>Как обновить бота?</h3>
                  <div class="faq-icon">{{ openFaqItem === 'update' ? '−' : '+' }}</div>
                </div>
                <div class="faq-answer" v-show="openFaqItem === 'update'">
                  <p>Скачайте новый код из конструктора, замените файлы и перезапустите бота.</p>
                </div>
              </div>
              
              <div class="faq-item" :class="{ active: openFaqItem === 'data-storage' }">
                <div class="faq-question" @click="toggleFaqItem('data-storage')">
                  <h3>Где хранятся данные пользователей?</h3>
                  <div class="faq-icon">{{ openFaqItem === 'data-storage' ? '−' : '+' }}</div>
                </div>
                <div class="faq-answer" v-show="openFaqItem === 'data-storage'">
                  <p>Данные хранятся в файле bot.db в папке с ботом. Регулярно создавайте резервные копии.</p>
                </div>
              </div>
            </div>
        </section>
        </div>
      </div>
    </div>
  </main>
  <SimpleFooter/>
</template>

<style scoped>
/* Предотвращение горизонтального скролла */
* {
  box-sizing: border-box;
}

.page__content {
  max-width: 100%;
  overflow-x: hidden;
  margin: 0 auto;
}
.page__header {
  margin: 32px 0 40px 0;
  text-align: center;
}

.header__content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

.header__title {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 16px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header__subtitle {
  font-size: 20px;
  color: var(--body-text);
  margin-bottom: 32px;
}

.toc-container {
  margin-bottom: 48px;
  padding: 0 16px;
}

.toc-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
}

.toc-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.toc-item {
  background: var(--main-white);
  border: 2px solid var(--gray-lines);
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 16px;
}

.toc-item:hover {
  border-color: var(--primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-primary);
}

.toc-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.toc-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.toc-content p {
  font-size: 14px;
  color: var(--body-text);
  margin: 0;
}

.tutorial-content {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
}

.tutorial-section {
  background: var(--main-white);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid var(--gray-lines);
  box-shadow: var(--shadow-secondary);
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 2px solid var(--light-gray);
}

.section-header h2 {
  font-size: 28px;
  font-weight: 700;
  margin: 0;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.info-card {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.card-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.info-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.info-card p {
  font-size: 16px;
  color: var(--body-text);
  margin: 0;
}

.warning-box, .tip-box, .success-box, .prerequisite-box {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  margin: 24px 0;
}

.warning-box {
  background: var(--error-light);
  border-left: 4px solid var(--error);
}

.tip-box {
  background: #f0f9ff;
  border-left: 4px solid var(--primary);
}

.success-box {
  background: var(--success-light);
  border-left: 4px solid var(--success);
}

.prerequisite-box {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
}

.warning-icon, .tip-icon, .success-icon, .prerequisite-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.warning-content h4, .tip-content h4, .success-content h4, .prerequisite-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.warning-content p, .tip-content p, .success-content p, .prerequisite-content p {
  font-size: 16px;
  margin: 0;
}

.step-by-step {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.step {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.step .step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h3, .step-content h4 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
}

.step-content p {
  font-size: 16px;
  color: var(--body-text);
  margin-bottom: 16px;
}

.screenshot-container {
  margin: 16px 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-secondary);
  border: 1px solid var(--gray-lines);
}

.tutorial-screenshot {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

.tutorial-content a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tutorial-content a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

.tutorial-content a:focus {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.screenshot-placeholder {
  background: var(--light-gray);
  border: 2px dashed var(--gray-lines);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin: 16px 0;
  color: var(--body-text);
}

.screenshot-placeholder small {
  display: block;
  margin-top: 8px;
  font-size: 12px;
  color: var(--placeholder);
}

.code-block {
  background: #1e1e1e;
  color: #d4d4d4;
  border-radius: 8px;
  padding: 20px;
  margin: 16px 0;
  font-family: 'Roboto Mono', monospace;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.code-block code {
  display: block;
  margin-bottom: 8px;
  background: none;
  padding: 0;
  font-size: 14px;
  color: #d4d4d4;
}

.config-section {
  background: var(--light-gray);
  border-radius: 12px;
  padding: 20px;
  margin: 16px 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.config-section h4 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.config-section ol {
  margin: 0;
  padding-left: 20px;
  overflow-wrap: break-word;
}

.config-section li {
  font-size: 16px;
  color: var(--body-text);
  margin-bottom: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.method-section {
  margin-bottom: 48px;
}

.method-section h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--primary);
}

.os-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.os-tab {
  padding: 12px 24px;
  border: 2px solid var(--gray-lines);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.os-tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}


.faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: var(--main-white);
  border: 1px solid var(--gray-lines);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item.active {
  border-color: var(--primary);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  background: var(--light-gray);
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: #e8e9f0;
}

.faq-item.active .faq-question {
  background: var(--primary);
  color: white;
}

.faq-question h3 {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  flex: 1;
}

.faq-icon {
  font-size: 24px;
  font-weight: 700;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.faq-answer {
  padding: 20px;
  animation: slideDown 0.3s ease;
}

.faq-answer p {
  font-size: 16px;
  color: var(--body-text);
  margin: 0;
  line-height: 1.5;
}

.faq-answer code {
  background: var(--light-gray);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  color: var(--primary);
}

.faq-answer a {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.faq-answer a:hover {
  color: var(--primary-dark);
  text-decoration: underline;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Адаптивность */
@media (min-width: 1024px) {
  .header__content,
  .tutorial-content {
    max-width: 900px;
    padding: 0 32px;
  }
  
}

@media (min-width: 768px) and (max-width: 1023px) {
  .header__title {
    font-size: 36px;
  }
  
  .header__subtitle {
    font-size: 18px;
  }
  
  .header__content,
  .tutorial-content {
    padding: 0 24px;
  }
  
  .toc-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
  
  .tutorial-section {
    padding: 24px;
  }
  
  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
  
  .step {
    gap: 16px;
  }
  
  .config-section {
    padding: 16px;
  }
  
  .code-block {
    padding: 16px;
  }
}

@media (max-width: 767px) {
  .page__header {
    margin: 16px 0 24px 0;
  }

  .header__title {
    font-size: 28px;
    line-height: 1.3;
  }
  
  .header__subtitle {
    font-size: 16px;
  }
  
  .header__content,
  .tutorial-content {
    padding: 0 12px;
  }
  
  .toc-title {
    font-size: 24px;
    margin-bottom: 24px;
  }

  .toc-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .toc-item {
    padding: 16px;
    gap: 12px;
  }
  
  .toc-icon {
    font-size: 24px;
  }
  
  .toc-content h3 {
    font-size: 16px;
  }
  
  .toc-content p {
    font-size: 13px;
  }

  .tutorial-section {
    padding: 16px;
    margin-bottom: 24px;
  }

  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-bottom: 12px;
  }
  
  .section-header h2 {
    font-size: 22px;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .info-card {
    padding: 16px;
  }
  
  .card-icon {
    font-size: 36px;
    margin-bottom: 12px;
  }

  .info-card h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .info-card p {
    font-size: 14px;
  }
  
  .warning-box, .tip-box, .success-box, .prerequisite-box {
    padding: 16px;
    margin: 16px 0;
    gap: 12px;
  }
  
  .warning-content h4, .tip-content h4, .success-content h4, .prerequisite-content h4 {
    font-size: 16px;
    margin-bottom: 6px;
  }
  
  .warning-content p, .tip-content p, .success-content p, .prerequisite-content p {
    font-size: 14px;
  }
  
  .step-by-step {
    gap: 24px;
  }
  
  .step {
    flex-direction: column;
    gap: 12px;
  }
  
  .step .step-number {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }
  
  .step-content h3, .step-content h4 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  
  .step-content p {
    font-size: 14px;
    margin-bottom: 12px;
  }

  .screenshot-container {
    margin: 12px 0;
    border-radius: 8px;
  }
  
  .tutorial-screenshot {
    border-radius: 8px;
  }
  
  .screenshot-placeholder {
    padding: 24px 16px;
    margin: 12px 0;
  }
  
  .screenshot-placeholder p {
    font-size: 14px;
  }
  
  .screenshot-placeholder small {
    font-size: 11px;
  }
  
  .config-section {
    padding: 12px;
    margin: 12px 0;
  }
  
  .config-section h4 {
    font-size: 16px;
    gap: 6px;
    margin-bottom: 8px;
  }
  
  .config-section li {
    font-size: 14px;
    margin-bottom: 6px;
  }
  
  .method-section {
    margin-bottom: 32px;
  }
  
  .method-section h3 {
    font-size: 20px;
    margin-bottom: 16px;
  }
  
  .os-tabs {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .os-tab {
    padding: 10px 16px;
    font-size: 14px;
  }
  
  .faq-question {
    padding: 16px;
  }
  
  .faq-question h3 {
    font-size: 16px;
  }
  
  .faq-icon {
    font-size: 18px;
    width: 20px;
    height: 20px;
  }
  
  .faq-answer {
    padding: 0 16px 16px 16px;
  }
  
  .faq-answer p {
    font-size: 14px;
  }
  
  .code-block {
    padding: 16px;
    margin: 12px 0;
  }
  
  .code-block code {
    font-size: 12px;
    line-height: 1.4;
  }
}
</style>