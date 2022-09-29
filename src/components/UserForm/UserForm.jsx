import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import CustomLink from '../CustomLink/CustomLink';
import Input from '../Input/Input';
import Button from '../Button/Button';

import { LoginContext } from '../../contexts/LoginContext';

import './UserForm.css';

function UserForm({
  title,
  formName,
  inputList,
  submitButtonText,
  redirectText,
  redirectPath,
  redirectLinkText,
}) {
  const { setIsLoggedIn } = useContext(LoginContext);

  return (
    <section className="user-form">
      <h2 className="user-form__title">{title}</h2>
      <form className="user-form__form" name={formName}>
        {inputList.map(
          ({
            name, type, id, value, placeholder, labelText, minLength, maxLength,
          }) => (
            <Input
              key={id}
              inputClassName={`user-form__input user-form__input_type_${name} ${
                formName === 'signin' ? 'user-form__input_reset' : ''
              }`}
              type={type}
              name={name}
              id={`input-${name}`}
              value={value}
              placeholder={placeholder}
              isLabelShown
              labelClassName="user-form__label"
              labelText={labelText}
              minLength={minLength}
              maxLength={maxLength}
              required
            />
          ),
        )}
        {formName === 'signup' && <p className="user-form__error">Что-то пошло не так...</p>}
        <Button
          className="user-form__submit-button"
          onClick={(event) => {
            event.preventDefault();
            if (formName === 'signin') {
              setIsLoggedIn(true);
            }
          }}
          isSubmitButton
        >
          {submitButtonText}
        </Button>
      </form>
      <div className="user-form__redirect-wrapper">
        <span className="user-form__redirect-text">{redirectText}</span>
        <CustomLink className="user-form__redirect-link" path={redirectPath}>
          {redirectLinkText}
        </CustomLink>
      </div>
    </section>
  );
}

UserForm.propTypes = {
  title: PropTypes.string.isRequired,
  redirectText: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  inputList: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ).isRequired,
  submitButtonText: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired,
  redirectLinkText: PropTypes.string.isRequired,
};

// UserForm.defaultProps = {

// };

export default UserForm;
