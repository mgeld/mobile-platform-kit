import { detectPlatform } from './detector';
import { initializeTelegram } from './initializers/telegram';
import { initializeVK } from './initializers/vk';
import { initializeBrowser } from './initializers/browser';
import { PlatformInitOptions, InitializationResult } from './types';

/**
 * Определяет платформу и инициализирует её
 * 
 * @param options - Опции инициализации для каждой платформы
 * @returns Результат инициализации
 * 
 * @example
 * const result = await initializePlatform({
 *   telegram: {
 *     expand: true,
 *     disableVerticalSwipe: true
 *   }
 * });
 * 
 * if (result.success) {
 *   console.log('Platform initialized:', result.platform);
 * }
 */
export async function initializePlatform(
  options: PlatformInitOptions = {}
): Promise<InitializationResult> {
  console.log('=== PLATFORM INITIALIZATION START ===');
  
  const platformInfo = detectPlatform();
  console.log('📍 Detected platform:', platformInfo.platform);
  
  let result: InitializationResult;
  
  if (platformInfo.isTelegram) {
    result = await initializeTelegram(options.telegram);
  } else if (platformInfo.isVK) {
    result = await initializeVK(options.vk);
  } else {
    result = await initializeBrowser();
  }
  
  console.log('=== PLATFORM INITIALIZATION END ===');
  console.log('Result:', result);
  
  return result;
}

export * from './detector';
export * from './types';
