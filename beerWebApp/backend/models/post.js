//Post Model
const { builtinModules } = require('module');
const mongoose = require("mongoose");
const postSchema = mongoose.Schema({
  beerTitle: { type: String, default: 'test beerTitle' },
  tagline: { type: String, default: 'test tagline'},
  firstBrewed: { type: String, default: 'test firstBrewed' },
  abv: { type: String, default: 'test abv' },
  imageUrl: { type: String, default: 'test imageUrl' },
  description: { type: String, default: 'test description' },
  brewersTips: { type: String, default: 'test brewersTips' },
});

mongoose.model('Post', postSchema);

module.exports = mongoose.model('Post', postSchema);