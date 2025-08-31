import React from 'react';
import { Box, HStack, VStack, Text, StackDivider } from '@chakra-ui/react';

type Series = {
  key: string;
  label: string;
  color: string;
};

type Datum = {
  label: string; // x-axis label (e.g., date)
  [key: string]: string | number;
};

type Props = {
  data: Datum[];
  series: Series[];
  height?: number; // px
};

const BarChart: React.FC<Props> = ({ data, series, height = 240 }) => {
  const max = React.useMemo(() => {
    let m = 0;
    data.forEach((d) => {
      series.forEach((s) => {
        const v = Number(d[s.key] || 0);
        if (v > m) m = v;
      });
    });
    return m || 1;
  }, [data, series]);

  return (
    <VStack align="stretch" spacing={3} divider={<StackDivider />}>
      {/* Legend */}
      <HStack spacing={4} flexWrap="wrap">
        {series.map((s) => (
          <HStack key={s.key} spacing={2}>
            <Box w="14px" h="14px" borderRadius="2px" bg={s.color} />
            <Text fontSize="sm">{s.label}</Text>
          </HStack>
        ))}
      </HStack>

      {/* Chart */}
      <Box overflowX="auto">
        <HStack align="end" spacing={4} minW={data.length * 48} h={`${height}px`}>
          {data.map((d) => (
            <VStack key={String(d.label)} spacing={2} align="center" w="40px">
              <HStack align="end" spacing={1} w="100%" h="100%" justify="center">
                {series.map((s) => {
                  const v = Number(d[s.key] || 0);
                  const h = Math.round((v / max) * (height - 40));
                  return (
                    <Box
                      key={s.key}
                      w="12px"
                      h={`${h}px`}
                      bg={s.color}
                      borderRadius="3px"
                      title={`${s.label}: ${v}`}
                    />
                  );
                })}
              </HStack>
              <Text fontSize="xs" color="gray.600" noOfLines={1}>
                {d.label}
              </Text>
            </VStack>
          ))}
        </HStack>
      </Box>
    </VStack>
  );
};

export default BarChart;

