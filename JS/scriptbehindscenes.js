let targetRotationX = 0;
let targetRotationY = 0;
let currentRotationX = 0;
let currentRotationY = 0;

const maxRotationX = Math.PI / 4; 
const maxRotationY = Math.PI / 4; 

const group = document.querySelector('.banner');

document.addEventListener('mousemove', (event) => {
    const mouseX = event.clientX / window.innerWidth - 0.5;  
    const mouseY = event.clientY / window.innerHeight - 0.5; 

    targetRotationX = Math.min(Math.max(mouseY * maxRotationX, -maxRotationX), maxRotationX);
    targetRotationY = Math.min(Math.max(mouseX * maxRotationY, -maxRotationY), maxRotationY);

    const images = document.querySelectorAll('.banner .slider .item img');
    images.forEach(img => {
        img.classList.remove('highlight');  
        const rect = img.getBoundingClientRect();
        if (event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom) {
            img.classList.add('highlight'); 
        }
    });
});

function updateRotation() {

    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    group.style.transform = `rotateX(${currentRotationX}rad) rotateY(${currentRotationY}rad)`;

    requestAnimationFrame(updateRotation);
}

updateRotation();

const images = document.querySelectorAll('.clickable-image');

const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

images.forEach(image => {
    image.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImage.src = image.src;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});