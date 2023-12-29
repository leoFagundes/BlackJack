// RulesModal.jsx

import Score from "@/components/Score";
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { styled } from "styled-components";

interface Props {
  show: boolean;
  handleClose: () => void;
  playerScore: number;
  dealerScore: number;
}

const URL = process.env.PUBLIC_URL;

const BodyContainer = styled.section`
  background-image: url(${URL}/assets/images/backGroundPrimary.jpg);
  background-size: cover;
  background-color: #daeeff;
  height: 80vh;
  overflow-y: scroll;
  flex: 1;
  color: white;

  .main {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to right, #16161690, #161616e2);
    padding: 20px;
  }
`;

const ScoreModal = ({ show, handleClose, playerScore, dealerScore }: Props) => {
  return (
    <Modal scrollable size="sm" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Pontuação atual</Modal.Title>
      </Modal.Header>
      <BodyContainer>
        <div className="main">
          <Score
            position="relative"
            playerScore={playerScore}
            dealerScore={dealerScore}
          />
        </div>
      </BodyContainer>
    </Modal>
  );
};

export default ScoreModal;
