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
  function commonFunctionBaseModifier(_element, positional /* named*/) {
    const [updatedVar] = positional;

    console.log('Function Based onInsert');

    if (updatedVar > 0) {
      console.log('Function Based  onUpdate');
    }

    //Destroyer function is executed with any change in params or user vars in the main function
    return () => {
      console.log('executed afterEachUpdate');
    };
  },
);

// export default modifier(
//   function commonFunctionBaseModifier (element: HTMLElement, positionalArgs: [number]) {
//     const [updatedVar] = positional;

//     console.log('Function Based onInsert');

//     if (updatedVar > 0) {
//       console.log('Function Based  onUpdate');
//     }

//     //Destroyer function is executed with any change in params or user vars in the main function
//     return () => {
//       console.log('executed afterEachUpdate');
//     };
//   },
// );
