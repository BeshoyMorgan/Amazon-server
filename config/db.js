const mongoose = require('mongoose');
const db_uri = process.env.DB_URI;


const dbConnection = () => {
  mongoose.connect(db_uri)
    .then((conn) => {
      console.log(`Successfully Connection on: ${conn.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database Error: ${err}`);
    });
};

module.exports = dbConnection;