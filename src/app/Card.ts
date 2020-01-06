export class Card
{
    _house: House;
    _type: CardType;

    constructor(type: CardType, house: House)
    {
        this._house = house;
        this._type = type;
    }
    
    public get house() : string 
    {
        return House[this._house];
    }
    
    
    public get type() : string 
    {
        return CardType[this._type];
    }

    public get color() : Color
    {
        switch(this._house)
        {
            case House.Hearts:
            case House.Diamonds:
                return Color.Red;
            case House.Clubs:
            case House.Spades:
                return Color.Black;
        }
    }
    
}

export class HandCard
{
  card: Card;
  isSelected: Boolean;

  constructor(card: Card)
  {
    this.card = card;
    this.isSelected = false;
  }

  
  public get house() : string {
    return this.card.house;
  }

  
  public get type() : string {
    return this.card.type;
  }
  
  
  public get color() : Color {
    return this.card.color;
  }
  
}

export enum House
{
    Hearts,
    Diamonds,
    Spades,
    Clubs
}

export enum CardType
{
    Ace = 14,
    Two = 2,
    Three = 3,
    Four = 4,
    Five = 5,
    Six = 6,
    Seven = 7,
    Eight = 8,
    Nine = 9,
    Ten = 10,
    Jack = 11,
    Queen = 12,
    King = 13
}

export enum Color
{
    Red = "red",
    Black = "black"
}