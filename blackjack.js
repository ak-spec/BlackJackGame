document.getElementById("hit-button").addEventListener("click",hit)
document.getElementById("deal-button").addEventListener("click",deal)
document.getElementById("stand-button").addEventListener("click",stand)
let human = document.getElementById("player-score")
let bot = document.getElementById("dealer-score")
let score = 0
let dealerscore = 0
let playerBoard = document.getElementById("playerimages")
let dealerBoard = document.getElementById("dealerimages")
const hitsound = new Audio("blackjack_assets/sounds/swish.m4a")
const winsound = new Audio("blackjack_assets/sounds/cash.mp3")
const lostsound = new Audio("blackjack_assets/sounds/aww.mp3")
let gameflow = {"hit":true,"stand":false,"deal":false,}

function play(playerscore) {
    let myarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11]
    let index = Math.ceil(Math.random() * 14)
    let num = myarr[index]
    let image = document.createElement("img");
    if(num === 11 || num === 1) {
        image.setAttribute("src","blackjack_assets/images/A.png")
        if(playerscore <= 10){
            playerscore += 11
        }else{
            playerscore += 1
        }
    }
    else if(num === 10){
        let powercards = [10, "J", "Q", "K"]
        let value = powercards[Math.floor(Math.random() * 4)]
        image.setAttribute("src","blackjack_assets/images/" + value + ".png")
        playerscore += 10
    }
    else {
        image.setAttribute("src","blackjack_assets/images/" + num + ".png")
        playerscore += num 
    }
    return [playerscore,image]
    
}

function hit(){
    if(gameflow["hit"] === true){
        results = play(score)
        score = results[0]
        tabulatescorehuman(results[0],results[1])
    }
    gameflow["stand"] = true
}

function tabulatescorehuman(points,img){
    if(points > 21){
        human.innerText = "BUST!!"
        human.setAttribute("style","color:red")
    }else{
        human.innerText = points
        playerBoard.appendChild(img) 
        hitsound.play();  
    }
    
}


function stand() {
    if(gameflow["stand"] === true){
        gameflow["hit"] = false
        results = play(dealerscore)
        dealerscore = results[0]
        if(results[0] < 16){
            bot.innerText = results[0]
            dealerBoard.appendChild(results[1])
            hitsound.play()
            setTimeout(stand,1000)     
        }
        else if(16 <= results[0] && results[0] <= 21){
            bot.innerText = results[0]
            dealerBoard.appendChild(results[1])
            hitsound.play()
            gameflow["stand"] = false
            gameflow["deal"] = true
            displaywinner = document.getElementById("stateofgame")
            evaluatewinnner(displaywinner)
            return 
        }
        else if(results[0] > 21){
            bot.innerText = "BUST!!"
            bot.setAttribute("style","color:red")
            gameflow["deal"] = true
            displaywinner = document.getElementById("stateofgame")
            evaluatewinnner(displaywinner)
            return 
        }
    }
    
}
function evaluatewinnner(x){
    let botpoints = bot.innerText
    let playerpoints = human.innerText
    if(botpoints === playerpoints){
        x.innerText = "Game Draw"
    }
    else if(playerpoints == "BUST!!"){
        x.innerText = "YOU LOST!"
        x.style.color = "red"
    }else if(botpoints === "BUST!!"){
        x.innerText = "YOU WON!"
        x.style.color = "green"
    }
    else if(Number(botpoints) > Number(playerpoints)){
        x.innerText = "YOU LOST!"
        x.style.color = "red"

    }else if(Number(botpoints) <  Number(playerpoints)){
        x.innerText = "YOU WON!"
        x.style.color = "green"
    }
    if(x.innerText === "YOU WON!"){
        winsound.play()
    }else{
        lostsound.play()
    }
    
}

function deal() {
    if(gameflow["deal"] === true){
        gameflow["hit"] = true
        gameflow["deal"] = false
        displaywinner = document.getElementById("stateofgame")
        recordoutcome(displaywinner.innerText)
        setTimeout(reset,1000)
    }
   
}

function reset() {
    displaywinner.innerText = "Let's Play"
    displaywinner.setAttribute("style","color:black")
    bot.innerText = 0
    bot.setAttribute("style","color:white")
    human.innerText = 0
    human.setAttribute("style","color:white")
    let numplayerimages = playerBoard.children.length
    let numdealerimages = dealerBoard.children.length
    for(let i = 0;i < numplayerimages; i++){
        playerBoard.removeChild(playerBoard.children[0])
    }
    for(let i = 0;i < numdealerimages; i++){
        dealerBoard.removeChild(dealerBoard.children[0])
    }
    score = 0
    dealerscore = 0
}

let winscore = 0
let lossesscore = 0
let drawscore = 0
function recordoutcome(gamestate) {
    wintable = document.getElementById("no-of-wins")
    lossestable = document.getElementById("no-of-losses")
    drawtable = document.getElementById("no-of-draws")
    if(gamestate === "YOU WON!"){
        winscore += 1
        wintable.innerText = winscore
    }else if(gamestate === "YOU LOST!"){
        lossesscore += 1
        lossestable.innerText = lossesscore
    }else{
        drawscore += 1
        drawtable.innerText = drawscore
    }
}

console.log("I am testing how to push a new feature branch to this repo.");


//





