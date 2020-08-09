module.exports = class Bug {
  constructor(title, description, labels, chasseur, image) {
    this.title = title;
    this.description = description;
    this.labels = labels;
    this.chasseur = chasseur;
    this.image = image;
  }
};
