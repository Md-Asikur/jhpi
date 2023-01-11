import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Section = styled.section`
width:100vw;
background-color:${props=>props.theme.body}

`
const NavBar = styled.nav`
display:flex;
justify-content:space-between;
align-items:center;
width:85%;
height:${props=>props.theme.navHeight};
margin:0 auto;


`
const Logo = styled.h1`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  &:hover{transform:scale(1.1)}
  transition:all 0.2s;
`;
const Navigation = () => {
  return (
    <Section>
      <NavBar>
        <h1>
          <Logo>
            <Link to="/">JHPI</Link>
          </Logo>
        </h1>
        <ul>
          <li>
            <Link>Home</Link>
            <Link>About</Link>
            <Link>Roadmap</Link>
            <Link>Showcase</Link>
            <Link>Team</Link>
            <Link>Faq</Link>
          </li>
        </ul>
      </NavBar>
    </Section>
  );
}

export default Navigation