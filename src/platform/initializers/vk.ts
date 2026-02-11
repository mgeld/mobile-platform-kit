import bridge from '@vkontakte/vk-bridge';
import { VKInitOptions, InitializationResult } from '../types';

/**
 * Инициализирует VK Mini App
 * 
 * @param options - Опции инициализации
 * @returns Результат инициализации
 * 
 * @example
 * const result = await initializeVK();
 */
export async function initializeVK(
  options: VKInitOptions = {}
): Promise<InitializationResult> {
  try {
    console.log('🔵 Initializing VK Bridge...');
    
    await bridge.send('VKWebAppInit');
    
    console.log('✅ VK Bridge initialized successfully');
    
    return { 
      success: true, 
      platform: 'vk' 
    };
  } catch (error) {
    console.error('❌ VK Bridge initialization failed:', error);
    return { 
      success: false, 
      platform: 'vk',
      error 
    };
  }
}
