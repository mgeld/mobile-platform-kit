import { 
  init, 
  mountViewport, 
  bindViewportCssVars, 
  postEvent 
} from '@telegram-apps/sdk';
import { TelegramInitOptions, InitializationResult } from '../types';

/**
 * Инициализирует Telegram Mini App
 * 
 * @param options - Опции инициализации
 * @returns Результат инициализации
 * 
 * @example
 * const result = await initializeTelegram({
 *   expand: true,
 *   disableVerticalSwipe: true
 * });
 */
export async function initializeTelegram(
  options: TelegramInitOptions = {}
): Promise<InitializationResult> {
  try {
    console.log('📱 Initializing Telegram SDK...');
    
    // Отправляем события до инициализации SDK
    if (options.expand !== false) {
      postEvent('web_app_expand');
      console.log('✅ WebApp expanded');
    }
    
    if (options.disableVerticalSwipe !== false) {
      postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });
      console.log('✅ Vertical swipe disabled');
    }
    
    // Инициализируем SDK
    await init();
    console.log('✅ Telegram SDK initialized');
    
    // Монтируем viewport
    await mountViewport();
    console.log('✅ Viewport mounted');
    
    // Привязываем CSS переменные viewport
    bindViewportCssVars();
    console.log('✅ Viewport CSS vars bound');
    
    return { 
      success: true, 
      platform: 'telegram' 
    };
  } catch (error) {
    console.error('❌ Telegram initialization failed:', error);
    return { 
      success: false, 
      platform: 'telegram',
      error 
    };
  }
}
