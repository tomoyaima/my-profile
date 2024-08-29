import React from 'react';
import { Box, SimpleGrid, Heading, Text,Image, Grid,GridItem } from '@chakra-ui/react';
import az104 from '../assets/az-104.png';
import az900 from '../assets/az-900.png';

const Services: React.FC = () => {
  return (
    <Box as="section" py={16} bg="gray.100">
      <Box maxWidth="80%" mx="auto" px={8}>
        <Heading as="h3" size="xl" mb={8} textAlign="center">
          保有資格
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={12}>
      
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left">
           Microsoft Certified: <br/>Azure Fundamentals(AZ-900)
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            maxH="100%"
            src={az900}
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
      </Box>

    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
            Microsoft Certified: Azure Administrator Associate (AZ-104)
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="100%"
            src={az104}
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>

    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
          Microsoft Certified: Azure Solutions Architect Expert (AZ-305)
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="100%"
            src="https://it-concepts-japan.com/images/az305.png"
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
          AWS Certified: Cloud Practitioner
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="80%"
            src="https://images.credly.com/size/220x220/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png"
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>

    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
          AWS Certified: Solutions Architect – Associate
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="80%"
            src="https://images.credly.com/size/220x220/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png"
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
          AWS Certified: Developer – Associate
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="80%"
            src="https://images.credly.com/size/220x220/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png"
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
          IPA: 基本情報技術者試験 (FE)
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="100%"
            src="https://media.licdn.com/dms/image/v2/D560BAQFG0d9wpFqC0Q/company-logo_100_100/company-logo_100_100/0/1722485691709?e=1732752000&v=beta&t=ozzROlyAoMb6yEGaYc01FHuUzZZnuYMb2fS3JxpCi24"
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>
    <Box bg="white" p={6} borderRadius="md" boxShadow="md" maxW="sm" mx="auto">
      <Grid templateRows="3fr 7fr" gap={4} height="100%">
        {/* テキスト部分 */}
        <GridItem overflow="hidden" display="flex" justifyContent="center" alignItems="center">
          <Heading as="h4" size="md" textAlign="left" >
          IPA: 応用情報技術者試験 (AP)
          </Heading>
        </GridItem>

        {/* 画像部分 */}
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <Image
            objectFit="cover"
            height="100%"
            src="https://media.licdn.com/dms/image/v2/D560BAQFG0d9wpFqC0Q/company-logo_100_100/company-logo_100_100/0/1722485691709?e=1732752000&v=beta&t=ozzROlyAoMb6yEGaYc01FHuUzZZnuYMb2fS3JxpCi24"
            alt="Caffe Latte"
          />
        </GridItem>
      </Grid>
    </Box>

        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Services;
