import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export async function createPayment(email) {
  const response = ref(null);
  const error = ref(null);
  
  await apiClient.post('/payments', {
    email: email,
  })
  .then(res => response.value = res)
  .catch(err => error.value = err);

  return { response, error };
}

