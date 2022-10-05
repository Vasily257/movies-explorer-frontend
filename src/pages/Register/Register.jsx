import { React } from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import UserForm from '../../components/UserForm/UserForm';

import { inputList } from '../../utils/scripts/constants';

function Register() {
  const registerInputList = inputList.map(
    (inputElement) => (inputElement.name === 'name' || 'email' || 'password') && inputElement,
  );

  return (
    <>
      <Header isEmptyHeader />
      <Content>
        <UserForm
          title="Добро пожаловать!"
          formName="signup"
          inputList={registerInputList}
          submitButtonText="Зарегистрироваться"
          redirectText="Уже зарегистрированы?"
          redirectPath="/signin"
          redirectLinkText="Войти"
        />
      </Content>
    </>
  );
}

export default Register;
