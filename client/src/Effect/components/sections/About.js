import React from 'react'
import styled from 'styled-components'
import Carousel from './Carousel';

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  display: flex;
  background-color:${(props) => props.theme.text};
  // color:${(props) => props.theme.body};
  justify-content: center;
  align-items: center;
  position:relative;
`
const Container = styled.div`
  width: 75%;
  min-height: 80vh;
  margin: 0 auto;
  // background: lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 64em) {
    width: 85%;
  
  }
  @media (max-width: 64em) {
    width: 100%;
    flex-direction: column;
    & > *:last-child {
      width: 80%;
    }
  }
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 40em) {
    min-height: 50vh;
  }
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;
  width: 80%;
  color: ${(props) => props.theme.body};
  align-self: flex-start;
  @media (max-width: 40em) {
    min-height: 100%;
    text-align:center;
  }
`;
const SubText = styled.p`
  font-size: ${(props) => props.theme.fontlg};
 
  color: ${(props) => props.theme.body};
  font-weight: 500;
  margin-bottom: 1rem;
  align-self: flex-start;
  width: 80%;
  margin:1rem auto;
`;
const SubTextLight = styled.p`
  font-size: ${(props) => props.theme.fontlg};

  color: ${(props) => props.theme.body};
  font-weight: 400;
  margin-bottom: 1rem;
  align-self: flex-start;
  width: 80%;
  margin: 1rem auto;
`;
const About = () => {
  return (
    <Section>
      <Container>
        <Box>
          <Carousel />{" "}
        </Box>
        <Box>
          <Title>jhenaidahpoly</Title>
          <SubText>Et reprehenderit culpa laboris aliqua aute enim.</SubText>
          <SubTextLight>Et reprehenderit culpa laboris aliqua aute enim.</SubTextLight>
          <button>Join Us</button>
        </Box>
      </Container>
    </Section>
  );
}

export default About