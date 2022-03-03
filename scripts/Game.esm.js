import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { gameLevels, GAME_BOARD_X_OFFSET } from './gameLevels.esm.js';
import { DATALOADED_EVENT_NAME } from './Loader.esm.js'
import { media } from './Media.esm.js';
import { GameState } from './GameState.esm.js';
import { mouseControler } from './MouseControler.esm.js';
import { DIAMOND_SIZE } from './Diamond.esm.js';


const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1; // first line is invisible

class Game extends Common {
    constructor() {
        super();
    }

    playLevel(level) {
        const { numberOfMovements, pointsToWin, board } = gameLevels[level - 1];
        window.removeEventListener(DATALOADED_EVENT_NAME, this.playLevel);

        this.gameState = new GameState(level, numberOfMovements, pointsToWin, board, media.diamondsSprite);
        this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);
               this.animate()
    }

    animate() {
        this.handleMouseState();
        this.handleMouseClick();
        canvas.drawGameOnCanvas(gameState);
        this.gameState.getGameBoard().forEach(diamond => diamond.draw());
        this.animationFrame = window.requestAnimationFrame(() => this.animate());
    }

    handleMouseState() {
        const isSwaping = !this.gameState.getIsSwaping();
        const isMoving = !this.gameState.getIsMoving();
        if (mouseControler.clicked && isSwaping && isMoving) {
            mouseControler.state++;
        }
    }

    handleMouseClick() {
        if (!mouseControler.clicked) {
            return;
        }

        const xClicked = Math.floor((mouseControler.x - GAME_BOARD_X_OFFSET) / DIAMOND_SIZE);
        const yClicked = Math.floor((mouseControler.y - GAME_BOARD_Y_OFFSET) / DIAMOND_SIZE);

        if (!yClicked || xClicked >= DIAMONDS_ARRAY_WIDTH || yClicked >= DIAMONDS_ARRAY_HEIGHT) {
            mouseControler.state = 0;

            return;
        }

        if (mouseControler.state === 1) {
            mouseControler.firstClick = {
                x: xClicked,
                y: yClicked
            }
        } else if (mouseControler.state === 2) {
            mouseControler.secondClick = {
                x: xClicked,
                y: yClicked
            }

            mouseControler.state = 0;

            if (
                Math.abs(mouseControler.firstClick.x - mouseControler.secondClick.x) +
                Math.abs(mouseControler.firstClick.y - mouseControler.secondClick.y) !==
                1
            ) {
                return;
            }

            this.swapDiamonds();

            this.gameState.setIsSwaping(true);
            this.gameState.decreasePointsMovement();
            mouseControler.state = 0;
        }

        mouseControler.clicked = false;
    }
}



export const game = new Game();