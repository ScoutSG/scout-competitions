import React from "react";
import { Container } from "@chakra-ui/react";
import ProfileForm from "../components/ProfileForm";

import clientApi from "../core/api/client";

export async function getServerSideProps() {
  const response = await clientApi.get("/user");
  const profile = response.data;
  console.log(profile);

  return { props: { profile } };
}

const Profile = ({ profile }) => {
  return (
    <Container>
      <ProfileForm />
    </Container>
  );
};

export default Profile;
