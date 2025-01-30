const Billet= new Item("Billet pour l'hybarge", 500);
const Legume = new Item("Légumes", 300);
const Livre = new Item("Livre", 200);


const player = new Player(2000, [Billet, Legume, Livre]);

(async function run() {
    // Désactiver toutes les interactions sauf sur "inventaire"

    const tutoinventaire = createPopupTuto("inventaire", {
        title: "Bonjour !",
        message: "Clique sur l'icone de quête en forme de coffre",
        buttonText: "Fermer",
        width: "300px",
        height: "auto",
        backgroundImage: "img/bulle.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 12%"
            },

            message: {
                width:"80%",
                padding:"2% 0% 0% 12%",
            },
            container: {
                padding:"0% 2% 2% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "180%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%


            },
        },
    });

    console.log("Clique sur le bouton pour continuer...");

    const player = new Player(2000, [
        new Item("Billet pour l'hybarge", 500),
        new Item("Légumes", 300),
        new Item("Livre", 200)
    ]);

    const inventaire = createPopup("inventaire",{
        title: "Liste de course",
        message: player.generateShoppingListHTML(),
        buttonText: "Fermer",
        width: "300px", // Augmente la taille de l'image
        height: "auto", // Augmente la taille de l'image
        backgroundImage : "img/postit.webp",
        
        customStyles: {
            container :{
                position: "relative",
                width: "300px", // Taille ajustable
                height: "auto", // Taille ajustableg
                textAlign: "center",
                backgroundImage: "url('img/postit.webp')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                boxSizing: "border-box",
                borderRadius: "8px",
                color: "black",
                transform: "scale(2)"
            },
            triangle: {
                visibility: "hidden",
            },
        },
    });
    await waitForClick("inventaire");

    const tutofininventaire = createPopupTuto("inventaire", {
        title: "L'INVENTAIRE",
        message: "Ici tu as l'ensemble des objets à acheter durant ton aventure, elle est composé d'un billet pour hybarge, de légumes et d'un livre. Les objets se rayeront si tu les a en ta possession. Clique sur l'inventaire lorsque tu as compris",
        width: "400px",
        height: "auto",
        backgroundImage: "img/bulle.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 8%"
            },

            message: {
                width:"80%",
                padding:"1% 0% 0% 12%",
                margin:"1% 0% 0% 0%"
            },
            container: {
                padding:"0% 2% 2% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "180%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%


            },
        },
    });

    await waitForClick("inventaire");



    const tutoBouquin = createPopupTuto("livre_open", {
        title: "LE BOUQUIN",
        message: "clique sur le livre en dessous du coffre!",
        width: "300px",
        height: "auto",
        backgroundImage: "img/bulle.png",
        customStyles: {

            title:{
                padding:"0% 0% 1% 8%"
            },

            message: {
                width:"80%",
                padding:"0% 0% 0% 12%",
                margin:"0% 0% 0% 0%"
            },
            container: {
                padding:"0% 2% 2% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "170%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%


            },
        },
    });

    
    await waitForClick("livre_open");

    const tutofinBouquin = createPopupTuto("livre_open", {
        title: "LE BOUQUIN",
        message: "Ici s'écrira ton histoire au fur et a mesure de l'aventure n'hesite pas a y jeter un coup d'oeil, clique sur le livre lorsque tu as compris ",
        width: "350px",
        height: "auto",
        backgroundImage: "img/bulle.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 8%"
            },

            message: {
                width:"80%",
                padding:"0% 0% 0% 12%",
                margin:"0% 0% 0% 0%"
            },
            container: {
                padding:"0% 2% 2% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "170%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%


            },
        },
    });

    await waitForClick("livre_open");

    await waitForClick("body");


    const tutoScroll = createPopupTuto2("PÉNICHE",{
        title: "Se balader sur le canal",
        message: "Pour se balader sur le canal rien de plus simple! Utilise ta souris ou ton pavétactile en balayant vers le bas pour faire bouger le bateau ! Tu recontreras plusieurs points d'étapes tout au long de ton voyage. Ces derniers apparaitront en noir et blanc avec une bulle de texte. Clique dessus pour découvrir le point d'étape et découvir la vie du canal du midi. Commence à voyager !   ",
        width: "550px",
        height: "auto",
        backgroundImage: "img/bulle.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 8%"
            },

            message: {
                width:"80%",
                padding:"3% 0% 0% 13%",
                margin:"0% 0% 0% 0%"
            },
            container: {
                padding:"0% 2% 2% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "30%",
                transform: "scale(1.5)",
                backgroundSize: "170%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%


            },
        },
    });



    
})();


