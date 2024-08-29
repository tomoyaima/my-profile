import React from 'react';
import { Box, Heading, Text, VStack, List, ListItem, ListIcon, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const About: React.FC = () => {
  return (
    <Box p="8"  maxWidth="100%" mx="auto">
      <VStack spacing="6" align="flex-start">
        {/* 自己紹介 */}
        <Heading as="h1" size="xl">自己紹介</Heading>
        <Text fontSize="lg">
          こんにちは！私はAWSの認定資格を持つクラウドエンジニアです。以下のスキルと資格を活かして、クラウドソリューションの設計と実装に取り組んでいます。
        </Text>

        {/* AWS資格 */}
        <Heading as="h2" size="lg">保有資格</Heading>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            AWS Certified Solutions Architect – Associate
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            AWS Certified Developer – Associate
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            AWS Certified SysOps Administrator – Associate
          </ListItem>
          {/* 他の資格も追加可能 */}
        </List>

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
  );
};

export default About;
