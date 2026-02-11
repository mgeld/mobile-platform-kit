/**
 * Пример использования React хуков
 */

import React from 'react';
import { useMobilePlatform, useSafeAreaInsets } from '@loveapp/mobile-platform-kit/react';

function App() {
  // Комплексная инициализация
  const { isReady, isTelegram, isVK, platform, error } = useMobilePlatform({
    telegram: {
      expand: true,
      disableVerticalSwipe: true
    }
  });
  
  // Получаем safe area insets
  const insets = useSafeAreaInsets();
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!isReady) {
    return <div>Initializing {platform}...</div>;
  }
  
  return (
    <div 
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }}
    >
      <h1>Welcome to {platform}!</h1>
      
      {isTelegram && <TelegramFeatures />}
      {isVK && <VKFeatures />}
      
      <div>
        Safe areas: 
        top={insets.top}px, 
        bottom={insets.bottom}px
      </div>
    </div>
  );
}

function TelegramFeatures() {
  return <div>Telegram specific UI</div>;
}

function VKFeatures() {
  return <div>VK specific UI</div>;
}

export default App;
