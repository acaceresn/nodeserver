const handleProfile = (req, res, DBpg) => {
    const { id } = req.params;
    DBpg.select('*').from('users').where({
        id: id
    })
    .then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('Not found.');
        }
    })
    .catch( err => res.status(400).json('Error reading user in DB.'))
}

module.exports = {
    handleProfile: handleProfile
}
