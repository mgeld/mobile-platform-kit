import { useEffect, useState, useMemo } from 'react';
import { detectPlatform } from '../platform/detector';
import { initializePlatform } from '../platform';
import { createSafeAreasManager } from '../safe-areas/manager';
import { 
  PlatformInfo, 
  PlatformInitOptions 
} from '../platform/types';
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
export function usePlatform(): PlatformInfo {
  const platformInfo = useMemo(() => detectPlatform(), []);
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
export function useSafeAreaInsets(): SafeAreaInsets {
  const { platform } = usePlatform();
  const [insets, setInsets] = useState<SafeAreaInsets>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  });
  
  useEffect(() => {
    const manager = createSafeAreasManager(platform);
    
    // Подписываемся на обновления
    const unsubscribe = manager.subscribe(setInsets);
    
    // Получаем текущие значения
    setInsets(manager.getInsets());
    
    return () => {
      unsubscribe();
      manager.destroy();
      // Cleanup resize listener если есть
      if ((manager as any)._cleanup) {
        (manager as any)._cleanup();
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
export function useMobilePlatform(options?: PlatformInitOptions) {
  const platformInfo = usePlatform();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<any>(null);
  
  useEffect(() => {
    let mounted = true;
    
    (async () => {
      try {
        const result = await initializePlatform(options);
        
        if (mounted) {
          setIsReady(result.success);
          if (!result.success) {
            setError(result.error);
          }
        }
      } catch (err) {
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
