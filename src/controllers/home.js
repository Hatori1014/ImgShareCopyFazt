const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  const images = await Image.find().sort({timestamp: -1}); // manera ascendente = 1 , manera descendente = -1
  res.render('index', { images }); //se puede reducir images: images a solo images

};

module.exports = ctrl;