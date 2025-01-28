document.addEventListener("DOMContentLoaded", () => {

    const popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");

    popupOverlay.innerHTML = `
        <div class="popup-content">
            <h1>Do you want to enable audio?</h1>
            <button id="enable-audio">Enable</button>
            <button id="disable-audio">Not Now</button>
        </div>
    `;

    document.body.appendChild(popupOverlay);

    const enableAudioBtn = document.getElementById("enable-audio");
    const disableAudioBtn = document.getElementById("disable-audio");

    const hidePopup = (callback) => {
        popupOverlay.classList.add("hidden");
        setTimeout(() => {
            popupOverlay.remove();
            if (callback) callback();
        }, 500);
    };

    enableAudioBtn.addEventListener("click", () => {
        sessionStorage.setItem("audioEnabled", "true");
        hidePopup(() => {
            startTypingAnimation();
        });
    });

    disableAudioBtn.addEventListener("click", () => {
        sessionStorage.setItem("audioEnabled", "false");
        hidePopup(() => {
            startTypingAnimation();
        });
    });

    const startTypingAnimation = () => {
        const text = [
            "F", "R",
            "<span class='solid-o o1'>O</span>",
            "M", " ",
            "N",
            "<span class='solid-o o2'>O</span>",
            "W", " ",
            "<span class='solid-o o3'>O</span>",
            "N"
        ];
        const animatedText = document.getElementById("animated-text");
        let index = 0;

        function typeText() {
            if (index < text.length) {
                animatedText.innerHTML += text[index];
                index++;
                setTimeout(typeText, 100);
            }
        }

        typeText();
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const circles = [
        { class: "circle-1", style: { top: "10%", left: "20%" } },
        { class: "circle-2", style: { top: "50%", right: "10%" } },
        { class: "circle-3", style: { bottom: "20%", left: "15%" } },
    ];

    function updateCircles() {
        const viewportWidth = window.innerWidth;

        circles.forEach((circle) => {
            const element = document.querySelector(`.${circle.class}`);
            if (!element) return;

            if (viewportWidth < 768) {
                element.style.display = "none";
            } else {
                element.style.display = "block";
                element.style.width = `${Math.min(viewportWidth * 0.23, 500)}px`;
                element.style.height = `${Math.min(viewportWidth * 0.23, 500)}px`;
            }
        });
    }

    window.addEventListener("resize", updateCircles);
    updateCircles();
});

document.addEventListener("DOMContentLoaded", () => {
    const records = document.querySelectorAll(".record");
    const rotationSpeed = 3;

    records.forEach((record) => {
        const audio = new Audio(record.getAttribute("data-audio")); 
        let rotation = 0;
        let isHovered = false;

        const rotate = () => {
            if (!isHovered) {
                rotation += rotationSpeed;
                record.style.transform = `rotate(${rotation}deg)`;
            }
            requestAnimationFrame(rotate);
        };

        rotate();

        record.addEventListener("mouseenter", () => {
            isHovered = true;
            record.style.transform = `rotate(${rotation}deg) scale(1.4)`;

            audio.currentTime = 0;
            audio.play().catch((error) => {
                console.warn("Error al intentar reproducir el audio:", error);
            });
        });

        record.addEventListener("mouseleave", () => {
            isHovered = false;
            record.style.transform = `rotate(${rotation}deg)`;
            audio.pause();
            audio.currentTime = 0;
        });

        record.addEventListener("click", () => {
            const audioSrc = record.getAttribute("data-audio");
            sessionStorage.setItem("selectedAudio", audioSrc);
            sessionStorage.setItem("isPlaying", "true");
            window.location.href = "HTML/home.html";
        });
    });
});