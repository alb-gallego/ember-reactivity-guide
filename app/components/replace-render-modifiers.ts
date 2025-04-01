import { registerDestructor } from '@ember/destroyable';
import { action } from '@ember/object';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout, type TaskInstance } from 'ember-concurrency';
import { perform } from 'ember-concurrency-ts';
import { modifier } from 'ember-modifier';
import { trackedFunction } from 'ember-resources/util/function';

interface ReplaceRenderModifiersComponentArgs {}

export default class ReplaceRenderModifiersComponent extends Component<ReplaceRenderModifiersComponentArgs> {
  @tracked
  declare asyncTaskInstance: TaskInstance<string>;
  @tracked
  updatedVar: number;

  insertedElement?: unknown;

  constructor(owner: Owner, args: ReplaceRenderModifiersComponentArgs) {
    super(owner, args);

    this.updatedVar = 0;
    // This does not work
    // await this.asyncFn();
    console.log('On Insert Component');

    registerDestructor(this, this.cleanup);
  }

  cleanup() {
    console.log('Cleanup after destroy whole component');
  }

  onInsert = modifier((element) => {
    this.insertedElement = element;
    console.log(this.insertedElement);
    console.log('Using ON INSERT specific modifier');
    // This does not work
    // await this.asyncFn();

    return () => {
      console.log('Using DESTROY function on specific modifier');
    };
  });

  asyncUpdateModifierTask = modifier(
    (_element: HTMLElement, [modifiedArg]: [number]) => {
      console.log('Modifier with task', modifiedArg);
      this.asyncTaskInstance = perform(this.delayFn);
    },
  );

  asyncUpdateModifier = trackedFunction(this, async () => {
    console.log('Before async op');
    console.log('Tracked fn', this.updatedVar);
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log('After async op');
        resolve('Final Value Tracked Fn');
      }, 2500);
    });
    return await promise;
  });

  async asyncFn() {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        console.log('Default async op');
        resolve('Async op resolved');
      }, 2500);
    });
    return await promise;
  }

  @task
  *delayFn() {
    console.log('Task Init');
    yield timeout(2500);
    console.log('Task End');
    return 'Final Value Task';
  }

  @action
  onUpdate() {
    this.updatedVar += 1;
  }
}
