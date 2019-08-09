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

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }

    static updateValue(scale : number, dir : number) : number {
        return scale + scGap * dir
    }
}

class DrawingUtil {

    static drawSBMNode(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / rectSizeFactor
        const boxSize : number = Math.min(w, h) / boxSizeFactor
        var deg : number = 0
        var x : number = 0
        for (var i = 0; i < parts; i++) {
            const sc : number = ScaleUtil.divideScale(scale, i, parts)
            x = (size) * sc
            deg += Math.PI/2 * Math.floor(sc)
        }
        context.save()
        context.translate(w / 2, h / 2)
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.strokeStyle = foreColor
        context.fillStyle = foreColor
        context.strokeRect(-size / 2, -size / 2, size, size)

        context.save()
        context.rotate(deg)
        context.fillRect(x, -boxSize, boxSize, boxSize)
        context.restore()
    }
}

class State {

    scale : number = 0
    dir : number = 0
    prevScale : number = 0

    update(cb : Function) {
        this.scale = ScaleUtil.updateValue(this.scale, this.dir)
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb()
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }
}

class Animator {

    animated : boolean = false
    interval : number

    start(cb : Function) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, 50)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

class SBMNode {

    state : State = new State()

    draw(context : CanvasRenderingContext2D) {
        DrawingUtil.drawSBMNode(context, this.state.scale)
    }

    update(cb : Function) {
        this.state.update(cb)
    }

    startUpdating(cb : Function) {
        this.state.startUpdating(cb)
    }
}
