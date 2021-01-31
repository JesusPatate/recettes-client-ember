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
        let recipe = this.args.recipe;

        if (recipe) {
            this.title = recipe.title;
            this.hot = recipe.hot;
            this.dessert = recipe.dessert;
            this.servings = recipe.servings;
            this.preparationTime = recipe.preparationTime;
            this.cookingTime = recipe.cookingTime;
            this.source = recipe.source;
            this.ingredients = recipe._ingredients.map(i => ({...i}))
        } else {
            this.addIngredient();
        }
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
    removeIngredient(ingredient) {
        this.ingredients.removeObject(ingredient);

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
        if (this.args.recipe) {
            this.update();
        } else {
            this.create();
        }
    }

    create() {
        let record = this.store.createRecord('recipe', {
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

        record.save()
            .then(() => this.router.transitionTo('/'))
            .catch(error => alert(error));
    }

    update() {
        let record = this.store.peekRecord('recipe', this.args.recipe.id);
        record.title = this.title;
        record.hot = this.hot;
        record.dessert = this.dessert;
        record.servings = this.servings;
        record.preparationTime = this.preparationTime;
        record.cookingTime = this.cookingTime;
        record.source = this.source;
        record.ingredients = this.ingredients;

        record.save()
            .then(() => this.router.transitionTo('/'))
            .catch(error => {
                record.rollbackAttributes();
                alert(error);
            }); 
    }
}
