import Component from '@glimmer/component';

export default class RecipeDetailsComponent extends Component {

    isUrl(string) {
        let re = /^https?:\/\//
        return re.test(string)
    }

    getDomain(url) {
        return url.split('/')[1];
    }
}
