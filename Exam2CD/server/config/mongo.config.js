//configuracion de la base de datos Mongodb

const mongoose = require('mongoose');  

const db_name = "ItemsDataBase";

mongoose.connect(`mongodb://127.0.0.1:27017/${db_name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

 .then ( () => {
      console.log(`Conectado a la base de datos ${db_name}`)
})  .catch( err => {
      console.log(err);
})
   
     