<script setup>
import { ref, computed, onMounted } from 'vue';
import AppNotification from '@/components/UI/AppNotification.vue';
import AppButton from '@/components/UI/AppButton.vue';
import AppModal from '@/components/UI/AppModal.vue';
import AppInput from '@/components/UI/AppInput.vue';
import SidebarNavigation from '@/components/Sidebar/SidebarNavigation.vue';
import { useUsersStore } from '@/stores/usersStore';
import { useSubscriptionsStore } from '@/stores/subscriptionsStore';
import { useToast } from 'vue-toast-notification';
import { createPayment } from '@/api/payments';

const usersStore = useUsersStore();
const subscriptionsStore = useSubscriptionsStore();
const toast = useToast();

const userData = ref(null);
const isLoading = ref(true);
const showPaymentModal = ref(false);
const email = ref('');
const isPaymentProcessing = ref(false);

const hasActiveSubscription = computed(() => 
  subscriptionsStore.activeSubscription !== null
);

const sortedSubscriptions = computed(() => {
  return [...subscriptionsStore.subscriptions].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  );
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} в ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const getDaysRemaining = (expiresAt) => {
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffTime = expiry - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

const getSubscriptionDuration = (createdAt, expiresAt) => {
  const created = new Date(createdAt);
  const expires = new Date(expiresAt);
  const diffTime = expires - created;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const isSubscriptionActive = (subscription) => {
  if (!subscriptionsStore.activeSubscription) return false;
  return subscription.subscription_id === subscriptionsStore.activeSubscription.subscription_id;
};

const openPaymentModal = () => {
  showPaymentModal.value = true;
  email.value = '';
};

const closePaymentModal = () => {
  showPaymentModal.value = false;
  email.value = '';
  isPaymentProcessing.value = false;
};

const handlePayment = async () => {
  if (!email.value || !email.value.trim()) {
    toast.warning('Пожалуйста, введите email');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    toast.warning('Пожалуйста, введите корректный email');
    return;
  }

  isPaymentProcessing.value = true;

  try {
    const { response, error } = await createPayment(email.value);
    
    if (error.value) {
      toast.error('Не удалось создать платеж. Попробуйте позже');
      isPaymentProcessing.value = false;
      return;
    }

    if (response.value?.data?.confirmation_url) {
      window.location.href = response.value.data.confirmation_url;
    } else {
      toast.error('Не получен URL для оплаты');
      isPaymentProcessing.value = false;
    }
  } catch (error) {
    toast.error('Произошла ошибка при создании платежа');
    isPaymentProcessing.value = false;
  }
};

onMounted(async () => {
  isLoading.value = true;
  
  try {
    const { response: userResponse, error: userError } = await usersStore.getUserProfile();
    
    if (userError.value) {
      toast.error('Не удалось загрузить профиль');
      return;
    }
    
    userData.value = userResponse.value.data;
    const userId = userData.value.user_id;
    
    await Promise.all([
      subscriptionsStore.getUserSubscriptions(userId),
      subscriptionsStore.getActiveSubscription(userId)
    ]);
    
  } catch (error) {
    toast.error('Произошла ошибка при загрузке данных');
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <SidebarNavigation />
  <main>
    <div class="container">
      <div class="page__content">
        <div class="page__header">
          <h1 class="header__title">👤 Профиль</h1>
          
          <AppButton
            v-if="userData?.is_superuser"
            size="medium" 
            importance="primary"
            @click="$router.push('/admin-dashboard')"
          >
            Админ-панель
          </AppButton>
        </div>

        <div v-if="isLoading" class="loading">
          <p>Загрузка...</p>
        </div>

        <div v-else class="page__body">
          <div class="profile-section">
            <h2 class="section-title">Общая информация</h2>
            <div class="profile-grid">
              <div class="profile-card">
                <div class="card-icon">📅</div>
                <div class="card-content">
                  <div class="card-label">Дата регистрации</div>
                  <div class="card-value">{{ formatDate(userData.created_at) }}</div>
                </div>
              </div>

              <div class="profile-card">
                <div class="card-icon">🤖</div>
                <div class="card-content">
                  <div class="card-label">Количество чат-ботов</div>
                  <div class="card-value">{{ userData.project_count }}</div>
                </div>
              </div>

              <div class="profile-card">
                <div class="card-icon">🆔</div>
                <div class="card-content">
                  <div class="card-label">Ваш ID</div>
                  <div class="card-value">{{ userData.user_id }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="hasActiveSubscription" class="profile-section">
            <h2 class="section-title">Активная подписка</h2>
            <div class="subscription-active">
              <div class="subscription-active-header">
                <div class="subscription-badge active">
                  <span class="badge-dot"></span>
                  Активна
                </div>
                <div class="subscription-tariff">PRO</div>
              </div>
              <div class="subscription-active-body">
                <div class="subscription-info-row">
                  <span class="info-label">Действует до:</span>
                  <span class="info-value">{{ formatDate(subscriptionsStore.activeSubscription.expires_at) }}</span>
                </div>
                <div class="subscription-info-row">
                  <span class="info-label">Осталось дней:</span>
                  <span class="info-value highlight">{{ getDaysRemaining(subscriptionsStore.activeSubscription.expires_at) }}</span>
                </div>
                <div class="subscription-info-row">
                  <span class="info-label">Начало подписки:</span>
                  <span class="info-value">{{ formatDate(subscriptionsStore.activeSubscription.created_at) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="profile-section">
            <h2 class="section-title">Подписка</h2>
            <AppNotification status="warning">
              <template v-slot:title>У вас нет активной подписки</template>
              <template v-slot:description>
                Оформите подписку PRO, чтобы получить доступ ко всем возможностям конструктора чат-ботов.
              </template>
            </AppNotification>
            
            <div class="payment-action">
              <AppButton
                size="large"
                importance="primary"
                @click="openPaymentModal"
              >
                💳 Оформить подписку PRO
              </AppButton>
            </div>
          </div>

          <div v-if="subscriptionsStore.subscriptions.length > 0" class="profile-section">
            <h2 class="section-title">История подписок</h2>
            <div class="subscriptions-list">
              <div 
                v-for="subscription in sortedSubscriptions" 
                :key="subscription.subscription_id"
                class="subscription-item"
                :class="{ 
                  'subscription-active': isSubscriptionActive(subscription),
                  'subscription-expired': !isSubscriptionActive(subscription)
                }"
              >
                <div class="subscription-header">
                  <div class="subscription-tariff-badge">
                    {{ subscription.tariff.toUpperCase() }}
                  </div>
                  <div 
                    class="subscription-status"
                    :class="{
                      'status-active': isSubscriptionActive(subscription),
                      'status-expired': !isSubscriptionActive(subscription)
                    }"
                  >
                    <span class="status-dot"></span>
                    {{ isSubscriptionActive(subscription) ? 'Активна' : 'Истекла' }}
                  </div>
                </div>
                
                <div class="subscription-details">
                  <div class="detail-row">
                    <span class="detail-label">Период:</span>
                    <span class="detail-value">
                      {{ getSubscriptionDuration(subscription.created_at, subscription.expires_at) }} дней
                    </span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Начало:</span>
                    <span class="detail-value">{{ formatDateTime(subscription.created_at) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Окончание:</span>
                    <span class="detail-value">{{ formatDateTime(subscription.expires_at) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AppNotification status="primary" class="early-adopters-notification">
            <template v-slot:title>Спасибо, что вы с нами! 🎉</template>
            <template v-slot:description>
              <p class="description__main">
                Мы рады видеть вас среди пользователей нашего конструктора чат-ботов! 
                Будем признательны за обратную связь, пожелания и замечания по сервису.
              </p>
              <p class="description__contacts">
                Связаться с нами в ВКонтакте: 
                <a class="social-network-link" href="https://vk.com/profatsky" target="_blank">
                  vk.com/profatsky
                </a>
              </p>
              <p class="description__contacts">
                Связаться с нами в Telegram: 
                <a class="social-network-link" href="https://t.me/profatsky" target="_blank">
                  t.me/profatsky
                </a>
              </p>
            </template>
          </AppNotification>

        </div>
      </div>
    </div>
  </main>

  <AppModal v-if="showPaymentModal" @close-modal="closePaymentModal">
    <div class="payment-modal">
      <h2 class="payment-modal__title">Оформление подписки PRO </h2>
      <p class="payment-modal__description">
        Стоимость подписки PRO - 490 руб/мес
      </p>
      <p class="payment-modal__description">
        Введите ваш email для получения чека об оплате
      </p>
      
      <div class="payment-modal__form">
        <AppInput 
          v-model="email" 
          type="email"
          placeholder="example@email.com"
          :disabled="isPaymentProcessing"
        />
        
        <AppButton
          size="medium"
          importance="primary"
          @click="handlePayment"
          :disabled="isPaymentProcessing"
        >
          {{ isPaymentProcessing ? 'Обработка...' : 'Перейти к оплате' }}
        </AppButton>
      </div>
    </div>
  </AppModal>
</template>

<style scoped>
.page__content {
  display: flex;
  flex-direction: column;
}

.page__header {
  margin: 40px 0 36px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: var(--body-text);
}

.page__body {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.profile-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--body-text);
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.profile-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--main-white);
  border: 1px solid var(--gray-lines);
  box-shadow: var(--shadow-secondary);
  border-radius: 12px;
}

.card-icon {
  font-size: 28px;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--light-gray);
  border-radius: 12px;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.card-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--body-text);
  opacity: 0.7;
}

.card-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--body-text);
  word-break: break-all;
}

.subscription-active {
  background: var(--gradient-primary);
  border-radius: 16px;
  padding: 28px;
  color: white;
  box-shadow: var(--shadow-primary);
}

.subscription-active-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.subscription-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--white-alpha-20);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

.subscription-badge.active .badge-dot {
  width: 8px;
  height: 8px;
  background: var(--success);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.subscription-tariff {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
}

.subscription-active-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.subscription-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--white-alpha-20);
}

.subscription-info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 16px;
  opacity: 0.9;
}

.info-value {
  font-size: 18px;
  font-weight: 600;
}

.info-value.highlight {
  font-size: 24px;
  font-weight: 700;
}

.subscriptions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.subscription-item {
  padding: 20px;
  background: white;
  border: 2px solid var(--gray-lines);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.subscription-item.subscription-active {
  border-color: var(--primary);
  background: var(--gradient-primary-light);
}

.subscription-item.subscription-expired {
  opacity: 0.6;
  border-color: var(--gray-lines);
}

.subscription-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.subscription-tariff-badge {
  display: inline-block;
  padding: 6px 14px;
  background: var(--gradient-primary);
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
}

.subscription-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.subscription-status.status-active {
  color: var(--success);
}

.subscription-status.status-active .status-dot {
  background: var(--success);
}

.subscription-status.status-expired {
  color: var(--error);
}

.subscription-status.status-expired .status-dot {
  background: var(--error);
}

.subscription-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid var(--light-gray);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 14px;
  color: var(--body-text);
  opacity: 0.7;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--body-text);
}

