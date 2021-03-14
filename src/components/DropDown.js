import React from "react";

function DropDown(props) {
  let options = props.options
  let optionItems = options.map((option) =>
  <option key={option.id} value={option.id}>{option.name}</option>)
  // console.log(optionItems)
  return (
    // <select class="browser-default" value="" name={props.type} className="select-group" onChange={props.handleInputChange}>
      <select class="browser-default" value={options.name} name={props.type} onChange={props.handleInputChange}>
      <option value="" enabled>Make Selection</option>
        {optionItems}        
    </select>
  );
}

export default DropDown;