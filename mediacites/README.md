# Descriptif du projet

Porteur de projet : Médiacités

Sujet : SimpliCités

Nom d'équipe : Médiacitadins

Participants :

- AGR : Lilou, Anaïs, 
- Polytech :  Pierre, Samuel, Saad, Ayman, Nolann
- SciencesPo : Robin



## A supprimer

Ces instructions ne sont la que pour vous guider dans le développement de vos pages web. Elles seront à supprimer pour la soumission finale de votre code.

Le dossier de votre projet contient un squelette de code que vous devez modifier. 

- La partie `serveur.js`  ne doit a priori pas être touchée, si vous avez des entrées d'API à ajouter il faudra le faire dans le dossier `api`.
- Le dossier `public`  contient la partie statique de votre site. Par défaut le fichier index.html charge un fichier `style.css` qui est destiné au format mobile (portrait). Si votre porteur de projet demande un site desktop, vous pouvez vous baser sur l'exemple `index-desktop.html` et le CSS associé `style-desktop.css` qui propose une page au format paysage.



## Instructions de déploiement

Si votre projet nécessite des instructions spécifiques pour son déploiement, merci d'ajouter des explications ici.


## Organisation des JSONs
### `articles.json`
* `name` : nom de catégorie
* `text` : texte de l’article 
* `kpis` : 
    * `id` : identifiant du KPI (0 ou 1)
    * `number` : le chiffre à montrer (sous forme de chaîne pour avoir le %)
    * `text` : texte accompagnateur
* `linked_categories` : 
    * `id` : id
    * `name` : nom du lien
    * `link` : lien vers la catégorie (utile?)
* `links` :
    * `id` : identifiant de la décision
    * `name` : nom du lien vers la décision
    * `link` : lien vers la décision
### `decisions.json`
* `id` : identifiant
* `category` : catégorie
* `link` : lien