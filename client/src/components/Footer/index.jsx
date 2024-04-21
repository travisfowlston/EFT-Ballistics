import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="container-fluid sticky-bottom text-center">
      <ul className="list-inline">
        <li className="list-inline-item">
          &copy; {new Date().getFullYear()} - EFT Ballistics
        </li>
        <li className="list-inline-item">
          <a href="https://github.com/travisfowlston/EFT-Ballistics">
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              style={{ color: "#f8f9fa" }}
              className="icon"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}
