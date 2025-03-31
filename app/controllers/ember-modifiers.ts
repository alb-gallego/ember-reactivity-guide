import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EmberModifiersController extends Controller {
  @tracked
  isInserted = false;
  @tracked
  isUpdated = false;
  @tracked
  isDestroyed = false;

  @tracked
  showSection = {
    'class-based': false,
    'function-based': false,
    'render-modifiers': false,
    'bad-practices': false,
  };

  // modifierWithArgs = modifier(
  //   (
  //     element: HTMLElement,
  //     positionalArgs: Array<unknown>,
  //     namedArgs: { [key: string]: unknown },
  //   ) => {
  //     const [posArg1, posArg2] = positionalArgs;
  //     const { namedArg1, namedArg2 } = namedArgs;

  //     console.log('posArg1: ' + posArg1 + ' posArg2: ' + posArg2);

  //     console.log('namedArg1 ' + namedArg1 + ' namedArg2: ' + namedArg2);
  //   },
  // );

  @action
  toggleSection(section: keyof typeof this.showSection) {
    this.showSection[section] = !this.showSection[section];
    this.showSection = { ...this.showSection };
  }
}
