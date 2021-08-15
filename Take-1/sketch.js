function setup() {
    createCanvas(tempWidth, tempHeight);
    noLoop()
    console.log(`width: ${width}, height: ${height}`)
}

function draw() {
    background(200)

    noFill()
    strokeWeight(4)
    beginShape()
    vertex(760*M, 120*M)
    quadraticVertex(700*M, 190*M, 600*M, 230*M)
    quadraticVertex(621*M, 236*M, 620*M, 240*M)
    quadraticVertex(380*M, 500*M, 380*M, 500*M)
    quadraticVertex(255*M, 360*M, 255*M, 360*M)
    quadraticVertex(130*M, 520*M, 130*M, 520*M)
    quadraticVertex(10*M, 620*M, 10*M, 620*M)
    quadraticVertex(120*M, 885*M, 120*M, 885*M)
    quadraticVertex(390*M, 880*M, 390*M, 880*M)
    quadraticVertex(375*M, 755*M, 375*M, 755*M)
    quadraticVertex(515*M, 710*M, 515*M, 710*M)
    quadraticVertex(420*M, 600*M, 420*M, 600*M)
    quadraticVertex(680*M, 320*M, 680*M, 320*M)
    quadraticVertex(690*M, 340*M, 690*M, 340*M)
    quadraticVertex(875*M, 230*M, 875*M, 230*M)
    quadraticVertex(760*M, 120*M, 760*M, 120*M)
    endShape()
}

function windowResized() {
    tempHeight = window.innerHeight
    tempWidth = tempHeight*ratio
    const dim = Math.min(tempWidth, tempHeight)
    M = dim / defaultSize
    console.log(`M: ${M}`)
    resizeCanvas(tempWidth, tempHeight);
}

// Foundation stuff from here down

class Random {
    constructor(seed) {
        this.seed = seed
    }
    random_dec() {
        this.seed ^= this.seed << 13
        this.seed ^= this.seed >> 17
        this.seed ^= this.seed << 5
        return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 100000000) / 100000000
    }
    random_num(a, b) {
        return a+(b-a)*this.random_dec()
    }
    random_int(a, b) {
        return Math.floor(this.random_num(a, b+1))
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