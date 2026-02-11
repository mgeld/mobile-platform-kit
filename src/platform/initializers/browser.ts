import { InitializationResult } from '../types';

/**
 * "Инициализация" для браузера (ничего не делает)
 * 
 * @returns Результат инициализации
 */
export async function initializeBrowser(): Promise<InitializationResult> {
  console.log('🌐 Running in browser mode - no initialization needed');
  
  return { 
    success: true, 
    platform: 'browser' 
  };
}
