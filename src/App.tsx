import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/About';
import HeaderSpace from './components/HeaderSpace';

const App: React.FC = () => {
  const { getAccessTokenSilently, user,isAuthenticated, loginWithRedirect, logout } = useAuth0();

  React.useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getAccessTokenSilently();
        console.log('Access Token:', token);
      } catch (error) {
        console.error('Error fetching access token:', error);
        if (!isAuthenticated) {
          loginWithRedirect();
        }
      }
    };

    fetchToken();
  }, [getAccessTokenSilently, isAuthenticated, loginWithRedirect]);

  return (
    <ChakraProvider>
      <Router>
        
          <Header/>
          {/* <HeaderSpace/> */}
    
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/about" element={<About />} />
          </Routes>
    
          <Footer/>
 
      </Router>
      </ChakraProvider>
  );
};

export default App;
