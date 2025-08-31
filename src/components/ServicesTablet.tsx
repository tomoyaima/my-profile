import React from 'react';
import { Box, SimpleGrid, Heading, useBreakpointValue, Image, VStack } from '@chakra-ui/react';
import az104 from '../assets/az-104.png';
import az900 from '../assets/az-900.png';

const Services: React.FC = () => {
    const fontSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  return (
    <Box as="section" py={16} bg="gray.100">
      <Box maxWidth="80%" mx="auto" px={4}>
        <Heading as="h3" size="xl" mb={8} textAlign="center">
          保有資格
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
          {[
            {
              title: 'Microsoft Certified: Azure Fundamentals (AZ-900)',
              src: az900,
              alt: 'Azure Fundamentals (AZ-900) badge',
            },
            {
              title: 'Microsoft Certified: Azure Administrator Associate (AZ-104)',
              src: az104,
              alt: 'Azure Administrator Associate (AZ-104) badge',
            },
            {
              title: 'Microsoft Certified: Azure Developer Associate (AZ-204)',
              src: 'https://images.credly.com/size/220x220/images/63316b60-8a4b-4d45-b34a-2c2f88f59073/image.png',
              alt: 'Azure Developer Associate (AZ-204) badge',
            },
            {
              title: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
              src: 'https://it-concepts-japan.com/images/az305.png',
              alt: 'Azure Solutions Architect Expert (AZ-305) badge',
            },
            {
              title: 'AWS Certified: Cloud Practitioner',
              src: 'https://images.credly.com/size/220x220/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
              alt: 'AWS Cloud Practitioner badge',
            },
            {
              title: 'AWS Certified: Solutions Architect – Associate',
              src: 'https://images.credly.com/size/220x220/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
              alt: 'AWS Solutions Architect – Associate badge',
            },
            {
              title: 'AWS Certified: Developer – Associate',
              src: 'https://images.credly.com/size/220x220/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png',
              alt: 'AWS Developer – Associate badge',
            },
            {
              title: 'IPA: 基本情報技術者試験 (FE)',
              src: 'https://media.licdn.com/dms/image/v2/D560BAQFG0d9wpFqC0Q/company-logo_100_100/company-logo_100_100/0/1722485691709?e=1732752000&v=beta&t=ozzROlyAoMb6yEGaYc01FHuUzZZnuYMb2fS3JxpCi24',
              alt: 'IPA 基本情報技術者試験',
            },
            {
              title: 'IPA: 応用情報技術者試験 (AP)',
              src: 'https://media.licdn.com/dms/image/v2/D560BAQFG0d9wpFqC0Q/company-logo_100_100/company-logo_100_100/0/1722485691709?e=1732752000&v=beta&t=ozzROlyAoMb6yEGaYc01FHuUzZZnuYMb2fS3JxpCi24',
              alt: 'IPA 応用情報技術者試験',
            },
            {
              title: 'IPA: 情報処理安全確保支援士 (SC)',
              src: 'https://media.licdn.com/dms/image/v2/D560BAQFG0d9wpFqC0Q/company-logo_100_100/company-logo_100_100/0/1722485691709?e=1732752000&v=beta&t=ozzROlyAoMb6yEGaYc01FHuUzZZnuYMb2fS3JxpCi24',
              alt: 'IPA 情報処理安全確保支援士',
            },
          ].map((item) => (
            <Box key={item.title} bg="white" borderRadius="md" boxShadow="md" overflow="hidden" p={4}>
              <VStack spacing={4} align="stretch">
                <Heading as="h4" fontSize={fontSize} size="md">
                  {item.title}
                </Heading>
                <Box h={{ base: '120px', md: '140px' }} display="flex" alignItems="center" justifyContent="center">
                  <Image
                    src={item.src as string}
                    alt={item.alt}
                    maxH="100%"
                    maxW="160px"
                    objectFit="contain"
                  />
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Services;
