import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class IngredientLineComponent extends Component {

    @action
    updateUnit(unit) {
        this.args.ingredient.unit = unit;
    }
}