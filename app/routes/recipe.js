import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RecipeRoute extends Route {

    @service store;

    async model(params) {
        return this.store.findRecord('recipe', params.recipe_id);
    }
}
