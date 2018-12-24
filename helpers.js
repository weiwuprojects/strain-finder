const { Weedmaps } = require('./weedmaps');

const weedmaps = new Weedmaps();

/* Returns 5 stores closest to the given latitude, longitude coordinates */
async function getClosestStores(lat, long){
    let searchResults = await weedmaps.getNearbyStores(lat, long);
    return searchResults.data.listings.splice(0, 6);
}

/* Search a dispensary for a given strain */
async function searchShop(dispensarySlug, strain){
    let { data } = await weedmaps.getMenuItems(dispensarySlug, strain);
    let menuItems = data.menu_items;
    let matches = [];

    let tokens = strain.split('+');
    for(let item of menuItems){
        let lowercaseName = item.name.toLowerCase();
        for (let token of tokens){
            if (lowercaseName.includes(token) || item.name.includes(token)){
                matches.push(item);
            }
        }
    }

    return matches;
}

module.exports.searchShop = searchShop;
module.exports.getClosestStores = getClosestStores;