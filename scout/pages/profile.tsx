import React from "react";
import { Container } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";

// TODO: refactor to use getServerSideProps but need to figure out how to get authentication from server-side.
// probably with getInitialProps
const Profile = () => {
  return (
    <Container pt={10}>
      <ProfileForm displayAll={true} />
    </Container>
  );
};

export default Profile;
