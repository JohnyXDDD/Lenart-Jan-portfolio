const eyes = new Eyes('.eye')
document.addEventListener("mousemove", (e) => eyes.mouseMoveHandler(e.x, e.y))
// const eyes = document.querySelectorAll('.eye')
// function mouseMoveHandler(x, y) {
//     eyes.forEach(eye => {
//         const data = calculateMove(eye, x, y)
//         console.log(data.transformX)
//         moveEye(eye, data)
//     })
// }
// function calculateMove(eye, x, y) {
//     const ratioX = 0.15
//     const ratioY = 0.22
//     const rect = eye.getBoundingClientRect()
//     const eyeCords = {
//         x: rect.left,
//         y: rect.top
//     }
//     console.log({ x }, { y }, eyeCords)
//     return {
//         transformX: (x - eyeCords.x) * ratioX,
//         transformY: (y - eyeCords.y) * ratioY
//     }

// }
// function moveEye(eye, { transformX, transformY }) {
//     eye.style.transform = `translate(${transformX}%, ${transformY}%)`
// }
// document.addEventListener("mousemove", (e) => mouseMoveHandler(e.x, e.y))