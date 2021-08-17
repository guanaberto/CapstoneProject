const mongoose = require('mongoose');
require('dotenv').config();

const dbURI = process.env.dbURI;
  
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
    dbName: 'BakingBella'
});

mongoose.connection.on('connected', ()=>{
    console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

require('./bakingbella');