import EmberRouter from '@ember/routing/router';
import config from 'recettes-client-ember/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
});
