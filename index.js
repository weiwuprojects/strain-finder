const express = require('express');
const next = require('next')
const nextApp = next({ dev: true })
const handle = nextApp.getRequestHandler();
const { getClosestStores, searchShop } = require('./helpers');

nextApp.prepare().then(() => {
    const app = express();

    app.get('/api/:strain', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');

        let strain = req.params.strain;
        let { lat, long } = req.query;
    
        lat = 34.041855999999996;
        long = -118.21056;
    
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
    
        res.send(results);
    })

    app.get('*', (req,res) => { //render React pages
        return handle(req,res);
    })

    app.listen(3000, err => {
        if (err) throw err;
        console.log(`Ready on http://localhost:${3000}`)
    })
})
