import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from './Common.esm.js'
import { levelSelect } from './LevelSelect.esm.js'


const START_SCREEN_SETTINGS_BUTTON_ID = 'js-settings-button';
const START_SCREEN_GAME_BUTTON_ID = 'js-start-game';
const START_SCREEN_ID = 'js-start-screen';

export const SCALE_PROPERTY = '--scale-value';


class MainMenu extends Common {
    constructor() {
        super(START_SCREEN_ID);
        this.bindToGameElements();
        this.resizeGameWindow();
        window.addEventListener('resize', this.resizeGameWindow);
    }
    bindToGameElements() {
        const gameStartButton = this.bindToElement(START_SCREEN_GAME_BUTTON_ID);
        const gameSettingsButton = this.bindToElement(START_SCREEN_SETTINGS_BUTTON_ID);

        gameStartButton.addEventListener('click', this.showLevelScreen)
        gameSettingsButton.addEventListener('click', this.showSettingsScreen)
        gameStartButton.addEventListener('click', () => this.showLevelScreen())
        gameSettingsButton.addEventListener('click', () => this.showSettingsScreen())
    }

    showLevelScreen() {
        levelSelect.createButtons();
        console.log('wybor poziomu')
        this.changeVisibilityScreen(this.element, HIDDEN_SCREEN)
        this.changeVisibilityScreen(levelSelect.element, VISIBLE_SCREEN)
    }

    showSettingsScreen() {
        console.log('wybor ustawien')
    }
    resizeGameWindow() {
        const { innerWidth: width, innerHeight: height } = window;
        const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT);
        document.documentElement.style.setProperty(SCALE_PROPERTY, scale);
    }
}
export const mainMenu = new MainMenu();