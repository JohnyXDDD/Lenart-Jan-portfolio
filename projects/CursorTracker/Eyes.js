class Eyes {
    constructor(el) {
        this.eyes = document.querySelectorAll(el)
    }

    mouseMoveHandler = (x, y) => {
        this.eyes.forEach(eye => {
            const data = this.calculateMove(eye, x, y)
            this.moveEye(eye, data)
        })
    }
    calculateMove = (eye, x, y) => {
        const ratioX = 0.15
        const ratioY = 0.22
        const rect = eye.getBoundingClientRect()
        const eyeCords = {
            x: rect.left,
            y: rect.top
        }
        return {
            transformX: (x - eyeCords.x) * ratioX,
            transformY: (y - eyeCords.y) * ratioY
        }
    }
    moveEye = (eye, { transformX, transformY }) => {
        eye.style.transform = `translate(${transformX}%, ${transformY}%)`
    }
}