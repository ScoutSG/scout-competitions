import React, { useEffect, useState } from "react";
import ApplicationPreviewUnit from "../components/ApplicationPreviewUnit";
import { Stack, Text, Button, Badge } from "@chakra-ui/react";
import { TbLock } from "react-icons/tb";
import { useSession } from "next-auth/react";
import clientApi from "../core/api/client";

// export async function getServerSideProps(context) {
//   const response = await clientApi.get("/applications");
//   const applications = response.data;
//   return { props: { applications } };
// }

const ApplicationsPreview = () => {
  const { data: session, status } = useSession();
  const [applications, setApplications] = useState([]);
  console.log(applications);

  useEffect(() => {
    async function getApplications() {
      const response = await clientApi.get("/applications");
      setApplications(response.data);
    }

    getApplications();
  }, []);

  return status !== "authenticated" ? (
    <Stack p="4" m="4" borderRadius="md" boxShadow="lg">
      <Stack
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Your Applications</Text>
          <TbLock />
        </Stack>
      </Stack>
      <Text fontSize={{ base: "sm" }} textAlign={"left"}>
        We cannot show you your applications until you've signed in!
      </Text>
      <Button colorScheme="purple">Sign in to view your applications</Button>
    </Stack>
  ) : (
    <Stack p="4" m="4" borderRadius="md" boxShadow="lg">
      <Stack
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justifyContent={{ base: "center", md: "space-between" }}
      >
        <Stack direction="row" alignItems="center">
          <Text fontWeight="semibold">Your Applications</Text>
        </Stack>
      </Stack>
      <Text fontSize={{ base: "sm" }} textAlign={"left"}>
        {applications.length === 0
          ? "You currently have no applications."
          : "Check the status of your applications below."}
      </Text>
      {applications.length === 0 ? null : (
        <ApplicationPreviewUnit applications={applications} />
      )}
    </Stack>
  );
};

export default ApplicationsPreview;
