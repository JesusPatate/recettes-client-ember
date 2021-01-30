import Model, { attr } from '@ember-data/model';

const UNITS = {
    GRAMS: {
        singular: 'gramme',
        plural: 'grammes'
    },
    CENTILITRES: {
        singular: 'centilitre',
        plural: 'centilitres'
    },
    TEASPOON: {
        singular: 'cuillère à café',
        plural: 'cuillères à café'
    },
    TABLESPOON: {
        singular: 'cuillère à soupe',
        plural: 'cuillères à soupe'
    }
}

export default class RecipeModel extends Model {
    @attr('string') title;
    @attr('boolean') hot;
    @attr('boolean') dessert;
    @attr('number') servings;
    @attr('number') preparationTime;
    @attr('number') cookingTime;
    @attr('string') source;
    @attr _ingredients;

    get ingredients() {
        return this._ingredients.map((ingredient) => {
            let { amount } = ingredient;
            let name = this.capitalize(ingredient.name);
            let unit = this.getUnit(ingredient.unit, amount);
            return { name, amount, unit };
        });
    }

    capitalize(string) {
        return string.replace(/^\w/, c => c.toUpperCase());
    }

    getUnit(key, amount) {
        var unit = undefined;
        
        if (key) {
            unit = amount > 1 ?
                UNITS[key].plural :
                UNITS[key].singular;
        }

        return unit;
    }
}