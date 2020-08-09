require("dotenv").config();
//
const Discord = require("discord.js");
const client = new Discord.Client();
const Bug = require("./utils/Bug");
const scanMsg = require("./utils/scanMsg");
const botMsg = require("./utils/listMsg");
const Clubhouse = require("clubhouse-lib");

// CLUBHOUSE
const ch = Clubhouse.create(process.env.CLUBHOUSE_API_TOKEN);
//ch.listLabels().then(console.log);
// DISCORD

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (msg.content === "bug?") {
    msg.reply(botMsg.aide);
  }

  if (msg.content.match(/^(BUG! )/)) {
    //check pattern
    let correct = msg.content.match(/^(BUG! )-([^-]+)-([^-]+)/);

    if (correct) {
      //
      //décomposer msg

      try {
        msg.react("🦟");
        let scan = await scanMsg(msg);

        if (!scan) throw new Error("Y a comme une couille dans l'potage");

        let { title, description, labels, author, prio, image } = scan;
        let bug = new Bug();
        // reply ok
        msg.reply(botMsg.carte(scan)).then((message) => {
          message.react("✅");
          message.react("⛔");

          const filter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === author.id;

          message
            .awaitReactions(filter, { time: 20000 })
            .then((collected) => {
              if (collected.size > 0) {
                message.delete();
                ch.createStory({
                  project_id: 28,
                  story_type: "bug",
                  name: `BugTracker | ${title}`,
                  description: image
                    ? `![Screenshot](${image}) \n \n ${description} \n ${author.username}`
                    : `${description} \n ${author.username}`,
                  //labels: ["vie privée"],
                })
                  .then(() => {
                    msg.reply("C'est en route pour être résolu !");
                    msg.react("✅");
                  })
                  .catch(() => {
                    message.delete();
                    msg.react("⛔");
                    msg.reply(
                      "Oups, le serveur grille, prévenir yann ! viteeeee !!!"
                    );
                  });
              } else {
                message.delete();
                msg.react("⛔");
                msg.react("🗑️");
              }
            })
            .catch(() => {
              message.delete();
            });
        });
      } catch (error) {
        msg.reply(`Hmmm, ${error.message}`);
        msg.react("⛔");
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

client.login(process.env.DISCORD_TOKEN);
