import React from 'react';
import { Box, Heading, Text, SimpleGrid, Tag, HStack, VStack, Link as CLink, Skeleton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

type Item = {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
};

const PersonalBlog: React.FC = () => {
  const [items, setItems] = React.useState<Item[] | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/blog/index.json', { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as Item[];
        if (!cancelled) {
          setItems(data);
        }
      } catch (e) {
        if (!cancelled) setError('ブログ一覧の読み込みに失敗しました');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <Box maxW="960px" mx="auto" px={6} pt={28} pb={16}>
      <Heading size="lg" mb={6}>Blog</Heading>
      {loading && (
        <VStack align="stretch" spacing={4}>
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </VStack>
      )}
      {error && <Text color="red.500">{error}</Text>}
      {items && (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {items.map((p) => (
            <Box key={p.slug} p={5} borderWidth="1px" rounded="md" bg="white" _hover={{ shadow: 'md' }}>
              <VStack align="stretch" spacing={2}>
                <CLink as={Link} to={`/blog/${p.slug}`} fontWeight="semibold" fontSize="lg">
                  {p.title}
                </CLink>
                <Text fontSize="sm" color="gray.600">{p.date}</Text>
                {p.excerpt && <Text noOfLines={3}>{p.excerpt}</Text>}
                {p.tags && p.tags.length > 0 && (
                  <HStack spacing={2} mt={2}>
                    {p.tags.map((t) => (
                      <Tag key={t} size="sm" colorScheme="blue">{t}</Tag>
                    ))}
                  </HStack>
                )}
                <CLink as={Link} to={`/blog/${p.slug}`} color="blue.600">続きを読む →</CLink>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default PersonalBlog;

