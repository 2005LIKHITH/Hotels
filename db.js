const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/HOTELS';
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
