

const handleRegister = (req, res, DBpg, bcrypt) => {
    const {email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json('Wrong data Input.')
    }
    const hash = bcrypt.hashSync(password);
    DBpg.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginMail => {
            return trx('users')
             .returning('*')
             .insert(
             {   name: name,
                 email: loginMail[0],
                 joined: new Date()
             }).then(user => {
                 res.json(user[0]);
             })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Error registering data.')) 
 }

module.exports = {
    handleRegister: handleRegister
} 
