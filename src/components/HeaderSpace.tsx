import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
const HeaderSpace: React.FC = () => {
  
  return (
    <Box as="header"  top="0" width="100%" bg="white" boxShadow="sm" zIndex="1000">
      <Flex
        maxWidth="1200px"
        mx="auto"
        py={4}
        px={8}
        alignItems="center"
        justifyContent="space-between"
      >
       
      </Flex>
    </Box>
  );
};

export default HeaderSpace;
