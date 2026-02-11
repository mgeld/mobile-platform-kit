# @loveapp/mobile-platform-kit

Переиспользуемый модуль для работы с Telegram Mini Apps, VK Mini Apps и браузером.

## Возможности

- 🔍 **Определение платформы** - автоматическое определение Telegram, VK или браузера
- 🚀 **Инициализация SDK** - единый API для инициализации Telegram SDK и VK Bridge
- 📱 **Safe Areas** - автоматическое управление safe area insets с CSS переменными
- 📜 **iOS Scroll Fix** - исправление эластичного скролла на iOS
- 🎣 **React Hooks** - готовые хуки для React приложений

## Установка

### Вариант 1: Как локальный пакет

```bash
cd mobile-platform-kit
npm install
npm run build

# В вашем проекте
npm install ../mobile-platform-kit
```

### Вариант 2: Через git (после публикации)

```json
{
  "dependencies": {
    "@loveapp/mobile-platform-kit": "git+https://github.com/your-org/mobile-platform-kit.git"
  }
}
```

## Быстрый старт

### 1. Подключите CSS (один раз в index.tsx)

```typescript
import '@loveapp/mobile-platform-kit/src/scroll/ios-elastic-fix.css';
import '@loveapp/mobile-platform-kit/src/scroll/scrollbar-hide.css';
import '@loveapp/mobile-platform-kit/src/scroll/safe-areas-base.css';
```

### 2. Инициализация без React

```typescript
import { initializePlatform } from '@loveapp/mobile-platform-kit';

(async () => {
  const result = await initializePlatform({
    telegram: {
      expand: true,
      disableVerticalSwipe: true
    }
  });
  
  if (result.success) {
    console.log('Platform initialized:', result.platform);
    // Запускаем приложение
  }
})();
```

### 3. Инициализация с React

```typescript
import { useMobilePlatform } from '@loveapp/mobile-platform-kit/react';

function App() {
  const { isReady, isTelegram, isVK, platform } = useMobilePlatform({
    telegram: {
      expand: true,
      disableVerticalSwipe: true
    }
  });
  
  if (!isReady) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>Platform: {platform}</h1>
      {/* Ваше приложение */}
    </div>
  );
}
```

## React Hooks

### usePlatform()

Определяет текущую платформу:

```typescript
import { usePlatform } from '@loveapp/mobile-platform-kit/react';

function MyComponent() {
  const { isTelegram, isVK, isBrowser, platform } = usePlatform();
  
  return (
    <div>
      {isTelegram && <p>Telegram Mini App</p>}
      {isVK && <p>VK Mini App</p>}
      {isBrowser && <p>Browser</p>}
    </div>
  );
}
```

### useSafeAreaInsets()

Получает safe area insets с автоматическим обновлением:

```typescript
import { useSafeAreaInsets } from '@loveapp/mobile-platform-kit/react';

function MyComponent() {
  const insets = useSafeAreaInsets();
  
  return (
    <div style={{
      paddingTop: insets.top,
      paddingBottom: insets.bottom
    }}>
      Content with safe areas
    </div>
  );
}
```

### useMobilePlatform(options)

Комплексная инициализация платформы:

```typescript
import { useMobilePlatform } from '@loveapp/mobile-platform-kit/react';

function App() {
  const { isReady, platform, error } = useMobilePlatform({
    telegram: {
      expand: true,
      disableVerticalSwipe: true
    }
  });
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  
  if (!isReady) {
    return <div>Initializing {platform}...</div>;
  }
  
  return <YourApp />;
}
```

## CSS Переменные

После инициализации доступны следующие CSS переменные:

```css
:root {
  --inset_top: 0px;     /* Верхний отступ */
  --inset_bottom: 0px;  /* Нижний отступ */
  --inset_left: 0px;    /* Левый отступ */
  --inset_right: 0px;   /* Правый отступ */
}
```

Использование:

```css
.header {
  padding-top: var(--inset_top);
}

.footer {
  padding-bottom: var(--inset_bottom);
}
```

## API без React

### detectPlatform()

```typescript
import { detectPlatform } from '@loveapp/mobile-platform-kit';

const platform = detectPlatform();
console.log(platform); // { platform: 'telegram', isTelegram: true, ... }
```

### initializePlatform(options)

```typescript
import { initializePlatform } from '@loveapp/mobile-platform-kit';

const result = await initializePlatform({
  telegram: {
    expand: true,              // Развернуть на весь экран
    disableVerticalSwipe: true // Отключить вертикальный свайп
  },
  vk: {}
});

if (result.success) {
  console.log('Success!', result.platform);
}
```

### SafeAreasManager

```typescript
import { createSafeAreasManager } from '@loveapp/mobile-platform-kit';

const manager = createSafeAreasManager('telegram');

// Подписаться на обновления
manager.subscribe((insets) => {
  console.log('Safe areas updated:', insets);
});

// Получить текущие значения
const insets = manager.getInsets();
console.log(insets); // { top: 44, bottom: 34, left: 0, right: 0 }

// Уничтожить при unmount
manager.destroy();
```

## Структура проекта

```
mobile-platform-kit/
├── src/
│   ├── platform/           # Определение и инициализация платформы
│   │   ├── detector.ts
│   │   ├── types.ts
│   │   └── initializers/
│   │       ├── telegram.ts
│   │       ├── vk.ts
│   │       └── browser.ts
│   ├── safe-areas/        # Управление safe areas
│   │   ├── manager.ts
│   │   └── types.ts
│   ├── scroll/            # CSS фиксы
│   │   ├── ios-elastic-fix.css
│   │   ├── scrollbar-hide.css
│   │   └── safe-areas-base.css
│   ├── react/             # React хуки
│   │   └── hooks.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Требования

- `@telegram-apps/sdk` ^3.0.0
- `@vkontakte/vk-bridge` ^2.0.0
- `react` ^18.0.0 (только для React хуков)

## Лицензия

MIT
