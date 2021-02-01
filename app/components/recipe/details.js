import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class RecipeDetailsComponent extends Component {

    @service store;
    @service router;

    get source() {
        let source = this.args.recipe.source;
        
        if (this.isUrl(source)) {
            return '<a href="' + source + '" target="_blank" rel="noopener noreferrer">' + this.getDomain(source) +'</a>'
        }
        
        return source;
    }

    @action
    deleteRecipe(recipe) {
        let record = this.store.peekRecord('recipe', recipe.id);
        
        if(confirm(`Supprimer la recette "${recipe.title}" ?`)) {
            record.destroyRecord()
            .then(() => this.router.transitionTo('/'))
            .catch(error => alert(error));
        }
    }

    isUrl(string) {
        let re = /^https?:\/\//;
        return re.test(string)
    }

    getDomain(url) {
        return url.split('/')[2];
    }
}
