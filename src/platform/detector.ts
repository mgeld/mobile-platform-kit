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

  // Проверяем Telegram через URL параметры (работает всегда)
  let isTelegram = false;
  
  if (!isVK) {
    // Проверяем наличие tgWebApp параметров в URL
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    
    const hasTgParams = 
      urlParams.has('tgWebAppPlatform') ||
      hashParams.has('tgWebAppPlatform') ||
      urlParams.has('tgWebAppVersion') ||
      hashParams.has('tgWebAppVersion');
    
    if (hasTgParams) {
      isTelegram = true;
      console.log('📱 Telegram detected via URL parameters');
    } else {
      // Fallback: пробуем retrieveLaunchParams (после инициализации SDK)
      try {
        const lp = retrieveLaunchParams();
        isTelegram = lp.platform !== 'unknown';
        console.log('📱 Telegram detected via SDK:', lp);
      } catch (e) {
        console.log('ℹ️ Not in Telegram environment');
      }
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
