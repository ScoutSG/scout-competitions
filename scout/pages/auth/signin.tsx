import {
  Flex,
  Box,
  FormControl,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  HStack,
  Center
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc'
import { getCsrfToken } from "next-auth/react"
import { getProviders, signIn } from "next-auth/react"
import { useRouter } from 'next/router';

export default function SignIn({ csrfToken, providers }) {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      direction={'column'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={4} align={'center'} width='75%'>
        <Heading fontSize={'6xl'} textAlign={'center'}>Sign in to your account</Heading>
        <Text fontSize={'lg'} color={'gray.600'} textAlign={'center'}>
          Enter your email. We will send you a magic link to login.
        </Text>
      </Stack>
      <Stack py={8} width='100%' maxW='lg'>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          pb={8} pt={4} px={8}>
          <Stack spacing={4}>
            <form method="post" action="/api/auth/signin/email">
              <Stack spacing={4}>
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <FormControl id="email">
                    <Input type="email" id="email" name="email" placeholder="yourname@example.com" />
                  </FormControl>
                  <Button
                    type="submit"
                    bg={'teal.400'}
                    color={'white'}
                    _hover={{
                      bg: 'teal.500',
                    }}>
                    Continue
                  </Button>
              </Stack>
            </form>
            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or
              </Text>
              <Divider />
            </HStack>
            <Button onClick={() => signIn(providers.google.id, {callbackUrl: '/'})} w={'full'} variant={'outline'} leftIcon={<FcGoogle />}>
              <Center>
                <Text>Sign In with Google</Text>
              </Center>
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  const providers = await getProviders()
  return {
    props: { csrfToken, providers },
  }
}