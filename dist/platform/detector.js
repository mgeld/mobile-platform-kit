"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlatform = detectPlatform;
const sdk_1 = require("@telegram-apps/sdk");
/**
 * Определяет текущую платформу (Telegram, VK или браузер)
 *
 * @returns Информация о платформе
 *
 * @example
 * const platform = detectPlatform();
 * if (platform.isTelegram) {
 *   console.log('Running in Telegram');
 * }
 */
function detectPlatform() {
    // Проверяем VK
    const isVK = window.location.search.includes('vk_') ||
        window.location.hash.includes('vk_') ||
        !!window.AndroidBridge ||
        window.parent !== window;
    // Проверяем Telegram через SDK
    let isTelegram = false;
    try {
        const lp = (0, sdk_1.retrieveLaunchParams)();
        isTelegram = !isVK && lp.platform !== 'unknown';
        console.log('📱 Launch params detected:', lp);
    }
    catch (e) {
        console.log('ℹ️ Not in Telegram environment');
        isTelegram = false;
    }
    const platform = isTelegram ? 'telegram' : isVK ? 'vk' : 'browser';
    return {
        platform,
        isTelegram,
        isVK,
        isBrowser: platform === 'browser'
    };
}
