import React, { useRef } from 'react';
import { Box, Heading, Text, VStack, List, ListItem, ListIcon, SimpleGrid, HStack, Tag } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import Hero from '../components/Hero';
import Services from '../components/ServicesTablet';
import { Grid, GridItem } from '@chakra-ui/react'

const Home: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null); // useRefを追加

  const scrollToIntro = () => {
    const headerOffset = document.querySelector('header')?.clientHeight || 0;
    const elementPosition = introRef.current?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  return (
 <>
   <Hero onLearnMoreClick={scrollToIntro} /> {/* onLearnMoreClickをHeroに渡す */}

   <Grid
      h='70%'
      templateRows='repeat(4, 1fr)'
      templateColumns='repeat(8, 1fr)'
      gap={4}
      ref={introRef} 
      bg="gray.100"
    >
      <GridItem rowSpan={4} colSpan={8}/>
      <GridItem rowSpan={4} colSpan={1}/>
      <GridItem colSpan={6} bg='white' >
  
 
    <Box p="8"  maxWidth="100%" mx="auto">
      <VStack spacing="6" align="flex-start">
        {/* 自己紹介 */}
        <Heading as="h1" size="xl">自己紹介</Heading>
        <Text >
          こんにちは！私はAWSの認定資格を持つクラウドエンジニアです。以下のスキルと資格を活かして、クラウドソリューションの設計と実装に取り組んでいます。
        </Text>

        {/* 資格一覧 */}
        <Heading as="h2" size="lg">資格</Heading>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="100%">
          <Box p={4} borderWidth="1px" rounded="md" bg="gray.50">
            <HStack align="start" spacing={3}>
              <CheckCircleIcon color="green.500" mt={1} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">AWS Certified Solutions Architect</Text>
                <Tag size="sm" colorScheme="green" variant="subtle">Associate</Tag>
              </VStack>
            </HStack>
          </Box>
          <Box p={4} borderWidth="1px" rounded="md" bg="gray.50">
            <HStack align="start" spacing={3}>
              <CheckCircleIcon color="green.500" mt={1} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">AWS Certified Developer</Text>
                <Tag size="sm" colorScheme="green" variant="subtle">Associate</Tag>
              </VStack>
            </HStack>
          </Box>
          <Box p={4} borderWidth="1px" rounded="md" bg="gray.50">
            <HStack align="start" spacing={3}>
              <CheckCircleIcon color="green.500" mt={1} />
              <VStack align="start" spacing={1}>
                <Text fontWeight="semibold">AWS Certified SysOps Administrator</Text>
                <Tag size="sm" colorScheme="green" variant="subtle">Associate</Tag>
              </VStack>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* スキル */}
        <Heading as="h2" size="lg">スキル</Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="orange.500" />
            AWS全般（Lambda, DynamoDB, S3, EC2など）
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="blue.500" />
            プログラミング（TypeScript, Python, JavaScript）
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="purple.500" />
            データベース（Aurora, DynamoDB, RDS）
          </ListItem>
          {/* 他のスキルも追加可能 */}
        </List>
      </VStack>
    </Box>
      </GridItem>
      <GridItem colSpan={2} />
      <GridItem colSpan={4} bg='tomato' />
    </Grid>
    <Services/>
    </>
  );
};

export default Home;
