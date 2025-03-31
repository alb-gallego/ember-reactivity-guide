import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import { tracked } from '@glimmer/tracking';
import Modifier, {
  type ArgsFor,
  type NamedArgs,
  type PositionalArgs,
} from 'ember-modifier';

interface CommonClassBaseModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      countVar: 'first' | 'second';
    };
    Positional: [number];
  };
}

function cleanup(instance: CommonClassBaseModifier) {
  console.log('instance.property1', instance.property1);
  console.log('Class Modifier onDestroy');
  instance.count = 0;
}

export default class CommonClassBaseModifier extends Modifier<CommonClassBaseModifierSignature> {
  @tracked
  count = 0;
  @tracked
  count1 = 0;

  property1 = 'Some property';

  constructor(owner: Owner, args: ArgsFor<CommonClassBaseModifierSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(
    _element: CommonClassBaseModifierSignature['Element'],
    positional: PositionalArgs<CommonClassBaseModifierSignature>,
    { countVar }: NamedArgs<CommonClassBaseModifierSignature>,
  ) {
    const [updatedVar] = positional;
    console.log('Class Modifier onInsert');

    if (countVar === 'first') {
      this.count = updatedVar;
    } else if (countVar === 'second') {
      this.count1 = updatedVar;
    }

    console.log('CLASS COUNT ', this.count);
    console.log('SECOND CLASS COUNT', this.count1);

    // this.count = updatedVar;
    if (updatedVar > 0) {
      console.log('Class Modifier onUpdate');
    }
  }
}
