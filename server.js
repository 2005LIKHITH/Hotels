const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
const db = require('./db');
const personRoutes = require('./routers/personRoutes');
const menuRoutes = require('./routers/menuRoutes');
app.use('/person', personRoutes);
app.use('/menu', menuRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server started on port 3000');
})