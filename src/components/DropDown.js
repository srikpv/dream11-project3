import React from "react";

// Whenever we try to render an array containing JSX, React knows to render each JSX element separately
function DropDown(props) {
  let options = props.options
  // console.log(props);
  let optionItems = options.map((option) =>
  <option key={option.id} value={option.id}>{option.name}</option>)
  return (
    <select value="" name={props.type} className="select-group" onChange={props.handleInputChange}>
      <option value="" disabled>Make Selection</option>
        {optionItems}        
    </select>
  );
}

export default DropDown;