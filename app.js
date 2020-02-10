import Cell from './Cell.js'

let canvas = document.querySelector('#canvas')
canvas.width = "512"
canvas.height = "512"
let ctx = canvas.getContext('2d')
ctx.fillStyle = "red"
ctx.fillRect(0, 0, 512, 512)

let h = 32
let w = 32
let stack = []
let cells = []
let pixelSize = 16
let interval
let frames = 0

// Config

function start() {
    makeCells()
    let first = cells[0][0]
    stack.push(first)
    interval = setInterval(update, 1000 / 60)
    // first.visited = true
    // stack.push(first)
    // update()
}

function update() {
    ctx.clearRect(0, 0, canvas.with, canvas.height)
    frames++
    if (frames % 1000 == 0) console.log(frames)

    makeLaberint()
    drawCells()
    drawStack()
}

// -------------
//let cell = new Cell(0,0)
//cell.draw(16)

function makeCells() {
    for (let i = 0; i < h; i++) {
        let row = []
        for (let j = 0; j < w; j++) {
            let cell = new Cell(j, i, ctx)
            // cell.draw(pixelSize)
            row.push(cell)
        }
        cells.push(row)
    }
}

function drawCells() {
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            cells[i][j].draw(pixelSize)
        }
    }
}

function drawStack() {
    for (let s of stack) {
        s.drawCircle(pixelSize)
    }
}

// makeLaberint()
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function goBack() {
    stack.pop()
    makeLaberint()
}

function makeLaberint() {
    if (stack.length > 0) {
        let current = stack[stack.length - 1]
        let valid = false
        let checks = 0
        while (!valid && checks < 10) {
            let direction = Math.round(Math.random() * 4)
            switch (direction) {
                //LEFT
                case 0:
                    if (current.x > 0) {
                        let next = cells[current.y][current.x - 1]
                        if (!next.visited) {
                            valid = true
                            next.visited = true
                            next.right = false
                            current.left = false
                            stack.push(next)
                        }
                    }
                    break;
                // UP
                case 1:
                    if (current.y > 0) {
                        let next = cells[current.y - 1][current.x]
                        if (!next.visited) {
                            valid = true
                            next.visited = true
                            next.down = false
                            current.up = false
                            stack.push(next)
                        }
                    }
                    break;
                //RIGHT
                case 2:
                    if (current.x < (w - 1)) {
                        let next = cells[current.y][current.x + 1]
                        if (!next.visited) {
                            valid = true
                            next.visited = true
                            next.left = false
                            current.right = false
                            stack.push(next)
                        }
                    }
                    break;
                //DOWN
                case 3:
                    if (current.y < (h - 1)) {
                        let next = cells[current.y + 1][current.x]
                        if (!next.visited) {
                            valid = true
                            next.visited = true
                            next.up = false
                            current.down = false
                            stack.push(next)
                        }
                    }
                    break;
            }
            checks += 1
        } // while
        if (!valid && checks > 9) {
            goBack()
        }
    }
    // goBack()
} // make


start()