"use client";

import { styled } from "styled-components";
import DiscardPile from "@/components/DiscardPile";
import DrawPile from "@/components/DrawPile";
import DealerHand from "@/components/DealerHand";
import PlayerHand from "@/components/PlayerHand";
import Score from "@/components/Score";

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
  return (
    <main>
      <TopSideSection>
        <DiscardPile />
        <DealerHand />
        <DrawPile />
      </TopSideSection>
      <BottomSideSection>
        <div></div>
        <PlayerHand />
        <Score />
      </BottomSideSection>
    </main>
  );
}
