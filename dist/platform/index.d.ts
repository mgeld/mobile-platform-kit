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
export declare function initializePlatform(options?: PlatformInitOptions): Promise<InitializationResult>;
export * from './detector';
export * from './types';
//# sourceMappingURL=index.d.ts.map