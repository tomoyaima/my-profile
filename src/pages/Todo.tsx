import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  Kbd,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useTodos } from '../hooks/useTodos';

const TodoPage: React.FC = () => {
  const {
    visibleTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
    editTodo,
    clearCompleted,
    stats,
  } = useTodos();
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const cardBg = useColorModeValue('white', 'gray.700');
  const muted = useColorModeValue('gray.600', 'gray.300');

  const submit = () => {
    addTodo(text);
    setText('');
    inputRef.current?.focus();
  };

  const beginEdit = (id: string, current: string) => {
    setEditingId(id);
    setEditingText(current);
  };

  const commitEdit = () => {
    if (editingId) editTodo(editingId, editingText);
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  return (
    <Box maxW="760px" mx="auto" px={6} pt={28} pb={16}>
      <Heading size="lg" mb={6}>Todo</Heading>
      <Box bg={cardBg} p={4} rounded="md" shadow="sm">
        <HStack>
          <Input
            ref={inputRef}
            value={text}
            placeholder="やることを入力..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submit();
            }}
          />
          <Button colorScheme="blue" onClick={submit} isDisabled={!text.trim()}>
            追加
          </Button>
        </HStack>
        <Flex mt={3} align="center" gap={3} wrap="wrap">
          <Text fontSize="sm" color={muted}>残り: {stats.active}</Text>
          <HStack spacing={2}>
            <Tag as="button" variant={filter === 'all' ? 'solid' : 'subtle'} onClick={() => setFilter('all')}>すべて</Tag>
            <Tag as="button" variant={filter === 'active' ? 'solid' : 'subtle'} onClick={() => setFilter('active')}>未完了</Tag>
            <Tag as="button" variant={filter === 'completed' ? 'solid' : 'subtle'} onClick={() => setFilter('completed')}>完了</Tag>
          </HStack>
          <Button size="sm" ml="auto" variant="ghost" onClick={clearCompleted}>
            完了を削除
          </Button>
        </Flex>
      </Box>

      <Stack mt={4} spacing={3}>
        {visibleTodos.length === 0 && (
          <Text color={muted} textAlign="center" mt={6}>
            タスクがありません。入力して追加してください。
          </Text>
        )}
        {visibleTodos.map((t) => (
          <Flex key={t.id} bg={cardBg} p={3} rounded="md" align="center" gap={3}>
            <Checkbox isChecked={t.completed} onChange={() => toggleTodo(t.id)} />
            {editingId === t.id ? (
              <>
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitEdit();
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  autoFocus
                />
                <HStack ml="auto">
                  <IconButton aria-label="保存" icon={<CheckIcon />} size="sm" onClick={commitEdit} />
                  <IconButton aria-label="キャンセル" icon={<CloseIcon />} size="sm" onClick={cancelEdit} />
                </HStack>
              </>
            ) : (
              <>
                <Text flex="1" textDecoration={t.completed ? 'line-through' : 'none'} color={t.completed ? muted : undefined}>
                  {t.text}
                </Text>
                <HStack>
                  <IconButton aria-label="編集" icon={<EditIcon />} size="sm" variant="ghost" onClick={() => beginEdit(t.id, t.text)} />
                  <IconButton aria-label="削除" icon={<DeleteIcon />} size="sm" variant="ghost" onClick={() => removeTodo(t.id)} />
                </HStack>
              </>
            )}
          </Flex>
        ))}
      </Stack>

      <Box mt={8} color={muted} fontSize="sm">
        <Text>Enterで追加、Escで編集キャンセル</Text>
        <HStack mt={1}>
          <Kbd>Enter</Kbd>
          <Text>追加/保存</Text>
          <Kbd>Esc</Kbd>
          <Text>キャンセル</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default TodoPage;

