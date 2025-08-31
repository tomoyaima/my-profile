import React from 'react';
import { Box, Heading, Text, VStack, HStack, Select, useColorModeValue, Input, Button, Tag } from '@chakra-ui/react';
import BarChart from '../components/BarChart';

type Point = { label: string; login: number; signup: number };

function formatDate(d: Date) {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}/${day}`;
}

function generateSample(days = 14): Point[] {
  const now = new Date();
  const out: Point[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    // deterministic pseudo random based on date
    const seed = (d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()) % 97;
    const login = (seed % 15) + 5; // 5..19
    const signup = (seed % 6) + 1; // 1..6
    out.push({ label: formatDate(d), login, signup });
  }
  return out;
}

function parseCsv(text: string): Point[] {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  if (lines.length <= 1) return [];
  const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
  const di = header.indexOf('date');
  const li = header.indexOf('login');
  const si = header.indexOf('signup');
  if (di === -1 || li === -1 || si === -1) return [];
  const out: Point[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    if (!cols[di]) continue;
    const rawDate = cols[di].trim();
    const d = new Date(rawDate);
    const label = isNaN(d.getTime()) ? rawDate : formatDate(d);
    const login = Number((cols[li] || '0').trim());
    const signup = Number((cols[si] || '0').trim());
    out.push({ label, login, signup });
  }
  return out;
}

const Analytics: React.FC = () => {
  const [range, setRange] = React.useState(14);
  const [csvUrl, setCsvUrl] = React.useState<string>('/metrics.csv');
  const [csvData, setCsvData] = React.useState<Point[] | null>(null);
  const [csvStatus, setCsvStatus] = React.useState<'loading' | 'ok' | 'error' | 'idle'>('idle');
  const cardBg = useColorModeValue('white', 'gray.700');

  React.useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setCsvStatus('loading');
      try {
        const res = await fetch(csvUrl, { cache: 'no-store' });
        if (!res.ok) throw new Error(String(res.status));
        const text = await res.text();
        const parsed = parseCsv(text);
        if (!cancelled) {
          setCsvData(parsed.length ? parsed : null);
          setCsvStatus(parsed.length ? 'ok' : 'error');
        }
      } catch {
        if (!cancelled) {
          setCsvData(null);
          setCsvStatus('error');
        }
      }
    };
    load();
    return () => { cancelled = true; };
  }, [csvUrl]);

  const data: Point[] = React.useMemo(() => {
    const src = csvData && csvData.length ? csvData : generateSample(range);
    if (src.length <= range) return src;
    return src.slice(src.length - range);
  }, [csvData, range]);

  return (
    <Box maxW="960px" mx="auto" px={6} pt={28} pb={16}>
      <Heading size="lg">利用状況ダッシュボード</Heading>
      <Text mt={2} color="gray.600">例示データでログイン数・新規登録数を日次で表示します。</Text>

      <HStack mt={4} spacing={4}>
        <Text fontSize="sm" color="gray.600">表示期間</Text>
        <Select size="sm" value={range} onChange={(e) => setRange(Number(e.target.value))} w="auto">
          <option value={7}>7日</option>
          <option value={14}>14日</option>
          <option value={30}>30日</option>
        </Select>
      </HStack>

      <VStack mt={6} spacing={6} align="stretch">
        <Box p={4} bg={cardBg} rounded="md" shadow="sm">
          <HStack justify="space-between" align="center">
            <HStack>
              <Tag colorScheme={csvData ? 'green' : 'gray'}>
                {csvStatus === 'loading' ? 'CSV読込中' : csvData ? 'CSV読込' : 'サンプルデータ'}
              </Tag>
              <Text fontSize="sm" color="gray.600">{csvData ? `ソース: ${csvUrl}` : 'CSVが見つからない/不正な場合はサンプルにフォールバック'}</Text>
            </HStack>
          </HStack>
          <HStack mt={3} spacing={3}>
            <Input size="sm" value={csvUrl} onChange={(e) => setCsvUrl(e.target.value)} placeholder="/metrics.csv または https://..." />
            <Button size="sm" onClick={() => setCsvUrl(csvUrl)} colorScheme="blue">再読込</Button>
            <Button size="sm" variant="outline" onClick={() => setCsvUrl('/metrics.csv')}>デフォルトを使用</Button>
          </HStack>
        </Box>
        <Box p={4} bg={cardBg} rounded="md" shadow="sm">
          <Heading size="md" mb={4}>日次推移</Heading>
          <BarChart
            data={data}
            series={[
              { key: 'login', label: 'ログイン数', color: '#3182ce' },
              { key: 'signup', label: '新規登録数', color: '#38a169' },
            ]}
            height={260}
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default Analytics;
