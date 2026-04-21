<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStatisticsStore } from '@/stores/statisticsStore';
import { useSubscriptionsStore } from '@/stores/subscriptionsStore';
import { useUsersStore } from '@/stores/usersStore';
import { useToast } from 'vue-toast-notification';
import SidebarNavigation from '@/components/Sidebar/SidebarNavigation.vue';
import AppButton from '@/components/UI/AppButton.vue';
import AppInput from '@/components/UI/AppInput.vue';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const router = useRouter();
const statisticsStore = useStatisticsStore();
const subscriptionsStore = useSubscriptionsStore();
const usersStore = useUsersStore();
const toast = useToast();

const userCount = ref(0);
const projectCount = ref(0);
const isLoading = ref(true);

const targetUserId = ref('');
const durationDays = ref('');
const formError = ref('');

const validateForm = () => {
  const trimmedUserId = targetUserId.value.trim();
  
  if (!trimmedUserId) {
    return 'Укажите ID пользователя (UUID)';
  }

  if (!UUID_V4_REGEX.test(trimmedUserId)) {
    return 'ID пользователя должен быть в формате UUID v4';
  }

  const days = parseInt(durationDays.value);
  if (isNaN(days) || days <= 0) {
    return 'Укажите корректное количество дней';
  }

  return null;
};

const resetForm = () => {
  targetUserId.value = '';
  durationDays.value = '';
  formError.value = '';
};

onMounted(async () => {
  try {
    const { response: userResponse, error: userError } = await usersStore.getUserProfile();
    
    if (userError.value || !userResponse.value.data.is_superuser) {
      router.push('/not-found');
      return;
    }

    const { response, error } = await statisticsStore.getStatistics();
    if (error.value) {
      router.push('/');
      return;
    }

    userCount.value = response.value.data.user_count;
    projectCount.value = response.value.data.project_count;
  } catch {
    router.push('/');
  } finally {
    isLoading.value = false;
  }
});

const handleCreateSubscription = async () => {
  formError.value = '';

  const validationError = validateForm();
  if (validationError) {
    formError.value = validationError;
    return;
  }

  try {
    const { error } = await subscriptionsStore.adminCreateSubscription(
      targetUserId.value.trim(),
      parseInt(durationDays.value),
      'pro'
    );

    if (error.value) {
      toast.error('Подписка не создана');
      formError.value = 'Ошибка при создании подписки';
    } else {
      toast.success('Подписка создана');
      resetForm();
    }
  } catch {
    toast.error('Подписка не создана');
    formError.value = 'Произошла ошибка';
  }
};
</script>

<template>
  <SidebarNavigation/>
  <main>
    <div class="container">
      <div class="page__content">
        <div v-if="isLoading" class="loading">
          <p>Загрузка...</p>
        </div>

        <div v-else class="admin-dashboard">
          <h1 class="admin-dashboard__title">🛠 Административная панель</h1>

          <section class="admin-dashboard__section">
            <h2 class="admin-dashboard__section-title">Статистика</h2>
            <div class="admin-dashboard__cards">
              <div class="profile-card">
                <div class="card-icon">👥</div>
                <div class="card-content">
                  <div class="card-label">Количество пользователей</div>
                  <div class="card-value">{{ userCount }}</div>
                </div>
              </div>
              <div class="profile-card">
                <div class="card-icon">🤖</div>
                <div class="card-content">
                  <div class="card-label">Количество чат-ботов</div>
                  <div class="card-value">{{ projectCount }}</div>
                </div>
              </div>
            </div>
          </section>

          <section class="admin-dashboard__section">
            <h2 class="admin-dashboard__section-title">Создать подписку пользователю</h2>

            <form class="subscription-form" @submit.prevent="handleCreateSubscription">
              <div class="subscription-form__row">
                <label class="subscription-form__label">ID пользователя (UUID)</label>
                <AppInput
                  v-model="targetUserId"
                  placeholder="Например, 550e8400-e29b-41d4-a716-446655440000"
                />
              </div>

              <div class="subscription-form__row">
                <label class="subscription-form__label">Количество дней</label>
                <AppInput
                  v-model="durationDays"
                  placeholder="Например, 30"
                />
              </div>

              <p v-if="formError" class="subscription-form__error">{{ formError }}</p>

              <AppButton
                type="submit"
                importance="primary"
                size="medium"
              >
                Создать подписку PRO
              </AppButton>
            </form>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: var(--body-text);
}

.admin-dashboard {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.admin-dashboard__title {
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  margin: 40px 0px 36px 0px;
}

.admin-dashboard__section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.admin-dashboard__section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--body-text);
}

.admin-dashboard__cards {
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

.subscription-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background: var(--main-white);
  border: 1px solid var(--gray-lines);
  border-radius: 12px;
  box-shadow: var(--shadow-secondary);
  max-width: 600px;
}

.subscription-form__row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subscription-form__label {
  font-size: 16px;
  font-weight: 600;
  color: var(--body-text);
}

.subscription-form__error {
  color: var(--error);
  font-size: 14px;
  font-weight: 500;
  margin: -8px 0 0 0;
}

@media (min-width: 768px) and (max-width: 1169px) {
  .admin-dashboard__title {
    font-size: 28px;
    line-height: 36px;
    margin: 28px 0px 32px 0px;
  }

  .admin-dashboard {
    gap: 32px;
  }

  .admin-dashboard__section-title {
    font-size: 22px;
  }

  .admin-dashboard__cards {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  .profile-card {
    padding: 20px;
  }

  .subscription-form {
    padding: 20px;
  }
}

@media (max-width: 767px) {
  .admin-dashboard__title {
    font-size: 24px;
    line-height: 32px;
    margin: 18px 0px 24px 0px;
  }

  .admin-dashboard {
    gap: 24px;
  }

  .admin-dashboard__section-title {
    font-size: 20px;
  }

  .admin-dashboard__cards {
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

  .subscription-form {
    padding: 16px;
    gap: 12px;
  }

  .subscription-form__label {
    font-size: 14px;
  }
}
</style>
