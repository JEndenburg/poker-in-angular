import { Component, OnInit } from '@angular/core';
import { Card, CardType, House, HandCard } from "../Card";
import { Hand, Ranking } from "../Hand";
import { Deck } from "../Deck";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerHands: Hand[];
  deck: Deck;
  selectingPhase: boolean;
  playerWon: boolean;

  constructor() { }

  ngOnInit() {
    this.selectingPhase = true;
    this.playerWon = false;
    this.playerHands = 
    [
      new Hand(),
      new Hand(),
    ]
    this.deck = new Deck();
    this.deck.shuffle();

    this.playerHands[1].drawFromDeck(this.deck, true);
    this.playerHands[0].drawFromDeck(this.deck, false);
  }

  onSelect(card: HandCard)
  {
    card.isSelected = !card.isSelected;
  }

  redrawCards()
  {
    this.playerHands[0].redrawCards(this.deck);
    this.selectingPhase = false;
    this.calculateWinner();
  }
  
  calculateWinner()
  {
    let playerRanking = this.rankingToInt(this.playerHands[0].ranking);
    let dealerRanking = this.rankingToInt(this.playerHands[1].ranking);

    if(playerRanking == dealerRanking)
    {
      this.playerWon = this.playerHands[0].handValue > this.playerHands[1].handValue;
    }
    else
      this.playerWon = playerRanking > dealerRanking;
  }

  rankingToInt(ranking: Ranking)
  {
    switch(ranking)
    {
      case Ranking.HighCard: return 0;
      case Ranking.SinglePair: return 1;
      case Ranking.TwoPair: return 2;
      case Ranking.ThreeOfAKind: return 3;
      case Ranking.Straight: return 4;
      case Ranking.Flush: return 5;
      case Ranking.FullHouse: return 6;
      case Ranking.FourOfAKind: return 7;
      case Ranking.StraightFlush: return 8;
      case Ranking.RoyalFlush: return 9;
    }
  }
}