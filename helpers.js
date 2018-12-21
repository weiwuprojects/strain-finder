const { Weedmaps } = require('./weedmaps');

const weedmaps = new Weedmaps();

async function getClosestStores(lat, long){
    let searchResults = await weedmaps.getNearbyStores(lat, long);
    return searchResults.data.listings.splice(0, 6);
}

async function searchShop(dispensarySlug, strain){
    let currentPage = 1;
    let data = await weedmaps.getMenuItems(dispensarySlug, currentPage);
    let results = [];
    let menuItems = data.data.menu_items;
    while( menuItems.length > 0){
        let data = await weedmaps.getMenuItems(dispensarySlug, currentPage);
        menuItems = data.data.menu_items;

        for( let item of menuItems){
            let lowercaseName = item.name.toLowerCase();
            if (lowercaseName.includes(strain) || item.name.includes(strain)){
                results.push(item);
            }
        }

        currentPage++;
    }

    return results;
}

module.exports.searchShop = searchShop;
module.exports.getClosestStores = getClosestStores;