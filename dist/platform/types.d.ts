/**
 * Типы платформ
 */
export type Platform = 'telegram' | 'vk' | 'browser';
/**
 * Информация о платформе
 */
export interface PlatformInfo {
    platform: Platform;
    isTelegram: boolean;
    isVK: boolean;
    isBrowser: boolean;
}
/**
 * Результат инициализации платформы
 */
export interface InitializationResult {
    success: boolean;
    platform?: Platform;
    error?: any;
}
/**
 * Опции для инициализации Telegram
 */
export interface TelegramInitOptions {
    expand?: boolean;
    disableVerticalSwipe?: boolean;
}
/**
 * Опции для инициализации VK
 */
export interface VKInitOptions {
}
/**
 * Общие опции инициализации
 */
export interface PlatformInitOptions {
    telegram?: TelegramInitOptions;
    vk?: VKInitOptions;
}
//# sourceMappingURL=types.d.ts.map