import { retrieveLaunchParams } from '@telegram-apps/sdk';
import { PlatformInfo } from './types';

/**
 * Определяет текущую платформу (Telegram, VK или браузер)
 * 
 * @returns Информация о платформе
 * 
 * @example
 * const platform = detectPlatform();
 * if (platform.isTelegram) {
 *   console.log('Running in Telegram');
 * }
 */
export function detectPlatform(): PlatformInfo {
  // Проверяем VK
  const isVK = 
    window.location.search.includes('vk_') || 
    window.location.hash.includes('vk_') ||
    !!(window as any).AndroidBridge || 
    (window as any).parent !== window;

  // Проверяем Telegram через SDK или fallback на window.Telegram.WebApp
  let isTelegram = false;
  
  // Попробуем через SDK (работает после init)
  try {
    const lp = retrieveLaunchParams();
    isTelegram = !isVK && lp.platform !== 'unknown';
    console.log('📱 Launch params detected:', lp);
  } catch (e) {
    // Fallback: проверяем window.Telegram.WebApp (работает всегда в Telegram)
    const tg = (window as any).Telegram?.WebApp;
    if (!isVK && tg) {
      isTelegram = true;
      console.log('📱 Telegram detected via window.Telegram.WebApp');
    } else {
      console.log('ℹ️ Not in Telegram environment');
      isTelegram = false;
    }
  }

  const platform = isTelegram ? 'telegram' : isVK ? 'vk' : 'browser';

  return {
    platform,
    isTelegram,
    isVK,
    isBrowser: platform === 'browser'
  };
}
