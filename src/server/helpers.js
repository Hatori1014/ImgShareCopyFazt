const moment = require('moment');
const helpers = {};

helpers.timeago = timestamp => {
  return moment(timestamp).startOf('minute').fromNow();//publica en minutos cuantos tiempo a pasado desde que se subio la imagen
};

module.exports = helpers;