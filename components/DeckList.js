import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import { receiveDecks } from "../actions";
import { connect } from "react-redux";
import { getDecks } from "../utils/api";
import { AppLoading } from "expo";
import { black, white, gray, purple, blue, lightPurp } from "../utils/colors";

const Decks = props => {
  return (
    <TouchableOpacity
      style={styles.decks}
      onPress={() =>
        props.navigation.navigate("Deck", {
          deckId: props.id,
          deckName: props.title
        })
      }
    >
      <Text style={styles.title}> {props.title} </Text>
      <Text style={styles.count}>
        {props.count} {props.count === 1 ? `card` : `cards`}
      </Text>
    </TouchableOpacity>
  );
};

class DeckList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() =>
        this.setState(() => ({
          loading: false
        }))
      );
  }

  render() {
    const { loading } = this.state;
    const { decks, navigation } = this.props;
    if (loading === true) return <AppLoading />;
    return (
      <View style={styles.main}>
      <View><Text style={styles.udaciCards}>UDACI-CARDS</Text></View>
      <View>
        <FlatList
          data={Object.keys(decks).map(id => {
            return {
              key: id
            };
          })}
          renderItem={({ item }) => (
            <Decks
              key={item.key}
              id={item.key}
              title={decks[item.key].title}
              count={decks[item.key].questions.length}
              navigation={navigation}
            />
          )}
        />
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginBottom:60
  },
  title: {
    fontSize: 30,
    color: purple
  },
  count: {
    marginTop: 10,
    fontSize: 22,
    color: blue
  },
  decks: {
    backgroundColor: white,
    borderRadius: 0,
    borderColor: black,
    borderWidth: 1,
    padding: 15,
    margin:10,
    justifyContent: "center",
    alignItems: "center"
  }, 
  udaciCards:{
    color: lightPurp,
    backgroundColor:gray,
    padding: 10,
    fontSize:30,
    alignSelf:"center"

  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
