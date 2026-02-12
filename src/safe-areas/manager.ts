import { requestSafeAreaInsets, viewportStableHeight } from '@telegram-apps/sdk';
import { SafeAreaInsets, SafeAreaUpdateCallback } from './types';
import { Platform } from '../platform/types';

/**
 * Менеджер для управления safe area insets
 * Автоматически обновляет CSS переменные и уведомляет подписчиков
 */
export class SafeAreasManager {
  private updateCallbacks: Set<SafeAreaUpdateCallback> = new Set();
  private currentInsets: SafeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 };
  
  constructor(private platform: Platform) {
    console.log('🔲 SafeAreasManager initialized for:', platform);
  }
  
  /**
   * Обновляет safe area insets в зависимости от платформы
   */
  async updateInsets(): Promise<SafeAreaInsets> {
    if (this.platform === 'telegram') {
      try {
        console.log('📐 Updating Telegram safe area insets...');
        
        const s = await requestSafeAreaInsets().catch(() => null);
        const stable = viewportStableHeight() ?? window.innerHeight;
        const diff = Math.max(0, window.innerHeight - Number(stable || 0));
        
        this.currentInsets = {
          top: s?.top ?? 0,
          bottom: typeof s?.bottom === 'number' ? s.bottom : diff,
          left: s?.left ?? 0,
          right: s?.right ?? 0
        };
        
        console.log('✅ Safe area insets updated:', this.currentInsets);
      } catch (error) {
        console.error('❌ Failed to get safe area insets:', error);
      }
    } else {
      // VK и browser - базовые значения (используем env переменные)
      this.currentInsets = { top: 0, bottom: 0, left: 0, right: 0 };
    }
    
    // Обновляем CSS переменные
    this.applyCSSVars();
    
    // Уведомляем подписчиков
    this.updateCallbacks.forEach(cb => cb(this.currentInsets));
    
    return this.currentInsets;
  }
  
  /**
   * Применяет safe area insets к CSS переменным
   * Для Telegram добавляет дополнительный отступ сверху +20px
   */
  private applyCSSVars(): void {
    const style = document.documentElement.style;
    
    // Для Telegram добавляем +20px к верхнему отступу (как в test проекте)
    const topOffset = this.platform === 'telegram' ? this.currentInsets.top + 20 : this.currentInsets.top;
    
    style.setProperty('--inset_top', `${topOffset}px`);
    style.setProperty('--inset_bottom', `${this.currentInsets.bottom}px`);
    style.setProperty('--inset_left', `${this.currentInsets.left}px`);
    style.setProperty('--inset_right', `${this.currentInsets.right}px`);
  }
  
  /**
   * Подписаться на обновления safe areas
   * @returns Функция для отписки
   */
  subscribe(callback: SafeAreaUpdateCallback): () => void {
    this.updateCallbacks.add(callback);
    return () => this.updateCallbacks.delete(callback);
  }
  
  /**
   * Получить текущие safe area insets
   */
  getInsets(): SafeAreaInsets {
    return { ...this.currentInsets };
  }
  
  /**
   * Уничтожить менеджер и очистить подписки
   */
  destroy(): void {
    this.updateCallbacks.clear();
    console.log('🗑️ SafeAreasManager destroyed');
  }
}

/**
 * Создаёт и автоматически инициализирует SafeAreasManager
 * Подписывается на события resize
 * 
 * @param platform - Текущая платформа
 * @returns Экземпляр SafeAreasManager
 * 
 * @example
 * const manager = createSafeAreasManager('telegram');
 * manager.subscribe((insets) => {
 *   console.log('Safe areas updated:', insets);
 * });
 */
export function createSafeAreasManager(platform: Platform): SafeAreasManager {
  const manager = new SafeAreasManager(platform);
  
  // Первоначальное обновление
  manager.updateInsets();
  
  // Автоматическая подписка на resize
  const handleResize = () => manager.updateInsets();
  window.addEventListener('resize', handleResize);
  
  // Сохраняем ссылку на cleanup
  (manager as any)._cleanup = () => {
    window.removeEventListener('resize', handleResize);
  };
  
  return manager;
}
