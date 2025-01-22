export type ContentData = {
    title: string; // Titre principal du jeu ou de la section
    image: string; // Image principale ou de couverture
    situation: Situation; // Situation initiale et ses choix
};

export type Situation = {
    content: ContentBlock[]; // Liste de pavés de texte et d'images pour la situation initiale
    choices?: Choice[]; // Liste des choix disponibles depuis cette situation
};

export type ContentBlock = TextBlock | ImageBlock;

export type ImageBlock = {
    type: "image";
    link: string; // Lien de l'image
    altText?: string; // Optional alt text for the image
    template: "left" | "center" | "right"; // Position de l'image
};

export type TextBlock = {
    type: "text";
    text: string; // texte du bloc
    template: "full_page" | "quote"; // Format du texte
};

export type Choice = {
    text: string; // Texte du choix proposé au joueur
    result: Situation; // Résultat du choix, menant à une nouvelle situation
};