import React, { useMemo } from 'react';
import { Box, Heading, HStack, Input, Button, Text, useColorModeValue } from '@chakra-ui/react';

function buildOfficeEmbedUrl(pptxUrl: string) {
  const abs = new URL(pptxUrl, window.location.origin).href;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(abs)}`;
}

function buildGoogleEmbedUrl(pptxUrl: string) {
  const abs = new URL(pptxUrl, window.location.origin).href;
  return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(abs)}`;
}

const PptxViewer: React.FC = () => {
  const params = new URLSearchParams(window.location.search);
  const srcParam = params.get('src') || '/sample.pptx';
  const bg = useColorModeValue('gray.50', 'gray.700');

  const officeUrl = useMemo(() => buildOfficeEmbedUrl(srcParam), [srcParam]);
  const googleUrl = useMemo(() => buildGoogleEmbedUrl(srcParam), [srcParam]);

  const [urlInput, setUrlInput] = React.useState(srcParam);

  const navigateWith = (url: string) => {
    const u = new URL(window.location.href);
    u.searchParams.set('src', url);
    window.location.href = u.toString();
  };

  return (
    <Box maxW="1200px" mx="auto" px={6} pt={28} pb={10}>
      <Heading size="lg" mb={4}>PPTX Viewer</Heading>
      <Text mb={3} color="gray.600">クエリ `?src=` にPPTXのURLまたは `/public` 配下のパスを指定してください。</Text>

      <HStack mb={4} spacing={3}>
        <Input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="/mydeck.pptx または https://..." />
        <Button onClick={() => navigateWith(urlInput)} colorScheme="blue">表示</Button>
      </HStack>

      <HStack mb={4} spacing={3}>
        <Button variant="outline" size="sm" onClick={() => navigateWith('/sample.pptx')}>/public/sample.pptx を表示</Button>
        <Button variant="outline" size="sm" onClick={() => navigateWith('https://file-examples.com/storage/fe5aa7972ed18e8b4785905f/2017/08/file_example_PPTX_500kB.pptx')}>外部サンプルを表示</Button>
      </HStack>

      <Box bg={bg} rounded="md" overflow="hidden" borderWidth="1px">
        <Box as="iframe" title="PPTX via Office Viewer" src={officeUrl} width="100%" height="720px" border={0} />
      </Box>

      <Text mt={3} fontSize="sm" color="gray.500">
        もし表示に問題がある場合は、
        <a href={googleUrl} target="_blank" rel="noreferrer">Google Viewer</a>
        をお試しください。外部ビューワはファイルがインターネットから取得可能である必要があります。
      </Text>
    </Box>
  );
};

export default PptxViewer;
