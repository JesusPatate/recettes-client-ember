import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | recipe-list-item', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.setupRouter();
  });

  test('it renders information about a recipe', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.setProperties({
      recipe: {
        "id": "23f9127c-1b38-4b79-8055-4e61281c7e86",
        "title": "Mousse chocolat-menthe",
        "hot": false,
        "dessert": true,
        "preparationTime": 15,
        "cookingTime": 5,
        "servings": 6,
        "source": "https://www.marmiton.org/recettes/recette_mousse-chocolat-menthe_92460.aspx",
        "ingredients": [
          {
            "name": "chocolat noir dessert",
            "amount": 150,
            "unit": "GRAMS"
          },
          {
            "name": "oeufs",
            "amount": 6,
            "unit": null
          },
          {
            "name": "After Eight",
            "amount": 50,
            "unit": "GRAMS"
          }
        ]
      }
    });

    await render(hbs`<Recipe @recipe={{this.recipe}} />`);

    assert.dom('article').hasClass('recipe');
    assert.dom('article a').hasText(this.recipe.title);
    assert.dom('article a').hasAttribute('href', '/recipes/' + this.recipe.id);
  });
});
