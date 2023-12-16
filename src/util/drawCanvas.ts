import DrawnShot from "./DrawnShot";

export function redrawCanvas(
    size: number,
    shift: number,
    canvas: HTMLCanvasElement,
    r: number,
    shots: Array<DrawnShot>
) {
    clean(canvas)
}

const HIT_COLOR_FOR_MATCHING_R = '#94BC0E'
const HIT_COLOR_FOR_MISMATCHING_R = '#157D26'
const MISS_COLOR_FOR_MATCHING_R = '#D6001E'
const MISS_COLOR_FOR_MISMATCHING_R = '#7C021F'

function clean(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')
    ctx?.clearRect(0, 0, canvas.width, canvas.height)
}

function drawShot(size: number, shift: number, canvas: HTMLCanvasElement, r: number, shot: DrawnShot) {
    const frame = size - 2 * shift
    let x = size / 2 + shot.x * frame / r
    let y = size / 2 - shot.y * frame / r

    const color = shot.hit ? (
        shot.r == r ? HIT_COLOR_FOR_MATCHING_R : HIT_COLOR_FOR_MISMATCHING_R
    ) : (
        shot.r == r ? MISS_COLOR_FOR_MATCHING_R : MISS_COLOR_FOR_MISMATCHING_R
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