'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Cards } from '../../types/types'
import { createNewDeck, createPile, drawCards, listGame, reShuffleDeck } from '../../services/services'

export default function Home() {
  //api -> https://deckofcardsapi.com/
  const [deckId, setDeckId] = useState('')
  const [drawedCards, setDrawedCards] = useState([])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello, World!
      <div onClick={async () => {
        const newDeckId = await createNewDeck();
        setDeckId(newDeckId);
      }}>Create Deck</div>

      <div onClick={() => reShuffleDeck(deckId)}>Embaralhar</div>

      <div onClick={async () => {
        const newCards = await drawCards(deckId, '3');
        setDrawedCards(newCards)
      }}>Draw 3 cards</div>

      <div onClick={() => createPile(deckId, 'Leo', drawedCards)}>Create PIle</div>
      
      <div onClick={() => listGame(deckId)}>List ALl</div>
    </main>
  )
}
