function setup() {
    createCanvas(tempWidth, tempHeight);
    noLoop()
    console.log(`width: ${width}, height: ${height}`)
}

function draw() {
    noFill()
    colorMode(HSL)
    background(31,100,92)

    for (let i=0; i<R.randNum(2,10); i++) {
        strokeWeight(R.randNum(.01,.6))
        stroke(R.randNum(10,50))
        beginShape()
        vertex(860*M, 20*M)
        wiggle(800*M, 90*M, 700*M, 130*M)
        wiggle(721*M, 146*M, 720*M, 140*M)
        wiggle(500*M, 390*M, 380*M, 500*M)
        wiggle(325*M, 370*M, 255*M, 370*M)
        wiggle(150*M, 390*M, 130*M, 520*M)
        wiggle(0*M, 560*M, 10*M, 620*M)
        wiggle(20*M, 750*M, 120*M, 885*M)
        wiggle(290*M, 1000*M, 390*M, 880*M)
        wiggle(350*M, 790*M, 375*M, 755*M)
        wiggle(400*M, 720*M, 515*M, 710*M)
        wiggle(490*M, 625*M, 420*M, 600*M)
        wiggle(550*M, 440*M, 680*M, 320*M)
        wiggle(785*M, 220*M, 790*M, 250*M)
        wiggle(880*M, 150*M, 975*M, 130*M)
        wiggle(890*M, 50*M, 860*M, 20*M)
        endShape()
    }
    
}

function wiggle(cx, cy, px, py) {
    let cRange = 10
    let pRange = 5
    cx += R.randNum(-cRange,cRange)
    cy += R.randNum(-cRange,cRange)
    px += R.randNum(-pRange,pRange)
    py += R.randNum(-pRange,pRange)
    return quadraticVertex(cx,cy,px,py)
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