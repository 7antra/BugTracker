module.exports = async function (msg) {
  let title = "";
  let description = "";
  let labels = [];
  let prio = 4;
  let author = { ...msg.author };
  let image = null;

  try {
    //labels
    let matchesLabel = msg.content.match(/\[(.*?)\]/g); //verif si label entre [ ]

    labels = matchesLabel
      ? matchesLabel.map((l) => l.substring(1, l.length - 1)) //enlever bracket
      : [];

    //label valid ?
    let verifLabel = labels.find((l) => {
      switch (l) {
        case "graphic":
        case "fonction":
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          prio = +l;
          break;
        default:
          return l;
      }
    });

    if (verifLabel)
      throw new Error(`Problème, ce label n'existe pas : ${verifLabel}`);

    // title
    let matchesTitle = msg.content.match(/\ - (.*?)\ - /g); // verif title entre - -

    title = matchesTitle
      ? matchesTitle[0].substring(3, matchesTitle[0].length - 3)
      : "";

    //description
    let description = labels.length
      ? /\ - (.*?)\ - /g.exec(msg.content)[0]
      : /(?<=([^-]*- ){2}).*/.exec(msg.content)[0];

    return { title, description, labels, author, prio };
  } catch (error) {
    console.log("error : ", error.message);
  }
};
