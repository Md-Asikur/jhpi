import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components';
import img1 from "../assets/Nfts/Mahbub-Sir.jpg";
import img2 from "../assets/Nfts/gautom.jpg";
import img3 from "../assets/Nfts/shariful.jpg";
import img4 from "../assets/Nfts/sarmin.jpg";
import img5 from "../assets/Nfts/pabitra.jpg";
import img6 from "../assets/Nfts/M.jpg";
import img7 from "../assets/Nfts/sahadat.jpg";
import img8 from "../assets/Nfts/harun.jpg";
import img9 from "../assets/Nfts/tahera.jpg";
import img10 from "../assets/Nfts/tarikul.jpg";
const Section = styled.section`
  height: 100vh;
  width: 100%;

  background-color: ${(props) => props.theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  overflow-x: scroll;
  @media (max-width: 40em) {
    width: 100%;
    height: 100%;
    margin: 0px 0px 0px 0px;

    background-color: ${(props) => props.theme.body};
  }
  & > *:first-child {
    animation-duration: 20s;
    @media (max-width: 35em) {
      animation-duration: 15s;
    }
  }
  & > *:last-child {
    animation-duration: 15s;
    @media (max-width: 35em) {
      animation-duration: 10s;
    }
  }
`;
const move = keyframes`
0%{transform:translateX(100%)};
100%{transform:translateX(-100%)}`;
const Row = styled.div`
  // background-color: lightblue;
  white-space: nowrap;
  box-sizing: content-box;
  margin: 1rem 0;
  display: flex;
  animation: ${move}  linear infinite ${(props) => props.direction};
  div {
    // width: 5rem;
    // height: 5rem;
    margin: 1rem;
    // background-color: yellow;
  }
`;
const ImgContainer = styled.div`
  width: 25rem;
  height: 35rem;
  margin: 0 auto;
  background-color: ${(props) => props.theme.body};
  border-radius: 20px;
  cursor: pointer;
  @media (max-width: 48em) {
    width: 20rem;
    height: 30rem;
  }
  @media (max-width: 30em) {
    width: 16rem;
    height: 25rem;
  }
  img {
    width: 100%;
    height: 76%;
  }
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 1rem;
  background-color: ${(props) => props.theme.text};
  border: 2px solid ${(props) => `rgba(${props.theme.bodyRgba},0.5)`};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  @media (max-width: 30em) {
    padding: 0rem 0.5rem;
  }
  @media (max-width: 30em) {
    padding: 0rem 0.3rem;
  }
  div {
    color: white;
    font-weight: 600;
    p {
      color: white;
      font-size: 20px;
      @media (max-width: 48em) {
        text-align: center;
        font-size: 14px;
        @media (max-width: 30em) {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
`;
const NftItem = ({ img, name, passRef }) => {
  const play = e => {
    passRef.current.style.animationPlayState="running"
  }
  const paused = (e) => {
    passRef.current.style.animationPlayState = "paused";
  };
  return (
    <ImgContainer onMouseOver={(e) => paused(e)} onMouseOut={(e) => play(e)}>
      <img src={img} alt="JHPI IMG" />
      <Details>
        <div>
          <p>{name}</p>
        </div>
      </Details>
    </ImgContainer>
  );
};
const ShowCase = () => {
  const RowRef1 = useRef(null);
   const RowRef2 = useRef(null);
  return (
    <>
      <div className='showc'>
        <Section>
          <Row direction="none" ref={RowRef1}>
            <NftItem img={img1} name="Md Sajedur Rahman" passRef={RowRef1} />
            <NftItem img={img2} name="Md Sajedur Rahman" passRef={RowRef1} />
            <NftItem img={img3} name="Md Sajedur Rahman" passRef={RowRef1} />
            <NftItem img={img4} name="Md Sajedur Rahman" passRef={RowRef1} />
            <NftItem img={img5} name="Md Sajedur Rahman" passRef={RowRef1} />
          </Row>
          <Row direction="reverse" ref={RowRef2}>
            <NftItem img={img10} name="Md Sajedur Rahman" passRef={RowRef2} />
            <NftItem img={img9} name="Md Sajedur Rahman" passRef={RowRef2} />
            <NftItem img={img3} name="Md Sajedur Rahman" passRef={RowRef2} />
            <NftItem img={img4} name="Md Sajedur Rahman" passRef={RowRef2} />
            <NftItem img={img8} name="Md Sajedur Rahman" passRef={RowRef2} />
            <NftItem img={img7} name="Md Sajedur Rahman" passRef={RowRef2} />
          </Row>
        </Section>
      </div>
    </>
  );
}

export default ShowCase