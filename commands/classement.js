const discord = require('discord.js')
db = require('../db')
const pagination = require('discord.js-pagination')
module.exports = {
    run: (message, args) => { 
        if(args.length != 1) return message.channel.send("Veuillez mettre un n° de matière (voir [.matieres])")
        matiere = args[0]
            db.query(`SELECT E.nom, E.prenom, N.note, M.nom AS nomM FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE M.id = '${matiere}' ORDER BY N.note DESC`, function (err, result) {
                if (err) throw err;
                if(result.length == 0) return message.channel.send("Matière non trouvé")

                tab = []
                for(let i = 0; i < 30; i++) tab.push([result[i].nom, result[i].prenom, result[i].note, result[i].nomM])

                pages = []

                for(let i = 0; i < 6; i++) {
                    desc = ""
                    for(let j = 0+(i*5); j < 5+(i*5); j++) desc += `${j+1} -  ${tab[j][0][0] + tab[j][0].substring(1).toLowerCase()} ${tab[j][1][0] + tab[j][1].substring(1).toLowerCase()} : ${tab[j][2]}\n\n`
                    embed = new discord.MessageEmbed()
                    .setTitle(`Classement ${result[0].nomM} -  ${i+1}`)
                    .setDescription(desc)
                    .setColor("RANDOM")
                    pages.push(embed)
                }

                



                let emojis = ["⬅️", "➡️"]
                const timeout = '10000000'
                pagination(message, pages, emojis, timeout)


              });
     },
    name: 'classement'
}