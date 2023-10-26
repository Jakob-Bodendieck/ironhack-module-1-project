class Game {
    constructor(){
        this.startScreen = document.getElementById('game-intro');
        this.gameScreen = document.getElementById('game-screen');
        this.gameImage = document.getElementById('game-container');
        this.gameEndScreen = document.getElementById('game-end');
        this.gameEndScreenJob = document.getElementById('game-end-job');
        this.stats = document.getElementById('stats');
        this.player = new Player (this.gameScreen, 200, 485, 100, 150, "./images/walking gif.gif");
        this.height = 600;
        this.width = 1450; 
        this.obstacles = [];
        this.coffees = [];
        this.score = 0; 
        this.lives = 3;
        this.gameOver = false;
        this.loadingObstacle = false;
        this.loadingCoffee = false;
        this.myMusic =  new Audio('../Sounds/2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3');
        this.winningMusic = new Audio ('../Sounds/winning music.mp3');
        this.sadMusic = new Audio ('../Sounds/sad-music.mp3');
        this.coffeeSound = new Audio ('../Sounds/coffeeSound.wav');
        this.bugSound = new Audio ('../Sounds/bugSound.wav');

    }

    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        this.myMusic.play();


        //Hide Game Intro Screen
        this.startScreen.style.display = "none";


        //Show the Game  Screen
        this.gameScreen.style.display = "block";
        this.gameImage.style.height = '800px'
        this.stats.style.display = "flex";

        //Start Game
        this.gameLoop();
    }

    gameLoop (){
        if(this.gameOver){
            return;
        }
        this.update()
        window.requestAnimationFrame(()=> this.gameLoop());
    }

    update (){
        this.player.move();

        //Obstacle

        for (let i = 0; i<this.obstacles.length; i++){
            const obstacle = this.obstacles[i];
            obstacle.move();

            //Check for collision
            if (this.player.didCollide(obstacle)){
                obstacle.element.remove();
                this.bugSound.play()
                this.obstacles.splice(i,1); 
                this.lives --;
            }

            else if (obstacle.right > this.width){ 
                obstacle.element.remove();
                this.obstacles.splice(i,1);
            }
        }

        if(!this.obstacles.length && !this.loadingObstacle){
            this.loadingObstacle = true;
            setInterval(()=>{
                this.obstacles.push(new Obstacle(this.gameScreen));
                this.loadingObstacle = false;
            }, 1300)

        }

        //Coffee

        for (let i = 0; i<this.coffees.length; i++){
            const coffee = this.coffees[i];
            coffee.move();

            //Check for collision
            if (this.player.didCollide(coffee)){
                console.log("test");
                this.coffeeSound.play()
                coffee.element.remove();
                this.coffees.splice(i,1); 
                this.score +=5;
            }
        }

        if(!this.coffees.length && !this.loadingCoffee){
            this.loadingCoffee = true;
            let frequency = 2000;
            setInterval(()=>{
                this.coffees.push(new Coffee(this.gameScreen));
                this.loadingCoffee = false;
                frequency -= 50;
            },frequency)
        }

        if (this.lives === 0){
            this.endGame();
        }

        let score = document.getElementById("score");
        let lives = document.getElementById("lives");

        score.innerHTML = Math.floor(this.score += 1/60);
        lives.innerHTML = this.lives;
      }

    //Game Over  

    endGame(){
        this.gameOver = true;
        this.myMusic.pause();
        this.gameImage.style.height = 'auto';
        this.player.element.remove(); 
        this.obstacles.forEach(obstacle =>{
            obstacle.element.remove();
        });


        if (this.score < 100){
            this.gameScreen.style.display = "none";
            this.gameEndScreen.style.display = "block";
            this.sadMusic.play();
        }

        else if (this.score >= 100){
            this.gameScreen.style.display = "none";
            this.gameEndScreenJob.style.display = "block";
            this.winningMusic.play();

        }
    }

}