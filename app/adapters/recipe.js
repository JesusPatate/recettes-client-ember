import RESTAdapter from '@ember-data/adapter/rest';
import {default as axios} from 'axios';
import ENV from 'recettes-client-ember/config/environment';

export default class RecipeAdapter extends RESTAdapter {
    host = this._getApiUrl();

    async query(store, model, query) {
        return axios.post(this.host + '/recipes/search?value=' + query.value)
        .then(response => response.data);
    }

    _getApiUrl() {
        let protocol = ENV.API.ssl ? "https" : "http";
        return protocol + '://' + ENV.API.host + ":" + ENV.API.port;
    }
}

