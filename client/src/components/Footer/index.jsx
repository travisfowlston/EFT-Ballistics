import {
  Box,
  Container,
  Button,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import "../../../src/App.css";

// const imgStyle = {
//   width: "40px",
//   height: "40px",
// };

export default function Footer() {
  const [footerStyle, setFooterStyle] = useState({});
  const location = useLocation();
  // in use effect
  useEffect(() => {
    setTimeout(() => {
      // obtain height of main container
      const mainContainer = document.querySelector(".container");
      const height = mainContainer.clientHeight;
      console.log(height);
      // if > 700px
      if (height < 700) {
        setFooterStyle({
          position: "fixed",
          width: "100%",
          bottom: 0,
        });
      } else {
        setFooterStyle({});
      }
      // then do nothing
      // else apply 'fixed ' styling to footer
    }, 100);
  }, [location.pathname]);

  return (
    <Box
      style={footerStyle}
      bg={useColorModeValue("gray.200", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text fontSize="18" fontWeight="700" color="#DBC59c">
            © 2024 EFT Ballistics
          </Text>
          <Stack direction={"row"} spacing={6}>
            <div className="list-inline-item">
              <a href="https://github.com/travisfowlston/EFT-Ballistics">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="2x"
                  style={{ color: "#DBC59c" }}
                  className="icon z-2"
                />
              </a>
            </div>
            <div className="list-inline-item">
              <a href="https://www.linkedin.com/">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="2x"
                  style={{ color: "#DBC59c" }}
                  className="icon z-2"
                />
              </a>
            </div>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
