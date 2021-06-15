const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://website:yve7Naq6XNjx6sHq@cluster0.hyzv6.mongodb.net/BakingBella?retryWrites=true&w=majority';

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

/*const gracefulShutdown = (msg, callback) => {
    console.connection.close( () => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};*/

require('./bakingbella');