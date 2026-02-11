/**
 * @loveapp/mobile-platform-kit
 * 
 * Переиспользуемый модуль для работы с Telegram, VK и браузером
 * - Определение платформы
 * - Инициализация SDK
 * - Safe areas management
 * - iOS scroll fixes
 */

// Platform detection and initialization
export * from './platform';

// Safe areas management
export * from './safe-areas';

// React hooks (импортируется отдельно для tree-shaking)
// import { usePlatform, useSafeAreaInsets } from '@loveapp/mobile-platform-kit/react';
