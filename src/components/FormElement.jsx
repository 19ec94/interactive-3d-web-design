const FormElement = ( {
  labelContent, 
  inputType,
  inputName, 
  inputValue, 
  inputPlaceholder,
  inputOnChange,
}) => {
    return (
      <div className="input">
        <label htmlFor={inputName}>
            {labelContent}
        </label>
        <input 
          type={inputType}
          name={inputName}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={inputOnChange}
          autoComplete="on"
        />
      </div>
    );
  };

export default FormElement;
