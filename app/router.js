import EmberRouter from '@ember/routing/router';
import config from 'recettes-client-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('add-recipe', {path: '/recipes/add'});
  this.route('recipe', {path: '/recipes/:recipe_id'})
  this.route('edit-recipe', {path: '/recipes/:recipe_id/edit'});
});
