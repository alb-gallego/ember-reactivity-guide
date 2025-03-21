import { module, test } from 'qunit';
import { setupTest } from 'ember-reactivity-guide/tests/helpers';

module('Unit | Route | ember-concurrency', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:ember-concurrency');
    assert.ok(route);
  });
});
