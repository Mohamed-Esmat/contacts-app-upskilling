import { useState } from 'react';

// const inputStateReducer = (state, action) => {
//   if (action.type === 'INPUT') {
//     return { value: action.value, isTouched: state.isTouched };
//   }

//   if (action.type === 'BLUR') {
//     return { value: state.value, isTouched: true };
//   }

//   // if (action.type === 'RESET') {
//   //   return { value: '', isTouched: false };
//   // }
//   return {
//     value: state.value,
//     isTouched: false,
//   };
// };

const useUpdatedInput = (value, validateValue) => {
  // const [inputState, dispatch] = useReducer(inputStateReducer, {
  //   value: value,
  //   isTouched: false,
  // });
  const [inputValue, setInputValue] = useState(value);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    // dispatch({ type: 'INPUT', value: event.target.value });
    setInputValue(event.target.value);
  };

  const inputBlurHandler = () => {
    // dispatch({ type: 'BLUR' });
    setIsTouched(true);
  };

  // const reset = () => {
  //   // dispatch({ type: 'RESET' });
  //   setIsTouched(false);
  // };

  return {
    value: inputValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
  };
};

export default useUpdatedInput;
