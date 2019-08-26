const Clarifai = require('clarifai');
const dotenv = require('dotenv').config()

const app = new Clarifai.App({
    apiKey: `713b791fc082439eb45c8b4e7083e151`
});

const handleApi = (req,res) => {
    app.models
       .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
       .then(data => {
           res.json(data);
       })
       .catch(err => res.status(400).json('unable to use API'))
}

const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Unable to get entries..'))
}

module.exports = {
    handleImage: handleImage,
    handleApi
}