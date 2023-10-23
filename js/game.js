class Game {
    // code to be added
    constructor(){
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameEndScreen = document.getElementById('game-end');
        this.player = new Player (this.gameScreen, 200, 485, 100, 150, "./images/player.png")//change image
        this.height = 600;
        this.width = 1600; //look into how we can create percentage ratio. 
        this.obstacles = [];
        this.coffees = [];
        this.score = 0; 
        this.lives = 3;
        this.gameOver = false;
        this.loadingObstacle = false;
        this.loadingCoffee = false;

    }

    start(){
        this.gameScreen.style.height = `${this.height}px`; //we might want to change dimensions (maybe %) 
        this.gameScreen.style.width = `${this.width}px`;

        //Hide Game Intro Screen
        this.startScreen.style.display = "none";

        //Show the Game  Screen
        this.gameScreen.style.display = "block";

        //Start Game
        this.gameLoop()
    }

    gameLoop (){
        if(this.gameOver){
            return; //what does this do? 
        }
        this.update()
        window.requestAnimationFrame(()=> this.gameLoop())
    }
/* 
    scoreIncrease(){
        setInterval(()=>{
            this.score+=10
        },1000/60) */
/*     } */
/* scoreIncrease(){
    setInterval(()=> {
        this.score += 1;
    },2000)
} */

    update (){
        /* let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = this.score //what does inner HTML do here? 
        lives.innerHTML = this.lives

 */
/*         let timer = 0;
 */
/*         this.scoreIncrease()
 */
        this.player.move();

        for (let i = 0; i<this.obstacles.length; i++){
            const obstacle = this.obstacles[i];
            obstacle.move();

            //Check for collision
            if (this.player.didCollide(obstacle)){
                obstacle.element.remove();
                this.obstacles.splice(i,1); //what does the splice do here? 
                this.lives --;
            }

            else if (obstacle.right > this.width){ //not completely understnading this
                this.score ++;
                obstacle.element.remove();
                this.obstacles.splice(i,1);
            }
        }

        if (this.lives === 0){
            this.endGame();
        }

        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = Math.floor(this.score += 1/60) //what does inner HTML do here? 
        lives.innerHTML = this.lives

        if(!this.obstacles.length && !this.loadingObstacle){ //not sure about this. check once we create obstacles and animations. 
            this.loadingObstacle = true;
            setInterval(()=>{
                this.obstacles.push(new Obstacle(this.gameScreen))
                this.loadingObstacle = false
            }, (2000))
        }

        //COFFEE

        /*         let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = this.score //what does inner HTML do here? 
        lives.innerHTML = this.lives */
/* 
        this.player.move(); */

        for (let i = 0; i<this.coffees.length; i++){
            const coffee = this.coffees[i];
            coffee.move();

            //Check for collision
            if (this.player.didCollide(coffee)){
                coffee.element.remove();
                this.coffees.splice(i,1); //what does the splice do here? 
                this.score +=5;
            }

/*             else if (coffee.right > this.width){ //not completely understnading this
                this.score++;
                coffee.element.remove();
                this.coffees.splice(i,1);
            } */
        }

/*         if (this.lives === 0){
            this.endGame();
        } */
        if(!this.coffees.length && !this.loadingCoffee){ //not sure about this. check once we create obstacles and animations. 
            this.loadingCoffee = true;
            setInterval(()=>{
                this.coffees.push(new Coffee(this.gameScreen))
                this.loadingCoffee = false
            }, (1500))
        }

/*         this.scoreIncrease()
 */    }

    endGame(){
        this.gameOver = true;
        this.player.element.remove(); //why not just type player.remove(). Why add .element? 
        this.obstacles.forEach(obstacle =>{
            obstacle.element.remove();
        });

        this.gameScreen.style.display = "none"
        this.gameEndScreen.style.display = "block"
    }

}