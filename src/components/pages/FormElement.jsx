const FormElement = (
  {imgSrc, inputType, inputName, inputPlaceholder}) => {
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
          placeholder={inputPlaceholder}
        />
      </div>
    );
  };

export default FormElement;
