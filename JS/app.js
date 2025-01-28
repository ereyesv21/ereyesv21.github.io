let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.slider .list');
let thumbnail = document.querySelector('.slider .thumbnail');
let thumbnailItems = thumbnail.querySelectorAll('.item');
let overlay = document.querySelector('.overlay');
let fullscreenImage = document.getElementById('fullscreenImage');
let overlayDescription1 = document.getElementById('description1');
let overlayDescription2 = document.getElementById('description2');

thumbnail.appendChild(thumbnailItems[0]);

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');
    
    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(thumbnailItems[0]);
        slider.classList.add('next');
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
        slider.classList.add('prev');
    }

    slider.addEventListener('animationend', function() {
        if (direction === 'next') {
            slider.classList.remove('next');
        } else {
            slider.classList.remove('prev');
        }
    }, { once: true });
}

let isScrolling = false;

window.addEventListener('wheel', (event) => {
    if (!isScrolling) {
        isScrolling = true;
        if (event.deltaY > 0) {
            moveSlider('next'); 
        } else {
            moveSlider('prev'); 
        }
        setTimeout(() => {
            isScrolling = false; 
        }, 600); 
    }
});

thumbnailItems.forEach(item => {
    item.addEventListener('click', () => {
        const mediaElement = item.querySelector('img, video');
        const vimeoUrl = mediaElement.getAttribute('data-vimeo-url');
        const globalAudio = document.getElementById("global-audio");

        if (globalAudio && !globalAudio.paused) {
            globalAudio.pause();
        }

        fullscreenImage.src = '';
        fullscreenImage.style.display = 'none';
        const existingVideo = overlay.querySelector('video');
        const existingIframe = overlay.querySelector('iframe');
        
        if (existingVideo) {
            existingVideo.remove();
        }
        if (existingIframe) {
            existingIframe.remove();
        }

        if (vimeoUrl) {
            const iframe = document.createElement('iframe');
            const autoplayUrl = vimeoUrl.includes('?') ? `${vimeoUrl}?autoplay=1` : `${vimeoUrl}&autoplay=1`;
            iframe.src = autoplayUrl;
            iframe.frameBorder = '0';
            iframe.allow = 'autoplay; fullscreen';
            iframe.allowFullscreen = true;
            iframe.style.width = '60%';  
            iframe.style.height = '60%'; 
            iframe.style.maxWidth = '60%';  
            iframe.style.maxHeight = '60%'; 
            iframe.style.margin = 'auto';  
            iframe.style.display = 'block'; 
            iframe.style.marginTop = '30px'; 
            overlay.appendChild(iframe);
        } else if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video');
            videoOverlay.src = mediaSrc;
            videoOverlay.controls = true;
            videoOverlay.style.maxWidth = '60%';
            videoOverlay.style.maxHeight = '60%';
            videoOverlay.style.margin = 'auto'; 
            videoOverlay.style.display = 'block'; 
            videoOverlay.style.marginTop = '30px'; 
            overlay.appendChild(videoOverlay);
            videoOverlay.play();
        } else {
            fullscreenImage.src = mediaSrc;
            fullscreenImage.style.display = 'block';
        }

        const imgDescription1 = mediaElement.getAttribute('data-description');
        const imgDescription2 = mediaElement.getAttribute('data-description2');

        overlayDescription1.innerHTML = imgDescription1;
        overlayDescription2.innerHTML = imgDescription2;

        overlayDescription1.style.marginTop = '20px'; 
        overlayDescription2.style.marginTop = '10px'; 

        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column'; 
        overlay.style.justifyContent = 'flex-start'; 
    });
});

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.style.display = 'none';
        const existingVideo = overlay.querySelector('video');
        const existingIframe = overlay.querySelector('iframe');
        
        if (existingVideo) {
            existingVideo.pause(); 
            existingVideo.remove(); 
        }
        if (existingIframe) {
            existingIframe.src = ''; 
            existingIframe.remove(); 
        }

        const globalAudio = document.getElementById("global-audio");
        if (globalAudio && sessionStorage.getItem("isPlaying") === "true") {
            globalAudio.play().catch((error) => {
                console.warn("Error al intentar reanudar el audio global:", error);
            });
        }
    }
});

document.querySelector('.close-button').addEventListener('click', () => {
    overlay.style.display = 'none'; 
    const existingVideo = overlay.querySelector('video');
    const existingIframe = overlay.querySelector('iframe');
    
    if (existingVideo) {
        existingVideo.pause(); 
        existingVideo.remove(); 
    }
    if (existingIframe) {
        existingIframe.src = ''; 
        existingIframe.remove(); 
    }

    const globalAudio = document.getElementById("global-audio");
    if (globalAudio && sessionStorage.getItem("isPlaying") === "true") {
        globalAudio.play().catch((error) => {
            console.warn("Error al intentar reanudar el audio global:", error);
        });
    }
});

const projectTypes = document.querySelectorAll('.content .type');

projectTypes.forEach((type, index) => {
    type.addEventListener('click', () => {

        const correspondingThumbnail = thumbnailItems[index];
        const mediaElement = correspondingThumbnail.querySelector('img, video');
        const vimeoUrl = mediaElement.getAttribute('data-vimeo-url');

        const globalAudio = document.getElementById("global-audio");
        if (globalAudio && !globalAudio.paused) {
            globalAudio.pause();
        }

        fullscreenImage.src = '';
        fullscreenImage.style.display = 'none';
        const existingVideo = overlay.querySelector('video');
        const existingIframe = overlay.querySelector('iframe');

        if (existingVideo) {
            existingVideo.remove();
        }
        if (existingIframe) {
            existingIframe.remove();
        }

        if (vimeoUrl) {
            const iframe = document.createElement('iframe');
            const autoplayUrl = vimeoUrl.includes('?') ? `${vimeoUrl}?autoplay=1` : `${vimeoUrl}&autoplay=1`;
            iframe.src = autoplayUrl;
            iframe.frameBorder = '0';
            iframe.allow = 'autoplay; fullscreen';
            iframe.allowFullscreen = true;
            iframe.style.width = '60%';  
            iframe.style.height = '60%'; 
            iframe.style.maxWidth = '60%';  
            iframe.style.maxHeight = '60%'; 
            iframe.style.margin = 'auto';  
            iframe.style.display = 'block'; 
            iframe.style.marginTop = '30px'; 
            overlay.appendChild(iframe);
        } else if (mediaElement.tagName.toLowerCase() === 'video') {
            const videoOverlay = document.createElement('video');
            videoOverlay.src = mediaElement.src;
            videoOverlay.controls = true;
            videoOverlay.style.maxWidth = '60%';
            videoOverlay.style.maxHeight = '60%';
            videoOverlay.style.margin = 'auto'; 
            videoOverlay.style.display = 'block'; 
            videoOverlay.style.marginTop = '30px'; 
            overlay.appendChild(videoOverlay);
            videoOverlay.play();
        } else {
            fullscreenImage.src = mediaElement.src; 
            fullscreenImage.style.display = 'block';
        }

        const imgDescription1 = mediaElement.getAttribute('data-description');
        const imgDescription2 = mediaElement.getAttribute('data-description2');

        overlayDescription1.innerHTML = imgDescription1;
        overlayDescription2.innerHTML = imgDescription2;

        overlayDescription1.style.marginTop = '20px'; 
        overlayDescription2.style.marginTop = '10px'; 

        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column'; 
        overlay.style.justifyContent = 'flex-start'; 
    });
});