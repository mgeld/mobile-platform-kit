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
export declare function initializeTelegram(options?: TelegramInitOptions): Promise<InitializationResult>;
//# sourceMappingURL=telegram.d.ts.map