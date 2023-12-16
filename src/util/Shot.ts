export default interface Shot {
    id: number,
    ownerName: string,
    xString: string,
    yString: string,
    rString: string,
    hit: boolean,
    creationDateTime: string,
    timeElapsedNs: number
}