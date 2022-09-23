import React from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import ProfileData from '../../components/ProfileData/ProfileData';

function Profile() {
  return (
    <>
      <Header />
      <Content>
        <ProfileData />
      </Content>
    </>
  );
}

export default Profile;
