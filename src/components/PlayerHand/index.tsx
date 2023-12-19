import React from "react";
import { CardImage } from "../styledComponents/CardStyled";
import { Cards } from "@/types/types";

interface Props {
  playerHand: Cards[]
}

export default function PlayerHand({ playerHand }: Props) {
  return (
    <>
      {playerHand.map((props, index) => (
        <div key={index}>
          <CardImage src={props.image} />
        </div>
      ))}
    </>
  )
}
