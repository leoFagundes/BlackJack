"use client";

import { styled } from "styled-components";
import DiscardPile from "@/components/DiscardPile";
import DrawPile from "@/components/DrawPile";
import DealerHand from "@/components/DealerHand";
import PlayerHand from "@/components/PlayerHand";
import Score from "@/components/Score";
import { useState } from "react";

const TopSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  background-color: #4caf792b;
`;

const BottomSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  background-color: #00ffff2b;
`;

export default function Home() {
  const [deckID, setDeckID] = useState('')

  return (
    <main>
      <TopSideSection>
        <DiscardPile />
        <DealerHand />
        <DrawPile deckID={deckID} setDeckID={setDeckID} />
      </TopSideSection>
      <BottomSideSection>
        <div></div>
        <PlayerHand />
        <Score />
      </BottomSideSection>
    </main>
  );
}
