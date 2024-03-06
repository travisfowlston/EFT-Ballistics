import { Flex, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Auth from '../../utils/auth'; 
import { Image } from '@chakra-ui/react';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const bgColor = useColorModeValue('black'); 

  return (
    <Flex
      as="header"
      bg={bgColor}
      mb={4}
      p={3}
      align="center"
      justify="space-between"
      wrap="wrap"
      borderBottom="1px" borderColor="#DBC59C" borderStyle="solid"
      position="fixed" // Makes the header fixed
      top="0" 
      left="0" 
      width="100%" 
    >
      <Box>
        <RouterLink to="/">
          <Image
            src="./src/assets/logo.png" 
            alt="EFT-BALLISTICS Logo"
            w="300px"
            h="10"
            objectFit="cover"
            border="1px" borderColor="#DBC59C" borderStyle="solid"
          />
        </RouterLink>
      </Box>

      <Box>
        {Auth.loggedIn() ? (
          <>
            <Button as={RouterLink} to="/me" backgroundColor="#DBC59C" color="black" mr={2}>
              View My Profile
            </Button>
            <Button onClick={logout} backgroundColor="#DBC59C" color="black">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={RouterLink} to="/login" backgroundColor="#DBC59C" color="black" mr={2}>
              Login
            </Button>
            <Button as={RouterLink} to="/signup" backgroundColor="#DBC59C" color="black">
              Signup
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
