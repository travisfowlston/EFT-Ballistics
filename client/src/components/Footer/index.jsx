import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

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
    <footer>
      <span>
        &copy; {new Date().getFullYear()} - EFT Ballistics
        <div style={footerStyle}>
          <div className="flex space-x-6">
            <div className="list-inline-item">
              <a href="https://github.com/travisfowlston/EFT-Ballistics">
                <FontAwesomeIcon
                  icon={faGithub}
                  size="2x"
                  style={{ color: "#f8f9fa" }}
                  className="icon z-2"
                />
              </a>
            </div>
          </div>
        </div>
      </span>
    </footer>
  );
}
