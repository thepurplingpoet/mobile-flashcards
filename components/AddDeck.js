import React from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { addDeck } from '../actions'
import { saveDeck } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, purple, lightPurp, blue } from '../utils/colors'

const generateUID = ()=> {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
CreateDeck = ({ onPress }) => {
    return (
        <TouchableOpacity
         onPress={onPress}>
            <Text style={styles.create}>CREATE DECK</Text>
        </TouchableOpacity>
    )
}

class AddDeck extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
    }

    submit = () => {
        const { name } = this.state
        if(name === ''){
            alert('Name of deck cannot be empty')
            return
        }
        const deckId = generateUID()
        const title = name
        const newDeck = {
            title: name,
            questions: []
        }
        this.props.dispatch(addDeck(deckId, newDeck))
        
        this.setState({name: ''})
        this.toDeck(deckId, title) 
        saveDeck(deckId, newDeck)
    }

    toDeck = (id, title) => {
        this.props.navigation.navigate('Deck', {deckId: id, deckName: title})
    }

    render(){
        const { name } = this.state

        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.description}>NAME OF THE DECK</Text>
                <TextInput
                 value={name}
                 style={styles.input}
                 onChangeText={(name) => this.setState({name})}
                />
                <CreateDeck onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        fontSize: 30,
        color: blue
    },
    input: {
        width: 275,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderColor: lightPurp,
        margin: 20
    },
    create: {
        color: purple,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default connect()(AddDeck)