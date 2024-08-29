import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

interface HeroProps {
    onLearnMoreClick: () => void;
  }
  
  const Hero: React.FC<HeroProps> = ({ onLearnMoreClick }) => {
  return (
    <Box
      as="section"
      height="100vh"
      bgImage="url('/path/to/your/image.jpg')"
      bgSize="cover"
      bgPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="white"
    >
      <Box p={8} bg="rgba(0, 0, 0, 0.6)" borderRadius="md">
        <Heading as="h2" size="2xl" mb={4}>
          Welcome to MySite
        </Heading>
        <Text fontSize="xl" mb={8}>
          Discover the best services we offer.
        </Text>
        <Button onClick={onLearnMoreClick} colorScheme="whiteAlpha" mt="8">
          Learn More
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
