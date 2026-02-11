"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePlatform = initializePlatform;
const detector_1 = require("./detector");
const telegram_1 = require("./initializers/telegram");
const vk_1 = require("./initializers/vk");
const browser_1 = require("./initializers/browser");
/**
 * Определяет платформу и инициализирует её
 *
 * @param options - Опции инициализации для каждой платформы
 * @returns Результат инициализации
 *
 * @example
 * const result = await initializePlatform({
 *   telegram: {
 *     expand: true,
 *     disableVerticalSwipe: true
 *   }
 * });
 *
 * if (result.success) {
 *   console.log('Platform initialized:', result.platform);
 * }
 */
async function initializePlatform(options = {}) {
    console.log('=== PLATFORM INITIALIZATION START ===');
    const platformInfo = (0, detector_1.detectPlatform)();
    console.log('📍 Detected platform:', platformInfo.platform);
    let result;
    if (platformInfo.isTelegram) {
        result = await (0, telegram_1.initializeTelegram)(options.telegram);
    }
    else if (platformInfo.isVK) {
        result = await (0, vk_1.initializeVK)(options.vk);
    }
    else {
        result = await (0, browser_1.initializeBrowser)();
    }
    console.log('=== PLATFORM INITIALIZATION END ===');
    console.log('Result:', result);
    return result;
}
__exportStar(require("./detector"), exports);
__exportStar(require("./types"), exports);
