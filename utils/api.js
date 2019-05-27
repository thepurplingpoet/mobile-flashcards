import { AsyncStorage } from 'react-native'
export const DECKS_KEY = 'UdaciCards:Decks'

let decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  JavaScript1: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }, 
  JavaScript2: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

const getInitialDecks = ()=> {
    AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
    return decks
  }
  
const formatResults = (result)=> {
    return result === null
      ? getInitialDecks()
      : JSON.parse(result)
}

export const getDecks = ()=> {
    return AsyncStorage.getItem(DECKS_KEY)
    .then((result)=>{
        return formatResults(result);
    })
}

export const saveDeck = (key, deck)=> {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [key]: deck
    }))
}

export const saveCard = (key, question, answer)=> {
    AsyncStorage.getItem(DECKS_KEY)
    .then((result) => {
        let decks = JSON.parse(result)
        decks[key].questions.push({question: question, answer: answer})
        AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(decks))
    })
}