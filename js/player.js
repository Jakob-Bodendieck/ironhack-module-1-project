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
        //Update players car position based on direciton
        this.left += this.directionX;
        this.top += this.directionY;
        // Right
        if (this.left + this.width >= this.gameScreen.offsetWidth){
            this.left = this.gameScreen.offsetWidth - this.width
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
        this.updatePosition()
    }


    jump(){
        console.log(this.top);
        if (this.top >= 450 && !this.isJumping){
           this.isJumping = true;
           console.log("test");
        } 
    }

    updatePosition() {
        //Update CSS
/*         if(this.directionY < this.maxJumpHeight){
            this.maxJumpHeight = this.directionY;
        } */
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

/*         if(!this.isGrounded){
            this.top += 5;
        }
        else if(this.top <= 50){
            this.top += 5;
        }
        else if(this.top >= 100){
            this.top = 100;
            this.isGrounded = true;
        } */

        if(this.top > 200 && this.isJumping && !this.isFalling){
            this.top -= 20
        }
        else if(this.top <= 200 && this.isJumping){
            this.top += 20
            this.isFalling = true;
        }
        
    }

    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect()
        const obstacleRect = obstacle.element.getBoundingClientRect()

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
        const playerRect = this.element.getBoundingClientRect()
        const coffeeRect = coffee.element.getBoundingClientRect()

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