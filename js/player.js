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
        this.isGrounded = true;


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
        }
        //Top
        else if (this.top <= 0){
            this.top = 0;
        }
        this.updatePosition()
    }


    jump(){
        if (this.top >= 500 && this.isGrounded){
            this.isGrounded = false; 
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

        if(!this.isGrounded){
            this.top -=5
        }
        else if(this.top <= 300){
            this.top += 5
        }
        else if(this.top <= 100){
            this.top = 100
            this.isGrounded = true
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
}