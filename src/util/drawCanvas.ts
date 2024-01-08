import Shot from "./Shot";

export function redrawCanvas(
    size: number,
    canvas: HTMLCanvasElement,
    r: number,
    shots: Array<Shot>
) {
    clean(canvas)
    shots.forEach(shot => {
            drawShot(size, canvas, r, shot)
    })
}

const HIT_COLOR_FOR_MATCHING_R = '#94BC0E'
const HIT_COLOR_FOR_MISMATCHING_R = '#157D26'
const MISS_COLOR_FOR_MATCHING_R = '#D6001E'
const MISS_COLOR_FOR_MISMATCHING_R = '#7C021F'

function clean(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
}

function drawShot(size: number, canvas: HTMLCanvasElement, r: number, shot: Shot) {
    const frame = size
    const epsilon = 1e-6
    let x = size / 2 + parseFloat(shot.xString) * size * 3 / 10 / r
    let y = size / 2 - parseFloat(shot.yString) * size * 3 / 10 / r

    const color = shot.hit ? (
        Math.abs(parseFloat(shot.rString) - r) < epsilon ? HIT_COLOR_FOR_MATCHING_R : HIT_COLOR_FOR_MISMATCHING_R
    ) : (
        Math.abs(parseFloat(shot.rString) - r) < epsilon ? MISS_COLOR_FOR_MATCHING_R : MISS_COLOR_FOR_MISMATCHING_R
    )

    const ctx = canvas.getContext('2d')

    if (ctx) {
        ctx.beginPath()
        ctx.globalCompositeOperation = 'source-over'
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.arc(x, y,5,0,2*Math.PI,true)
        ctx.fill()
        ctx.stroke()
    }
}