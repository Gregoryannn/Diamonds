import { Common, HIDDEN_SCREEN } from './Common.esm.js';
import { game } from './Game.esm.js';
import { media } from './Media.esm.js'
const MUSIC_ON_OFF_BUTTON_ID = 'js-music-on-off';
const MUSIC_VOLUME_DOWN_ID = 'js-music-volume-decrease';
const MUSIC_VOLUME_UP_ID = 'js-music-volume-increase';
const SETTINGS_EXIT_BUTTON_ID = 'js-settings-screen-exit-button';
const SETTINGS_SCREEN_ID = 'js-settings-screen';
const SOUND_ON_OFF_BUTTON_ID = 'js-sound-on-off';
const SOUND_VOLUME_DOWN_ID = 'js-sound-volume-decrease';
const SOUND_VOLUME_UP_ID = 'js-sound-volume-increase';
const SWAP_SPEED_DOWN_ID = 'js-swap-speed-decrease';
const SWAP_SPEED_UP_ID = 'js-swap-speed-increase';

export const SWAP_SPEED_FAST_SLOW_BUTTON_ID = 'js-swap-speed-fast-slow';

class Settings extends Common {
    constructor() {
        super(SETTINGS_SCREEN_ID);
        this.bindToElements();
    }
    bindToElements() {
        const exitSettingsElement = this.bindToElement(SETTINGS_EXIT_BUTTON_ID);
        const musciOnOffElement = this.bindToElement(MUSIC_ON_OFF_BUTTON_ID);
        const musciVolumeUpElement = this.bindToElement(MUSIC_VOLUME_UP_ID);
        const musciVolumeDownElement = this.bindToElement(MUSIC_VOLUME_DOWN_ID);
        const soundOnOffElement = this.bindToElement(SOUND_ON_OFF_BUTTON_ID);
        const soundVolumeUpElement = this.bindToElement(SOUND_VOLUME_UP_ID);
        const soundVolumeDownElement = this.bindToElement(SOUND_VOLUME_DOWN_ID);
        const swapSpeedFastSlowElement = this.bindToElement(SWAP_SPEED_FAST_SLOW_BUTTON_ID);
        const swapSpeedDownElement = this.bindToElement(SWAP_SPEED_DOWN_ID);
        const swapSpeedUpElement = this.bindToElement(SWAP_SPEED_UP_ID);

        exitSettingsElement.addEventListener('click', () => this.changeVisibilityScreen(this.element, HIDDEN_SCREEN));
        musciOnOffElement.addEventListener('click', () => media.toggleMusicOnOff());
        musciVolumeUpElement.addEventListener('click', () => media.increaseMusicVolume());
        musciVolumeDownElement.addEventListener('click', () => media.decreaseMusicVolume());
        soundOnOffElement.addEventListener('click', () => media.toggleSoundOnOff());
        soundVolumeUpElement.addEventListener('click', () => media.increaseSoundVolume());
        soundVolumeDownElement.addEventListener('click', () => media.decreaseSoundVolume());
        swapSpeedFastSlowElement.addEventListener('click', () => game.toggleSwapSpeed());
        swapSpeedUpElement.addEventListener('click', () => game.increaseSwapSpeed());
        swapSpeedDownElement.addEventListener('click', () => game.decreaseSwapSpeed());
    }
}
export const settings = new Settings();