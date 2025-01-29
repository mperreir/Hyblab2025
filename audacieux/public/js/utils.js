function colorScript(event){
    console.log("color_script")
    console.log(event);
    colorizeImage(event);
}

function colorizeImage(imageElement) {
    console.log(imageElement);

    if (!imageElement) {
        console.error("Aucun élément d'image fourni.");
        return;
    }

    // Add CSS for smooth transition
    imageElement.style.transition = 'filter 0.3s ease';
    imageElement.style.filter = 'grayscale(100%)';
    let isClicked = false;

    imageElement.addEventListener("click", () => {
        imageElement.style.filter = "none";
        isClicked = true;
    });

    imageElement.addEventListener("mouseover", () => {
        if (!isClicked) {
            imageElement.style.filter = "none";
        }
    });

    imageElement.addEventListener("mouseout", () => {
        if (!isClicked) {
            imageElement.style.filter = "grayscale(100%)";
        }
    });
}

function leaveImage(event){
    console.log("MAGASIN !!");
    zoomOutScene();
}

function loadSceneScript(event, id)
{
    loadImageScene("image_holder.json", id);
}

function playAudio(event, id)
{
    playAudioTrigger("data/audio_scene.json", id);
}