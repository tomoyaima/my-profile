import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { useCreatePost } from '../hooks/useCreatePost';


const BlogPage: React.FC = () => {
  const { posts, loading, error } = usePosts();
  const { submitPost } = useCreatePost();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleCreatePost = () => {
    const newPost = {
      postId: new Date().toISOString(),
      title: 'New Post',
      content: 'This is a new post',
      author: 'User',
    };
    submitPost(newPost);
  };

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.postId}>{post.title}</li>
        ))}
      </ul>
      <button onClick={handleCreatePost}>Create New Post</button>
    </div>
  );
};

export default BlogPage;
