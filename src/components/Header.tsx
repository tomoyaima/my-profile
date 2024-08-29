import React from 'react';
import { Box, Flex, Heading, Link, HStack, Button } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

const Header: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return (
    <Box as="header" position="fixed" top="0" width="100%" bg="white" boxShadow="sm" zIndex="1000">
      <Flex
        maxWidth="1200px"
        mx="auto"
        py={4}
        px={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading as="h1" size="lg" color="black">
          MySite
        </Heading>
        <HStack spacing={8}>
          <Link href="#" color="black">Home</Link>
          <Link href="#" color="black">About</Link>
          <Link href="#" color="black">Services</Link>
          <Link href="#" color="black">Contact</Link>
        </HStack>
        {isAuthenticated ? (
            <Button onClick={() => logout({ logoutParams: {returnTo: window.location.origin }})}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
      </Flex>
    </Box>
  );
};

export default Header;
