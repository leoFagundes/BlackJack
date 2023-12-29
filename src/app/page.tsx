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
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FaList } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { GiRuleBook } from "react-icons/gi";
import { ImSpades } from "react-icons/im";
import { MdOutlineScoreboard } from "react-icons/md";
import ScoreModal from "@/components/Modal/ScoreModal/ScoreModal";

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

    @media screen and (max-width: 600px) {
      right: 5px;
      left: auto;
    }
  }
`;

export default function Home() {
  const [showButtons, setShowButtons] = useState(true);
  const [initialApresentation, setInitialApresentation] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowButtons(window.innerWidth >= 600);
    };

    // Verificar a largura da tela no carregamento inicial
    handleResize();

    // Adicionar um ouvinte de redimensionamento para atualizar o estado quando a largura da tela mudar
    window.addEventListener("resize", handleResize);

    // Remover o ouvinte de redimensionamento ao desmontar o componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  const [showScoreModal, setShowScoreModal] = useState(false);

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
      <ScoreModal
        playerScore={playerScore}
        dealerScore={dealerScore}
        show={showScoreModal}
        handleClose={() => setShowScoreModal(false)}
      />
      <TopSideSection>
        <DealerHand dealerHand={dealerHand} dealerValue={dealerValue} />

        {showButtons ? (
          <DrawPile
            showButtons={showButtons}
            deckID={deckID}
            setDeckID={setDeckID}
            setDrawnCards={setDrawnCards}
            setPlayerHand={setPlayerHand}
            setDealerHand={setDealerHand}
          />
        ) : (
          ""
        )}
      </TopSideSection>
      <MidSideSection>
        {showButtons ? (
          ""
        ) : (
          <DrawPile
            showButtons={showButtons}
            deckID={deckID}
            setDeckID={setDeckID}
            setDrawnCards={setDrawnCards}
            setPlayerHand={setPlayerHand}
            setDealerHand={setDealerHand}
          />
        )}
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
          {showButtons ? (
            <>
              <Button
                width="180px"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <VscDebugRestart /> Reiniciar Jogo
              </Button>
              <Button width="180px" onClick={() => setShowRulesModal(true)}>
                <GiRuleBook /> Regras do Jogo
              </Button>
              <Button width="180px" onClick={() => setShowInfoModal(true)}>
                <ImSpades /> Valor das Cartas
              </Button>
            </>
          ) : (
            <DropdownButton
              variant="success"
              title={<FaList />}
              onSelect={(eventKey) => {
                if (eventKey === "restart") {
                  localStorage.clear();
                  window.location.reload();
                } else if (eventKey === "rules") {
                  setShowRulesModal(true);
                } else if (eventKey === "info") {
                  setShowInfoModal(true);
                } else if (eventKey === "score") {
                  setShowScoreModal(true);
                }
              }}
            >
              <Dropdown.Item eventKey="restart">
                <VscDebugRestart /> Reiniciar Jogo
              </Dropdown.Item>
              <Dropdown.Item eventKey="rules">
                <GiRuleBook /> Regras do Jogo
              </Dropdown.Item>
              <Dropdown.Item eventKey="info">
                <ImSpades />
                Valor das Cartas
              </Dropdown.Item>
              <Dropdown.Item eventKey={"score"}>
                <MdOutlineScoreboard /> Pontuação
              </Dropdown.Item>
            </DropdownButton>
          )}
        </div>
        <PlayerHand playerHand={playerHand} playerValue={playerValue} />
        <Score playerScore={playerScore} dealerScore={dealerScore} />
      </BottomSideSection>
    </main>
  );
}
