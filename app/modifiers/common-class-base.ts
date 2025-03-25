import { registerDestructor } from '@ember/destroyable';
import type Owner from '@ember/owner';
import Modifier, { type ArgsFor, type PositionalArgs } from 'ember-modifier';

interface CommonClassBaseModifierSignature {
  Element: HTMLElement;
  Args: {
    Named: {
      functionBasedAccum: number;
    };
    Positional: [number];
  };
}

function cleanup(instance: CommonClassBaseModifier) {
  console.log('instance.property1', instance.property1);
  console.log('Class Modifier onDestroy');
}

export default class CommonClassBaseModifier extends Modifier<CommonClassBaseModifierSignature> {
  property1 = 'Some property';

  constructor(owner: Owner, args: ArgsFor<CommonClassBaseModifierSignature>) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(
    _element: CommonClassBaseModifierSignature['Element'],
    positional: PositionalArgs<CommonClassBaseModifierSignature>,
    // named: NamedArgs<CommonClassBaseModifierSignature>,
  ) {
    const [updatedVar] = positional;
    // const { functionBasedAccum } = named;

    console.log('Class Modifier onInsert');

    if (updatedVar > 0) {
      console.log('Class Modifier onUpdate');
    }
  }
}
