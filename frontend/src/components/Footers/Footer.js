/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

const Footer = () => {
  return (
    <>
      <footer className="footer fixed-bottom" data-background-color="black">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href='/'
                  target="_blank"
                >
                  StoryMe
                </a>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
            ©2019
            . Coded by{" "}
            <a
              href="http://www.github.com/dkoushha"
              target="_blank"
            >
              Dima
            </a>,
            <a
              href="http://www.github.com/noutop"
              target="_blank"
            >
              Noubar
            </a>,
            <a
              href="http://www.github.com/edisonabdiel"
              target="_blank"
            >
              Edison
            </a>
            .
          </div>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
