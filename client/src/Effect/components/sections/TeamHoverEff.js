import React from 'react'
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
const TeamHoverEff = () => {
    const { width, height } = useWindowSize();
  return <Confetti numberOfPieces={150} gravity={0.02} width={width} height={height*1.5} />;
}

export default TeamHoverEff