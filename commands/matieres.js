const discord = require('discord.js')
db = require('../db')
const pagination = require('discord.js-pagination')
module.exports = {
    run: (message, args) => { 
            db.query(`SELECT id, nom FROM matiere`, function (err, result) {
                if (err) throw err;

                tab = []
                for(let i = 0; i < result.length; i++) tab.push([result[i].id, result[i].nom])

                pages = []

                for(let i = 0; i < 2; i++) {
                    desc = ""
                    for(let j = 0+(i*7); j < 7+(i*7); j++) desc += `${tab[j][0]} - ${tab[j][1]}\n\n`
                    embed = new discord.MessageEmbed()
                    .setTitle(`Matières -  ${i+1}`)
                    .setDescription(desc)
                    .setColor("BLACK")
                    pages.push(embed)
                }

                let emojis = ["⬅️", "➡️"]
                const timeout = '10000000'
                pagination(message, pages, emojis, timeout)


              });
     },
    name: 'matieres'
}