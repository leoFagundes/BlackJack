// RulesModal.jsx

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
  padding: 20px;

  /* Scrollbar vertical */
  &::-webkit-scrollbar {
    width: 7px; /* Largura da barra de rolagem vertical */
  }

  /* Alça da barra de rolagem */
  &::-webkit-scrollbar-thumb {
    background-color: #459e67;
    border-radius: 1px;
  }

  /* Barra de rolagem de fundo */
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  /* Estilizar a alça quando o mouse passar por cima */
  &::-webkit-scrollbar-thumb:active {
    background-color: #265237;
  }
`;

const RulesModal = ({ show, handleClose }: Props) => {
  return (
    <Modal
      scrollable
      fullscreen={"md-down"}
      size="xl"
      show={show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Regras do Jogo</Modal.Title>
      </Modal.Header>
      <BodyContainer>teste</BodyContainer>
    </Modal>
  );
};

export default RulesModal;
