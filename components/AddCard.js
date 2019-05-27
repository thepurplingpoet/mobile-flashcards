import React from 'react'
import { Text, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native'
import { addCard } from '../actions'
import { saveCard } from '../utils/api'
import { connect } from 'react-redux'
import { white, black, purple, blue, lightPurp } from '../utils/colors'

Create = ({ onPress }) => {
    return (
        <TouchableOpacity
         onPress={onPress}>
            <Text style={styles.create}>CREATE CARD</Text>
        </TouchableOpacity>
    )
}

class AddCard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            question: '',
            answer: ''
        }
    }

    submit = () => {
        const { question, answer } = this.state
        const { deckId, dispatch } = this.props
        if(question === '' || answer === ''){
            alert('Enter both question and answer!')
            return 
        }

        dispatch(addCard(deckId, question, answer))
        this.setState({
            question: '',
            answer: ''
        })
        saveCard(deckId, question, answer) 
    }

    render(){
        const { question, answer } = this.state
        
        return(
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.text}>Question</Text>
                <TextInput
                 value={question}
                 style={styles.input}
                 onChangeText={(question) => this.setState({question})}
                 autoFocus={true}
                />
                <Text style={styles.text}>Answer</Text>
                <TextInput
                 value={answer}
                 style={styles.input}
                 onChangeText={(answer) => this.setState({answer})}
                />
                <Create onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        alignSelf: 'center',
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

function mapStateToProps(state, { navigation }){
    const { deckId } = navigation.state.params
    return {
        deckId
    }
}

export default connect(mapStateToProps)(AddCard)