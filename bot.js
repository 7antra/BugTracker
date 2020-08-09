require("dotenv").config();
//
const Discord = require("discord.js");
const client = new Discord.Client();
const Bug = require("./utils/Bug");
const scanMsg = require("./utils/scanMsg");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content === "bug?") {
    msg.reply(`

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

      `);
  }

  if (msg.content.match(/^(BUG! )/)) {
    console.log("msg : ", msg);
    //check pattern
    let correct = msg.content.match(/^(BUG! )-([^-]+)-([^-]+)/);

    if (correct) {
      //
      //décomposer msg

      try {
        let scan = await scanMsg(msg);

        if (!scan) throw new Error("Y a comme une couille dans l'potage");

        let { title, description, labels, author, prio } = scan;
        let bug = new Bug();
        // reply ok
        msg
          .reply(
            `
⚠️ : Valider, pour envoyer ! Ce message s'auto-détruit dans 20 secondes.
        \`\`\`                      
        Story        |  ${title.toLocaleUpperCase()}
        Description  |  ${description}        
        Labels       |  ${labels}
        Priorité     |  ${prio}
        -            |
        Chasseur     |  ${author.username}
        \`\`\`
      `
          )
          .then((message) => {
            message.react("✅");
            message.react("⛔");

            const filter = (reaction, user) =>
              reaction.emoji.name === "✅" && user.id === author.id;

            message
              .awaitReactions(filter, { time: 20000 })
              .then((collected) => {
                if (collected.size > 0) {
                  message.delete();
                  msg.reply("C'est en route pour être résolu !");
                } else {
                  message.delete();
                  msg.reply("Allez ! Putain faut tout recommencer.");
                }
              })
              .catch(console.error);
          });

        msg.react("🦟");
      } catch (error) {
        msg.reply(`Hmmm, ${error.message}`);
      }
    } else {
      //mauvais pattern
      msg.reply(
        `Hop, hop, hop ! On respecte plus rien là ! (tape : "bug?" pour revoir les bases)`
      );
      msg.react("👉");
      msg.react("🚪");
    }
  }
});

client.login(process.env.TOKEN);
