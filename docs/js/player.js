class Player {
    constructor(gameScreen, left, top, width, height, imgSrc){
        this.gameScreen = gameScreen;
        this.left = left; 
        this.top = top;
        this.width = width;
        this.height = height;
        this.imgSrc = imgSrc;
        this.directionX = 0;
        this.directionY = 0;
        this.maxJumpHeight = 0;
        this.element = document.createElement("img");
        this.isJumping = false;
        this.isFalling = false;
        this.jumpSound = new Audio ('./docs/Sounds/jump.mp3');

        this.element.src = imgSrc;
        this.element.style.position = "absolute";

        //Set some default values
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;

        this.gameScreen.appendChild(this.element);
    }

    move(){
        //Update players position based on direciton
        this.left += this.directionX;
        this.top += this.directionY;
        console.log(this.top);
        // Right
        if (this.left + this.width >= this.gameScreen.offsetWidth){
            this.left = this.gameScreen.offsetWidth - this.width;
        }
        // Left
        else if (this.left <= 0) {
            this.left = 0;
        }
        //Bottom
        if(this.top + this.height >= this.gameScreen.offsetHeight){
            this.top = this.gameScreen.offsetHeight - this.height;
            if(this.isJumping && this.isFalling){
            this.isJumping = false; 
            this.isFalling = false;
            }
        }
        //Top
        else if (this.top <= 0){
            this.top = 0;
        }
        this.updatePosition();
    }
    checkJump(){
        return this.isJumping;
    }

    jump(){
        if (this.top >= 450 && !this.isJumping){
           this.isJumping = true;
           this.jumpSound.play();
        } 
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        if(this.top > 200 && this.isJumping && !this.isFalling){
            this.directionY = -10;
        }
        else if(this.top < 200 && this.isJumping && !this.isFalling){
            this.directionY = 10;
            this.isFalling = true;
        }
    }

    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();

        if (playerRect.left < obstacleRect.right
            && playerRect.right > obstacleRect.left
            && playerRect.top < obstacleRect.bottom
            && playerRect.bottom > obstacleRect.top) {
                return true;
            } else {
                return false; 
            }
    }

    didCollide(coffee){
        const playerRect = this.element.getBoundingClientRect();
        const coffeeRect = coffee.element.getBoundingClientRect();

        if (playerRect.left < coffeeRect.right
            && playerRect.right > coffeeRect.left
            && playerRect.top < coffeeRect.bottom
            && playerRect.bottom > coffeeRect.top) {
                return true;
            } else {
                return false; 
            }
    }
}