# Descriptif du projet

Porteur de projet : La Nouvelle République

Sujet : Nos animaux en danger sur nos territoires

Nom d'équipe : Dans leur peau

Participants : 

- AGR : Antoine Clavier
- Polytech : Julien Chatry / Baptiste Josso / Evan Josso / Ulysse Lopez / Christian Soh
- SciencesPo : Zoé Diraison / Juliette Rigaud

# Guide de construction du projet + déploiement

```bash
# Se placer dans le dossier du projet
cd src
```

## Installation des dépendances

```bash
npm install
```

## Construction
```bash
# Construire l'application pour la production
npm run build
```

## Prévisualisation
```bash
# Prévisualiser l'application construite
npm run preview
```

## Vider le dossier public 

- Supprimez le contenu du dossier /lanouvellerepublique/public
```bash
rm -rf  ../public/*
```

## Copier les fichiers construits dans public
```bash
cp -r ./dist/* ../public/
```
