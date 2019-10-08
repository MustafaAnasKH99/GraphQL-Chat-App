/**
 * Apollo Server Boilerplate, released under MIT license.
 * Created by Mohamad Kaakati
 * Email: m@kaakati.me
 * This software is provided as is.
 * 2019
 */

const mongoose = require('mongoose');

exports.connectToDB = function() {
    mongoose.connect('mongodb://chatapp-user:chatapp-user123@cluster0-shard-00-00-oqgqs.mongodb.net:27017,cluster0-shard-00-01-oqgqs.mongodb.net:27017,cluster0-shard-00-02-oqgqs.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', () => {
        console.log("Database Faild to connect")
    })
    .once('open', () => { 
        console.log("Database Connected!");
        console.log('Calling Seeds.');
        require('../seeds/index'); 
    });
}