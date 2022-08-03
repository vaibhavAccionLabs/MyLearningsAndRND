const express = require('express');
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('db connected')).catch(err => console.log(err));



app.use(express.json());

app.use('/user', require('./routes/user'));

app.listen(5000, () => {
    console.log('server is running on port 5000')
});
