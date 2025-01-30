const Billet= new Item("Billet pour l'hybarge", 500);
const Legume = new Item("Légumes", 300);
const Livre = new Item("Livre", 200);


const player = new Player(2000, [Billet, Legume, Livre]);

(async function run() {
    // Désactiver toutes les interactions sauf sur "inventaire"

    const tutoinventaire = createPopupTuto("inventaire", {
        title: "Bonjour jeune voyageur !",
        message: "Clique sur la liste de courses !",
        buttonText: "Fermer",
        width: "250px",
        height: "auto",
        backgroundImage: "img/BULLE3.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 12%"
            },

            message: {
                width:"80%",
                padding:"2% 0% 0% 12%",
            },
            container: {
                padding:"0% 2% 3% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "100% 100%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%


            },
        },
    });

    console.log("Clique sur le bouton pour continuer...");

    const inventaire = createPopup("inventaire",{
        title: "Liste de course",
        message: player.generateShoppingListHTML(),
        buttonText: "Fermer",
        width: "300px", // Augmente la taille de l'image
        height: "auto", // Augmente la taille de l'image
        backgroundImage : "img/liste_course.svg",
        
        customStyles: {
            container :{
                position: "relative",
                width: "300px", // Taille ajustable
                height: "auto", // Taille ajustableg
                textAlign: "center",
                backgroundImage: "url('img/liste_course.svg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0% 0%",
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
            title: {
                padding: "18% 0% 0% 20%",
            },
            message: {
                padding: "0% 0% 0% 15%",
            },
            triangle: {
                visibility: "hidden",
            },
            closeButton: {
                visibility: "hidden",
            }
        },
    });
    await waitForClick("inventaire");

    const tutofininventaire = createPopupTuto("inventaire", {
        title: "L'INVENTAIRE",
        message: "Ici tu as l'ensemble des objets à acheter durant ton aventure. Ta liste de course est composée d'un billet pour l'hybarge, de légumes et d'un livre. Re-clique sur le livre lorsque tu as compris !",
        width: "600px",
        height: "auto",
        backgroundImage: "img/BULLE1.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 0%"
            },

            message: {
                width:"80%",
                padding:"0% 0% 0% 12%",
            },
            container: {
                padding:"0% 2% 3% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "100% 100%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%
            },
        },
    });

    await waitForClick("inventaire");



    const tutoBouquin = createPopupTuto("livre_open", {
        title: "LE CARNET",
        message: "Appuie sur le livre en panique !",
        width: "300px",
        height: "auto",
        backgroundImage: "img/BULLE1.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 12%"
            },

            message: {
                width:"80%",
                padding:"2% 0% 0% 12%",
            },
            container: {
                padding:"0% 2% 3% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "100% 100%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%
            },
        },
    });

    
    await waitForClick("livre_open");

    const tutofinBouquin = createPopupTuto("livre_open", {
        title: "CARNET DE BORD",
        message: "Ici s'écrira ton histoire au fur et à mesure de l'aventure, n'hesite pas à y jeter un coup d'oeil. Re-clique sur le livre lorsque tu as compris.",
        width: "400px",
        height: "auto",
        backgroundImage: "img/BULLE1.png",
        customStyles: {

            title:{
                padding:"0% 0% 0% 12%"
            },

            message: {
                width:"80%",
                padding:"2% 0% 0% 12%",
            },
            container: {
                padding:"0% 2% 3% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "100% 100%",
                backgroundPosition: "53% 45%", // Centre horizontalement à 50%, décalage vertical à 30%
            },
        },
    });

    await waitForClick("livre_open");

    await waitForClick("body");


    const tutoScroll = createPopupTuto2("PÉNICHE",{
        title: "Se balader sur le canal",
        message: "Pour se balader sur le canal, rien de plus simple ! Utilise ta souris ou ton pavé tactile en balayant vers le bas pour faire bouger le bateau ! Tu rencontreras plusieurs points d'étapes tout au long de ton voyage. Ces derniers apparaîtront en noir et blanc avec une bulle de texte. Clique dessus pour découvrir le point d'étape et découvrir la vie du Canal du Midi. Commence ton voyage dans le premier point clé, l'Hybarge !",
        width: "800px",
        height: "auto",
        backgroundImage: "img/BULLE1.png",
        customStyles: {

            title:{
                padding:"3% 0% 0% 5%"
            },

            message: {
                width:"80%",
                padding:"0% 2% 4% 12%",
            },
            container: {
                padding:"0% 2% 3% 2%",
                color: "black",
                position: "fixed",
                top: "5%",
                //left: "40%",
                transform: "scale(1.5)",
                backgroundSize: "100% 100%",
                backgroundPosition: "25% 45%", // Centre horizontalement à 50%, décalage vertical à 30%
            },
        },
    });



    
})();


