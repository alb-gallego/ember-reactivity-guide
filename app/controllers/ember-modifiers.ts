import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';

export default class EmberModifiersController extends Controller {
  @tracked
  isInserted = false;
  @tracked
  isUpdated = false;
  @tracked
  isDestroyed = false;
  @tracked
  functionBasedAccum = 0;
  @tracked
  classBasedAccum = 0;
  @tracked
  showFunctionBasedComponent = false;
  @tracked
  showClassBasedComponent = false;

  functionBasedModifier = modifier(
    (element: HTMLElement, positionalArgs: [number]) => {
      // console.log(element);

      // console.log(getOwner(this));

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

  modifierWithArgs = modifier(
    (
      element: HTMLElement,
      positionalArgs: Array<unknown>,
      namedArgs: { [key: string]: unknown },
    ) => {
      const [posArg1, posArg2] = positionalArgs;
      const { namedArg1, namedArg2 } = namedArgs;

      console.log('posArg1: ' + posArg1 + ' posArg2: ' + posArg2);

      console.log('namedArg1 ' + namedArg1 + ' namedArg2: ' + namedArg2);
    },
  );

  @action
  updateComponent(_ev: Event, classComponent: boolean) {
    if (classComponent) {
      this.classBasedAccum += 1;
    } else {
      this.functionBasedAccum += 1;
    }
  }
  @action
  insertComponent(_ev: Event, classComponent: boolean) {
    if (classComponent) {
      this.showClassBasedComponent = true;
      this.showFunctionBasedComponent = false;
    } else {
      this.showClassBasedComponent = false;
      this.showFunctionBasedComponent = true;
    }
  }
  @action
  destroyComponent(_ev: Event, classComponent: boolean) {
    if (classComponent) {
      this.showClassBasedComponent = false;
      this.classBasedAccum = 0;
    } else {
      this.showFunctionBasedComponent = false;
    }
  }
}
