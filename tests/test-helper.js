import Application from 'recettes-client-ember/app';
import config from 'recettes-client-ember/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
