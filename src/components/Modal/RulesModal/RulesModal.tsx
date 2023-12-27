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

  /* Scrollbar vertical */
  &::-webkit-scrollbar {
    width: 7px; /* Largura da barra de rolagem vertical */
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
    background-color: #265237;
  }

  .main {
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to right, #16161690, #161616e2);
    padding: 20px;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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
      <BodyContainer>
        <div className="main">
          <div>
            <h2>Objetivo</h2>
            <ul>
              <li>
                O objetivo do blackjack é ter uma mão cujo valor seja o mais
                próximo possível de 21, sem ultrapassar esse número.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Valores das Cartas</h2>
            <ul>
              <li>
                As cartas de 2 a 10 têm valores equivalentes aos seus números.
              </li>
              <li>As cartas face (valete, dama, rei) têm o valor de 10.</li>
              <li>
                As cartas de Ás podem valer 1 ou 11, dependendo do que for mais
                favorável para a mão do jogador.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>O Jogo</h2>
            <ul>
              <li>
                Cada jogador recebe duas cartas, e o dealer (croupier) também
                recebe duas cartas, uma virada para cima e outra virada para
                baixo.
              </li>
              <li>
                Os jogadores tentam chegar o mais perto possível de 21 somando
                os valores das cartas em suas mãos.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Blackjack</h2>
            <ul>
              <li>
                Um "blackjack" ocorre quando um jogador recebe um Ás e uma carta
                de valor 10 (10, valete, dama ou rei) como suas duas primeiras
                cartas.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Jogada do Jogador</h2>
            <ul>
              <li>
                Os jogadores têm várias opções, incluindo "hit" (pedir mais uma
                carta) ou "stand" (manter a mão atual).
              </li>
              <li>
                Além disso, os jogadores podem optar por "double down" (dobrar a
                aposta inicial, recebendo apenas mais uma carta)
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Jogada do Dealer</h2>
            <ul>
              <li>
                O dealer deve seguir regras específicas. Normalmente, o dealer
                continua a tirar cartas até atingir um total de 17 ou mais. Se o
                dealer ultrapassar 21, todos os jogadores que ainda estão na mão
                ganham.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Vitória e Derrota</h2>
            <ul>
              <li>
                Um jogador vence se sua mão totalizar mais perto de 21 do que a
                mão do dealer, sem ultrapassar 21.
              </li>
              <li>
                Se a mão do jogador ultrapassar 21, ele perde automaticamente
                (chamado de "bust").
              </li>
              <li>
                Se o dealer ultrapassar 21, todos os jogadores que ainda estão
                na mão ganham.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Empate (Push)</h2>
            <ul>
              <li>
                Se as mãos do jogador e do dealer tiverem o mesmo valor, a mão é
                um empate (push), e o jogador recupera sua aposta.
              </li>
            </ul>
          </div>
          <hr />
          <div>
            <h2>Pontuação</h2>
            <p>
              Quando o jogador decide "stand", a pontuação é comparada entre o
              jogador e o dealer:
            </p>
            <ul>
              <li>
                A pontuação da partida é a diferença de pontos de quem ganhou
                referente a quem perdeu.
              </li>
              <li>
                Caso um jogador ou o dealer passe de 21 pontos ele perderá a
                quantidade sobressalente de pontos e uma nova rodada vai
                começar.
              </li>
              <li>Em caso de empate, nenhum ponto é ganho ou perdido.</li>
            </ul>
          </div>
        </div>
      </BodyContainer>
    </Modal>
  );
};

export default RulesModal;
