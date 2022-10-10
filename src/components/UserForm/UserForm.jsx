import React from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

import CustomLink from '../CustomLink/CustomLink';
import Input from '../Input/Input';
import Button from '../Button/Button';
import ErrorElement from '../ErrorElement/ErrorElement';

import './UserForm.css';
import { NAME_REGEX } from '../../utils/scripts/constants';

function UserForm({
  title,
  formName,
  inputList,
  apiErrorText,
  onSubmitForm,
  submitButtonText,
  redirectText,
  redirectPath,
  redirectLinkText,
}) {
  const {
    values, errors, isValid, handleChange,
  } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    onSubmitForm(values);
  }

  return (
    <section className="user-form">
      <h2 className="user-form__title">{title}</h2>
      <form className="user-form__form" name={formName} onSubmit={handleSubmit} noValidate>
        {inputList.map(({
          name, type, id, placeholder, labelText, minLength, maxLength,
        }) => (
          <Input
            key={id}
            inputClassName="user-form__input"
            type={type}
            name={name}
            id={`input-${name}`}
            onChange={(event) => {
              handleChange(event);
            }}
            value={values[name]}
            placeholder={placeholder}
            isLabelShown
            labelClassName="user-form__label"
            labelText={labelText}
            inputErrorClassName="user-form__input-error"
            inputErrorText={errors[name]}
            minLength={minLength}
            maxLength={maxLength}
            pattern={name === 'name' ? NAME_REGEX : null}
            required
          />
        ))}

        <ErrorElement className="user-form__api-error" text={apiErrorText} />
        <Button className="user-form__submit-button" isSubmitButton disabled={!isValid}>
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
  apiErrorText: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  redirectPath: PropTypes.string.isRequired,
  redirectLinkText: PropTypes.string.isRequired,
};

export default UserForm;
