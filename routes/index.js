const express = require('express')
const router = express.Router()
const { getClosestStores, searchShop } = require('../helpers');


router.get('/:strain', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    let strain = req.params.strain;
    let { lat, long } = req.query;
    try {
        let stores = await getClosestStores(lat, long);
        let menusQueries = stores.map( store => searchShop(store, strain));
        let menus = await Promise.all(menusQueries);
        menus = menus.filter( menu => menu.strains.length > 0 );
        res.status(200).send(menus);
    }
    catch(e){
        console.log(e)
        res.status(500).send({ error: e });
    }

})

module.exports = router;