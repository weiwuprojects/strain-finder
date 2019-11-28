const axios = require('axios');

class Weedmaps {
    constructor(){
        this.baseURL = 'https://api-g.weedmaps.com/discovery/v1';
    }

    async getNearbyStores(lat, long){
        let url = `${this.baseURL}/listings?filter[plural_types][]=dispensaries&latlng=${lat},${long}&page_size=100&size=100`;
        return axios.get(url)
            .then( ({ data }) => data)
            .catch( d => { 
                console.log(d);
                throw `${d.response.status} ${d.response.statusText}` 
            });
    }

    async getMenuItems(dispensarySlug, searchString){
        let url = `${this.baseURL}/listings/dispensaries/${dispensarySlug}/menu_items?limit=18&multi_sort_by[]=relevance&multi_sort_order[]=desc&filter[match]=${searchString}`;
        return axios.get(url)
            .then( ({ data }) => data)
            .catch( d => { 
                console.log(d);
                throw `${d.response.status} ${d.response.statusText}` 
            });
    }
}

module.exports.Weedmaps = Weedmaps;