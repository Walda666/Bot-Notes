const discord = require('discord.js')
db = require('../db')
module.exports = {
    run: async (message, args) => {     
        if(args.length != 2) return message.channel.send("Veuillez mettre une année et un n° étudiant")
        type = args[0]
        numetu = args[1]

        matieres = []
        ranks = []

        if(type == 1) matieres = [10, 11, 12, 13, 14, 15, 16]
        else if(type == 2) matieres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        else return message.channel.send("Année non valide (1 ou 2)")

        let compteurd = 0
        for(i = 0; i < matieres.length -1; i++) {
            db.query(`SELECT E.numetu, N.note, M.nom AS nomM FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE M.id = '${matieres[i]}' ORDER BY N.note DESC`, function (err, result) {
                compteurd++
                if (err) throw err;
                if(result.length == 0) return message.channel.send("n° étudiant invalide")
                let tab = []
                let matiere = result[0].nomM
                for(j = 0; j < result.length; j++) {
                    tab.push(result[j].numetu)
                }
                ranks.push([matiere, tab.indexOf(parseInt(numetu))+1])

                let desc = ""
                for(k = 0; k < ranks.length; k++) {
                    if(ranks[k][1] != 0) desc += `${ranks[k][0]} ~ ${ranks[k][1]}\n\n`
                }
                const embed = new discord.MessageEmbed()
                .setTitle(`Rang par matières - ${numetu}`)
                .setDescription(desc)
                .setColor("RANDOM")

                if(compteurd == matieres.length -1) message.channel.send(embed)
            });
        }
     },
    name: 'classementperso'
}