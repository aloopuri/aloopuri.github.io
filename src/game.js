var title = "My Balloon Game"
// hoisting is the difference between let and var
let developer = "Talal"

const BALLOON_TOTAL = 10

const balloons = []

let score = 0

function greeting() {
    // let gameTitle = title + " - " + "by " + developer
    // interpolated string
    let gameTitleText = `${title} - by ${developer}`

    let gameTitle = document.getElementById("game-title")
    gameTitle.innerHTML = gameTitleText
}


function startGame() {
    buildBalloons()
    let btn = document.getElementById("game-button")
    document.getElementById("game-canvas").style.display = "inline"
    btn.innerHTML = "Restart Game"
    btn.onclick = restartGame
}

function buildBalloons() {
    for (let i = 0; i < BALLOON_TOTAL; i++) {
        balloons.push(new Balloon(random(width), random(height), 33, color(random(255), random(255), random(255))))
    }
}

function setup() {
    makeCanvas()
    document.getElementById("game-canvas").style.display = "none"

}
    
function draw() {
    //a nice sky blue background
    background(135, 206, 235)

    for(let balloon of balloons) {
        balloon.blowAway()
        balloon.checkToPop()
        fill(balloon.col)
        circle(balloon.x, balloon.y, balloon.r)
    }

    if (score == BALLOON_TOTAL) {
        youWin()
    }
}

function youWin() {
    noLoop()

    let para = document.createElement("p")
    para.style.fontSize = "64px"
    let textNode = document.createTextNode("You Win!")
    para.appendChild(textNode)
    para.setAttribute("id", "win-message")

    document.getElementById("game-container").appendChild(para)
    document.getElementById("game-canvas").style.display = "none"
}

function restartGame() {
    if (document.getElementById("win-message")) {
        const elementToDelete = document.getElementById("win-message");
        elementToDelete.parentNode.removeChild(elementToDelete);
    }
    score = 0
    document.getElementById("score").innerHTML = score
    loop()
    document.getElementById("game-canvas").style.display = "inline"

    balloons.splice(0, balloons.length)
    buildBalloons()

}

function makeCanvas() {
    //creates canvas object and attaches it to specified container
    let canvas = createCanvas(640, 480)
    canvas.parent("game-container") 
    document.querySelector("#game-container canvas").setAttribute("id", "game-canvas")
}

/////////////////////////////////////////////////
// extra notes and stuff

// balloons.push("A new balloon")
// balloons.push(1)


// example object
// const testBalloon = {
//     label: "Pop me!",
//     x: 100,
//     y: 50,
//     isPopped: false,
//     // move: function() {} this is how you would define a function normally
//     move() {
//         this.x += 10
//     }
// }
// testBalloon.label = "Pop me!"
// testBalloon.x = 100
// testBalloon.y = 50
// testBalloon.isPopped = false

// testBalloon.move = function() {
//     this.x += 10
// }
