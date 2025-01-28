document.addEventListener("DOMContentLoaded", () => {
    
    if (window.location.pathname.includes("index.html")) {
        return;
    }

    const globalAudioSrc = sessionStorage.getItem("selectedAudio");
    const isPlaying = sessionStorage.getItem("isPlaying") === "true";
    const savedTime = parseFloat(sessionStorage.getItem("audioCurrentTime")) || 0;

    let globalAudio = document.getElementById("global-audio");

    if (globalAudioSrc && !globalAudio) {
        globalAudio = document.createElement("audio");
        globalAudio.id = "global-audio";
        globalAudio.src = globalAudioSrc;
        globalAudio.loop = true;
        globalAudio.currentTime = savedTime;
        document.body.appendChild(globalAudio);
    }

    if (globalAudio) {
        const enableAudio = () => {
            if (isPlaying) {
                globalAudio.play().catch((error) => {
                    console.warn("Error al intentar reproducir el audio global:", error);
                });
            }
            document.removeEventListener("click", enableAudio);
        };

        document.addEventListener("click", enableAudio);
    }

    window.addEventListener("beforeunload", () => {
        if (globalAudio) {
            sessionStorage.setItem("audioCurrentTime", globalAudio.currentTime);
        }
    });

    const muteButton = document.createElement("div");
    muteButton.id = "mute-toggle";
    muteButton.style.position = "fixed";
    muteButton.style.top = "10px";
    muteButton.style.right = "10px";
    muteButton.style.width = "50px";
    muteButton.style.height = "50px";
    muteButton.style.backgroundColor = "white";
    muteButton.style.border = "2px solid black";
    muteButton.style.borderRadius = "50%";
    muteButton.style.display = "flex";
    muteButton.style.justifyContent = "center";
    muteButton.style.alignItems = "center";
    muteButton.style.cursor = "pointer";
    muteButton.style.zIndex = "1000";
    document.body.appendChild(muteButton);

    const audioBars = document.createElement("div");
    audioBars.className = "audio-bars";
    audioBars.style.display = "flex";
    audioBars.style.justifyContent = "center";
    audioBars.style.alignItems = "center";
    muteButton.appendChild(audioBars);

    for (let i = 0; i < 5; i++) {
        const bar = document.createElement("div");
        bar.className = "audio-bar";
        bar.style.width = "4px";
        bar.style.margin = "0 2px";
        bar.style.height = "8px";
        bar.style.backgroundColor = "black";
        audioBars.appendChild(bar);
    }

    const updateButtonAnimation = () => {
        const bars = muteButton.querySelectorAll(".audio-bar");
        if (!globalAudio.muted) {
            bars.forEach((bar, index) => {
                bar.style.animation = `bounce 0.5s infinite ${index * 0.1}s ease-in-out`;
            });
        } else {
            bars.forEach((bar) => {
                bar.style.animation = "none";
                bar.style.height = "8px"; 
            });
        }
    };

    muteButton.addEventListener("click", () => {
        if (globalAudio.muted) {
            globalAudio.muted = false;
            sessionStorage.setItem("isMuted", "false");
        } else {
            globalAudio.muted = true;
            sessionStorage.setItem("isMuted", "true");
        }
        updateButtonAnimation();
    });

    if (globalAudio && !globalAudio.muted) {
        updateButtonAnimation();
    }

    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay || event.target.classList.contains('close-button')) {
                const globalAudio = document.getElementById("global-audio");
                if (globalAudio && sessionStorage.getItem("isPlaying") === "true") {
                    globalAudio.play().catch((error) => {
                        console.warn("Error al intentar reanudar el audio global:", error);
                    });
                }
            }
        });

        overlay.addEventListener("animationstart", () => {
            if (globalAudio) {
                globalAudio.muted = true;
            }
        });
    }

    document.addEventListener("visibilitychange", () => {
        if (globalAudio) {
            if (document.visibilityState === "hidden") {
                globalAudio.pause();
            } else if (document.visibilityState === "visible") {
                if (sessionStorage.getItem("isPlaying") === "true" && !globalAudio.muted) {
                    globalAudio.play().catch((error) => {
                        console.warn("Error al intentar reanudar el audio global:", error);
                    });
                }
            }
        }
    });

    const style = document.createElement("style");
    style.innerHTML = `
        @keyframes bounce {
            0%, 100% {
                height: 8px;
            }
            50% {
                height: 20px;
            }
        }
    `;
    document.head.appendChild(style);
});