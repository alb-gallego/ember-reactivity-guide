import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

interface ClassModifiersComponentArgs {
  modifiedArg: unknown;
}

export default class ClassModifiersComponent extends Component<ClassModifiersComponentArgs> {
  @tracked
  isInserted = false;
  @tracked
  isUpdated = false;
  @tracked
  isDestroyed = false;
  @tracked
  showClassBasedComponent = false;
  @tracked
  classBasedAccum = 0;
  @tracked
  secondClassBasedAccum = 0;

  @action
  updateComponent(_ev: Event, isSecondVar: true) {
    if (!isSecondVar) {
      this.classBasedAccum += 1;
    } else {
      this.secondClassBasedAccum += 1;
    }
  }

  @action
  insertComponent() {
    this.showClassBasedComponent = true;
  }
  @action
  destroyComponent() {
    this.showClassBasedComponent = false;
    this.classBasedAccum = 0;
    this.secondClassBasedAccum = 0;
  }
}
