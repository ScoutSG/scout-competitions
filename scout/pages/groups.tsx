import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Heading,
  Text,
  Link,
  Stack,
  CircularProgress,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { TbLock } from "react-icons/tb";
import { useSession } from "next-auth/react";
import Head from "next/head";
import clientApi from "../core/api/client";
import GroupSummaryCard from "../components/CompetitionDetails/GroupSummaryCard";
import PageContainer from "../components/PageContainer";
import { maxWidth } from "../core/utils/maxWidth";
import Loading from "../components/Loading";
import { Group } from "../core/types/Group";

export default function MyGroups() {
  const { data, status } = useSession();
  const [groups, setGroups] = useState(null);
  useEffect(() => {
    clientApi.get(`/groups?userId=${data.user.id}`).then((response) => {
      setGroups(response.data);
    });
  }, []);

  if (groups === null) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <Head>
        <title>My Groups</title>
      </Head>
      <Container maxW={maxWidth}>
        <Stack p={{ base: "4", md: "10" }} m="4" borderRadius="md">
          <Stack direction="row" alignItems="center">
            <Heading as="h1" size="md">
              My Groups
            </Heading>
            {status === "unauthenticated" ? <TbLock /> : null}
          </Stack>

          {status !== "authenticated" ? (
            <>
              <Text fontSize={{ base: "sm" }} textAlign={"left"}>
                We cannot show you your groups until you've signed in!
              </Text>
              <Link href="/auth/signin">
                <Button colorScheme="purple" rightIcon={<ChevronRightIcon />}>
                  Sign in to view your groups
                </Button>
              </Link>
            </>
          ) : (
            <>
              {groups === null ? (
                <CircularProgress isIndeterminate color="primary.500" />
              ) : (
                <Text>
                  {groups.length === 0
                    ? "You are not in any groups yet."
                    : "Check out your groups below."}
                </Text>
              )}

              <Stack spacing={2} alignItems="center" width="100%">
                {groups.map((group: Group) => (
                  <GroupSummaryCard group={group} />
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </Container>
    </PageContainer>
  );
}
