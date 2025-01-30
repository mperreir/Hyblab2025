# Descriptif du projet

Porteur de projet : Médiacités

Sujet : Simpli'Cité

Nom d'équipe : Médiacitadins

Participants :

- AGR : Lilou, Anaïs, 
- Polytech :  Pierre, Samuel, Saad, Ayman, Nolann
- SciencesPo : Robin

## Pages du site

IP initiale : `http://localhost:8080/mediacites/`

`/` ou `/home` :
- Accueil avec motion

`/navigation` :
- Pages avec catégories séléctionnables

`/articles/{nom_catégorie}` :
- Page avec articles correspondant à la 
catégorie

`/info` :
- Page d’information et de remerciement



## APIs (uniquement requête GET)

`/api/categories` :
- Obtenir la liste

`/api/articles/{category_name}` :
- Texte de l’article

`/api/articles/{category_name}/kpis` :
- KPIs de l’article (les chiffres)

`/api/articles/{category_name}/` :
- linked_categories, les catégories qui se rapprochent de celle de l'article

`/api/articles/{category_name}/links` :
- Liens vers les décisions


## Organisation des JSONs
### `articles.json`
* `id` : id de l'article
* `name` : titre de la catégorie
* `text` : texte de l’article
* `resume` : resume de l'article
* `kpis` : 
    * `id` : identifiant du KPI (0 ou 1)
    * `number` : le chiffre à montrer (sous forme de chaîne pour avoir le %)
    * `text` : texte accompagnateur
* `links` :
    * `id` : identifiant de la décision
    * `name` : nom du lien vers la décision
    * `link` : lien vers la décision
### `decisions.json`
* `id` : identifiant
* `category` : catégorie
* `link` : lien


## A supprimer

Ces instructions ne sont la que pour vous guider dans le développement de vos pages web. Elles seront à supprimer pour la soumission finale de votre code.

Le dossier de votre projet contient un squelette de code que vous devez modifier. 

- La partie `serveur.js`  ne doit a priori pas être touchée, si vous avez des entrées d'API à ajouter il faudra le faire dans le dossier `api`.
- Le dossier `public`  contient la partie statique de votre site. Par défaut le fichier index.html charge un fichier `style.css` qui est destiné au format mobile (portrait). Si votre porteur de projet demande un site desktop, vous pouvez vous baser sur l'exemple `index-desktop.html` et le CSS associé `style-desktop.css` qui propose une page au format paysage.



## Instructions de déploiement

Si votre projet nécessite des instructions spécifiques pour son déploiement, merci d'ajouter des explications ici.
