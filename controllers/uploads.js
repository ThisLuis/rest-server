const { response }= require('express');

const uploadFile = (req, res = response) => {
    res.json({
        msg: 'Subiendo archivo'
    })
}

module.exports = {
    uploadFile,
}