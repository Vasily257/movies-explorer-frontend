import React, { useState, useContext } from 'react';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import ProfileData from '../../components/ProfileData/ProfileData';

import { STATUS, USER_ERROR_TEXT } from '../../utils/scripts/constants';
import { updateProfile } from '../../utils/scripts/MainApi';

function Profile() {
  const [errorText, setErrorText] = useState('');
  const { setCurrentUser } = useContext(CurrentUserContext);

  const onUpdateProfile = async ({ name, email, currentEmail }) => {
    try {
      const updatedUserData = await updateProfile({ name, email, currentEmail });
      setCurrentUser(updatedUserData);
      setErrorText('');
    } catch (error) {
      switch (+error.message) {
        case STATUS.CONFLICT:
          setErrorText(USER_ERROR_TEXT.ALREADY_EXISTING);
          break;
        default:
          setErrorText(USER_ERROR_TEXT.PROFILE_UPDATING_FAILED);
          break;
      }
    }
  };

  return (
    <>
      <Header />
      <Content>
        <ProfileData apiErrorText={errorText} onSubmitForm={onUpdateProfile} />
      </Content>
    </>
  );
}

export default Profile;
