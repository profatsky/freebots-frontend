import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export function logoutUser() {
  localStorage.removeItem('access_token');
  router.push('/');
}

export async function loginViaTelegram(code) {
  const response = ref(null);
  const error = ref(null);

  await apiClient.post('/login_via_telegram', {
    code: code,
  })
  .then(res => {
    response.value = res;

    if (res.data.access_token) {
      localStorage.setItem('access_token', res.data.access_token);
    }
  })
  .catch(err => error.value = err);

  return { response, error };
}