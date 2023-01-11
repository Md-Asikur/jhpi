import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components';
import DrawSvg from './DrawSvg';
const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  // display: flex;
  background-color: ${(props) => props.theme.body};
  // color:${(props) => props.theme.body};
  // justify-content: center;
  // align-items: center;
  position: relative;
`;
const Title = styled.h2`
  font-size: ${(props) => props.theme.fontxxl};
  text-transform: capitalize;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.body};

  display: flex;

  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  border-bottom: 2px solid ${(props) => props.theme.text};
  width: fit-content;
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxl};
  }
`;
const Container = styled.div`
  width: 70%;
  height: 200vh;
  margin: 0 auto;
  background-color: ${(props) => props.theme.body};
  display: flex;
  justify-content: center;
  align-items: center;
  position:relative;
`;
const SvgContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Items = styled.ul`
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: lightblue;
  @media (max-width: 48em) {
    width: 90%;
  }
  & > *:nth-of-type(2n + 1) {
    justify-content: start;
    @media (max-width: 48em) {
      justify-content: center;
    }
    div {
      border-radius: 50px 0 50px 0;
      text-align: right;
      @media (max-width: 48em) {
        border-radius: 0 50px 0 50px;
        text-align: left;
        p {
          border-radius: 0 40px 0 40px;
        }
      }
    }
    p {
      border-radius: 50px 0 50px 0;
    }
  }
  & > *:nth-of-type(2n) {
    justify-content: end;
    @media (max-width: 48em) {
      justify-content: center;
    }
    div {
      border-radius: 0 50px 0 50px;
      text-align: left;
      @media (max-width: 48em) {
        border-radius: 50px 0 50px 0;
        text-align: right;
        p {
          border-radius: 50px 0 50px 0;
        }
      }
    }
    p {
      border-radius: 0 40px 0 40px;
    }
  }
`;
const Item = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  @media (max-width: 48em) {
   justify-content:flex-end !important;
  }
`;
const ItemContainer = styled.div`
  width: 40%;
  height: fit-content;
  padding: 1rem;
  border: 3px solid ${(props) => props.theme.text};
  @media (max-width: 48em) {
    width: 70%;
  }
`;
const Box = styled.p`
  height: fit-content;

  background-color: ${(props) => props.theme.carouselColor};
  color: ${(props) => props.theme.text};
  padding: 1rem;
  position: relative;
  border: 1px solid ${(props) => props.theme.text}; 
`;
const SubTitle = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontxl};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
    font-weight: 600;
  }
`;
const Text = styled.span`
  display: block;
  font-size: ${(props) => props.theme.fontsm};
  text-transform: capitalize;
  color: ${(props) => props.theme.text};
  font-weight: 400;
  margin: 0.5rem;
  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontxs};
    font-weight: 600;
  }
`;
const RoadMapItem = ({ title, subtext,addToRef }) => {
  
  return (
    <Item ref={addToRef}>
      <ItemContainer>
        <Box>
          <SubTitle>
{title}
          </SubTitle>
          <Text>
            {subtext}
          </Text>
</Box>
      </ItemContainer>
    </Item>
  )
}
const Roadmap = () => {
  const revealRef = useRef([]);
  revealRef.current = [];
  gsap.registerPlugin(ScrollTrigger)
  const addToRefs = (el) => {
    if (el && !revealRef.current.includes(0)) {
      revealRef.current.push(el);
    }
  };
  useLayoutEffect(() => {
    let t1=gsap.timeline()
    revealRef.current.forEach((el, index) => {
      t1.fromTo(el.childNodes[0], {
        y:"0",
      }, {
        y: "-30%",
        ScrollTrigger: {
          id: `section-${index + 1}`,
          trigger: el,
          start: "top center+=200px",
          end: "bottom center",
          scrub: true,
          markers:true
          
        }
      });
      return () => {};
    })
  
  }, [])
  return (
    <Section>
      <Title>OUR JOURNEY</Title>
      <Container>
        <SvgContainer>
          <DrawSvg />
        </SvgContainer>

        <Items>
          <Item>&nbsp;</Item>
          <RoadMapItem
            addToRef={addToRefs} title="Starting JHPI"
            subtext="2004 with some teachers and some student"
          />
          <RoadMapItem
            addToRef={addToRefs} title="Grand Opening"
            subtext="2010 with 50 teachers and 1000 student"
          />
          <RoadMapItem
            addToRef={addToRefs} title="Great Benefits"
            subtext="2018 with 80 teachers and 2000 student"
          />
          <RoadMapItem addToRef={addToRefs} title="Ranking" subtext="2010 with 50 teachers and 2000 student" />
          <RoadMapItem
            addToRef={addToRefs} title="Now 20000+ Running"
            subtext="In 2023 Our Total Passed Student 20000+"
          />
        </Items>
      </Container>
    </Section>
  );
}

export default Roadmap