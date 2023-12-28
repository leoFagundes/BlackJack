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
import InfoModal from "@/components/Modal/InfoModal/InfoModal";
import InitialApresentation from "@/components/InitialApresentation/InitialApresentation";

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
  const [initialApresentation, setInitialApresentation] = useState(true);

  const [deckID, setDeckID] = useState(() => {
    // Tenta recuperar o deckID do localStorage, caso exista
    if (typeof window !== "undefined") {
      const savedDeckID = localStorage.getItem("deckID");
      return savedDeckID || "";
    }
    return "";
  });

  const [drawnCards, setDrawnCards] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedDrawnCards = localStorage.getItem("drawnCards");
      return savedDrawnCards ? JSON.parse(savedDrawnCards) : [];
    }
    return [];
  });

  const [playerHand, setPlayerHand] = useState<Cards[]>(() => {
    if (typeof window !== "undefined") {
      const savedPlayerHand = localStorage.getItem("playerHand");
      return savedPlayerHand ? JSON.parse(savedPlayerHand) : [];
    }
    return [];
  });

  const [dealerHand, setDealerHand] = useState<Cards[]>(() => {
    if (typeof window !== "undefined") {
      const savedDealerHand = localStorage.getItem("dealerHand");
      return savedDealerHand ? JSON.parse(savedDealerHand) : [];
    }
    return [];
  });

  const [playerValue, setPlayerValue] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedPlayerValue = localStorage.getItem("playerValue");
      return savedPlayerValue ? parseInt(savedPlayerValue, 10) : 0;
    }
    return 0;
  });

  const [dealerValue, setDealerValue] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedDealerValue = localStorage.getItem("dealerValue");
      return savedDealerValue ? parseInt(savedDealerValue, 10) : 0;
    }
    return 0;
  });

  const [playerScore, setPlayerScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedPlayerScore = localStorage.getItem("playerScore");
      return savedPlayerScore ? parseInt(savedPlayerScore, 10) : 0;
    }
    return 0;
  });

  const [dealerScore, setDealerScore] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const savedDealerScore = localStorage.getItem("dealerScore");
      return savedDealerScore ? parseInt(savedDealerScore, 10) : 0;
    }
    return 0;
  });

  const [isDouble, setIsDouble] = useState(() => {
    if (typeof window !== "undefined") {
      const savedIsDouble = localStorage.getItem("isDouble");
      return savedIsDouble === "true";
    }
    return false;
  });

  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    // Salva o deckID no localStorage sempre que ele for atualizado
    if (typeof window !== "undefined") {
      localStorage.setItem("deckID", deckID);
    }
  }, [
    initialApresentation,
    deckID,
    drawnCards,
    playerHand,
    dealerHand,
    playerValue,
    dealerValue,
    playerScore,
    dealerScore,
    isDouble,
  ]);

  // Defina um array com os nomes dos estados que você deseja armazenar em cache
  const statesToCache = [
    { state: drawnCards, key: "drawnCards" },
    { state: playerHand, key: "playerHand" },
    { state: dealerHand, key: "dealerHand" },
    { state: playerValue, key: "playerValue" },
    { state: dealerValue, key: "dealerValue" },
    { state: playerScore, key: "playerScore" },
    { state: dealerScore, key: "dealerScore" },
    { state: isDouble, key: "isDouble" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      // O código dentro deste bloco só será executado no lado do cliente
      statesToCache.forEach(({ state, key }) => {
        localStorage.setItem(key, JSON.stringify(state));
      });
    }
  }, [
    deckID,
    drawnCards,
    playerHand,
    dealerHand,
    playerValue,
    dealerValue,
    playerScore,
    dealerScore,
    isDouble,
  ]);

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
      if (isDouble) {
        setPlayerScore(playerScore + newScore * 2);
      } else {
        setPlayerScore(playerScore + newScore);
      }
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
    <main className={isDouble == false ? "main" : "DoubleMain"}>
      <InitialApresentation
        deckID={deckID}
        show={initialApresentation}
        setInitialApresentation={setInitialApresentation}
      />
      <RulesModal
        show={showRulesModal}
        handleClose={() => setShowRulesModal(false)}
      />
      <InfoModal
        show={showInfoModal}
        handleClose={() => setShowInfoModal(false)}
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
            isDouble={isDouble}
            setIsDouble={setIsDouble}
          />
        ) : (
          ""
        )}
      </MidSideSection>
      <BottomSideSection>
        <div className="info">
          <Button
            width="157px"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Reiniciar Jogo
          </Button>
          <Button width="157px" onClick={() => setShowRulesModal(true)}>
            Regras do Jogo
          </Button>
          <Button width="157px" onClick={() => setShowInfoModal(true)}>
            Valor das Cartas
          </Button>
        </div>
        <PlayerHand playerHand={playerHand} playerValue={playerValue} />
        <Score playerScore={playerScore} dealerScore={dealerScore} />
      </BottomSideSection>
    </main>
  );
}
