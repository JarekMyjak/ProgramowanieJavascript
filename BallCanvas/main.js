const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d');

const w = document.documentElement.clientWidth
const h = document.documentElement.clientHeight

canvas.width = w
canvas.height = h

const G = 0.5
let x0 = null
let y0 = null

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

const handleOrientation = (e) => {

    if (!x0 || !y0) {
        x0 = e.gamma
        y0 = e.beta
        console.log(x0,e.beta)
    }
    var x = e.gamma - x0;
    var y = e.beta - y0;
    console.log(x0-e.beta)
    // Because we don't want to have the device upside down
    // We constrain the x value to the range [-90,90]
    if (y > 90) { y = 90 };
    if (y < -90) { y = -90 };

    // To make computation easier we shift the range of 
    // x and y to [0,180]
    x += 90;
    y += 90;
    gravity.x = -(Math.cos(toRadians(x)) * G).toFixed(2)
    gravity.y = -Math.cos(toRadians(y)) * G
    //gravity = {xForce,yForce}
    console.log(gravity)
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
    terminalVelocity = 5
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
    move = () => {
        this.dirx += gravity.x
        this.diry += gravity.y
        this.x += this.dirx
        this.y += this.diry
        
        if (this.x>w || this.x<0) {
            this.dirx = -this.dirx
        }
        if (this.y>h || this.y<0) {
            this.diry = -this.diry
        }
    }
}


class renderer {
    time = 0
    drawableObjects = []
    movableObjects = []

    addObject = (draw, move) => {
        this.drawableObjects.push(draw)
        if (move) {
            this.movableObjects.push(move)
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




const r = new renderer()
r.render()
const b = new ball(w / 2, h / 2, 10)
const b2 = new ball(10, 0, 50)
r.addObject(b.draw, b.move)
r.addObject(b2.draw)
