const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

const w = document.documentElement.clientWidth
const h = document.documentElement.clientHeight

canvas.width = w
canvas.height = h

const G = 0.5
let x0 = null
let y0 = null

let mineImg = new Image();
mineImg.addEventListener('load', function () { }, false);
mineImg.src = './mine.png'

let faceImg = new Image();
faceImg.addEventListener('load', function () { }, false);
faceImg.src = './mine.png'

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

const handleOrientation = (e) => {

    if (!x0 || !y0) {
        x0 = e.gamma
        y0 = e.beta
        console.log(x0, e.beta)
    }
    var x = e.gamma - x0;
    var y = e.beta - y0;

    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (y > 90) { y = 90 };
    if (y < -90) { y = -90 };

    // To make computation easier we shift the range of 
    // x and y to [0,180]
    x += 90;
    y += 90;
    gravity.x = -(Math.cos(toRadians(x)) * G).toFixed(2)
    gravity.y = -(Math.cos(toRadians(y)) * G).toFixed(2)
    //gravity = {xForce,yForce}

}

const gravity = {
    x: 0,
    y: 0
}

window.addEventListener("deviceorientation", handleOrientation, true);

class ball {
    x
    y
    r
    dirx = 0
    diry = 0
    //terminalVelocity = 5

    constructor(x = 75, y = 75, r = 10) {
        this.x = x
        this.y = y
        this.r = r


    }

    draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
    }
    move = ( colidersArray ) => {
        this.dirx += gravity.x
        this.diry += gravity.y

        if (this.x >= w) {

            this.x = w - 1
            this.dirx = -(this.dirx * 0.6)
        }
        if (this.x <= 0) {

            this.x = 0 + 1
            this.dirx = -(this.dirx * 0.6)
        }
        if (this.y >= h) {
            this.y = h - 1
            this.diry = -(this.diry * 0.6)
        }
        if (this.y <= 0) {
            this.y = 0 + 1
            this.diry = -(this.diry * 0.6)
        }

        this.x += this.dirx
        this.y += this.diry

        this.checkForColisions(r.colidableObjects);
    }

    checkForColisions = (objectArray) => {
        objectArray.forEach((obj) => {
            if (this.intersect(this,obj)) {
                console.log('kolizja')
            }
        })
    }

    intersect = (sphere, other) => {
    const distance = Math.sqrt(
                            (sphere.x - other.x) * (sphere.x - other.x) +
                            (sphere.y - other.y) * (sphere.y - other.y));

    return distance < (sphere.r + other.r);
}
}


class renderer {
    time = 0
    drawableObjects = []
    movableObjects = []
    colidableObjects = []

    addObject = (draw, move, colide) => {
        this.drawableObjects.push(draw)
        if (move) {
            this.movableObjects.push(move)
        }
        if (colide) {
            this.colidableObjects.push(colide)
        }
    }

    render = (t = 0) => {
        const deltaTime = t - this.time
        this.time = t
        //console.log(deltaTime)
        ctx.clearRect(0, 0, w, h);

        this.drawableObjects.forEach((o) => {
            o()
        })

        this.movableObjects.forEach((o) => {
            o()
        })

        window.requestAnimationFrame(this.render);
    }
}

class Mine {
    x
    y
    r
    constructor(x = 75, y = 75, r = 13) {
        this.x = x
        this.y = y
        this.r = r
    }

    move = () => {}

    draw = () => {
        ctx.drawImage(mineImg, (this.x - this.r), (this.y - this.r))
    }
}




const r = new renderer()
r.render()
const b = new ball(w / 2, h / 2, 10)

r.addObject(b.draw, b.move)

const m = new Mine(w / 2, h / 2)
r.addObject(m.draw, m.move, m)
