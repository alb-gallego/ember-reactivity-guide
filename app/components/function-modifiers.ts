import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

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
  functionBasedAccum = 0;
  @tracked
  showFunctionBasedComponent = false;

  functionBasedModifier = modifier(
    (element: HTMLElement, positionalArgs: [number]) => {
      const [updatedVar] = positionalArgs;

      this.isInserted = true;
      this.isDestroyed = false;
      console.log('onInsert');

      if (updatedVar > 0 || this.functionBasedAccum > 0) {
        this.isUpdated = true;
        console.log('onUpdate');
      }

      //Destroyer function is executed with any change in params or user vars in the main function
      return () => {
        console.log('executed afterEachUpdate');
      };
    },
  );

  onDestroyComponent = modifier(() => {
    return () => {
      this.isInserted = false;
      this.isUpdated = false;
      this.isDestroyed = true;
      this.functionBasedAccum = 0;
      console.log('onDestroy');
    };
  });

  @action
  updateComponent() {
    this.functionBasedAccum += 1;
  }
  @action
  insertComponent() {
    this.showFunctionBasedComponent = true;
  }
  @action
  destroyComponent() {
    this.showFunctionBasedComponent = false;
    this.functionBasedAccum;
  }
}
