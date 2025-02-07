# Descriptif du projet

Bienvenue dans notre projet développé dans le cadre du **Hyblab**, en lien avec le passage du **Tour de France** à Lille ! 🌍🎉  

**Porteur de projet** : La voix du nord

**Sujet** : **Le défi des 3 maillots** est un jeu interactif conçu dans le cadre du **Hyblab**, en lien avec le passage du **Tour de France à Lille**. Ce quiz ludique mêle **culture, sport et intelligence artificielle**, avec des questions variées sur le **cyclisme, le patrimoine, la gastronomie et l’histoire locale**. Destiné aussi bien aux **locaux** qu’aux **touristes et spectateurs**, il permet de tester ses connaissances sur la région tout en découvrant ses richesses. Pensé dans une logique de **gamification**, ce projet met en avant Lille et ses environs à travers une expérience immersive et accessible à tous. 🚴‍♂️🎉

**Nom d'équipe** : La roue libre

**Participants** :

- AGR :
  - RONTARD Ivana
- Polytech :
  - BEN SALHA Mahdi
  - IBNOUALI Youssef
  - JAOUADA Mohamed
  - JRAD Ghassen
  - OUERIEMMI Arwa
  - TAGNE TCHWEGUEM Theophile Pierre
- SciencesPo :
  - MALLET Quentin

## 🔧 **Modifications et Processus de Build**  

### 🚀 **Modifications apportées à `server.js`**  

Des ajustements ont été faits pour assurer une meilleure gestion des fichiers statiques et la compatibilité avec une application **React SPA** :  

- 📂 **Changement du répertoire de build** : Les fichiers statiques sont désormais servis depuis `frontend/build` au lieu de `public`.  
- 🔄 **Gestion des routes React** : Une route **catch-all** a été implémentée pour rediriger toutes les requêtes vers `index.html`, évitant ainsi les erreurs 404 pour les routes côté client.  

### 🏗️ **Processus de build avec `post-build.js`**  

Le script `post-build.js` automatise une tâche importante après la génération du build :  

- 📄 **Mise à jour des fichiers YAML** : Il modifie `data/questions.yaml` en ajoutant un **basename** aux images des questions pour garantir leur bon affichage dans l’application.
- ⚡ **Exécution automatique après le build** : Ce script est déclenché via `"postbuild": "node postbuild-script.js"` dans le fichier `package.json`, garantissant que les images sont correctement mises à jour après chaque build.  
