const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image
    .find()
    .sort({timestamp: -1}); // manera ascendente = 1 , manera descendente = -1
  let viewModel = {images: []};
  viewModel.images = images;
  viewModel = await sidebar(viewModel);
  res.render('index', viewModel); //se puede reducir images: images a solo images
  console.log(viewModel);
};

module.exports = ctrl;