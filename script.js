let slidesArray = []
let antispam = false
let activeSlide
let slideInterval
function getSlides() {
    fetch('data.json')
        .then(data => data.json())
        .then(data => createSlides(data))
}
getSlides()
function createSlides(data) {
    slidesArray = data.map(slide => createOneSlide(slide))
    setActiveSlide(slidesArray[3])
}
function setActiveSlide(slideData) {
    activeSlide = slideData
    const title = document.querySelector('.title')
    title.href = slideData.app.href
    title.innerText = slideData.app.title
    const slide = document.querySelector('.slide')
    slide.style.backgroundImage = `url(${slideData.img})`
    slide.classList.add('active')
    document.querySelector('.infoBox').append(slideData.infoBox.p, slideData.infoBox.codeLinks, slideData.infoBox.extra)
    startTimeoutToChangeSlides()
}
function startTimeoutToChangeSlides() {
    slideInterval = setInterval(() => {
        requestAnimationFrame(() => {
            changeAntispam()
            changeSlide(-1)
        })
    }, 5000)
}
function createOneSlide(data) {
    const app = {}
    app.href = data.app
    app.title = data.title;
    const img = data.img
    const p = document.createElement('p')
    p.innerText = data.technology
    const codeLinks = document.createElement('a')
    const codeLink = document.createElement('a')
    codeLink.href = data.github
    codeLink.target = '_blank';
    codeLink.innerHTML = '<i class="demo-icon icon-github-circled"></i>Github'
    codeLinks.append(codeLink)
    if (data.serverCode.length) {
        const serverLink = document.createElement('a')
        serverLink.href = data.serverCode
        serverLink.innerHTML = '<i class="demo-icon icon-github-circled"></i> Serwer'
        const span = document.createElement('span')
        span.innerHTML = '&nbsp;/&nbsp;'
        codeLinks.append(span, serverLink)
    }
    const extra = document.createElement('p')
    extra.innerHTML = data.extra || '&nbsp;'
    const infoBox = {
        p,
        codeLinks,
        extra,
    }
    const slideInfo = {
        app,
        img,
        infoBox
    }
    return slideInfo
}
function changeSlide(direction) {
    const index = slidesArray.indexOf(activeSlide)
    let nextIndex = index + direction
    if (nextIndex < 0) {
        nextIndex = slidesArray.length - 1
    }
    else if (nextIndex >= slidesArray.length) {
        nextIndex = 0
    }
    const nextSlide = slidesArray[nextIndex]
    const newImage = document.createElement('div')
    newImage.classList.add('slide')
    newImage.style.backgroundImage = `url("${nextSlide.img}")`
    const project = document.querySelector('.project')
    if (direction < 0) {
        project.append(newImage)
    }
    else {
        project.prepend(newImage)
    }
    document.querySelectorAll('.animation').forEach(node => {
        node.style.opacity = 0
    })
    setTimeout(() => {
        const title = document.querySelector('.title')
        title.href = nextSlide.app.href
        title.innerHTML = nextSlide.app.title
        const infoBox = document.querySelector('.infoBox')
        infoBox.innerHTML = ''
        infoBox.append(nextSlide.infoBox.p, nextSlide.infoBox.codeLinks, nextSlide.infoBox.extra)
    }, 200)
    const activeImage = document.querySelector('.active')
    activeImage.style.transition = 'linear width 1000ms'
    newImage.style.transition = 'linear width 1000ms'
    activeImage.classList.remove('active')
    requestAnimationFrame(() => {
        newImage.classList.add('active')
        setTimeout(() => {
            document.querySelectorAll('.animation').forEach(node => {
                node.style.opacity = 1
            })
            activeImage.style.transition = 'none'
            newImage.style.transition = 'none'
            changeAntispam()
            activeImage.remove()
            activeSlide = nextSlide

        }, 1000)
    });
}
function changeAntispam() {
    antispam = !antispam
}
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function () {
        if (!antispam) {
            clearInterval(slideInterval)
            startTimeoutToChangeSlides()
            changeAntispam()
            changeSlide(Number(this.value))
        }
    })
})

document.addEventListener('wheel', function (e) {
    if (e.deltaY < 0) {
        document.querySelector('.aboutMe').scrollIntoView({ behavior: 'smooth' })
    }
    else {
        document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' })
    }
})
document.getElementById('goToAboutMe').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.aboutMe').scrollIntoView({ behavior: 'smooth' })
})
document.getElementById('goToProjects').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.projects').scrollIntoView({ behavior: 'smooth' })
})
document.getElementById('goToContact').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.aboutMe').scrollIntoView({ behavior: 'smooth' })
})
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        clearInterval(slideInterval)
    } else if (document.visibilityState === 'visible') {
        startTimeoutToChangeSlides()
    }
});