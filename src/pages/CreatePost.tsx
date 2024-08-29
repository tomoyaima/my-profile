// CreatePost.tsx
import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Box, Button, Heading } from '@chakra-ui/react';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState<string>('');

  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSubmit = () => {
    console.log('Post content:', content);
    // サーバーに投稿データを送信する処理を追加
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg">
      <Heading as="h1" size="lg" mb={4}>
        Create a New Post
      </Heading>
      <Editor
        apiKey="v7msnyt3uxpoljlqkbi7h9ic9mmpd4dg5juf3lhwct7affcx"
        value={content}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onEditorChange={handleEditorChange}
      />
      <Button colorScheme="teal" size="md" mt={4} onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default CreatePost;
