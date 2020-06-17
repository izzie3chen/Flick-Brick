const createAutoComplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  //destructure the object passed in and assume that it is a root element
  root.innerHTML = `
<label><b>Search</b></label>
<input class="input">
<div class="dropdown">
    <div class="dropdown-menu">
    <div class='dropdown-content results'></div>
    </div>
    </div>`;
  const input = root.querySelector("input");
  const dropdown = root.querySelector(".dropdown");
  const resultsWrapper = root.querySelector(".results");
  //add the input event, and pass the input value as a param when fetching API data

  const onInput = async (event) => {
    //after we get the array of movies we need to create html elements to render them
    const items = await fetchData(event.target.value);
    //when we clear the input field the dropdown goes away
    if (!items.length) {
      dropdown.classList.remove("is-active");
      return;
    }
    //clear the result
    resultsWrapper.innerHTML = "";
    //by adding the class of is-active, the dropdown will show
    dropdown.classList.add("is-active");
    for (let item of items) {
      const option = document.createElement("a");
      //check to see if the image is N/A or not

      option.classList.add("dropdown-item");
      option.innerHTML = renderOption(item);
      option.addEventListener("click", () => {
        dropdown.classList.remove("is-active");
        input.value = inputValue(item); //closure. Look for variables defined in the object
        onOptionSelect(item);
      });
      //next step is to insert this div in HTML
      resultsWrapper.appendChild(option);
    }
  };
  input.addEventListener("input", debounce(onInput, 500));
  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove("is-active");
    }
  });
};
