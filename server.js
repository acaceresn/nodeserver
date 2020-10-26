const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const DBpg = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Postgres22',
      database : 'smart_brain'
    }
  });


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => { res.send('Server Ok'); }); 

app.post('/signin', (req, res) => { signin.handleSignin(req, res, DBpg, bcrypt) });

app.post('/register',  (req, res) => { register.handleRegister(req, res, DBpg, bcrypt) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, DBpg) });

app.put('/image', (req, res) => { image.handleImage(req, res, DBpg) });

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });


app.listen(3050, ()=> {
    console.log('app is running in port 3050');
})
