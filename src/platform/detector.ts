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

  // Проверяем Telegram через SDK
  let isTelegram = false;
  try {
    const lp = retrieveLaunchParams();
    isTelegram = !isVK && lp.platform !== 'unknown';
    console.log('📱 Launch params detected:', lp);
  } catch (e) {
    console.log('ℹ️ Not in Telegram environment');
    isTelegram = false;
  }

  const platform = isTelegram ? 'telegram' : isVK ? 'vk' : 'browser';

  return {
    platform,
    isTelegram,
    isVK,
    isBrowser: platform === 'browser'
  };
}
