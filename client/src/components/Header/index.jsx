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
    >
      <Box>
        <RouterLink to="/">
          <Image
            src="./src/assets/logo.png" 
            alt="EFT-BALLISTICS Logo"
            w="300px"
            h="10"
            objectFit="cover"
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



/*import { Flex, Box, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Auth from '../../utils/auth'; 
import { Image } from '@chakra-ui/react';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const bgColor = useColorModeValue('black'); 
  const buttonColorScheme = 'yellow'; 

  return (
    <Flex
      as="header"
      bg={bgColor}
      mb={4}
      p={3}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Box>
        <RouterLink to="/">
          <Image
            src="./src/assets/logo.png" 
            alt="EFT-BALLISTICS Logo"
            w="300px"
            h="10"
            objectFit="cover"
          />
        </RouterLink>
      </Box>

      <Box>
        {Auth.loggedIn() ? (
          <>
            <Button as={RouterLink} to="/me" colorScheme={buttonColorScheme} mr={2}>
              View My Profile
            </Button>
            <Button onClick={logout} colorScheme="red">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button as={RouterLink} to="/login" colorScheme={buttonColorScheme} mr={2}>
              Login
            </Button>
            <Button as={RouterLink} to="/signup" colorScheme={buttonColorScheme}>
              Signup
            </Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
*/
