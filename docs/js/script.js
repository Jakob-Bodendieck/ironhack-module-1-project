window.onload = function (){
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    const restartButtonJob = document.getElementById ("restart-button-job-offer");

    let game;

    startButton.addEventListener("click", function(){
        game = new Game();
        game.start(); 
        startGame(); 
    })

    function startGame (){}

    restartButton.addEventListener("click", function(){
        restartGame();
    })

    restartButtonJob.addEventListener("click", function(){
        restartGame();
    })

    function restartGame(){
        location.reload()
    }

    // Key Events

    function handleKeydown (event){
        const key = event.key;

        const possibleKeys = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown"
        ]

        if (possibleKeys.includes(key)){
            event.preventDefault() 
            if (game){
                switch(key){
                    case "ArrowLeft":
                        game.player.directionX = -3; 
                        break;
                        case "ArrowUp":
                            if (game.player.checkJump()){
                            break;
                            }else {
                                game.player.jump();
                            }
                        break;
                        case "ArrowRight":
                        game.player.directionX = 3;
                        break;
                }
            }
        }
    }

    function handleKeyUp (event) {
        const key = event.key;

        const possibleKeys = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown"
        ]

        if (possibleKeys.includes(key)){
            event.preventDefault();

            if (game){
                switch(key){
                    case "ArrowLeft":
                        game.player.directionX = 0; 
                        break;

                        case "ArrowUp":
                        game.player.directionY = +5; 
                        break; 

                        case "ArrowRight":
                        game.player.directionX = 0;
                        break;
                }
            }
        }
    }

    window.addEventListener("keydown", handleKeydown)
    window.addEventListener("keyup", handleKeyUp)
}