import { SafeAreaInsets, SafeAreaUpdateCallback } from './types';
import { Platform } from '../platform/types';
/**
 * Менеджер для управления safe area insets
 * Автоматически обновляет CSS переменные и уведомляет подписчиков
 */
export declare class SafeAreasManager {
    private platform;
    private updateCallbacks;
    private currentInsets;
    constructor(platform: Platform);
    /**
     * Обновляет safe area insets в зависимости от платформы
     */
    updateInsets(): Promise<SafeAreaInsets>;
    /**
     * Применяет safe area insets к CSS переменным
     * Для Telegram добавляет дополнительный отступ сверху +20px
     */
    private applyCSSVars;
    /**
     * Подписаться на обновления safe areas
     * @returns Функция для отписки
     */
    subscribe(callback: SafeAreaUpdateCallback): () => void;
    /**
     * Получить текущие safe area insets
     */
    getInsets(): SafeAreaInsets;
    /**
     * Уничтожить менеджер и очистить подписки
     */
    destroy(): void;
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
export declare function createSafeAreasManager(platform: Platform): SafeAreasManager;
//# sourceMappingURL=manager.d.ts.map