const {Image} = require('../models');

module.exports = {

  async popular(){
   await Image.find()
    .limit(9)
    .sort({likes: -1});
  }





};