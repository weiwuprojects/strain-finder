const axios = require('axios');
axios.defaults.headers.get = {
    Host: "api-g.weedmaps.com",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0",
    Accept: "*/*",
    "Accept-Language": "en-US,en;q=0.5",
    "Accept-Encoding": "gzip, deflate, br",
    Referer: "https://weedmaps.com/",
    Origin: "https://weedmaps.com",
    Connection: "keep-alive",
    TE: "Trailers"
};

class Weedmaps {
    constructor(){
        this.baseURL = 'https://api-g.weedmaps.com/discovery/v1';
    }

    async getNearbyStores(lat, long, limit=5){
        let url = `${this.baseURL}/listings?filter[plural_types][]=dispensaries&latlng=${lat},${long}&page_size=${limit}&size=100`;
        console.log(url)
        return axios.get(url)
            .then( ({ data }) => data)
            .catch( d => { 
                throw `${d.response.status} ${d.response.statusText}` 
            });
    }

    async getMenuItems(dispensarySlug, searchString){
        let url = `${this.baseURL}/listings/dispensaries/${dispensarySlug}/menu_items?limit=18&multi_sort_by[]=relevance&multi_sort_order[]=desc&filter[match]=${searchString}`;
        console.log(url)
        return axios.get(url)
            .then( ({ data }) => data)
            .catch( d => { 
                throw `${d.response.status} ${d.response.statusText}` 
            });
    }
}

module.exports.Weedmaps = Weedmaps;