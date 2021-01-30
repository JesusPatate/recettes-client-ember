import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { v4 as uuid } from 'uuid';

export default class RecipeFormComponent extends Component {

    @tracked title;
    @tracked hot = false;
    @tracked dessert = false;
    @tracked servings = 1;
    @tracked preparationTime = 1;
    @tracked cookingTime = 0;
    @tracked source;
    ingredients = [];

    @tracked error;

    @service router;
    @service store;

    constructor() {
        super(...arguments);
        this.addIngredient();
    }

    @action
    addIngredient() {
        this.ingredients.pushObject({
            name: undefined,
            amount: undefined,
            unit: undefined
        });
    }

    @action
    removeIngredient(index) {
        this.ingredients.removeAt(index);

        if (this.ingredients.length == 0) {
            this.addIngredient();
        }
    }

    @action
    setUnit(index, event) {
        let unit = event.target.value;
        this.ingredients[index].unit = unit.length > 0 ? unit : undefined;
    }

    @action
    cancel() {
        this.router.transitionTo('/');
    }

    @action
    save() {
        let recipe = this.store.createRecord('recipe', {
            id: uuid(),
            title: this.title,
            hot: this.hot,
            dessert: this.dessert,
            servings: this.servings,
            preparationTime: this.preparationTime,
            cookingTime: this.cookingTime,
            source: this.source,
            ingredients: this.ingredients
        });

        recipe.save()
            .then(() => this.router.transitionTo('/'))
            .catch(error => alert(error));
    }
}
