const discord = require('discord.js')
db = require('../db')
module.exports = {
    run: (message, args) => { 
        if(args.length != 2) return message.channel.send("Veuillez mettre un type (nom/prenom/numetu) et une valeur")
        type = args[0]
        valeur = args[1]
        if(type != "nom" && type != "prenom" && type != "numetu") return message.channel.send("Veuillez mettre un type valide : nom/prenom/numetu")
        query = `SELECT E.nom, E.prenom, N.note, M.nom AS nomM, M.credits FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE E.numetu = "000000"`   

        if(type == "nom") {
            query = `SELECT E.nom, E.prenom, N.note, M.nom AS nomM, M.credits FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE E.nom LIKE "%${valeur}%"`
        }
        if(type == "prenom") {
            query = `SELECT E.nom, E.prenom, N.note, M.nom AS nomM, M.credits FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE E.prenom LIKE "%${valeur}%"`
        }
        if(type == "numetu") {
            query = `SELECT E.nom, E.prenom, N.note, M.nom AS nomM, M.credits FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE E.numetu = "${valeur}"`
        }

            db.query(query, function (err, result) {
                if (err) throw err;
                if(result.length == 0) return message.channel.send("Utilisateur non trouvé")

                // Vérification de l'unicité du prénom :

                let noms = []
                for(let i = 0; i < result.length; i++) noms.push(result[i].nom)
                let noms_unique = Array.from(new Set(noms))
                if(noms_unique.length != 1) {
                    mes = `Il y a plusieurs ${valeur[0].toUpperCase()}${valeur.substring(1).toLowerCase()}, veuillez faire [.notes nom] en choisissant parmi les noms suivants : `
                    for(let i = 0; i < noms_unique.length; i++) mes += `${noms_unique[i][0] + noms_unique[i].substring(1).toLowerCase()} `
                    return message.channel.send(mes)
                }
                

                let tab = []
                for(let i = 0; i < result.length; i++) tab.push([result[i].nom, result[i].prenom, result[i].note, result[i].nomM, result[i].credits])
                
                // Calcul de la moyenne : 

                compteur = 0
                compteurCredits = 0
                for(let i = 0; i < result.length; i++) {
                    if(tab[i][4] != -1) {
                    compteur += (tab[i][2] * tab[i][4])
                    compteurCredits += tab[i][4]
                   }
                }
                moyenne = compteur / compteurCredits
                moyenneAff = moyenne.toString().substring(0,5)

                // Affichage des notes

                desc = ""
                for(let $i = 0; $i < tab.length; $i++) {
                    if(tab[$i][2] == -1) desc += `${tab[$i][3]} : ABSENT\n\n`
                    else desc += `${tab[$i][3]} : ${tab[$i][2]}\n\n`
                }


                embed = new discord.MessageEmbed()

                .setTitle(`${tab[0][1][0].toUpperCase() + tab[0][1].substring(1).toLowerCase()} ${tab[0][0][0].toUpperCase() + tab[0][0].substring(1).toLowerCase()}`)
                .setColor("RANDOM")
                .setDescription(`${desc}
Moyenne : ${moyenneAff}`)
                
                message.channel.send(embed)
              });
     },
    name: 'notes'
}