import React from 'react';
import { Box, SimpleGrid, Image } from '@chakra-ui/react';
import az104 from '../assets/az-104.png';
import az104a from '../assets/az-104a.png';
import az900 from '../assets/az-900.png';
import genericImage from '../assets/image.png';
import reactLogo from '../assets/react.svg';

const Gallery: React.FC = () => {
  const images = [az104, az104a, az900, genericImage, reactLogo];

  return (
    <Box p={8}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {images.map((src, index) => (
          <Image key={index} src={src} alt={`gallery-image-${index}`} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Gallery;
