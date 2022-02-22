import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js'

const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';
const START_SCREEN_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_ID = 'js-start-screen';

class MainMenu extends Common {
    constructor() {
        super(START_SCREEN_ID);
        this.bindToGameElements();
    }

    bindToGameElements() {
        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);

        gameStartButton.addEventListener('click', () => this.showLevelScreen())
        gameSettingsButton.addEventListener('click', () => this.showSettingsScreen())
    }

    showLevelScreen() {
        console.log('wybor poziomu')
    }

    showSettingsScreen() {
        console.log('wybor ustawien')
    }
}

export const mainMenu = new MainMenu();