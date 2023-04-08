const discord = require('discord.js')
db = require('../db')
module.exports = {
    run: (message, args) => { 
        etus = []
        db.query("SELECT numetu FROM etudiant WHERE annee = 2", function (err0, result0) {
            if(err0) throw err0
            for(let x = 0; x < result0.length; x++) etus.push(result0[x].numetu)
        let index = 0
        let tableau = []
        for(i = 0; i < etus.length; i++) {
          query = `SELECT E.nom, E.prenom, N.note, M.nom AS nomM, M.credits FROM notes N JOIN etudiant E ON E.numetu = N.etudiant JOIN matiere M ON M.id = N.matiere WHERE E.numetu = "${etus[i]}"`
          db.query(query, function (err, result) {
            if (err) throw err;
            index++
            let tab = []
            for(let i = 0; i < result.length; i++) tab.push([result[i].nom, result[i].prenom, result[i].note, result[i].nomM, result[i].credits])
            
            // Calcul de la moyenne : 

            let compteur = 0
            let compteurCredits = 0
            let personne = ""
            for(let i = 0; i < result.length; i++) {
                if(tab[i][4] != -1) {
                compteur += (tab[i][2] * tab[i][4])
                compteurCredits += tab[i][4]
               }
               personne = `${tab[i][0]} ${tab[i][1]}`
            }
            moyenne = compteur / compteurCredits
            moyenneAff = moyenne.toString().substring(0,5)
            tableau.push({nom : personne, moyenne : moyenneAff})

            tableau.sort(function (a, b) {
                return b.moyenne - a.moyenne;
              });

            if(index = 137) console.log(tableau)
            console.log("--------------------\n\n")

            console.log(`i : ${i} & index : ${index}`)
            console.log("--------------------\n\n")

        });
    }
});
               
     },
    name: 'classementgeneral'
}