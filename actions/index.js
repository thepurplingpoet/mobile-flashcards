export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'


export const receiveDecks = (decks) => {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export const addDeck = (deckId, deck) => {
    return {
        type: ADD_DECK,
        deckId,
        deck
    }
}

export const addCard = (deckId, question, answer) => {
    return {
        type: ADD_CARD,
        deckId,
        question,
        answer
    }
}

