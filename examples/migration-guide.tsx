/**
 * Пример миграции существующего проекта на mobile-platform-kit
 */

// ============= БЫЛО (в index.tsx) =============

/*
import { 
  bindViewportCssVars, 
  mountViewport, 
  requestSafeAreaInsets, 
  viewportStableHeight, 
  postEvent, 
  init, 
  retrieveLaunchParams 
} from '@telegram-apps/sdk';
import bridge from '@vkontakte/vk-bridge';

const isVK = window.location.search.includes('vk_') || 
  window.location.hash.includes('vk_') ||
  !!(window as any).AndroidBridge || 
  (window as any).parent !== window;

let isTelegram = false;
try {
  const lp = retrieveLaunchParams();
  isTelegram = !isVK && lp.platform !== 'unknown';
} catch (e) {
  isTelegram = false;
}

if (isVK) {
  bridge.send('VKWebAppInit').then(() => {
    console.log('VK initialized');
  });
} else if (isTelegram) {
  postEvent('web_app_expand');
  postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });
}

(async () => {
  if (isTelegram) {
    await init();
    await mountViewport();
    bindViewportCssVars();
  }
  
  const updateInsets = async () => {
    if (isTelegram) {
      const s = await requestSafeAreaInsets().catch(() => null);
      const stable = viewportStableHeight() ?? window.innerHeight;
      // ... много кода ...
      document.documentElement.style.setProperty('--inset_top', ...);
      document.documentElement.style.setProperty('--inset_bottom', ...);
    }
  };
  
  await updateInsets();
  window.addEventListener('resize', updateInsets);
  
  root.render(<App />);
})();
*/

// ============= СТАЛО (с mobile-platform-kit) =============

import ReactDOM from 'react-dom/client';
import React from 'react';
import { initializePlatform, createSafeAreasManager, detectPlatform } from '@loveapp/mobile-platform-kit';

// Импортируем CSS один раз
import '@loveapp/mobile-platform-kit/src/scroll/ios-elastic-fix.css';
import '@loveapp/mobile-platform-kit/src/scroll/scrollbar-hide.css';
import '@loveapp/mobile-platform-kit/src/scroll/safe-areas-base.css';

import './index.css';
import App from './App';

(async () => {
  // Вся логика платформы в 3 строках
  const platformInfo = detectPlatform();
  await initializePlatform({
    telegram: { expand: true, disableVerticalSwipe: true }
  });
  const safeAreasManager = createSafeAreasManager(platformInfo.platform);
  
  // Рендерим
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(<React.StrictMode><App /></React.StrictMode>);
})();

// ============= ИЛИ ЕЩЁ ПРОЩЕ (с React хуками) =============

/*
import ReactDOM from 'react-dom/client';
import '@loveapp/mobile-platform-kit/src/scroll/ios-elastic-fix.css';
import '@loveapp/mobile-platform-kit/src/scroll/scrollbar-hide.css';
import '@loveapp/mobile-platform-kit/src/scroll/safe-areas-base.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

// В App.tsx:
import { useMobilePlatform } from '@loveapp/mobile-platform-kit/react';

function App() {
  const { isReady, platform } = useMobilePlatform({
    telegram: { expand: true, disableVerticalSwipe: true }
  });
  
  if (!isReady) return <div>Loading...</div>;
  return <YourApp />;
}
*/
