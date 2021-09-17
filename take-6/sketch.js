function setup() {
    createCanvas(tempWidth, tempHeight);
    noLoop()
    console.log(`width: ${width}, height: ${height}`)

    // setInterval(() => {
    //     draw()
    // }, 5000);
}

function draw() {
    noFill()
    colorMode(HSL)
    background(91,75,90)

    for(let i=0; i<R.randNum(100,400); i++) {
        building(100,800,.9,.9)
    }

    // blendMode(BLEND)
    // for(let i=0; i<R.randNum(10,40); i++) {
    //     blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),20,600,1,1)
    // }

    // blendMode(SCREEN)
    // for(let i=0; i<30; i++) {
    //     blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),50,800,1,1)
    // }

    // blendMode(BLEND)
    // for(let i=0; i<R.randNum(10,40); i++) {
    //     blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),50,800,1,1)
    // }

    // blendMode(OVERLAY)
    // for(let i=0; i<R.randNum(20,50); i++) {
    //     blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),10,300,1,1)
    // }

    // blendMode(SCREEN)
    // for(let i=0; i<20; i++) {
    //     blobShape(R.randNum(0,.4),R.randNum(0,.4),R.randNum(.6,.8),R.randNum(.62,.82),400,800,1,1)
    // }

    // blendMode(BLEND)
    
    //tangentCurve([200*M,100*M,200*M,100*M,550*M,30*M,850*M,220*M],90,100,400,500,5,8,215)
    //downstrokeCurve([700*M,100*M,730*M,400*M,600*M,500*M,700*M,700*M],30,50,300,400,4,7,205)
    //charcoolLine([150*M,150*M,50*M,150*M,100*M,900*M,450*M,900*M], color(0, 0, 0), 12, 2)
    //charcoolLine([0*M,850*M,80*M,900*M,900*M,800*M,1000*M,400*M], color(46, 44, 40))
}

function building(minScale,maxScale,maxTranslateX,maxTranslateY) {
    push()
    
    stroke(31,R.randNum(0,100),4, R.randNum(0.2,0.7))
    strokeWeight(R.randNum(.0008,.008))
    fill(R.randNum(10,200),R.randNum(40,800),R.randNum(30,70), R.randNum(.1,.4))
    translate(R.randNum(-maxTranslateX,maxTranslateX)*width,R.randNum(-maxTranslateY,maxTranslateY)*height)
    scale(R.randNum(minScale,maxScale))

    // curve(.4,.01,.25,.25,.25,.75,.1,.75)
    // curve(.2,.65,.25,.75,.45,.75,.1,.75)
    // curve(.4,.65,.45,.75,.45,.25,.4,.75)
    // curve(.4,.15,.45,.25,.25,.25,.4,.25)

    curveTightness(.9)
    beginShape()
    curveVertexWiggle(.25,.25)
    curveVertexWiggle(.25,.25)
    curveVertexWiggle(.25,.75)
    curveVertexWiggle(.45,.75)
    curveVertexWiggle(.45,.25)
    curveVertexWiggle(.25,.25)
    curveVertexWiggle(.25,.25)
    endShape()

    pop()
}

function blobShape(startX,startY,midX,midY,minScale,maxScale,maxTranslateX,maxTranslateY) {
    push()
    fill(R.randNum(10,200),R.randNum(40,800),R.randNum(30,70), R.randNum(.1,.4))
    translate(R.randNum(-maxTranslateX,maxTranslateX)*width,R.randNum(-maxTranslateY,maxTranslateY)*height)
    scale(R.randNum(minScale,maxScale))
    
    for (let i=0; i<R.randNum(1,20); i++) {
        strokeWeight(R.randNum(.0008,.008))
        stroke(31,R.randNum(0,100),4, R.randNum(0.2,0.7))
        beginShape()
        curveTightness(R.randNum(-0.02,0.04))
        curveVertexWiggle(startX,startY)
        curveVertexWiggle(startX,startY)
        curveVertexWiggle(R.randNum(.14,.2),R.randNum(.6,.8))  
        curveVertexWiggle(R.randNum(.3,.65),R.randNum(.73,.88))
        curveVertexWiggle(midX,midY)
        curveVertexWiggle(midX,midY)
        endShape()

        beginShape()
        curveTightness(R.randNum(-.03,.04))
        curveVertexWiggle(midX,midY)
        curveVertexWiggle(midX,midY)
        curveVertexWiggle(R.randNum(.4,.7),R.randNum(.20,.24))
        curveVertexWiggle(startX,startY)
        curveVertexWiggle(startX,startY)
        endShape()
    }  

    pop()
}

