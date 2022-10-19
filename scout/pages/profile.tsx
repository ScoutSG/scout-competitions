import React from "react";
import { Container } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";
import PageContainer from "../components/PageContainer";

const Profile = () => {
  return (
    <PageContainer>
      <Container pt={10}>
        <ProfileForm />
      </Container>
    </PageContainer>
  );
};

export default Profile;
