import React, { useLayoutEffect, useRef } from 'react'
import { useWindowScroll } from 'react-use';
import styled from 'styled-components'
const Up = styled.div`
  width: 3rem;
  height: 3rem;
  margin: 0;
  padding: 0;
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontxl};
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:all 0.2s ease;
  &:hover {
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const ScrollToTop = () => {
    const ref = useRef(null)
    const {y}=useWindowScroll()
    const Scroll = e => {
        let ele = document.getElementById("home")
        ele.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline:"nearest"
        })
    }
    useLayoutEffect(() => {
      
        if (y > 200) {
            ref.current.style.display = "flex";
        } else {
              ref.current.style.display = "none";
    }
      return () => {
       
      };
    }, [y])
  return <Up ref={ref} onClick={() => Scroll()}>&#x22191;</Up>;
}

export default ScrollToTop