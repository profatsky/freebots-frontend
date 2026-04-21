<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const trySubmitCode = ref(false);
const telegramCode = ref('');

const telegramBotLink = 'https://t.me/freebots_auth_bot';

const checkCodeValid = () => /^\d{6}$/.test(telegramCode.value);

const loginWithTelegram = () => {
  window.open(telegramBotLink, '_blank');
  trySubmitCode.value = true;
}

const submitCode = async () => {
  if (!checkCodeValid()) {
    toast.error('Введите корректный 6-значный код!');
    return;
  }

  try {
    const { response, error } = await authStore.loginViaTelegram(telegramCode.value);
    if (error.value) {
      toast.error(error.value.response?.data?.detail || 'Ошибка авторизации');
    } else {
      toast.success('Вы успешно авторизовались!');
      router.push({ path: '/projects' });
    }
  } catch (e) {
    toast.error('Что-то пошло не так...');
  }
};
</script>

<template>
    <div class="telegram-login">
    <h2 class="telegram-login__title">Вход через Telegram</h2>
    <div v-if="!trySubmitCode" class="telegram-login__step">
      <p>Получите 6-значный код в Telegram-боте для входа</p>
      <AppButton 
        @click="loginWithTelegram"
        size="medium" 
        importance="primary"
        class="telegram-login__btn"
      >
        Получить код
      </AppButton>
    </div>

    <form v-else @submit.prevent="submitCode" class="telegram-login__step">
      <AppInput
        type="text"
        v-model="telegramCode"
        maxlength="6"
        placeholder="Введите 6-значный код"
        class="telegram-login__input"
        required
      />
      <AppButton 
        type="submit" 
        size="medium" 
        importance="primary"
        class="telegram-login__btn"
      >
        Подтвердить
      </AppButton>
    </form>
  </div>
</template>

<style scoped>
.telegram-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}

.telegram-login__step {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
}

.telegram-login__title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  text-align: center;
}

.telegram-login__btn {
  width: 100%;
}

.telegram-login__input {
  width: 100%;
}

@media (max-width: 767px) {
  .telegram-login {
    gap: 24px;
  }

  .telegram-login__step {
    gap: 20px;
  }

  .telegram-login__title {
    font-size: 20px;
  }
}
</style>