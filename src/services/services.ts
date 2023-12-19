import axios from "axios";
import { Cards } from "../types/types";

export const createNewDeck = async () => {
  try {
    const response = await axios.get("https://deckofcardsapi.com/api/deck/new");
    return response.data.deck_id;
  } catch (error) {
    throw error;
  }
};

export const reShuffleDeck = async (deckId: string) => {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/?remaining=true`,
    );
    console.log("Baralho Embaralhado");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const drawCards = async (deckId: string, count: string) => {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`,
    );
    console.log(`${count} cartas compradas:`, response.data);
    return response.data.cards;
  } catch (error) {
    throw error;
  }
};

export const createPile = async (
  deckId: string,
  pileName: string,
  cards: Cards[],
) => {
  const cardsToAddList: string[] = cards.map((card) => card.code);
  const cardsToAdd: string = cardsToAddList.join(",");
  console.log("CARDS TO ADD:", cardsToAdd);
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/add/?cards=${cardsToAdd}`,
    );
    console.log(`Pile Response:`, response);
  } catch (error) {
    console.log(error);
  }
};

export const listGame = async (deckId: string, pileName: string) => {
  try {
    const response = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/pile/${pileName}/list`,
    );
    console.log(`List Game Response:`, response);
    return response.data.piles[pileName].cards;
  } catch (error) {
    console.log(error);
  }
};
