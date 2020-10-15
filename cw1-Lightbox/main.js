const gallery = [...document.querySelector('.gallery').children]
const lightbox = document.querySelector('.lightbox')
const lightboxImage = document.querySelector('.lightbox img')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
//


gallery.forEach(element => {
    element.addEventListener('click',(e)=>{
        showLightbox(e.target)
    })
});

const showLightbox = (element) => {
    lightboxImage.src = element.src;
    lightbox.classList.add('visible')
    console.dir(element)

    next.classList.remove('hide')
    prev.classList.remove('hide')
    prev.addEventListener('click',(e)=>{
        showLightbox(element.previousElementSibling)
        e.stopPropagation()
    })
    next.addEventListener('click',(e)=>{
        showLightbox(element.nextElementSibling)
        e.stopPropagation()
    })
    
    if (element.nextElementSibling == null) {
        next.classList.add('hide') 
    }

    if (element.previousElementSibling == null) {
        prev.classList.add('hide') 
    }
}

const nextImg = (element)=>{
    showLightbox(element.nextElementSibling)
}

function hideLightbox() {
    lightbox.classList.remove('visible')
}
lightbox.addEventListener('click',() => {hideLightbox()})