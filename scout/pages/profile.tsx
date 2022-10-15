import React from "react";
import { Container } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  return (
    <Container pt={10}>
      <ProfileForm displayAll={true} />
    </Container>
  );
};

export default Profile;
