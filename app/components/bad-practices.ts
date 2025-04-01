import { registerDestructor } from '@ember/destroyable';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class BadPracticesComponent extends Component {
  @tracked
  isRunning = true;

  badPracticeModifier = modifier(() => {
    // DANGER: Use default destructor of modifiers
    registerDestructor(this, this.destructor);

    // DANGER: Updating a variable that is being read in the same loop will cause side effects.
    if (this.isRunning) {
      this.isRunning = false;
    }
    //All code after this wont work
    console.log('NEVER EXECUTED');
  });

  destructor() {
    console.log('Bad practices destructor');
  }
}
