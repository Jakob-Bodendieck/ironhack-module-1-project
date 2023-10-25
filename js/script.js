window.onload = function (){
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const restartButtonJob = document.getElementById ("restart-button-job-offer");


    let game;

    startButton.addEventListener("click", function(){
        game = new Game(); //need to create this class
        game.start(); //need to create this function
        startGame(); //need to create this function
    })

    function startGame (){ //empty for now
    }

    restartButton.addEventListener("click", function(){
        restartGame();
    })

    restartButtonJob.addEventListener("click", function(){
        restartGame();
    })

    function restartGame(){
        location.reload() //this could cause errors, not 100% sure what it means. 
    }

    // Key Events

    function handleKeydown (event){
        const key = event.key; // not 100% sure about this 

        const possibleKeys = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown"
        ]

        if (possibleKeys.includes(key)){
            event.preventDefault() //preventing actions from taking place that we dont want (default actions for specific inputs)

            //Implement the jump here
            if (game){


                switch(key){
                    case "ArrowLeft":
                        game.player.directionX = -3; //still need to define player
                        break;
/* 
                        case "ArrowUp":
                        game.player.directionY = -3; //change this later to make the player jump -> work this out with an interval
                        break; */

                        case "ArrowUp":
                            game.player.jump()
                            break;

                        case "ArrowRight":
                        game.player.directionX = 3;
                        break;
                        
/*                         case "ArrowDown": 
                        game.player.directionY = 3; //change this later when we define the jumping function  */

                }
            }
        }
    }

    function handleKeyUp (event) {
        const key = event.key; // not 100% sure about this 

        const possibleKeys = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown"
        ]

        if (possibleKeys.includes(key)){
            event.preventDefault() //preventing actions from taking place that we dont want (default actions for specific inputs)

            if (game){
                switch(key){
                    case "ArrowLeft":
                        game.player.directionX = 0; //still need to define player
                        break;

                        case "ArrowUp":
                        game.player.directionY = +5; //change this later to make the player jump
                        break; 

                        case "ArrowRight":
                        game.player.directionX = 0;
                        break;
                        
/*                      case "ArrowDown": 
                        game.player.directionY = 0; //change this later when we define the jumping function  */

                }
            }
        }
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("keyup", handleKeyUp)
}