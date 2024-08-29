import { useAuth } from '../services/auth';
import { createPost } from '../services/api';
import { Post } from '../types/Post';

export const useCreatePost = () => {
  const { getAccessTokenSilently } = useAuth();

  const submitPost = async (post: Post) => {
    try {
      const token = await getAccessTokenSilently();
      await createPost(post, token);
      alert('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  return { submitPost };
};
