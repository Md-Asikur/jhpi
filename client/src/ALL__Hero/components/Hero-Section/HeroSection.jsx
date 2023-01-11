import React from "react";
import { Container, Row, Col } from "reactstrap";
import Carousel from "../../../Effect/components/sections/Carousel";
import Roadmap from "../../../Effect/components/sections/Roadmap";
import heroImg from "../../assests/images/hero-img1.png";
import "./hero-section.css";

import styled from "styled-components";
import Typewriter from "typewriter-effect";
const Title = styled.h2`
  margin-top: 250px;
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 80%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;
  @media (max-width: 768px) {
    margin-top: 40px;
  }
  span {
    text-transform: uppercase;
    font-family: cursive;
  }
  .text-1 {
    color: blue;
    font-weight: 600;
  }
  .text-2 {
    color: #0a1930;
  }
  .text-3 {
    color: red;
    font-weight: 600;
  }
  .text-4 {
    color: #9d0191;
    font-weight: 600;
    font-family: cursive;
  }
`;
const Subtitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${(props) => `rgba(${props.theme.textRgba},0.9)`};
  font-weight: 600;
  margin-bottom: 1rem;
  align-self: flex-start;
  width: 80%;
`;
const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            {/* <div className="hero__content">
              <h2 className="mb-4 hero__title">
                Anytime Anywhere <br /> Learn on your <br /> Suitable Schedule
              </h2>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
                Aut saepe voluptatum earum delectus <br /> deserunt id iste,
                quas officiis et repellat!
              </p>
            </div>
            <div className="search">
              <input type="text" placeholder="Search" />
              <button className="btn">Search</button>
            </div> */}
            <Title>
              KNOW OUR INSTITUTE.
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('<span class="text-1">JHPI.</span>')

                    .pauseFor(2000)
                    .deleteAll()
                    .typeString(
                      '<span class="text-2">JHENAIDAH <span class="text-3">POLYTECHNIC</span> <span class="text-1">INSTITUE.</span></span>'
                    )

                    .pauseFor(2000)
                    .deleteAll()
                    .typeString(
                      '<span class="text-3">SAZEDUR RAHMAN,<span class="text-4">PRINCIPAL!</span></span>'
                    )

                    .pauseFor(2000)
                    .deleteAll()
                    .start();
                }}
              />
            </Title>
            <Subtitle>Best Institute in This state!</Subtitle>
            <button
              className="btn"
              style={{
                backgroundColor: "#0a1930",
                padding: "5px 30px",
                borderRadius: "20px",
              }}
            >
              <a
                href="/about"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontSize:"1rem",
                }}
              >
                About Us
              </a>
            </button>
          </Col>

          <Col lg="6" md="6">
            {/* <img src={heroImg} alt="" className="w-100 hero__img" /> */}
            <Carousel />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
