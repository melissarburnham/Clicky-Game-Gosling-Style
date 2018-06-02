import React, { Component } from "react";
import Cards from "./components/Cards";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./App.css";

const cardShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class App extends Component {
  state = {
    cards,
    currentScore: 0,
    highScore: 0,
    clicked: false,
    clickedArr: [],
    winOrLose: ""
  };

  cardClick = (id) => {
    this.setState({winOrLose:""})
    
    console.log(this.state.clicked)

    if (this.state.clickedArr.includes(id)) {
      this.setState({ currentScore: 0, highScore: this.state.highScore, clickedArr: [], winOrLose:"TRY AGAIN!!"});
      this.shuffleCards();
    } else {
      this.scoreIncrement();
      this.setState({clickedArr: [...this.state.clickedArr, id]});
      this.setState({currentScore: this.state.currentScore + 1});

      if (this.state.currentScore >= this.state.highScore) {
        this.setState({highScore: this.state.currentScore + 1});
      } 

      if (this.state.currentScore === 11) {
        this.setState({winOrLose: 'You Won! Play again?'})
        this.setState({currentScore: 0, highScore: this.state.highScore, clickedArr: []});
      }
    }
  };

  scoreIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({currentScore: newScore});
    this.shuffleCards();
  };

  shuffleCards = () => {
    let shuffledCards = cardShuffle(cards);
    this.setState({ cards: shuffledCards });
  };

  render() {
    return (
      <Wrapper>
        <Title>The One and Only Ryan Gosling!</Title>

            <div>Only click on each image once!!!</div>
            <div>Current Score: {this.state.currentScore}</div>
            <div>High Score : {this.state.highScore}</div>
            <div> {this.state.winOrLose}</div>
            {this.state.cards.map(card => (
                <Cards
                  key={card.id}
                  cardClick={this.cardClick}
                  scoreIncrement={this.scoreIncrement}
                  gameReset={this.gameReset}
                  cardShuffle={this.cardShuffle}
                  id={card.id}
                  image={card.image}
                />
            ))}
      </Wrapper>
    );
  }
}

export default App;
