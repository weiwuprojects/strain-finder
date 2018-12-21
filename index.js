const express = require('express');
const app = express();
const { getClosestStores, searchShop } = require('./helpers');

app.use(function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    next();
});

/*
https://api-g.weedmaps.com/discovery/v1/location?include[]=regions.listings&latlng=33.67718589911839,-117.77377223576224

https://api-g.weedmaps.com/discovery/v1/location?include[]=regions.listings&latlng=34.0159,-118.112

get only dispensaries
https://api-g.weedmaps.com/discovery/v1/listings?filter[plural_types][]=dispensaries&latlng=34.0159,-118.112&page_size=100&size=100

get dispenaries and deliveries
https://api-g.weedmaps.com/discovery/v1/listings?latlng=34.0159,-118.112&page_size=100&size=100 

get menu and page through to retrieve all items
https://api-g.weedmaps.com/discovery/v1/listings/dispensaries/church-is-life/menu_items?limit=150

search for strain name

*/

// http://localhost:5000/strawberry?lat=34.041855999999996&long=-118.21056

app.get('/:strain', async (req, res) => {
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


app.listen(5000, () => {});