import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import 'ember-reactivity-guide/app.css';
import config from 'ember-reactivity-guide/config/environment';
import Resolver from 'ember-resolver';
export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