function downstrokeCurve(theCurve, minWidth, maxWidth, minHeight, maxHeight, minStrokes, maxStrokes, hue) {
    let steps = R.randNum(minStrokes,maxStrokes)
    for (let i = 0; i <= steps; i++) {
        let t = i / steps
        let x = curvePoint(...xPoints(theCurve), t)
        let y = curvePoint(...yPoints(theCurve), t)
        downstroke(x,y,x,y+R.randNum(minHeight,maxHeight), R.randNum(minWidth,maxWidth), hue)
    }
}

function curveVertexFromPoints(curve, doubleStartAndEnd=true) {
    beginShape()
    if (doubleStartAndEnd) curveVertex(curve[0], curve[1])
    for (let i=0; i<curve.length; i+=2) {
        curveVertex(curve[i], curve[i+1])
    }
    if (doubleStartAndEnd) curveVertex(curve[curve.length-2], curve[curve.length-1])
    endShape()
}

function charcoolLine(theCurve, strokeColor, density=18, width=5) {
    noFill()

    let distance = dist(theCurve[2], theCurve[3], theCurve[4], theCurve[5])
    let steps = distance * density

    for (let i = 0; i <= steps; i++) {
        let t = i / steps
        
        let numLines = R.randNum(1,3)
        for (let j=0; j<numLines; j++) {
            stroke(hue(strokeColor),saturation(strokeColor),lightness(strokeColor),R.randNum(0.2,0.7-((t)*0.2)))
            strokeWeight(R.randNum(0.03,0.15-((t)*0.14)))
            
            let x = curvePoint(...xPoints(theCurve), t)
            let y = curvePoint(...yPoints(theCurve), t)
            let tx = curveTangent(...xPoints(theCurve), t)
            let ty = curveTangent(...yPoints(theCurve), t)
            let a = atan2(ty, tx)
            let b = atan2(ty, tx)
            a -= PI / 2.0
            b += PI / 2.0
            let x1 = cos(a) * 3 + x
            let y1 = sin(a) * 3 + y
            let x2 = cos(b) * 3 + x
            let y2 = sin(b) * 3 + y

            curve(  x1+R.randNum(-width*1.5,width*1.5), y1+R.randNum(-width*1.5,width*1.5),
                    x1+R.randNum(-width,width), y1+R.randNum(-width,width),
                    x2+R.randNum(-width,width), y2+R.randNum(-width,width),
                    x2+R.randNum(-width*1.5,width*1.5), y2+R.randNum(-width*1.5,width*1.5))
        }
    }
}

function tangentCurve(theCurve, minWidth, maxWidth, minHeight, maxHeight, minStrokes, maxStrokes, hue) {
    noFill()

    let steps = R.randNum(minStrokes, maxStrokes)
    for (let i = 0; i <= steps; i++) {
        let t = i / steps
        let x = curvePoint(...xPoints(theCurve), t)
        let y = curvePoint(...yPoints(theCurve), t)
        let tx = curveTangent(...xPoints(theCurve), t)
        let ty = curveTangent(...yPoints(theCurve), t)
        let a = atan2(ty, tx)
        a += PI / 2.0 //change this to -= to reverse direction
        line(x, y, cos(a) * 8 + x, sin(a) * 8 + y)
        downstroke(x,y,cos(a) * R.randNum(minWidth*3,maxWidth*3)+ x, sin(a) * R.randNum(minHeight,maxHeight) + y,R.randNum(minWidth,maxWidth),hue)
    }
}

function oneIn(number) {
    let blah = R.randInt(1,number+1)
    return blah == 1
}

function downstroke(x1,y1,x2,y2, maxWidth, hue) {
    noFill()

    for (let i=0; i<R.randNum(13*maxWidth,19*maxWidth); i++) {
        strokeWeight(R.randNum(0.2,1.2))
        stroke(hue,100,R.randNum(45,55),R.randNum(0.1,0.8))
        x1p = x1 + R.randNum(0,R.randNum(maxWidth-(maxWidth*.8), maxWidth))
        x2p = x2 + (R.randNum(0.7,1.05)*(x1p-x1)) //x2 + R.randNum(0,100)
        y1p = y1 + R.randNum(-10,20)
        y2p = y2 + R.randNum(-10,20)
        beginShape()
        vertex(x1p, y1p)
        quadraticVertex(x1p-(R.randNum(0.3,0.7)*(x1p-x2p)), y1-(R.randNum(0.3,0.7)*(y1-y2)), x2p, y2p)
        endShape()
    }
}

function curveVertexWiggle(px, py) {
    let pRange = R.randNum(.005,.01)
    px += R.randNum(-pRange,pRange)
    py += R.randNum(-pRange,pRange)
    return curveVertex(px,py)
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


// Foundation stuff from here down

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