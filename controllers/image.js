const  Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9dd52e089ce84eb98805bb4a6b0a049c'
});
    
const handleApiCall = (req, res) => {
    app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
           res.json(data);
    })
    .catch(err => res.status(400).json('Unable to connect with the API'))
}

const handleImage = (req, res, DBpg) => {
    const { id } = req.body;
    DBpg('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        if(entries.length) {
            res.json(entries);
        } else {
            res.status(400).json('User not found.');
        }
     })
    .catch( err => res.status(400).json('Error reading user in DB.'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}