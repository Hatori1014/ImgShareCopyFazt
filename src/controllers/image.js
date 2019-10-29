const path = require('path');
const fs = require('fs-extra');
const helpers = require('../helpers/libs');

const ctrl= {};

ctrl.index = (req, res) => {

};

ctrl.create = async (req, res) => {
  const imgUrl = helpers.randomNumber();
  console.log(imgUrl);
  const imageTempPath = req.file.path; 
  const ext = path.extname(req.file.originalname).toLowerCase();
  const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`); 

  if(ext ==='.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
    await fs.rename(imageTempPath, targetPath);
  }
  res.send('Works!');  

};

ctrl.like = (req, res) => {

};

ctrl.comment = (req, res) => {

};

ctrl.remove = (req, res) => {

};


module.exports = ctrl;