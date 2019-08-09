const w : number = window.innerWidth
const h : number = window.innerHeight
const parts : number = 4
const scGap : number = 0.1
const strokeFactor : number = 90
const boxSizeFactor : number = 10
const rectSizeFactor : number = 4
const foreColor : string = "#0288D1"
const backColor : string = "#BDBDBD"

class SquareBoxMoverStage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : SquareBoxMoverStage = new SquareBoxMoverStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
