window.addEventListener("load", () => {
    const imageContainer = document.querySelector('.image-container');
    const image = document.getElementById('zoomImage');
    const fadeOverlay = document.querySelector('.fade-overlay'); // Sélection de l'overlay

    let isZoomEnabled = false;
    let scrollPosition = 0;
    let scale = 1;
    const minScale = 1;
    const maxScale = 3;
    const imageWidth = image.clientWidth;
    const windowWidth = window.innerWidth;

    window.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (!isZoomEnabled) {
            // Défilement horizontal
            scrollPosition += event.deltaY;
            scrollPosition = Math.max(0, Math.min(scrollPosition, imageWidth - windowWidth));
            imageContainer.style.transform = `translateX(-${scrollPosition}px)`;

            if (scrollPosition >= imageWidth - windowWidth) {
                isZoomEnabled = true;
            }
        } else {
            // Zoom
            if (event.deltaY < 0) {
                scale /= 1.05;
            } else {
                scale *= 1.05;
            }

            scale = Math.min(Math.max(minScale, scale), maxScale);
            image.style.transform = `scale(${scale})`;

            // Calcul de l'opacité (entre 0 et 1)
            let fadeOpacity = (scale - (maxScale - 1)) / (maxScale - (maxScale - 1));
            fadeOpacity = Math.min(Math.max(0, fadeOpacity), 1);
            fadeOverlay.style.opacity = fadeOpacity;
            
            if (scale == maxScale) {
                window.location.href = "canal.html";    
            }

            // Désactiver le zoom si on revient au minScale
            if (scale === minScale) {
                isZoomEnabled = false;
            }
        }
    }, { passive: false });
});