const express = require('express');
const db = require('./db/index.js');
// const middleware = require('./middleware/index.js');
const adminroutes = require('./routes/admin.js');
const userroutes = require('./routes/user.js');

const app = express();
const port = 3000;
app.use(express.json());

app.use('/admin', adminroutes);
app.use('/user', userroutes);


app.listen(port);