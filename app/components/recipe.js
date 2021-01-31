import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecipeComponent extends Component {

    @service store;

    @action
    deleteRecipe(recipe) {
        let record = this.store.peekRecord('recipe', recipe.id);
        
        if(confirm(`Supprimer la recette "${recipe.title}" ?`)) {
            record.destroyRecord()
            .catch(error => alert(error));
        }
    }
}
