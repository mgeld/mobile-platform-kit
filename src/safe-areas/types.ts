/**
 * Отступы safe area для всех сторон
 */
export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/**
 * Колбэк для обновления safe areas
 */
export type SafeAreaUpdateCallback = (insets: SafeAreaInsets) => void;
