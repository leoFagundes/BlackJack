"use client";

import { styled } from "styled-components";
import DrawPile from "@/components/DrawPile";
import DealerHand from "@/components/DealerHand";
import PlayerHand from "@/components/PlayerHand";
import Score from "@/components/Score";
import { useEffect, useState } from "react";
import { Cards } from "@/types/types";
import { Button } from "@/components/styledComponents/ButtonStyled";
import PlayerButtonsLogic from "@/components/PlayerButtonsLogic/PlayerButtonsLogic";
import "bootstrap/dist/css/bootstrap.min.css";
import RulesModal from "@/components/Modal/RulesModal/RulesModal";

const TopSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45vh;
`;

const MidSideSection = styled.section`
  display: flex;
  justify-content: center;

  & > div {
    display: flex;
    gap: 10px;
  }
`;

const BottomSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45vh;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: fixed;
    bottom: 5px;
    left: 5px;
    z-index: 2;
  }
`;

export default function Home() {
  const [deckID, setDeckID] = useState("");
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [playerHand, setPlayerHand] = useState<Cards[]>([]);
  const [dealerHand, setDealerHand] = useState<Cards[]>([]);
  const [playerValue, setPlayerValue] = useState<number>(0);
  const [dealerValue, setDealerValue] = useState<number>(0);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [dealerScore, setDealerScore] = useState<number>(0);

  const [showRulesModal, setShowRulesModal] = useState(false);

  useEffect(() => {
    // Mapeia os valores das cartas considerando KING, QUEEN, etc. como 10
    let sum = playerHand.reduce((total, card) => {
      let cardValue = card.value;

      // Verifica se o valor é uma carta da família real
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        cardValue = "10";
      }

      // Verifica se o valor é um ás (ACE)
      if (card.value === "ACE") {
        // Se a soma atual for maior que 10, considera o ás como 1, senão, como 11
        cardValue = "11";
      }

      // Converte o valor da carta para número e adiciona ao total
      return total + parseInt(cardValue, 10);
    }, 0);

    // Verifica se a soma ultrapassou 21 e se há um Ás na mão
    if (sum > 21) {
      const aceIndices = playerHand.reduce(
        (indices: number[], card, index: number) => {
          if (card.value === "ACE") {
            indices.push(index);
          }
          return indices;
        },
        [],
      );

      // Para cada Ás na mão, ajusta o valor do Ás para 1, se necessário
      aceIndices.forEach((aceIndex) => {
        playerHand[aceIndex].value = "ACE";
        if (sum > 21) {
          sum -= 10; // Subtrai 10 da soma (troca o valor do Ás de 11 para 1)
        }

        // Se a soma ficar abaixo de 21, sai do loop para manter o próximo Ás com valor 11
        if (sum <= 21) {
          return;
        }
      });
    }

    // Atualiza o state com a soma dos valores
    setPlayerValue(sum);

    // Verifica se a soma ultrapassou 21 após o ajuste do Ás
    if (sum > 21) {
      console.log("Estourou! O jogador perdeu!");
      const newScore = 21 - sum;
      setPlayerScore(playerScore + newScore);
    }
  }, [playerHand]);

  useEffect(() => {
    // Mapeia os valores das cartas considerando KING, QUEEN, etc. como 10
    let sum = dealerHand.reduce((total, card) => {
      let cardValue = card.value;

      // Verifica se o valor é uma carta da família real
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        cardValue = "10";
      }

      // Verifica se o valor é um ás (ACE)
      if (card.value === "ACE") {
        // Se a soma atual for maior que 10, considera o ás como 1, senão, como 11
        cardValue = "11";
      }

      // Converte o valor da carta para número e adiciona ao total
      return total + parseInt(cardValue, 10);
    }, 0);

    // Verifica se a soma ultrapassou 21 e se há um Ás na mão
    if (sum > 21) {
      const aceIndices = dealerHand.reduce(
        (indices: number[], card, index: number) => {
          if (card.value === "ACE") {
            indices.push(index);
          }
          return indices;
        },
        [],
      );

      // Para cada Ás na mão, ajusta o valor do Ás para 1, se necessário
      aceIndices.forEach((aceIndex) => {
        dealerHand[aceIndex].value = "ACE";
        if (sum > 21) {
          sum -= 10; // Subtrai 10 da soma (troca o valor do Ás de 11 para 1)
        }
      });
    }

    // Atualiza o state com a soma dos valores
    setDealerValue(sum);
  }, [dealerHand]);

  return (
    <main>
      <RulesModal
        show={showRulesModal}
        handleClose={() => setShowRulesModal(false)}
      />
      <TopSideSection>
        <DealerHand dealerHand={dealerHand} dealerValue={dealerValue} />
        <DrawPile
          deckID={deckID}
          setDeckID={setDeckID}
          setDrawnCards={setDrawnCards}
          setPlayerHand={setPlayerHand}
          setDealerHand={setDealerHand}
        />
      </TopSideSection>
      <MidSideSection>
        {deckID != "" ? (
          <PlayerButtonsLogic
            deckID={deckID}
            playerValue={playerValue}
            dealerValue={dealerValue}
            dealerHand={dealerHand}
            setDrawnCards={setDrawnCards}
            setPlayerHand={setPlayerHand}
            setDealerHand={setDealerHand}
            setDealerValue={setDealerValue}
            setPlayerValue={setPlayerValue}
            setPlayerScore={setPlayerScore}
            setDealerScore={setDealerScore}
            playerScore={playerScore}
            dealerScore={dealerScore}
          />
        ) : (
          ""
        )}
      </MidSideSection>
      <BottomSideSection>
        <div className="info">
          <Button onClick={() => setShowRulesModal(true)}>
            Regras do Jogo
          </Button>
          <Button>Valor das Cartas</Button>
        </div>
        <PlayerHand playerHand={playerHand} playerValue={playerValue} />
        <Score playerScore={playerScore} dealerScore={dealerScore} />
      </BottomSideSection>
    </main>
  );
}
