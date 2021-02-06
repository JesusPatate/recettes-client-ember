import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecipeListComponent extends Component {

    @service store;
    @tracked _recipes;

    constructor() {
        super(...arguments);
        this._recipes = this.args.recipes;
    }

    get recipes() {
        return this._recipes;
    }

    get isEmpty() {
        return this._recipes.length == 0;
    }

    @action
    search(event) {
        event.preventDefault();

        let input = document.getElementById("search-input");

        if (!input.value) {
            this.cancelSearch();
            return;
        }

        this.store.query('recipe', { value: input.value })
            .then(results => results.map(recipe => recipe.id))
            .then(ids => this._recipes.filter(recipe => ids.includes(recipe.id)))
            .then(recipes => this._recipes = recipes);
    }

    @action
    cancelSearch() {
        let input = document.getElementById("search-input");
        input.value = null;
        this._recipes = this.args.recipes;
    }
}
