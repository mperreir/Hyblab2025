# Guide de construction du projet + déploiement

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
