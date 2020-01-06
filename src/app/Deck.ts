import { Card, CardType, House, HandCard } from "./Card"

export class Deck
{
    deckCards: Card[];

    constructor()
    {
        this.deckCards = [];
        for(let ct = 0, i = 0; ct < 13; ct++)
        {
            for(let h = 0; h < 4; h++, i++)
            {
                //@ts-ignore
                this.deckCards[i] = new Card(CardType[CardType[ct + 2]], House[House[h]]);
            }
        }
    }

    shuffle() : void
    {
        for(let i = this.deckCards.length - 1; i > 0; i--)
        {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deckCards[i], this.deckCards[j]] = [this.deckCards[j], this.deckCards[i]];
        }
    }

    pull() : Card
    {
        return this.deckCards.shift();
    }

    return(card: Card) : void
    {
        this.deckCards.push(card);
    }
}