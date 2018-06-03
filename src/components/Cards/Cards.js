import React from "react";
import "./Cards.css";

const Cards = props => (
  <div className="card">
    <div className="img-container">
      <span onClick={() => props.cardClick(props.id)  } value="clicked" className="cardClicked">
        <img className = "card-img" alt={props.name} src={props.image} />
      </span>
    </div>
  </div>
);

export default Cards;
