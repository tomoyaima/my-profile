import React from 'react';
import { Box, Flex, Text, Link } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" py={8} bg="black" color="white">
      <Flex maxWidth="1200px" mx="auto" px={8} justifyContent="space-between" alignItems="center">
        <Text>&copy; 2024 Your Name. All rights reserved.</Text>
        <Flex>
          <Link href="#" mx={2}>Privacy Policy</Link>
          <Link href="#" mx={2}>Terms of Service</Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
