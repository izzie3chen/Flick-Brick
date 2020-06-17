const debounce = (func, delay) => {
  let timeoutId;
  //the arg below is the user input
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      //this syntax deals with an array passed in as a parameter, which is the spread operator above
      func.apply(null, args);
    }, delay);
  };
};
