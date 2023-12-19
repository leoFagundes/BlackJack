"use client";

import { styled } from "styled-components";
import DiscardPile from "@/components/DiscardPile";
import DrawPile from "@/components/DrawPile";
import DealerHand from "@/components/DealerHand";
import PlayerHand from "@/components/PlayerHand";
import Score from "@/components/Score";
import { useEffect, useState } from "react";
import { Cards } from "@/types/types";
import { Button } from "@/components/styledComponents/ButtonStyled";

const TopSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  background-color: #4caf792b;
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
  height: 40vh;
  background-color: #00ffff2b;
`;

export default function Home() {
  const [deckID, setDeckID] = useState("");
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const [playerHand, setPlayerHand] = useState<Cards[]>([]);
  const [dealerHand, setDealerHand] = useState<Cards[]>([]);
  const [playerValue, setPlayerValue] = useState<number>(0);
  const [dealerValue, setDealerValue] = useState<number>(0);

  useEffect(() => {
    // Mapeia os valores das cartas considerando KING, QUEEN, etc. como 10
    const sum = playerHand.reduce((total, card) => {
      let cardValue = card.value;

      // Verifica se o valor é uma carta da família real
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        cardValue = "10";
      }

      // Verifica se o valor é um ás (ACE)
      if (card.value === "ACE") {
        // Se a soma atual for maior que 10, considera o ás como 1, senão, como 11
        cardValue = total + 11 > 21 ? "1" : "11";
      }

      // Converte o valor da carta para número e adiciona ao total
      return total + parseInt(cardValue, 10);
    }, 0);

    // Atualiza o state com a soma dos valores
    setPlayerValue(sum);

    // Verifica se a soma ultrapassou 21
    if (sum > 21) {
      console.log("Estourou! O jogador perdeu.");
    }
  }, [playerHand]);

  useEffect(() => {
    // Mapeia os valores das cartas considerando KING, QUEEN, etc. como 10
    const sum = dealerHand.reduce((total, card) => {
      let cardValue = card.value;

      // Verifica se o valor é uma carta da família real
      if (["KING", "QUEEN", "JACK"].includes(card.value)) {
        cardValue = "10";
      }

      // Verifica se o valor é um ás (ACE)
      if (card.value === "ACE") {
        // Se a soma atual for maior que 10, considera o ás como 1, senão, como 11
        cardValue = total + 11 > 21 ? "1" : "11";
      }

      // Converte o valor da carta para número e adiciona ao total
      return total + parseInt(cardValue, 10);
    }, 0);

    // Atualiza o state com a soma dos valores
    setDealerValue(sum);

    // Verifica se a soma ultrapassou 21
    if (sum > 21) {
      console.log("Estourou! O dealer perdeu.");
    }
  }, [dealerHand]);

  return (
    <main>
      <TopSideSection>
        <DiscardPile />
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
          <div>
            <Button>Teste</Button>
            <Button>Teste</Button>
            <Button>Teste</Button>
          </div>
        ) : (
          "Crie um baralho"
        )}
      </MidSideSection>
      <BottomSideSection>
        <div></div>
        <PlayerHand playerHand={playerHand} playerValue={playerValue} />
        <Score />
      </BottomSideSection>
    </main>
  );
}
