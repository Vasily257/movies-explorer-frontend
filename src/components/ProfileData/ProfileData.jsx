import { React, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { LoginContext } from '../../contexts/LoginContext';

import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';

import './ProfileData.css';

function ProfileData() {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, email } = currentUser;

  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);

  return (
    <section className="profile-data">
      <h2 className="profile-data__title">{`Привет, ${name}!`}</h2>
      <div className="profile-data__field profile-data__field_place_upper">
        <span className="profile-data__field-name">Имя</span>
        <span className="profile-data__field-value">{name}</span>
      </div>
      <div className="profile-data__field profile-data__field_place_lower">
        <span className="profile-data__field-name">E-mail</span>
        <span className="profile-data__field-value">{email}</span>
      </div>

      <Button className="profile-data__link" onClick={() => {}}>
        Редактировать
      </Button>
      <CustomLink
        className="profile-data__button"
        path="/"
        onClick={() => {
          setIsLoggedIn(!isLoggedIn);
        }}
      >
        Выйти из аккаунта
      </CustomLink>
    </section>
  );
}

export default ProfileData;
