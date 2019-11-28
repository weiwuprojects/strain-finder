const express = require('express')
const router = express.Router()
const { getClosestStores, searchShop } = require('../helpers');


router.get('/:strain', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let strain = req.params.strain;
    let { lat, long } = req.query;
    try {
        let results = [];
        let stores = await getClosestStores(lat, long);
        for (let store of stores){
            let searchResult = {
                store_info: store,
                strains: await searchShop(store.slug, strain)
            }
    
            if (searchResult.strains.length > 0){
                results.push(searchResult)
            }
        }
        res.status(200).send(results);
    }
    catch(e){
        console.log(e)
        res.status(500).send({ error: e });
    }

})

module.exports = router;