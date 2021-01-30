import JSONSerializer from '@ember-data/serializer/json';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class RecipeSerializer extends JSONSerializer.extend(EmbeddedRecordsMixin) {

    attrs = {
        _ingredients: 'ingredients'
    }
}