.early-adopters-notification {
  width: 100%;
}

.description__main {
  margin-bottom: 12px;
}

.social-network-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.social-network-link:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.payment-action {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.payment-modal {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.payment-modal__title {
  font-size: 24px;
  font-weight: 600;
  color: var(--body-text);
  text-align: center;
}

.payment-modal__description {
  font-size: 16px;
  color: var(--body-text);
  opacity: 0.8;
  text-align: center;
  margin-bottom: 8px;
}

.payment-modal__form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .page__header {
    margin: 28px 0 32px 0;
  }

  .header__title {
    font-size: 28px;
    line-height: 36px;
  }

  .page__body {
    gap: 32px;
  }

  .section-title {
    font-size: 22px;
  }

  .profile-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .profile-card {
    padding: 20px;
  }

  .subscription-active {
    padding: 24px;
  }
}

@media (max-width: 767px) {
  .page__header {
    margin: 18px 0 24px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .header__title {
    font-size: 24px;
    line-height: 32px;
  }

  .page__body {
    gap: 24px;
  }

  .section-title {
    font-size: 20px;
  }

  .profile-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .profile-card {
    padding: 16px;
  }

  .card-icon {
    font-size: 24px;
    width: 40px;
    height: 40px;
  }

  .card-label {
    font-size: 12px;
  }

  .card-value {
    font-size: 18px;
  }

  .subscription-active {
    padding: 20px;
  }

  .subscription-tariff {
    font-size: 24px;
  }

  .info-label {
    font-size: 14px;
  }

  .info-value {
    font-size: 16px;
  }

  .info-value.highlight {
    font-size: 20px;
  }

  .subscription-item {
    padding: 16px;
  }

  .payment-modal__title {
    font-size: 20px;
  }

  .payment-modal__description {
    font-size: 14px;
  }

  .payment-action {
    margin-top: 16px;
  }
}
</style>
