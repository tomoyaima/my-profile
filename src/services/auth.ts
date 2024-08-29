import { Auth0ContextInterface, useAuth0 } from '@auth0/auth0-react';

// 認証フックを利用するためのカスタムフック
export const useAuth = (): Auth0ContextInterface => {
  const auth = useAuth0();

  return auth;
};

export const getToken = async (): Promise<string> => {
  const { getAccessTokenSilently } = useAuth0();
  
  try {
    const token = await getAccessTokenSilently();
    return token;
  } catch (error) {
    console.error('Error getting access token', error);
    throw new Error('Error getting access token');
  }
};
