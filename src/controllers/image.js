const fs = require('fs-extra');
const path = require('path');
const md5 = require('md5');

// en Node JS cuando se importa busca un archivo index, por consiguiente se puede omitir el index (require('../models/index') = require('../models')
const helpers = require('../helpers/libs');
const { Image, Comment } = require('../models');


const ctrl = {};

ctrl.index = async (req, res) => {
  const viewModel = {image: {}, comments: {}};
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if(image){
    image.views += 1;
    viewModel.image = image;
    await image.save();
    const comments = await Comment.find({image_id: image._id});
    viewModel.comments = comments;
    res.render('image', viewModel);
  }else{
    res.redirect('/');
  }
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
        res.redirect('/images/' + imgUrl);
        //res.send('works!');
      } else {
          await fs.unlink(imageTempPath);
          res.status(500).json({ error: 'Only Images are allowed' });
      }
    }
  };
  saveImage();
};

ctrl.like = async (req, res) => {
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
  if(image){
    image.likes += 1;
    await image.save();
    res.json({likes: image.likes});
  }else{
    res.status(500).json({error: 'Internal Error'});
  }
};

ctrl.comment = async (req, res) => {
  const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
      const newComment = new Comment(req.body);
      newComment.gravatar = md5(newComment.email);
      newComment.image_id = image._id;
      await newComment.save();
      res.redirect('/images/' + image.uniqueId);
    }else{
      res.redirect('/');
    }
};

ctrl.remove = (req, res) => {

};


module.exports = ctrl;