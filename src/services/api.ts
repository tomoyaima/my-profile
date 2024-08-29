import axios from 'axios';
import { Post } from '../types/Post';

// APIのベースURLを設定（環境変数から取得することも可能）
const API_BASE_URL = 'https://your-api-endpoint.amazonaws.com/prod';

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts', error);
    throw new Error('Error fetching posts');
  }
};

export const createPost = async (post: Post, token: string): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/posts`, post, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error creating post', error);
    throw new Error('Error creating post');
  }
};

export const getPostById = async (postId: string): Promise<Post> => {
  try {
    const response = await axios.get<Post>(`${API_BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${postId}`, error);
    throw new Error('Error fetching post');
  }
};
