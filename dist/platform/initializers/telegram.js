"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeTelegram = initializeTelegram;
const sdk_1 = require("@telegram-apps/sdk");
/**
 * Инициализирует Telegram Mini App
 *
 * @param options - Опции инициализации
 * @returns Результат инициализации
 *
 * @example
 * const result = await initializeTelegram({
 *   expand: true,
 *   disableVerticalSwipe: true
 * });
 */
async function initializeTelegram(options = {}) {
    try {
        console.log('📱 Initializing Telegram SDK...');
        // ВАЖНО: Сначала инициализируем SDK
        await (0, sdk_1.init)();
        console.log('✅ Telegram SDK initialized');
        // Монтируем viewport
        await (0, sdk_1.mountViewport)();
        console.log('✅ Viewport mounted');
        // Привязываем CSS переменные viewport
        (0, sdk_1.bindViewportCssVars)();
        console.log('✅ Viewport CSS vars bound');
        // Теперь отправляем события (после init)
        if (options.expand !== false) {
            (0, sdk_1.postEvent)('web_app_expand');
            console.log('✅ WebApp expanded');
        }
        if (options.disableVerticalSwipe !== false) {
            (0, sdk_1.postEvent)('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });
            console.log('✅ Vertical swipe disabled');
        }
        return {
            success: true,
            platform: 'telegram'
        };
    }
    catch (error) {
        console.error('❌ Telegram initialization failed:', error);
        return {
            success: false,
            platform: 'telegram',
            error
        };
    }
}
