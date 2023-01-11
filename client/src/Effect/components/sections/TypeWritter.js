import React from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 80%;
  color: ${(props) => props.theme.text};
  align-self: flex-start;
  span {
    text-transform: uppercase;
    font-family: cursive;
  }
  .text-1 {
    color: blue;
  }
  .text-2 {
    color: chocolate;
  }
  .text-3 {
    color: red;
  }
`;
const Subtitle = styled.h3`
  font-size: ${(props) => props.theme.fontlg};
  text-transform: capitalize;
  color: ${(props) => `rgba(${props.theme.textRgba},0.6)`};
  font-weight:600;
  margin-bottom:1rem;
  align-self:flex-start;
  width:80%;
`;
const TypeWritter = () => {
    return (
      <>
    <Title>
      Discover A new era of cool
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
            .typeString('<span class="text-2">ASIKUR.</span>')

            .pauseFor(2000)
            .deleteAll()
            .typeString('<span class="text-3">SAZEDUR RAHMAN</span>')

            .pauseFor(2000)
            .deleteAll()
            .start();
        }}
          />
         
      </Title>
       <Subtitle>
              jhenaidah polutechnic institiute
            </Subtitle>
            <button className="btn" style={{backgroundColor:"grey",padding:"10px 30px",borderRadius:"20px"}}>About us</button>
      </>
  );
};

export default TypeWritter;
