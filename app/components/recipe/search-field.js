import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SearchFieldComponent extends Component {

    @service store;

    @action
    search(event) {
        let term = event.target.previousElementSibling.value;
        this.store.query('recipe', { value: term })
            .then(results => {
                
            });
    }
}   