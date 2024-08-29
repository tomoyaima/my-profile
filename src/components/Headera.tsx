import React from 'react';
import { Box, Flex, Link, IconButton, Image, Menu, MenuButton, MenuList, MenuItem, HStack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import logo from '../assets/image.png';
import { useAuth0 } from '@auth0/auth0-react';

const Header: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Box bg="orange.500" px={4}>
          <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxWidth="100%"   // 幅を100%に設定
        // 横幅のパディングをremで設定
        mx="auto"
      >
        {/* ロゴ */}
        <Link href="/">
          <Image src={logo} alt="Logo" h="20px" />
        </Link>

        {/* メニューバー */}
        <HStack as="nav" spacing="4" display={{ base: 'none', md: 'flex' }}>
          <Link href="/about" fontWeight="bold">About</Link>
          <Menu>
            <MenuButton as={Link} href="#" fontWeight="bold">
              Products <ChevronDownIcon />
            </MenuButton>
            <MenuList>
              <MenuItem as={Link} href="/product-1">Product 1</MenuItem>
              <MenuItem as={Link} href="/product-2">Product 2</MenuItem>
              <MenuItem as={Link} href="/product-3">Product 3</MenuItem>
            </MenuList>
          </Menu>
          <Link href="/contact" fontWeight="bold">Contact</Link>
        </HStack>

        {/* 検索バーとAuth0ボタン */}
        <HStack spacing="4">
          <InputGroup  display={{ base: 'none', md: 'flex' }}>
            <Input placeholder="Search" />
            <InputRightElement>
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                variant="ghost"
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          
          {/* Auth0のログイン/ログアウトボタン */}
          {isAuthenticated ? (
            <Button onClick={() => logout({ logoutParams: {returnTo: window.location.origin }})}>
              Logout
            </Button>
          ) : (
            <Button onClick={() => loginWithRedirect()}>
              Login
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
