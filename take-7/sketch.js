function setup() {
    createCanvas(tempWidth, tempHeight);
    noLoop()
    console.log(`width: ${width}, height: ${height}`)

    setInterval(() => {
        draw()
    }, 5000);
}

function draw() {
    noFill()
    colorMode(HSL)
    background(62,0,97) //, R.randNum(0.9,1))

    line(0, 0, 200, 200)
}

// Foundation stuff from here down

function curveVertexWiggle(px, py) {
    let pRange = R.randNum(.005,.01)
    px += R.randNum(-pRange,pRange)
    py += R.randNum(-pRange,pRange)
    return curveVertex(px,py)
}

function oneIn(number) {
    let blah = R.randInt(1,number+1)
    return blah == 1
}

function xPoints(points) {
    let result = []
    for (let i=0; i<points.length; i+=2) {
        result.push(points[i])
    }
    return result
}

function yPoints(points) {
    let result = []
    for (let i=1; i<points.length; i+=2) {
        result.push(points[i])
    }
    return result
}

class Random {
    constructor(seed) {
        this.seed = seed
        this.originalSeed = seed
    }
    randDec() {
        this.seed ^= this.seed << 13
        this.seed ^= this.seed >> 17
        this.seed ^= this.seed << 5
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
    }
    randNum(a, b) {
        return a+(b-a)*this.randDec()
    }
    randInt(a, b) {
        return Math.floor(this.randNum(a, b+1))
    }

    reset() {
        this.seed = this.originalSeed
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
    R.reset()
    resizeCanvas(tempWidth, tempHeight);
}

const defaultSize = 1000
const ratio = 1.77
let tempHeight = window.innerHeight
let tempWidth = tempHeight*ratio
let dim = Math.min(tempWidth, tempHeight)
let M = dim / defaultSize
console.log(`M: ${M}`)

const seed = parseInt(tokenData.hash.slice(0, 16), 16)
console.log(`Seed: ${seed}`)
const R = new Random(seed)