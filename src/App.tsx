import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header';
import Footer from './components/Footer';
import HeaderSpace from './components/HeaderSpace';
import Todo from './pages/Todo';
import IdentitySlides from './pages/IdentitySlides';
import PptxViewer from './pages/PptxViewer';
import Analytics from './pages/Analytics';
import PersonalBlog from './pages/PersonalBlog';
import BlogPost from './pages/BlogPost';
import Gallery from './pages/Gallery';

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
            <Route path="/todo" element={<Todo />} />
            <Route path="/identity" element={<IdentitySlides />} />
            <Route path="/pptx" element={<PptxViewer />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/blog" element={<PersonalBlog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
    
          <Footer/>
 
      </Router>
      </ChakraProvider>
  );
};

export default App;
