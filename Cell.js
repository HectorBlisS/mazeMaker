
class Cell {
    constructor(x, y, ctx) {
        this.x = x
        this.y = y
        this.visited = false
        this.left = true
        this.up = true
        this.right = true
        this.down = true
        this.ctx = ctx
        this.draw()
        this.back = false
    }
    draw(pixelSize) {
        // console.log("drawing:", this.y, this.x)
        let i = this.x * pixelSize
        let j = this.y * pixelSize

        if (this.visited) {
            this.ctx.fillStyle = "#F3E2A9"
        } else {
            this.ctx.fillStyle = "#FACC2E"
        }
        this.ctx.fillRect(i, j, pixelSize, pixelSize)

        if (this.left) {
            this.ctx.beginPath()
            this.ctx.moveTo(i, j)
            this.ctx.lineTo(i, j + pixelSize)
            this.ctx.stroke()
        }
        if (this.up) {
            this.ctx.beginPath()
            this.ctx.moveTo(i, j)
            this.ctx.lineTo(i + pixelSize, j)
            this.ctx.stroke()
        }
        if (this.right) {
            this.ctx.beginPath()
            this.ctx.moveTo(i + pixelSize, j)
            this.ctx.lineTo(i + pixelSize, j + pixelSize)
            this.ctx.stroke()
        }
        if (this.down) {
            this.ctx.beginPath()
            this.ctx.moveTo(i + pixelSize, j + pixelSize)
            this.ctx.lineTo(i, j + pixelSize)
            this.ctx.stroke()
        }



    }
    drawCircle(pixelSize) {
        this.ctx.fillStyle = "#EA7317"
        this.ctx.fillRect(this.x * pixelSize + (pixelSize / 3), this.y * pixelSize + (pixelSize / 3), pixelSize / 3, pixelSize / 3)
    }
}

export default Cell