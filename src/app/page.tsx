'use client'

import { useEffect, useState } from 'react'
import { Cards } from '../types/types'
import { createNewDeck, createPile, drawCards, listGame, reShuffleDeck } from '../services/services'
import { LabelContainer } from '@/components/styledComponents/LabelStyled'
import { CardImage } from '@/components/styledComponents/CardStyled'
import { styled } from 'styled-components'
import DiscardPile from '@/components/DiscardPile'
import DrawPile from '@/components/DrawPile'
import DealerHand from '@/components/Dealer\'sHand'


const TopSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  background-color: #4caf792b;
`

const BottomSideSection = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40vh;
  background-color: #00ffff2b;
`

export default function Home() {
  const [deckId, setDeckId] = useState('')
  const [drawedCards, setDrawedCards] = useState([])

  return (
    <main>
      <TopSideSection>
        <DiscardPile />
        <DealerHand />
        <DrawPile />
      </TopSideSection>
      <BottomSideSection>
      <DiscardPile />
        <DealerHand />
        <DrawPile />
      </BottomSideSection>
    </main>
  )
}
