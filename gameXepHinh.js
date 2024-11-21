const COLUMN = 10
const ROW = 20
const block_size = 30
const color_mapping = [
    'red',
    'orange',
    'green',
    'purple',
    'blue',
    'cyan',
    'yellow',
    'white',
]

const brickLayout = [
    [
        [
            [1, 7, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 1],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 1, 7],
            [7, 1, 7],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [7, 1, 7],
            [7, 1, 1],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 7, 1],
            [1, 1, 1],
            [7, 7, 7],
        ],
    ],
    [
        [
            [1, 7, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
        [
            [7, 1, 1],
            [1, 1, 7],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 7, 1],
        ],
        [
            [7, 7, 7],
            [7, 1, 1],
            [1, 1, 7],
        ],
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 7],
            [1, 7, 7],
        ],
        [
            [1, 1, 7],
            [7, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 7, 1],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 7],
            [7, 1, 1],
        ]
    ],
    [
        [
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
            [7, 7, 1, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 7, 7, 7],
            [1, 1, 1, 1],
            [7, 7, 7, 7],
        ],
        [
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
            [7, 1, 7, 7],
        ]
    ],
    [
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ],
        [
            [7, 7, 7, 7],
            [7, 1, 1, 7],
            [7, 1, 1, 7],
            [7, 7, 7, 7],
        ]
    ],
    [
        [
            [7, 1, 7],
            [1, 1, 1],
            [7, 7, 7],
        ],
        [
            [7, 1, 7],
            [7, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 7, 7],
            [1, 1, 1],
            [7, 1, 7],
        ],
        [
            [7, 1, 7],
            [1, 1, 7],
            [7, 1, 7],
        ],
    ]
]

const keyCodes = {
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    UP: 'ArrowUp',
    DOWN: 'ArrowDown'
}

const white_color_id = 7

const canvas = document.getElementById("board")
const ctx = canvas.getContext("2d")

ctx.canvas.width = COLUMN * block_size
ctx.canvas.height = ROW * block_size

class boardNew {
    constructor(ctx) {
        this.ctx = ctx
        this.grid = this.generateWhiteBoard()
        this.score = 0
        this.gameOver = false
        this.isPlaying = false
        this.clearRowAudio = new Audio('./sounds_tetris/clear_row.wav')
    }

    reset() {
        this.score = 0
        this.grid = this.generateWhiteBoard()
        this.gameOver = false
        this.drawBoard()
    }

    generateWhiteBoard() {
        return Array.from({length: ROW}, () => Array(COLUMN).fill(white_color_id))
    }

    drawCell(xAxis, yAxis, colorID) {
        this.ctx.fillStyle = color_mapping[colorID] || color_mapping[white_color_id]

        this.ctx.fillRect(xAxis * block_size, yAxis * block_size, block_size, block_size)
        // this.ctx.fillStyle = 'black'
        this.ctx.strokeRect(xAxis * block_size, yAxis * block_size, block_size, block_size)
    }

    drawBoard() {
        for (let rows = 0; rows < this.grid.length; rows++) {
            for (let cols = 0; cols < this.grid[0].length; cols++) {
                this.drawCell(cols, rows, this.grid[rows][cols])
            }
        }
    }

    handleCompleteRow() {
        const latestGrid = board.grid.filter((row) => {
            return row.some(column => column === white_color_id)
        })
        const newScore = ROW - latestGrid.length

        const newRow = Array.from({length: newScore}, () => Array(COLUMN).fill(white_color_id))

        if (newScore) {
            board.grid = [...newRow, ...latestGrid]
            this.handleScore(newScore * 10)
            this.clearRowAudio.play()
        }
    }

    handleScore(newScore) {
        this.score += newScore
        document.getElementById("score").innerHTML = this.score
    }

    handleGameOver() {
        this.gameOver = true
        this.isPlaying = false
        alert("GAME OVER!")
    }
}

class drawBrick {
    constructor(id) {
        this.id = id
        this.layout = brickLayout[id]
        this.activeIndex = 0
        this.colPosition = 3
        this.rowPosition = -2
    }

    draw() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let column = 0; column < this.layout[this.activeIndex][0].length; column++) {
                if (this.layout[this.activeIndex][row][column] !== white_color_id) {
                    board.drawCell(column + this.colPosition, row + this.rowPosition, this.id)
                }
            }
        }
    }

    clear() {
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let column = 0; column < this.layout[this.activeIndex][0].length; column++) {
                if (this.layout[this.activeIndex][row][column] !== white_color_id) {
                    board.drawCell(column + this.colPosition, row + this.rowPosition, white_color_id)
                }
            }
        }
    }

    moveLeft() {
        if (!this.checkCollision(this.rowPosition, this.colPosition - 1, this.layout[this.activeIndex])) {
            this.clear()
            this.colPosition--
            this.draw()
        }

    }

    moveRight() {
        if (!this.checkCollision(this.rowPosition, this.colPosition + 1, this.layout[this.activeIndex])) {
            this.clear()
            this.colPosition++
            this.draw()
        }
    }

    moveDown() {
        if (!this.checkCollision(this.rowPosition + 1, this.colPosition, this.layout[this.activeIndex])) {
            this.clear()
            this.rowPosition++
            this.draw()

            return
        }
        this.handleLanded()

        if (!board.gameOver) {
            generateNewBrick()
        }
    }

    rotate() {
        if (!this.checkCollision(
            this.rowPosition,
            this.colPosition,
            this.layout[(this.activeIndex + 1) % 4])
        ) {
            this.clear()
            this.activeIndex = (this.activeIndex + 1) % 4
            this.draw()
        }
    }

    checkCollision(nextRow, nextCol, nextRotate) {
        // if (nextCol < 0) return true
        for (let row = 0; row < nextRotate.length; row++) {
         for (let column = 0; column < nextRotate[0].length; column++) {
          if (nextRotate[row][column] !== white_color_id && nextRow >= 0) {
           if (
               column + nextCol < 0 ||
               column + nextCol >= COLUMN ||
               row + nextRow >= ROW ||
               board.grid[row + nextRow] [column + nextCol] !== white_color_id
           )
               return true
             }
           }
        }
               return false
    }

    handleLanded() {
        if (this.rowPosition <= 0) {
            board.handleGameOver()
            return
        }
        for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
            for (let column = 0; column < this.layout[this.activeIndex][0].length; column++) {
                if (this.layout[this.activeIndex] [row] [column] !== white_color_id) {
                    board.grid[row + this.rowPosition] [column + this.colPosition] = this.id
                }
            }
        }
        board.handleCompleteRow()
        board.drawBoard()
    }
}

function generateNewBrick() {
    brick = new drawBrick(Math.floor(Math.random() * 7) % brickLayout.length)
}

board = new boardNew(ctx)
board.drawBoard()

document.getElementById("play").addEventListener("click", () => {

    board.reset()
    board.isPlaying = true
    generateNewBrick()

    const refresh = setInterval(() => {
            if (!board.gameOver) {
                brick.moveDown()
            } else {
                clearInterval(refresh)
            }
        }, 1000
    )
})

document.addEventListener("keydown", ev => {
    if (!board.gameOver && board.isPlaying) {
        console.log({ev})
        switch (ev.code) {
            case keyCodes.LEFT:
                brick.moveLeft()
                break
            case keyCodes.RIGHT:
                brick.moveRight()
                break
            case keyCodes.DOWN:
                brick.moveDown()
                break
            case keyCodes.UP:
                brick.rotate()
                break
            default:
                break
        }
    }
})

console.table(board.grid)
