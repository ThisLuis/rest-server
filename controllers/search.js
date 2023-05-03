const { response } = require('express');

const search = ( req, res = response ) => {
    
    const { collection, query } = req.params;


    res.json({
        collection,
        query
    })
}

module.exports = {
    search
}