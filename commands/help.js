const discord = require('discord.js')
db = require('../db')
module.exports = {
    run: (message) => { 
            embed = new discord.MessageEmbed()
            .setTitle(`Help`)
            .setDescription(`.notes [nom/prenom/numetu] [valeur] : affiche les notes et la moyenne d'une personne (SQL LIKE donc on peut rentrer "tes" pour "teste")
            
.matieres : affiche la liste des matières

.classement [matiere] : affiche les 30 meilleurs étudiants d'une matière

.classementperso [matiere] [numero étudiant] : affiche le classement d'un étudiant dans une matière`)
            .setColor("BLACK")

    message.channel.send(embed)

     },
    name: 'help'
}