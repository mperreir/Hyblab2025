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
    stopAllAudio();
    toggleActionImage(false);
    playAudioAmbiance(true);
    zoomOutScene();
}

function loadSceneScript(event, id)
{
    playAudioAmbiance(false);
    toggleActionImage(true);
    loadImageScene("image_holder.json", id);
}

function playAudio(event, id)
{
    playAudioTrigger("data/audio_scene.json", id);
}
function dialogueChauffeur(){
    const dialogue = bulle("",{
        title: "Test",
        messages: ["achete billet", "monnaie", "merci!"],
        width: "550px",
        height: "auto",
        backgroundImage: "public/img/bulle.png",
        customStyles:{
            container: {
                backgroundColor: "#ffffff",
            }
        }
    });
}

function dialogueAbdonia(){
    const dialogue = bulle("",{
        title: "OUAI L'histoire",
        messages: ["Ca va?", "c'est joli", "Au revoir"],
        width: "550px",
        height: "auto",
        backgroundImage: "public/img/bulle.png",
        customStyles:{
            container: {
                backgroundColor: "#ffffff",
            }
        }
    });
}

function dialogueMarchant(){
    const dialogue = bulle("",{
        title: "OUAI L'histoire",
        messages: ["j'ai des legumes", "argent", "Tiens!"],
        width: "550px",
        height: "auto",
        backgroundImage: "public/img/bulle.png",
        customStyles:{
            container: {
                backgroundColor: "#ffffff",
            }
        }
    });
}

function dialogueLivre(){
    const dialogue = bulle("",{
        title: "LIVRE",
        messages: ["LIVRE1", "LIVRE2", "ACHETER"],
        width: "550px",
        height: "auto",
        backgroundImage: "public/img/bulle.png",
        customStyles:{
            container: {
                backgroundColor: "#ffffff",
            }
        }
    });
}

  
