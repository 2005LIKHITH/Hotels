const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URL || process.env.MONGO_URL_LOCAL;


mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Connected to MongoDB at ${mongoURL}`);

});
db.on('error', (error) => {
    console.error("MongoDB connection error: ", error);
});
db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});
