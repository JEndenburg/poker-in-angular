import { Card, CardType, House, HandCard } from "./Card"
import { Deck } from "./Deck"

export class Hand
{
  cards: HandCard[];

  constructor()
  {
      this.cards = [];
  }

  drawFromDeck(deck: Deck, redrawUntilGood: boolean) : void
  {
      for(let i = 0; i < 5; i++)
      {
          this.cards[i] = new HandCard(deck.pull());
      }

      if(redrawUntilGood)
      {
        let attempts = 0;
        while(this.handValue < 40 || ((attempts++ < 1000000) && (Math.random() > 0.00001) && (this.ranking == Ranking.HighCard || this.ranking == Ranking.SinglePair || this.ranking == Ranking.TwoPair)))
        {
          this.redrawCards(deck);
          deck.shuffle();
        }
      }
  }
  
  redrawCards(deck: Deck) : void
  {
    for(let i = 0; i < this.cards.length; i++)
    {
      if(!this.cards[i].isSelected)
      {
        deck.return(this.cards[i].card);
        this.cards[i] = new HandCard(deck.pull());
      }
    }
  }
  
  public get ranking() : Ranking 
  {
    let houseMatches = [0,0,0,0];
    let matches = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(let card of this.cards)
    {
      matches[card.card._type]++;
      houseMatches[card.card._house]++;
    }

    let hasFlush = false;

    for(let i = 0; i < houseMatches.length; i++)
    {
      if(houseMatches[i] == 5)
        hasFlush = true;
    }

    let pairs = 0;
    let hasThreeOfAKind = false;

    let straightCounter = 0;
    let hasStraight = false;

    for(let i = 0; i < matches.length; i++)
    {
      if(matches[i] == 2)
        pairs++;
      else if(matches[i] == 3)
        hasThreeOfAKind = true;
      else if(matches[i] == 4)
        return Ranking.FourOfAKind;
      else if(matches[i] == 1)
      {
        straightCounter++;
        if(straightCounter == 5)
          hasStraight = true;
      }
      else
        straightCounter = 0;
    }

    if(hasStraight)
    {
      if(hasFlush)
      {
        if(this.handValue == 60)
          return Ranking.RoyalFlush;
        else
          return Ranking.StraightFlush;
      }
      else
        return Ranking.Straight;
    }
    else if(hasFlush)
      return Ranking.Flush;
    else if(hasThreeOfAKind)
    {
      if(pairs == 1)
        return Ranking.FullHouse;
      else
        return Ranking.ThreeOfAKind;
    }
    else if(pairs == 2)
      return Ranking.TwoPair;
    else if(pairs == 1)
      return Ranking.SinglePair;
    else
      return Ranking.HighCard;
  }
  
  
  public get handValue() : number 
  {
    let val = 0;
    for(let card of this.cards)
    {
      val += Number(card.card._type);
    }
    return val;
  }
}

export enum Ranking
{
  HighCard = "High Card",
  SinglePair = "Pair",
  TwoPair = "Two Pair",
  ThreeOfAKind = "Three of a Kind",
  Straight = "Straight",
  Flush = "Flush",
  FullHouse = "Full House",
  FourOfAKind = "Four of a Kind",
  StraightFlush = "Straight Flush",
  RoyalFlush = "Royal Flush"
}