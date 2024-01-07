const FormElement = ( {
  imgSrc, 
  inputType,
  inputName, 
  inputValue, 
  inputPlaceholder,
  inputOnChange,
}) => {
    return (
      <div className="input">
        <label htmlFor={inputName}>
          <img 
            src={imgSrc}
            alt="" 
          />
        </label>
        <input 
          type={inputType}
          name={inputName}
          value={inputValue}
          placeholder={inputPlaceholder}
          onChange={inputOnChange}
        />
      </div>
    );
  };

export default FormElement;
