// Liste des message possible
module.exports = {
  aide: `

    🐞

    *Pour ajouter un nouveau bug à la (longue) liste que les développeurs devront se taper dans la semaine ; 
    merci de respecter ce pattern et faire preuve de politesse, de tact, de bienveillance, 
    mais équalement de toute la noblesse que ce sport implique.*

    Commencer par écrire : 


    \`BUG! - Titre du gros bug à la con - Et ici la description, blablablabla.\`

    

    *C'est le mininum pour être valide, ensuite, si en plus tu veux être génial et avoir ton grade de chasseur de bug niveau 1, 
    tu peux ajouter un fichier (en même temps que le pattern sus-visé : sinon ça n'sert à rien.) 
    Et alors là, le graal : tu peux aussi ajouter des labels et différent niveau de priorité (1-4) comme ceci -> *


    \`BUG! - Titre synthétisé avec intelligence - Une description élégante, idéale pour un dev à la tête dans le (‿ˠ‿)‎ le lundi matin, etc. [graphic] [2] \`

    Une fois envoyé, vous avez un aperçu

    ⚠️ N'oubliez pas de valider votre carte grâce au emoji en dessous de l'aperçu pour qu'elle soit envoyée sur Clubhouse ! Sinon faut tout refaire. Et ouais.

    __Liste des labels :__ 

    [graphic]               |   Qui concerne un bug graphique.
    [fonction]              |   Qui concerne un problème de fonctionnement.
    [1], [2], [3]...         |   Priorité de résolution, alors évidemment 1, c'est branle-bas d'combat, donc tout doux hein. 


    🧙‍♂️ : *Pour toutes suggestions, améliorations, etc ; prendre rdv avec yann*

  `,

  carte: (obj) => `
  ⚠️ : Valider, pour envoyer ! Ce message s'auto-détruit dans 20 secondes.
          \`\`\`                      
          Story        |  ${obj.title.toLocaleUpperCase()}
          Description  |  ${obj.description}        
          Image        |  ${obj.image ? "👌" : "❌"}
          Labels       |  ${obj.labels}
          Priorité     |  ${
            obj.prio === 1
              ? "🚨"
              : obj.prio === 2
              ? "🔥"
              : obj.prio === 3
              ? "⌛"
              : "🍹"
          }
          -            |
          Chasseur     |  ${obj.author.username}
          \`\`\`
        `,
};
