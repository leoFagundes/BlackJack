"use client";

import { styled } from "styled-components";
import DiscardPile from "@/components/DiscardPile";
import DrawPile from "@/components/DrawPile";
import DealerHand from "@/components/DealerHand";
import PlayerHand from "@/components/PlayerHand";
import Score from "@/components/Score";
import { useEffect, useState } from "react";
import { Cards } from "@/types/types";

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
`

const BottomSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  background-color: #00ffff2b;
`;

export default function Home() {
  const [deckID, setDeckID] = useState('')
  const [drawnCards, setDrawnCards] = useState<string[]>([])
  const [playerHand, setPlayerHand] = useState<Cards[]>([])

  return (
    <main>
      <TopSideSection>
        <DiscardPile />
        <DealerHand />
        <DrawPile
          deckID={deckID}
          setDeckID={setDeckID}

          setDrawnCards={setDrawnCards}

          setPlayerHand={setPlayerHand}
        />
      </TopSideSection>
      <MidSideSection>
        {deckID != '' ? (
          <div>
            <button>teste</button>
            <button>teste</button>
            <button>teste</button>
          </div>
        ) : ('Crie um baralho')}
      </MidSideSection>
      <BottomSideSection>
        <div></div>
        <PlayerHand playerHand={playerHand} />
        <Score />
      </BottomSideSection>
    </main>
  );
}
