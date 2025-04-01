import { modifier } from 'ember-modifier';

interface CommonFunctionBaseModifierSignature {
  // TODO: Specify the correct `Element` type:
  Element: Element;
  Args: {
    // Named: {};
    Positional: [number];
  };
}

export default modifier<CommonFunctionBaseModifierSignature>(
  function commonFunctionBaseModifier(_element, [updatedVar] /* named*/) {
    if (!updatedVar) {
      console.log('Function Based onInsert');
    }
    if (updatedVar > 0) {
      console.log('Function Based  onUpdate');
    }

    //Destroyer function is executed with any change in params or user vars in the main function
    return () => {
      console.log('executed afterEachUpdate');
      //Destructor can be done here
    };
  },
);
