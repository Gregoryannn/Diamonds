import { Common, VISIBLE_SCREEN } from './Common.esm.js';
import { canvas } from './Canvas.esm.js';
import { gameLevels, GAME_BOARD_X_OFFSET, GAME_BOARD_Y_OFFSET } from './gameLevels.esm.js';
import { DATALOADED_EVENT_NAME } from './Loader.esm.js'
import { media } from './Media.esm.js';
import { GameState } from './GameState.esm.js';
import { mouseControler } from './MouseControler.esm.js';
import { DIAMOND_SIZE } from './Diamond.esm.js';


const DIAMONDS_ARRAY_WIDTH = 8;
const DIAMONDS_ARRAY_HEIGHT = DIAMONDS_ARRAY_WIDTH + 1; // first line is invisible
const SWAPING_SPEED = 8;


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
        this.moveDiamonds();
        this.revertSwap();
        canvas.drawGameOnCanvas(this.gameState);
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

    swapDiamonds() {
        const firstDiamond = mouseControler.firstClick.y * DIAMONDS_ARRAY_WIDTH + mouseControler.firstClick.x;
        const secondDiamond = mouseControler.secondClick.y * DIAMONDS_ARRAY_WIDTH + mouseControler.secondClick.x;

        this.swap(this.gameState.getGameBoard()[firstDiamond], this.gameState.getGameBoard()[secondDiamond]);
    }

    moveDiamonds() {
        this.gameState.setIsMoving(false);
        this.gameState.getGameBoard().forEach(diamond => {
            let dx;
            let dy;

            for (let speedSwap = 0; speedSwap < SWAPING_SPEED; speedSwap++) {
                dx = diamond.x - diamond.row * DIAMOND_SIZE;
                dy = diamond.y - diamond.column * DIAMOND_SIZE;

                if (dx) {
                    diamond.x -= dx / Math.abs(dx);
                }

                if (dy) {
                    diamond.y -= dy / Math.abs(dy);
                }
            }

            if (dx || dy) {
                this.gameState.setIsMoving(true);
            }
        })
    }

    revertSwap() {
        if (this.gameState.getIsSwaping() && !this.gameState.getIsMoving()) {
            // if(!this.scores){
            //     this.swapDiamonds();
            //     this.gameState.increasePointsMovement();
            // }
            this.gameState.setIsSwaping(false);
        }
    }

    swap(firstDiamond, secondDiamond) {
        [
            firstDiamond.kind,
            firstDiamond.alpha,
            firstDiamond.match,
            firstDiamond.x,
            firstDiamond.y,
            secondDiamond.kind,
            secondDiamond.alpha,
            secondDiamond.match,
            secondDiamond.x,
            secondDiamond.y
        ] = [
                secondDiamond.kind,
                secondDiamond.alpha,
                secondDiamond.match,
                secondDiamond.x,
                secondDiamond.y,
                firstDiamond.kind,
                firstDiamond.alpha,
                firstDiamond.match,
                firstDiamond.x,
                firstDiamond.y
            ];

        this.gameState.setIsMoving(true);
    }

  }


export const game = new Game();