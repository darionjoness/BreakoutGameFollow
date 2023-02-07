const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
let timerId
let xDirection = -2
let yDirection = 2
let score = 0

const userStart = [230, 10]
let currentPosition = userStart

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

// Create block
class Block {
    constructor(xAxis, yAxis){
        // Get the positions of the block
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

// All my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

// draw all my blocks
function addBlocks(){

    for(let i = 0; i < blocks.length; i++){
        // Create element and set it to const block
        const block = document.createElement('div')

        // Add class of block to block
        block.classList.add('block')

        // position block
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'

        // Append block to the grid
        grid.appendChild(block)
    }
}

addBlocks()

// Add user
// Create div called user
const user = document.createElement('div')
// Add class of user to user div
user.classList.add('user')
// Position user
drawUser()
// Append user to grid
grid.appendChild(user)

// draw the user
function drawUser(){
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// Draw the ball
function drawBall() {
    // Position ball
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// Create moveUser function
function moveUser(e){
    // use switch statement and pass in key pressed
    switch(e.key){
        // Check if key is ArrowLeft
        case 'ArrowLeft':
            // If currentPosition at the 0 index is greater than 0
            if(currentPosition[0] > 0){
                // Decrement the currentPosition at index 0 by 10
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            // If currentPosition at the 0 index is less than boardWidth - blockWidth
            if(currentPosition[0] < boardWidth - blockWidth){
                // Increment currentPositon at the 0 index by 10
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// Add ball
// Create ball element
const ball = document.createElement('div')
// Add class of ball to ball element
ball.classList.add('ball')
drawBall()
// Append ball to the grid
grid.appendChild(ball)

// move ball
function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawBall()
    checkForCollisions()
}

timerId = setInterval(moveBall, 20)

// Check for collisions
function checkForCollisions() {
    // Check for block collisions
    for(let i = 0; i < blocks.length; i++){
        // Check if a ball collides with a block
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            // Grab all the elements with a class of block
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            // Remove the block at the current index
            allBlocks[i].classList.remove('block')
            // remove block at i from arr
            blocks.splice(i, 1)
            // Run changeDirection
            changeDirection()
            // Increment score
            score++;
            // Set innerHTML of scoreDisplay to the score
            scoreDisplay.innerHTML = score

            // Check for win
            if(blocks.length === 0){
                // Set innerHTML of scoreDisplay
                scoreDisplay.innerHTML = 'YOU WIN'
                // Clear Interval
                clearInterval(timerId)
                // Remove event listener
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    // Check for wall collisons
    // Check if the ballCurrentPosition is at the edge of the grid
    if(
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || ballCurrentPosition[1] >= (boardHeight - ballDiameter) || ballCurrentPosition[0] <= 0
        ){
        changeDirection()
    }

    // Check for user collisions
    if
    (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ){
            changeDirection()
        }

    // Check for game over
    if(ballCurrentPosition[1] <= 0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'YOU LOSE'
        document.removeEventListener('keydown', moveUser)
    }
}

// Create funciton called changeDirection
function changeDirection() {
    // If xDirection and yDirection are equal to 2
    if(xDirection === 2 && yDirection === 2){
        // Change xDirection to decrement by 2
        yDirection = -2
        return 
    }

    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }

    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }

    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return 
    }
}

