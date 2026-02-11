import { PlatformInfo, PlatformInitOptions } from '../platform/types';
import { SafeAreaInsets } from '../safe-areas/types';
/**
 * React хук для определения платформы
 *
 * @returns Информация о текущей платформе
 *
 * @example
 * function MyComponent() {
 *   const { isTelegram, isVK, platform } = usePlatform();
 *   return <div>Platform: {platform}</div>;
 * }
 */
export declare function usePlatform(): PlatformInfo;
/**
 * React хук для получения safe area insets
 * Автоматически обновляется при изменении размеров
 *
 * @returns Текущие safe area insets
 *
 * @example
 * function MyComponent() {
 *   const insets = useSafeAreaInsets();
 *   return <div style={{ paddingTop: insets.top }}>Content</div>;
 * }
 */
export declare function useSafeAreaInsets(): SafeAreaInsets;
/**
 * React хук для полной инициализации платформы
 * Определяет платформу и инициализирует её с нужными опциями
 *
 * @param options - Опции инициализации
 * @returns Информация о платформе и статус готовности
 *
 * @example
 * function App() {
 *   const { isReady, isTelegram } = useMobilePlatform({
 *     telegram: {
 *       expand: true,
 *       disableVerticalSwipe: true
 *     }
 *   });
 *
 *   if (!isReady) return <div>Loading...</div>;
 *   return <div>App ready!</div>;
 * }
 */
export declare function useMobilePlatform(options?: PlatformInitOptions): {
    isReady: boolean;
    error: any;
    platform: import("../platform").Platform;
    isTelegram: boolean;
    isVK: boolean;
    isBrowser: boolean;
};
//# sourceMappingURL=hooks.d.ts.map