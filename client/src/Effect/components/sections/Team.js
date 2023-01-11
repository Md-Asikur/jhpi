import React from "react";
import styled from "styled-components";
import img1 from "../assets/Nfts/Mahbub-Sir.jpg";
import img2 from "../assets/Nfts/gautom.jpg";
import img3 from "../assets/Nfts/shariful.jpg";
import img4 from "../assets/Nfts/sarmin.jpg";
import img5 from "../assets/Nfts/pabitra.jpg";
import img6 from "../assets/Nfts/M.jpg";
import img7 from "../assets/Nfts/sahadat.jpg";
import img8 from "../assets/Nfts/harun.jpg";
import img9 from "../assets/Nfts/tahera.jpg";
import img10 from "../assets/Nfts/principal.png";
import TeamHoverEff from "./TeamHoverEff";
import { Link } from "react-router-dom";
const Section = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  background-color: ${(props) => props.theme.body};
  
`;
const Container = styled.div`
  width: 75%;
   
  margin: 2rem auto;
  // background:lightblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
const Box = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
const Item = styled.div`

  position: relative;
  width: 30%;
  padding: 1rem 0;
  color: ${(props) => props.theme.body};
  margin: 2rem 1rem;
  border: 2px solid ${(props) => props.theme.text};
  border-radius: 20px;
  z-index: 6;
  backdrop-filter: blur(4px);
  
  &:hover {
    img {
      transform: translateY(-1rem) scale(1.1);
    }
  }
  @media (max-width: 64em) {
    width: 70vw;
    
  }
  @media (max-width: 48em) {
    height:100%;
    margin-right:20px;
    width: 110%;
  }
`;
const ImageContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  background-color: ${(props) => props.theme.carouselColor};
  border: 1px solid ${(props) => props.theme.text};
  padding: 0.5rem;
  border-radius: 20px;
  cursor: pointer;
 
  @media (max-width: 64em) {
    width: 85%;
    justify-content: center;
  }
  @media (max-width: 48em) {
    width: 95%;
    justify-content: center;
  }
  img {
    width: 95%;
    height: 90%;
    transition: all 0.3s ease;
  }
`;
const Name = styled.h2`
 font-size: ${(props) => props.theme.fontlg};

  display: flex;

  justify-content: center;
  align-items: center;
  color:${(props) => props.theme.text};
  text-transform:uppercase;
  margin-top:1rem;
`;
const Position = styled.h2`
  font-size: ${(props) => props.theme.fontmd};

  display: flex;

  justify-content: center;
  align-items: center;
  color: grey;
  text-transform: capitalize;
  margin-top: 1rem;
  font-weight:400;
`;
const Membercomponent = ({ img, name = "", position = "" }) => {
  return (
    <Item>
      <ImageContainer>
        <img src={img} alt={name} style={{height:"300px"}} />
      </ImageContainer>
      <Name>{name}</Name>
      <Position>{position}</Position>
    </Item>
  );
};
const Team = () => {
  return (
    <Section>
      <TeamHoverEff />
      <Title>Top Instructor</Title>
      <Container>
        <Membercomponent img={img10} name="Md Sajedur Rahman" position="PRINCIPAL" />
        <Membercomponent img={img1} name="Md Mahbubur Rahman" position="SUB-PRINCIPAL" />
        <Membercomponent img={img3} name="Md Sariful Islam" position="INSTRUCTOR" />{" "}
        <Membercomponent img={img4} name="Mst Sharmin Sultana" position="INSTRUCTOR" />
        <Membercomponent img={img9} name="Md Sajedur Rahman" position="INSTRUCTOR" />
        <Membercomponent img={img8} name="Md Harun Islam" position="INSTRUCTOR" />
        
       
      </Container>
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        {" "}
        <Link to="/teachers" style={{ textAlign: "center", fontSize: "2rem" }}>
          all teachers
        </Link>
      </h1>
    </Section>
  );
};

export default Team;
