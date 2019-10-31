const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId; //Se puede llamar de esta forma tambien *** const { ObjectId } = Schema;*** 

const CommentSchema = new Schema({
  image_id: {type: ObjectId},
  email: { type: String },
  name: { type: String },
  gravatar:{type: String}, 
  comment: { type:String },
  timestamp : {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Comment', CommentSchema);