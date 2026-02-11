"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeVK = initializeVK;
const vk_bridge_1 = __importDefault(require("@vkontakte/vk-bridge"));
/**
 * Инициализирует VK Mini App
 *
 * @param options - Опции инициализации
 * @returns Результат инициализации
 *
 * @example
 * const result = await initializeVK();
 */
async function initializeVK(options = {}) {
    try {
        console.log('🔵 Initializing VK Bridge...');
        await vk_bridge_1.default.send('VKWebAppInit');
        console.log('✅ VK Bridge initialized successfully');
        return {
            success: true,
            platform: 'vk'
        };
    }
    catch (error) {
        console.error('❌ VK Bridge initialization failed:', error);
        return {
            success: false,
            platform: 'vk',
            error
        };
    }
}
