function setup() {
    createCanvas(tempWidth, tempHeight);
    noLoop()
    console.log(`width: ${width}, height: ${height}`)
}

function draw() {
    noFill()
    colorMode(HSL)
    background(31,100,92)

    for (let i=0; i<R.randNum(1,3); i++) {
        strokeWeight(R.randNum(.2,.6))
        stroke(31,R.randNum(0,100),4)
        beginShape()
        curveTightness(0.6)
        curveVertexWiggle(200*M,200*M)
        curveVertexWiggle(200*M,200*M)
        curveVertexWiggle(180*M,750*M)
        curveVertexWiggle(500*M,820*M)
        curveVertexWiggle(700*M,720*M)
        curveVertexWiggle(700*M,720*M)
        endShape()

        beginShape()
        curveTightness(R.randNum(-1,1))
        curveVertexWiggle(700*M,720*M)
        curveVertexWiggle(700*M,720*M)
        curveVertexWiggle(600*M,220*M)
        curveVertexWiggle(200*M,200*M)
        curveVertexWiggle(200*M,200*M)
        endShape()
    }
    
}

function curveVertexWiggle(px, py) {
    let pRange = R.randNum(5,10)
    px += R.randNum(-pRange,pRange)
    py += R.randNum(-pRange,pRange)
    return curveVertex(px,py)
}

// Foundation stuff from here down
class Random {
    constructor(seed) {
        this.seed = seed
    }
    randDec() {
        this.seed ^= this.seed << 13
        this.seed ^= this.seed >> 17
        this.seed ^= this.seed << 5
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 100000000) / 100000000
    }
    randNum(a, b) {
        return a+(b-a)*this.randDec()
    }
    randInt(a, b) {
        return Math.floor(this.randNum(a, b+1))
    }
}

function random_hash() {
    let x = "0123456789abcdef", hash = '0x'
    for (let i = 64; i > 0; --i) {
      hash += x[Math.floor(Math.random()*x.length)]
    }
    return hash
}

tokenData = {
    //hash: "0x11ac16678959949c12d5410212301960fc496813cbc3495bf77aeed738579738", 
    hash: random_hash(),
    tokenId: "123000456"
}

function windowResized() {
    tempHeight = window.innerHeight
    tempWidth = tempHeight*ratio
    const dim = Math.min(tempWidth, tempHeight)
    M = dim / defaultSize
    console.log(`M: ${M}`)
    resizeCanvas(tempWidth, tempHeight);
}

const defaultSize = 1000
const ratio = 1
let tempHeight = window.innerHeight
let tempWidth = tempHeight*ratio
let dim = Math.min(tempWidth, tempHeight)
let M = dim / defaultSize
console.log(`M: ${M}`)

const seed = parseInt(tokenData.hash.slice(0, 16), 16)
console.log(`Seed: ${seed}`)
const R = new Random(seed)