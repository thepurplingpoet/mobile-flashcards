import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {lightPurp, purple, blue } from '../utils/colors'
import { withNavigation } from 'react-navigation'

function Score(props){
    const { correct, incorrect, restart, deck, deckId, navigation} = props

    return(
        <View style={styles.container}>
            <Text style={styles.score}>Correct: {correct}</Text>
            <Text style={styles.score}>Incorrect: {incorrect}</Text>
            <Text style={styles.score}>{Math.round((correct/deck.questions.length)*100)}%</Text>

            <TouchableOpacity
             onPress={restart}
            >
                <Text style={styles.restart}>RESTART</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={() => navigation.navigate('Deck', {deckId: deckId, deckName: deck.title})}
            >
                <Text style={styles.back}>BACK TO DECK</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        alignContent:'center',
        justifyContent:'center'
      },
      restart: {
        color: lightPurp,
        fontSize: 40
      },back: {
        color: blue,
        fontSize: 40
      },
    score: {
        color: purple,
        fontSize: 25,
        marginBottom: 5
    }
  })

export default withNavigation(Score)