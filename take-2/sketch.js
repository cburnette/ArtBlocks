function setup() {
    createCanvas(tempWidth, tempHeight);
    noLoop()
    console.log(`width: ${width}, height: ${height}`)
}

function draw() {
    noFill()
    colorMode(HSL)
    background(31,100,92)

    fill(31,10,92, 0.3)
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

    downstroke(200*M,200*M,180*M,760*M, 100, 34)
    downstroke(280*M,190*M,250*M,780*M, 100, 34)

    strokeWeight(0.7)
    stroke(0,0,0,1)
    noFill()
    curveTightness(0.0)
    curve(200*M,100*M,800*M,100*M,850*M,600*M,850*M,600*M)
    curve(850*M,600*M,850*M,600*M,850*M,900*M,450*M,900*M)

    beginShape()
    curveVertex(700,100)
    curveVertex(700,100)
    curveVertex(730,400)
    curveVertex(600,500)
    curveVertex(700,700)
    curveVertex(700,700)
    endShape()

    ellipseMode(CENTER)
    
    let steps = 6
    for (let i = 0; i <= steps; i++) {
        let t = i / steps
        let x = curvePoint(700, 730, 600, 700, t)
        let y = curvePoint(100, 400, 500, 700, t)
        //ellipse(x, y, 15, 15)
        downstroke(x,y,x,y+300, 15, 200)
    }
}

// Foundation stuff from here down

function downstroke(x1,y1,x2,y2, maxWidth, hue) {
    noFill();

    for (let i=0; i<R.randNum(13*maxWidth,19*maxWidth); i++) {
        strokeWeight(R.randNum(0.2,1.2));
        stroke(hue,100,R.randNum(45,55),R.randNum(0.1,0.8))
        x1p = x1 + R.randNum(0,R.randNum(maxWidth-(maxWidth*.8), maxWidth))
        x2p = x2 + (R.randNum(0.7,1.05)*(x1p-x1)) //x2 + R.randNum(0,100)
        y1p = y1 + R.randNum(-10,20)
        y2p = y2 + R.randNum(-10,20)
        beginShape();
        vertex(x1p, y1p);
        quadraticVertex(x1p-(R.randNum(0.3,0.7)*(x1p-x2p)), y1-(R.randNum(0.3,0.7)*(y1-y2)), x2p, y2p);
        endShape();
    }
}

function curveVertexWiggle(px, py) {
    let pRange = R.randNum(5,10)
    px += R.randNum(-pRange,pRange)
    py += R.randNum(-pRange,pRange)
    return curveVertex(px,py)
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
const ratio = 1
let tempHeight = window.innerHeight
let tempWidth = tempHeight*ratio
let dim = Math.min(tempWidth, tempHeight)
let M = dim / defaultSize
console.log(`M: ${M}`)

const seed = parseInt(tokenData.hash.slice(0, 16), 16)
console.log(`Seed: ${seed}`)
const R = new Random(seed)