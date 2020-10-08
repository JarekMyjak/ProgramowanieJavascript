const gallery = [...document.querySelector('.gallery').children]
const lightbox = document.querySelector('.lightbox')
const lightboxImage = document.querySelector('.lightbox img')
const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
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
    if (element.nextElementSibling != null) {
        //next.addEventListener('click', showLightbox(element.nextElementSibling))
        console.log(next)
        next.classList.add('buttonVisible')
    }
    
}

lightbox.addEventListener('click',() => {lightbox.classList.remove('visible')})