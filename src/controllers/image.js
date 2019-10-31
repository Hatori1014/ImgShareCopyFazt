const fs = require('fs-extra');
const path = require('path');

const helpers = require('../helpers/libs');

// en Node JS cuando se importa busca un archivo index, por consiguiente se puede omitir el index (require('../models/index') = require('../models')
const { Image } = require('../models');

const ctrl = {};

ctrl.index = async (req, res) => {
  
};

ctrl.create = (req, res) => {
  const saveImage = async() => {
    const imgUrl = helpers.randomNumber();
    const images = await Image.find({ filename: imgUrl });

    if (images.length > 0) {
      imgUrl = helpers.randomNumber();
      saveImage();
    } else {
      //image Location
      console.log(imgUrl);
      const imageTempPath = req.file.path;
      const ext = path.extname(req.file.originalname).toLowerCase();
      const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);

      //Validate Extension
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Image({
          title: req.body.title,
          filename: imgUrl + ext,
          description: req.body.description
        });
        const imageSaved = await newImg.save();
        //res.redirect('/images/:image_id');
        res.send('works!');
      } else {
          await fs.unlink(imageTempPath);
          res.status(500).json({ error: 'Only Images are allowed' });
      }
    }
  };
  saveImage();
};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};


module.exports = ctrl;