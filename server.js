const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;


// Middleware Function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}
app.use(logRequest);

app.use(passport.initialize());


app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
})

const personRoutes = require('./routers/personRoutes');
const menuItemRoutes = require('./routers/menuRoutes');

// Use the routers
const localAuthMiddleware = passport.authenticate('local', {session: false})
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})