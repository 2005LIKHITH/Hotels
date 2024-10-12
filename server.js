const express = require('express');
const app = express();
app.use(express.json());
const db = require('./db');
const personRoutes = require('./routers/personRoutes');

app.use('/person', personRoutes);

app.listen(3000, () => {
    console.log('Server started on port 3000');
})