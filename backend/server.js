const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose.connect(db)
            .then(() => console.log('MongoDB Connected success'))
            .catch((err) => console.log(err))

//passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);


//Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server running on ${port}`) );
