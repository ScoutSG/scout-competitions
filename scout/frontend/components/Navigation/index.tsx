import React from "react";
import {
  Flex,
  Box,
  SimpleGrid,
  Container,
  Stack,
  Button,
  Icon,
  Heading,
} from "@chakra-ui/react";

import {
  AddIcon,
  StarIcon,
  ArrowForwardIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

import SearchBar from "../SearchBar";
import styles from "./index.module.scss";

const TopNavBar: React.FC = () => {
  return (
    <Box>
      <Flex alignItems="center">
        <Button bgColor="transparent">
          <Icon name="logo" />
        </Button>
        <SearchBar />
        <Button bgColor="transparent">
          <HamburgerIcon />
        </Button>
      </Flex>
    </Box>
  );
};

interface NavigationProps {
  title: string;
  icon: JSX.Element;
}

const NavigationCard: React.FC<NavigationProps> = ({ title, icon }) => {
  return (
    <Box className={styles.card}>
      <Box className={styles.card__title}>
        <Flex className={styles.card__item}>{title}</Flex>
      </Box>
      <Flex className={styles.card__item}>{icon}</Flex>
    </Box>
  );
};

const Navigation: React.FC = () => {
  const navigationTitles: NavigationProps[] = [
    { title: "Browse Competitions", icon: <ArrowForwardIcon /> },
    { title: "Your Groups", icon: <ArrowForwardIcon /> },
    // { title: "Create Your Space", icon: <AddIcon /> },
    { title: "Applications Sent", icon: <StarIcon /> },
  ];
  return (
    <Container>
      <Stack spacing={4}>
        <TopNavBar />
        <SimpleGrid minChildWidth={"120px"} columns={4} spacing={4}>
          {navigationTitles.map((item) => (
            <Flex justifyContent="center" alignItems="center" key={item.title}>
              <NavigationCard title={item.title} icon={item.icon} />
            </Flex>
          ))}
        </SimpleGrid>
        <Heading size="md">New</Heading>
      </Stack>
    </Container>
  );
};

export default Navigation;
