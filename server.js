const express = require('express');
const bodyParse = require('body-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const database = { 
users: [
    {
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        entries: 0,
        joined: new Date()
    },

],
login: [
    {
        id: '987',
        hash: '',
        email: 'john@gmail.com'
    }
]

}


app.get('/', (req,res) => {
   res.send(database.users);
}) 

app.post('/signin', (req,res) => {
    if ((req.body.email === database.users[0].email) && (req.body.password === database.users[0].password)) {
        res.json('Success');
    } else {
        res.status(400).json('Error LogingIn') 
    }
})

app.post('/register', (req,res) => {
   const {email, password, name } = req.body;
   bcrypt.hash(password, null, null, function(err, hash) {
      console.log(hash);
   });
   database.users.push(
    {
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
   res.json(database.users[database.users.length-1]); 
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user); 
        }
    })
    res.json("User doesn't exists in Database.");
})

app.post('/image', (req, res) => {
    const { id } = req.body;
    database.users.forEach(user => {
        if (user.id === id) {
            user.entries++;
            return res.json(user.entries); 
        }
    })
    res.json("User doesn't exists in Database.");
})



app.listen(3050, ()=> {
    console.log('app is running in port 3050');
})
