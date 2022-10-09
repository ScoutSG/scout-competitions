import React from "react";
import { Container } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";

const Profile = () => {
  return (
    <Container>
      <ProfileForm displayAll={true} />
    </Container>
  );
};

export default Profile;
