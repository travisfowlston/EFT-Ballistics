import { Flex, Box, Heading, Button, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Auth from '../../utils/auth'; 

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const bgColor = useColorModeValue('black'); 
  const buttonColorScheme = "yellow"; 

  return (
    <Flex
      as="header"
      bg={bgColor}
      color="yellow.200"
      mb={4}
      p={3}
      align="center"
      justify="space-between"
      wrap="wrap"
    >
      <Box>
        <RouterLink to="/">
          <Heading as="h1" size="lg">
            EFT-BALLISTICS
          </Heading>
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


/*import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
      <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
        <Link className="text-dark" to="/">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            Tech Friends
          </h1>
        </Link>
        <p className="m-0" style={{ fontSize: '1.75rem', fontWeight: '700' }}>
          Meet your new programming pals.
        </p>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/me">
                View My Profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-lg btn-primary m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-lg btn-light m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
*/