class Coffee {
    constructor(gameScreen){
        this.gameScreen = gameScreen;

        //We need to create a spawn position that creates the obstacle at the right side of the screen
        //Obstacle should stay on the "floor" and move to the left until it leaves the frame or hits player. 
        //this.left = Math.floor((Math.random()) * this.gameScreen.offsetWidth -100);

        //need to change the top or(?) bottom value -> create a platform. 
        //this.top = 0; --> do this once we have created a platform. 

        //position

        this.left = 1600
        this.top = 300;
        //dimensions
        this.width = 75;
        this.height = 75;

        this.element = document.createElement("img");
        this.element.src = "./images/coffee.jpeg";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        // what are left and top corresponding to? need to redefine those dimensions for our game. 
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);

    }
        updatePosition(){
            this.element.style.left = `${this.left}px`;
            //this.element.style.top = `${this.top}px`;
        }

        move(){
            this.left -= 5; //updated it to move from the right to left
            this.updatePosition();
        }
    }