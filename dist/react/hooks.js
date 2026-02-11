"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlatform = usePlatform;
exports.useSafeAreaInsets = useSafeAreaInsets;
exports.useMobilePlatform = useMobilePlatform;
const react_1 = require("react");
const detector_1 = require("../platform/detector");
const platform_1 = require("../platform");
const manager_1 = require("../safe-areas/manager");
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
function usePlatform() {
    const platformInfo = (0, react_1.useMemo)(() => (0, detector_1.detectPlatform)(), []);
    return platformInfo;
}
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
function useSafeAreaInsets() {
    const { platform } = usePlatform();
    const [insets, setInsets] = (0, react_1.useState)({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    });
    (0, react_1.useEffect)(() => {
        const manager = (0, manager_1.createSafeAreasManager)(platform);
        // Подписываемся на обновления
        const unsubscribe = manager.subscribe(setInsets);
        // Получаем текущие значения
        setInsets(manager.getInsets());
        return () => {
            unsubscribe();
            manager.destroy();
            // Cleanup resize listener если есть
            if (manager._cleanup) {
                manager._cleanup();
            }
        };
    }, [platform]);
    return insets;
}
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
function useMobilePlatform(options) {
    const platformInfo = usePlatform();
    const [isReady, setIsReady] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let mounted = true;
        (async () => {
            try {
                const result = await (0, platform_1.initializePlatform)(options);
                if (mounted) {
                    setIsReady(result.success);
                    if (!result.success) {
                        setError(result.error);
                    }
                }
            }
            catch (err) {
                if (mounted) {
                    setError(err);
                    setIsReady(false);
                }
            }
        })();
        return () => {
            mounted = false;
        };
    }, []); // Запускаем только один раз
    return {
        ...platformInfo,
        isReady,
        error
    };
}
