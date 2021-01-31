import Component from '@glimmer/component';

export default class RecipeDetailsComponent extends Component {

    get source() {
        let source = this.args.recipe.source;
        
        if (this.isUrl(source)) {
            return '<a href="' + source + '" target="_blank" rel="noopener noreferrer">' + this.getDomain(source) +'</a>'
        }
        
        return source;
    }

    isUrl(string) {
        let re = /^https?:\/\//;
        return re.test(string)
    }

    getDomain(url) {
        return url.split('/')[2];
    }
}
