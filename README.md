# DiscordBot Notes S2/S4 2021

## Description
Bot discord permettant de consulter ses notes, sa moyenne et son classement dans les différentes matières du semestre. Le classement général par matière est également visualisable.

Les commandes sont toutes listées dans le .help

<br>
Ce bot a été utilisé pour les promotions de 1ère et 2ème année d'Informatique de l'ULR pour l'année 2020-2021. Toutes les données insérées en base de données étaient libre d'accès pour tous les étudiants des dites promotions.

<br>

## Installation & lancement

Pour installer le bot, procédez comme tel :
- Installer nodejs si ce n'est pas le cas
- Ajouter un token valable dans le fichier `config.json` 
- Ajouter les logs de bdd dans le fichier `db.js`
- Entrer la comande suivante

```bash
npm install
```

Puis, pour démarrer le bot, entrer la commande suivante :
```bash
node index.js
```
# Précisions
Ce projet à été mon premier bot discord, réalisé en début d'année 2021. A ce moment je ne connaissais que peu l'API discord ainsi que la conception de base de données, c'est pourquoi le code peut ne pas être cohérent ou optimisé.