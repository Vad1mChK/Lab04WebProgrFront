import Shot from "./Shot"

export default class DrawnShot implements Shot {
    id: number = 0
    ownerName: string = "John Doe"
    xString: string = "0"
    yString: string = "0"
    rString: string = "1"
    hit: boolean = false
    creationDateTime: string = "yesterday"
    timeElapsedNs: number = 0

    static fromShot(shot: Shot): DrawnShot {
        const newShot: DrawnShot = new DrawnShot()

        newShot.id = shot.id
        newShot.ownerName = shot.ownerName
        newShot.xString = shot.xString
        newShot.yString = shot.yString
        newShot.rString = shot.rString
        newShot.hit = shot.hit
        newShot.creationDateTime = shot.creationDateTime
        newShot.timeElapsedNs = shot.timeElapsedNs

        return newShot
    }

    get x(): number {
        return Number.parseFloat(this.xString)
    }

    set x(x: number) {
        this.xString = x.toString()
    }

    get y(): number {
        return Number.parseFloat(this.yString)
    }

    set y(y: number) {
        this.yString = y.toString()
    }

    get r(): number {
        return Number.parseFloat(this.rString)
    }

    set r(r: number) {
        this.rString = r.toString()
    }
}