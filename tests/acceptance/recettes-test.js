import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | recettes', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('nav').exists();
    assert.dom('h1').hasText(/Recettes/);
    assert.dom('.recipe').exists();
  });

  test('viewing the details of a recipe', async function(assert) {
    await visit('/');
    assert.dom('.recipe').exists();

    await click('.recipe:first-of-type a');
    assert.dom('h2').hasClass('details').hasClass('title').hasAnyText();
  });
});
