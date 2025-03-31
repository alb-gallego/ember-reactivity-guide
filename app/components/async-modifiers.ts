import { action } from '@ember/object';
import type Owner from '@ember/owner';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { task, timeout, type TaskInstance } from 'ember-concurrency';
import { perform } from 'ember-concurrency-ts';
import { modifier } from 'ember-modifier';
import { trackedFunction } from 'ember-resources/util/function';

interface UpdateAsyncModifierComponentArgs {}

export default class UpdateAsyncModifierComponent extends Component<UpdateAsyncModifierComponentArgs> {
  @tracked
  declare asyncTaskInstance: TaskInstance<string>;
  @tracked
  updatedVar: number;

  constructor(owner: Owner, args: UpdateAsyncModifierComponentArgs) {
    super(owner, args);
    this.updatedVar = 0;
    // This does not work
    // await this.onInsert();
  }

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

  asyncUpdateModifierTask = modifier(
    (_element: HTMLElement, [modifiedArg]: [number]) => {
      console.log('Modifier with task', modifiedArg);
      this.asyncTaskInstance = perform(this.delayFn);
    },
  );

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
