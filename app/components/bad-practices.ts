import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class BadPracticesComponent extends Component {
  @tracked
  isRunning = true;

  badPracticeModifier = modifier(() => {
    // DANGER: Updating a variable that is being read in the same loop will cause side effects.
    if (this.isRunning) {
      this.isRunning = false;
    }
  });
}
