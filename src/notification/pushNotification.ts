// src/pushNotification.js
const VAPID_PUBLIC_KEY = 'BMs-y_P47hKLyaGF0Mt_QgAK6l9MlQbY5S7LEECwXtY8fORt8GvHkS6HXVmhfXj0f8N272HbmJKTsa0PfDiuqhk'; // from .env

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers are not supported');
    return null;
  }
  console.log('insert registraion');
  const registration = await navigator.serviceWorker.register('/sw.js');
  console.log('Service Worker registered:', registration);
  return registration;
}

export async function askNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return null;
  }

  const permission = await Notification.requestPermission();
  return permission;
}

export async function createSubscription(registration: any) {
  if (!('PushManager' in window)) {
    console.log('Push not supported');
    return null;
  }

  const existing = await registration.pushManager.getSubscription();
  if (existing) return existing;

  const convertedVapidKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedVapidKey
  });

  return subscription;
}

// helper
function urlBase64ToUint8Array(base64String: any) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
