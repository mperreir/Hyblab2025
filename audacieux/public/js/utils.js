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
    const dialogue = bulle({
        title: "Chauffeur de l'hybarge",
        messages: ["Bonjour jeune voyageur ! Pour emprunter la route du soleil sur le splendide canal du midi, la place sur notre navette à l'hydrogène est à 30 Cardano.", "Je vous laisse insérer votre moyen de paiement ...", "Tenez votre billet Voyagez bien!"],
        width: "300px",
        height: "200px",
        customStyles:{
            container: {
                backgroundColor: "#ffffff",

            }
        }
    });

    player.buyObject(Billet);
    
}

function dialogueAbdonia(){
    const dialogue = bulle({
        title: "Abdonia représentante locale",
        messages: ["Le canal, Orion, c’est bien plus qu’une route. C’est notre lien, notre force. Il nourrit nos villages, fait vivre nos artisans, et nous rend libres. Sans lui, Toulouse ne serait pas ce qu’elle est : un cœur qui bat, un lieu où le passé et l’avenir se rencontrent.", "Il nous rappelle qu’on peut avancer sans tout briser. C’est notre autonomie, notre fierté. Et tant qu’il coulera, nous serons debout.", "Alors, tu comprends maintenant ?"],
        width: "550px",
        height: "auto",
        customStyles:{
            container: {
                backgroundColor: "#ffffff",
                margin: "0% 0% 30% 0%"
            }
        }
    });
    
}

function dialogueMarchant(){
    const dialogue = bulle({
        title: "Marchand",
        messages: ["Tu vois ça, Orion ? Ces bassins, c’est bien plus qu’une simple culture. C’est une renaissance. Avant, nos sols étaient morts, desséchés, craquelés par le soleil et abandonnés par la vie. Le changement climatique a frappé fort ici, en Occitanie. Les sécheresses ont tout emporté : nos récoltes, notre confiance, notre avenir. Mais on a refusé de baisser les bras.",
             "Avec l’aquaponie, on a recréé un écosystème. Les poissons nourrissent les plantes, les plantes purifient l’eau, et tout cela tourne en harmonie. On a aussi commencé à échanger des semences, des variétés anciennes, résistantes, adaptées à notre terre. Chaque graine est une histoire, une mémoire, une promesse. Et aujourd’hui, ces bassins nourrissent notre communauté, mais aussi les voyageurs comme toi, qui passent sur le canal.",
              "Le climat ? Oui, il est dur. L’eau se fait rare, et chaque goutte compte. Mais on apprend à faire avec. L’aquaponie, l’agriculture régénérative, ce sont des solutions locales, des réponses à un problème global. On ne peut pas changer le monde en un jour, mais on peut changer notre coin de terre. Et ça, ça fait toute la différence.",
            "Tu veux goûter ? Ces légumes, ils ont le goût de la patience, de l’innovation et de la résilience. Et pour quelques Cardano, ils peuvent être tiens. Alors, tu en penses quoi ? Prêt à soutenir une agriculture qui a du sens ?",
            "Ca fera 20 Cardano, Merci!"],
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
    const dialogue = bulle({
        title: "Une étagère avec les livres suivants",
        messages: ["“Ragondin malgré moi”, Clément Lacroix, éditions Ox’ivent  ", "“Creuser l’avenir. La naissance du Canal vécue de l’intérieur”, Frederique Malis, éditions Ephème",
             "“2046, anatomie d’un crash”, Gatien Elie", "“Vivre sans pétrole”, Swaélie Canquouet", "“Post-fascisme et néo-sobriété”, Lucas Haulienré",
             "“Ode aux communes libres”, Johanna Hawken", "“Fini”, Florent Dupuis", "“Voyages en émergence”, Marc Tirel"],
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

  
