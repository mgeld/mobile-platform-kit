/**
 * Пример использования mobile-platform-kit в вашем проекте
 */

import ReactDOM from 'react-dom/client';
import React from 'react';
import { initializePlatform, detectPlatform } from '@loveapp/mobile-platform-kit';
import { createSafeAreasManager } from '@loveapp/mobile-platform-kit';

// 1. Импортируем CSS стили (один раз)
import '@loveapp/mobile-platform-kit/src/scroll/ios-elastic-fix.css';
import '@loveapp/mobile-platform-kit/src/scroll/scrollbar-hide.css';
import '@loveapp/mobile-platform-kit/src/scroll/safe-areas-base.css';

import './index.css';
import App from './App';

// 2. Инициализируем платформу и safe areas
(async () => {
  // Определяем платформу
  const platformInfo = detectPlatform();
  console.log('Platform detected:', platformInfo);
  
  // Инициализируем платформу
  const result = await initializePlatform({
    telegram: {
      expand: true,
      disableVerticalSwipe: true
    }
  });
  
  if (!result.success) {
    console.error('Platform initialization failed:', result.error);
  }
  
  // Создаём менеджер safe areas
  const safeAreasManager = createSafeAreasManager(platformInfo.platform);
  
  // Можно подписаться на обновления (опционально)
  safeAreasManager.subscribe((insets) => {
    console.log('Safe areas updated:', insets);
  });
  
  // 3. Рендерим приложение
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
