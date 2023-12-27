import { CardImage } from "@/components/styledComponents/CardStyled";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { styled } from "styled-components";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const URL = process.env.PUBLIC_URL;

const BodyContainer = styled.section`
  background-image: url(${URL}/assets/images/backGroundSecondary.jpg);
  background-size: cover;
  background-color: #daeeff;
  height: 80vh;
  overflow-y: scroll;
  flex: 1;
  color: white;

  /* Scrollbar vertical */
  &::-webkit-scrollbar {
    width: 0px; /* Largura da barra de rolagem vertical */
  }

  /* Alça da barra de rolagem */
  &::-webkit-scrollbar-thumb {
    background-color: #afafaf;
    border-radius: 1px;
  }

  /* Barra de rolagem de fundo */
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  /* Estilizar a alça quando o mouse passar por cima */
  &::-webkit-scrollbar-thumb:active {
    background-color: #4d4d4d;
  }

  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    max-height: 80vh;
    gap: 20px;
    height: 100%;
    width: 100%;
    background-image: none;
    padding: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 93.56px;
      gap: 5px;

      p {
        background-color: #80808061;
        backdrop-filter: blur(15px);
        border-radius: 15px;
        padding: 5px 10px;
      }
    }
  }
`;

const InfoModal = ({ show, handleClose }: Props) => {
  const cards = [
    { value: "1", toLink: "AH" },
    { value: "2", toLink: "2H" },
    { value: "3", toLink: "3H" },
    { value: "4", toLink: "4H" },
    { value: "5", toLink: "5H" },
    { value: "6", toLink: "6H" },
    { value: "7", toLink: "7H" },
    { value: "8", toLink: "8H" },
    { value: "9", toLink: "9H" },
    { value: "10", toLink: "0H" },
    { value: "10", toLink: "JH" },
    { value: "10", toLink: "QH" },
    { value: "10", toLink: "KH" },
  ];

  return (
    <Modal
      scrollable
      fullscreen={"md-down"}
      size="xl"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Valor das Cartas</Modal.Title>
      </Modal.Header>
      <BodyContainer>
        <div className="main">
          {cards.map(({ value, toLink }) => (
            <div key={toLink}>
              <CardImage
                src={`https://deckofcardsapi.com/static/img/${toLink}.png`}
                height="130px"
              />
              <p>
                <strong>Valor: {value}</strong>
              </p>
            </div>
          ))}
        </div>
      </BodyContainer>
    </Modal>
  );
};

export default InfoModal;
