const mongoose = require('mongoose');

const { database } = require('./keys');

// ultimas versiones de moongose, se debe agregar una configuracion adicional como un objeto, se visauliza dicha configuracion depues de URI
mongoose.connect(database.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true //es necesario agregar esta propiedad al objeto para eliminar el warning que genera
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));