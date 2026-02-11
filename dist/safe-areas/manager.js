"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAreasManager = void 0;
exports.createSafeAreasManager = createSafeAreasManager;
const sdk_1 = require("@telegram-apps/sdk");
/**
 * Менеджер для управления safe area insets
 * Автоматически обновляет CSS переменные и уведомляет подписчиков
 */
class SafeAreasManager {
    constructor(platform) {
        this.platform = platform;
        this.updateCallbacks = new Set();
        this.currentInsets = { top: 0, bottom: 0, left: 0, right: 0 };
        console.log('🔲 SafeAreasManager initialized for:', platform);
    }
    /**
     * Обновляет safe area insets в зависимости от платформы
     */
    async updateInsets() {
        if (this.platform === 'telegram') {
            try {
                console.log('📐 Updating Telegram safe area insets...');
                const s = await (0, sdk_1.requestSafeAreaInsets)().catch(() => null);
                const stable = (0, sdk_1.viewportStableHeight)() ?? window.innerHeight;
                const diff = Math.max(0, window.innerHeight - Number(stable || 0));
                this.currentInsets = {
                    top: s?.top ?? 0,
                    bottom: typeof s?.bottom === 'number' ? s.bottom : diff,
                    left: s?.left ?? 0,
                    right: s?.right ?? 0
                };
                console.log('✅ Safe area insets updated:', this.currentInsets);
            }
            catch (error) {
                console.error('❌ Failed to get safe area insets:', error);
            }
        }
        else {
            // VK и browser - базовые значения (используем env переменные)
            this.currentInsets = { top: 0, bottom: 0, left: 0, right: 0 };
        }
        // Обновляем CSS переменные
        this.applyCSSVars();
        // Уведомляем подписчиков
        this.updateCallbacks.forEach(cb => cb(this.currentInsets));
        return this.currentInsets;
    }
    /**
     * Применяет safe area insets к CSS переменным
     */
    applyCSSVars() {
        const style = document.documentElement.style;
        style.setProperty('--inset_top', `${this.currentInsets.top}px`);
        style.setProperty('--inset_bottom', `${this.currentInsets.bottom}px`);
        style.setProperty('--inset_left', `${this.currentInsets.left}px`);
        style.setProperty('--inset_right', `${this.currentInsets.right}px`);
    }
    /**
     * Подписаться на обновления safe areas
     * @returns Функция для отписки
     */
    subscribe(callback) {
        this.updateCallbacks.add(callback);
        return () => this.updateCallbacks.delete(callback);
    }
    /**
     * Получить текущие safe area insets
     */
    getInsets() {
        return { ...this.currentInsets };
    }
    /**
     * Уничтожить менеджер и очистить подписки
     */
    destroy() {
        this.updateCallbacks.clear();
        console.log('🗑️ SafeAreasManager destroyed');
    }
}
exports.SafeAreasManager = SafeAreasManager;
/**
 * Создаёт и автоматически инициализирует SafeAreasManager
 * Подписывается на события resize
 *
 * @param platform - Текущая платформа
 * @returns Экземпляр SafeAreasManager
 *
 * @example
 * const manager = createSafeAreasManager('telegram');
 * manager.subscribe((insets) => {
 *   console.log('Safe areas updated:', insets);
 * });
 */
function createSafeAreasManager(platform) {
    const manager = new SafeAreasManager(platform);
    // Первоначальное обновление
    manager.updateInsets();
    // Автоматическая подписка на resize
    const handleResize = () => manager.updateInsets();
    window.addEventListener('resize', handleResize);
    // Сохраняем ссылку на cleanup
    manager._cleanup = () => {
        window.removeEventListener('resize', handleResize);
    };
    return manager;
}
