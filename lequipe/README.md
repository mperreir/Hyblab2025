# Descriptif du projet

Porteur de projet : L'équipe

Sujet : Retrospective sur des moments importants du sport mondial avec différentes uchronies.

Nom d'équipe : 

Participants : 

- AGR :
    - Kilian Bélier
- Polytech : 
    - Maxime Tchernychev
    - Ruikang Sun
    - Yassine Akoh
    - Robinson Roué
    - Valentin Esnault
- SciencesPo : 
    - Maxime Cormier
    - Line Baudriller


## Instructions de déploiement

Le projet Angular peut être construit puis déployé en utilisant les commandes suivantes depuis le dossier `lequipe/` :

```bash
# 1. Naviguer dans le dossier src/ contenant le code source Angular
cd src/

# 2. Installer les dépendances du projet
npm install

# 3. Installer Angular CLI globalement (si ce n'est pas déjà fait)
npm install -g @angular/cli

# 4. Construire le projet avec le bon base-href
ng build --base-href=/lequipe/

# 5. Nettoyer le répertoire public (pour éviter d'anciens fichiers obsolètes)
rm -rf ../public/*

# 6. Copier les fichiers construits dans le répertoire public
cp -r dist/hyblab-angular/browser/* ../public/
