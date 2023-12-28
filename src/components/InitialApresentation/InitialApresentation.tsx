import React, { SetStateAction } from "react";
import { styled } from "styled-components";
import { Button } from "../styledComponents/ButtonStyled";
import { ImClubs } from "react-icons/im";

type Props = {
  deckID: string;
  show: boolean;
  setInitialApresentation: React.Dispatch<SetStateAction<boolean>>;
};

const SectionContainer = styled.section`
  @import url("https://fonts.googleapis.com/css2?family=Lobster&display=swap");

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: white;
  z-index: 10;
  min-height: 600px;

  img {
    position: absolute;
    height: 400px;
    background-size: cover;
    animation: imgAnimation 0.8s ease-in-out;
  }

  & > div {
    position: absolute;
    transform: translateY(200px);
  }

  & > button {
    position: absolute;
    transform: translateY(300px);
  }

  .textLetter {
    position: relative;
    display: inline-block;
    font-size: 65px;
    letter-spacing: -2px;
    font-family: "Lobster", cursive;
    color: black;
    font-weight: bold;
  }

  .textLetter:nth-child(1) {
    animation: textAnimation 0.7s steps(10, start) 0.2s forwards;
  }

  .textLetter:nth-child(2) {
    animation: textAnimation 0.7s steps(10, start) 0.3s forwards;
  }

  .textLetter:nth-child(3) {
    animation: textAnimation 0.7s steps(10, start) 0.4s forwards;
  }

  .textLetter:nth-child(4) {
    animation: textAnimation 0.7s steps(10, start) 0.5s forwards;
  }

  .textLetter:nth-child(5) {
    animation: textAnimation 0.7s steps(10, start) 0.6s forwards;
  }

  .textLetter:nth-child(6) {
    animation: textAnimation 0.7s steps(10, start) 0.7s forwards;
  }

  .textLetter:nth-child(7) {
    animation: textAnimation 0.7s steps(10, start) 0.8s forwards;
  }

  .textLetter:nth-child(8) {
    animation: textAnimation 0.7s steps(10, start) 0.9s forwards;
  }

  .textLetter:nth-child(9) {
    animation: textAnimation 0.7s steps(10, start) 1s forwards;
  }

  .textLetter:nth-child(10) {
    animation: textAnimation 0.7s steps(10, start) 1.1s forwards;
  }

  @keyframes imgAnimation {
    0% {
      transform: translateY(-55px) rotate(-15deg);
      opacity: 0;
    }
    100% {
      transform: translateY(0) rotate(0);
      opacity: 1;
    }
  }

  @keyframes textAnimation {
    0% {
      // transform: translate(20px, 40px);
      text-shadow: none;
    }
    30% {
      text-shadow: 15px 55px 5px rgba(0, 0, 0, 0.4);
      letter-spacing: -5px;
      font-size: 80px;
    }
    100% {
      // transform: translate(0, 0);
      text-shadow: 5px 5px 5px rgba(0, 0, 0, 0.4);
      font-size: 65px;
      letter-spacing: -2px;
    }
  }
`;

export default function InitialApresentation({
  deckID,
  show,
  setInitialApresentation,
}: Props) {
  const localStorageDeckID = localStorage.getItem("deckID");
  if (show == true) {
    return (
      <SectionContainer>
        <img src="assets/images/deck.jpg" alt="" />
        <div>
          <span className="textLetter">B</span>
          <span className="textLetter">l</span>
          <span className="textLetter">a</span>
          <span className="textLetter">c</span>
          <span className="textLetter">k</span>
          <span>ㅤ</span>
          <span className="textLetter">J</span>
          <span className="textLetter">a</span>
          <span className="textLetter">c</span>
          <span className="textLetter">k</span>
        </div>
        {localStorageDeckID ? (
          <Button onClick={() => setInitialApresentation(false)}>
            Continuar Jogandoㅤ
            <ImClubs size={18} />
          </Button>
        ) : (
          <Button onClick={() => setInitialApresentation(false)}>
            Iniciar Novo Jogoㅤ
            <ImClubs size={18} />
          </Button>
        )}
      </SectionContainer>
    );
  } else {
    return <></>;
  }
}
