import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 

  <Auth0Provider
    domain="dev-ahsivo00r84wgtro.jp.auth0.com"
    clientId="AoUwUu9xDI1DAVtMwvpaU8zrskv5kbKM"
    authorizationParams={{ redirect_uri: window.location.origin }}
    useRefreshTokens={true} 
    cacheLocation="localstorage"
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>

  
);
