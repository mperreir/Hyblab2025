export type ContentData = {
    title: string; // Titre principal du jeu ou de la section
    image: string; // Image principale ou de couverture
    situation: Situation; // Situation initiale et ses choix
};

export type Situation = {
    content: ContentBlock[]; // Liste de pavés de texte et d'images pour la situation initiale
    choices: Choice[]; // Liste des choix disponibles depuis cette situation
};

export type ContentBlock = {
    type: "text" | "image";
    text?: TextBlock; // Texte d'un pavé (facultatif)
    image?: ImageBlock; // Image associée à ce pavé (facultative)
};

export type ImageBlock = {
    link: string; // Lien de l'image
    template: "left" | "center" | "right"; // Position de l'image
};

export type TextBlock = {
    text: string; // texte du bloc
    template: "full_page" | "quote"; // Format du texte
};

export type Choice = {
    text: string; // Texte du choix proposé au joueur
    result: Result; // Résultat du choix, menant à une nouvelle situation
};

export type Result = {
    content: ContentBlock[]; // Liste de pavés de texte et d'images
    choices?: Choice[]; // Liste des choix disponibles depuis cette situation (facultatif)
};