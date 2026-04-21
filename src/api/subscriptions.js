import { ref } from 'vue';
import apiClient from '@/api/apiClient';

export async function getUserSubscriptions(userId) {
  const response = ref(null);
  const error = ref(null);
  
  await apiClient.get(`/users/${userId}/subscriptions`)
  .then(res => response.value = res)
  .catch(err => error.value = err);

  return { response, error };
}

export async function getActiveSubscription(userId) {
  const response = ref(null);
  const error = ref(null);
  
  await apiClient.get(`/users/${userId}/subscriptions/active`)
  .then(res => response.value = res)
  .catch(err => error.value = err);

  return { response, error };
}

export async function createSubscription(userId, durationDays, tariff = 'pro') {
  const response = ref(null);
  const error = ref(null);
  
  await apiClient.post(`/users/${userId}/subscriptions`, {
    tariff: tariff,
    duration_days: durationDays,
  })
  .then(res => response.value = res)
  .catch(err => error.value = err);

  return { response, error };
}

