class Coffee {
    constructor(gameScreen){
        this.gameScreen = gameScreen;

        //position
        this.left = 1600;
        this.top = 300;

        //dimensions
        this.width = 75;
        this.height = 75;

        this.element = document.createElement("img");
        this.element.src = "./docs/images/coffee-removebg.png";
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;

        this.gameScreen.appendChild(this.element);

    }
        updatePosition(){
            this.element.style.left = `${this.left}px`;
        }

        move(){
            let speed = setInterval(()=>{
                speed+=0.0001
            },2000)
            this.left -= 4 + speed/2500; //updated it to move from the right to left
            this.updatePosition();
        }
    }