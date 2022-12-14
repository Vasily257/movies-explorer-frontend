import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import ProfileEditForm from '../../components/ProfileEditForm/ProfileEditForm';

import { STATUS, USER_ERROR_TEXT } from '../../utils/scripts/constants';
import { updateProfile } from '../../utils/scripts/MainApi';

function Profile({ onSignOut, isRequestGoingOn, setIsRequestGoingOn }) {
  const [errorText, setErrorText] = useState('');
  const { setCurrentUser } = useContext(CurrentUserContext);

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [isSuccessfulUpdate, setIsSuccessfulUpdate] = useState(false);

  const onUpdateProfile = async ({ name, email, currentEmail }) => {
    setIsRequestGoingOn(true);

    try {
      const updatedUserData = await updateProfile({ name, email, currentEmail });
      if (updatedUserData) {
        setCurrentUser({ name: updatedUserData.name, email: updatedUserData.email });
        setIsEditingMode(false);
        setIsSuccessfulUpdate(true);
        setErrorText('');
      }
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

    setIsRequestGoingOn(false);
  };

  return (
    <>
      <Header />
      <Content>
        <ProfileEditForm
          apiErrorText={errorText}
          onSubmitForm={onUpdateProfile}
          isSuccessfulUpdate={isSuccessfulUpdate}
          isEditingMode={isEditingMode}
          setIsEditingMode={setIsEditingMode}
          onSignOut={onSignOut}
          isRequestGoingOn={isRequestGoingOn}
        />
      </Content>
    </>
  );
}

Profile.propTypes = {
  onSignOut: PropTypes.func.isRequired,
  isRequestGoingOn: PropTypes.bool.isRequired,
  setIsRequestGoingOn: PropTypes.func.isRequired,
};

export default Profile;
