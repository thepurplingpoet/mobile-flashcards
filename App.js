import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList';
import {white, purple, grey, black, blue, lightPurp} from './utils/colors';
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/notifications'
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware';

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'ALL DECKS'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'ADD DECK'
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: blue,
      inactiveTintColor:purple,
      labelStyle: {
        fontSize: 20,
        paddingBottom: 10
      }
    }
  }
)

const Stack = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
          header: null
      }
  },
  AddDeck: {
      screen: AddDeck
  },
  AddCard: {
      screen: AddCard
  },
  Deck: {
      screen: Deck
  },
  Quiz: {
      screen: Quiz
  }
},
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: purple,
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: 'Roboto' // Default-fonts on android creating issues
      } ,
      headerTitleAllowFontScaling:false
    },
    cardStyle: {
      backgroundColor: white
    }
  }
)




export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>       
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Stack /> 
          </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom:24
    
  }
});
