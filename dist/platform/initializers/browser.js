"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeBrowser = initializeBrowser;
/**
 * "Инициализация" для браузера (ничего не делает)
 *
 * @returns Результат инициализации
 */
async function initializeBrowser() {
    console.log('🌐 Running in browser mode - no initialization needed');
    return {
        success: true,
        platform: 'browser'
    };
}
