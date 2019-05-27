import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { red, white, green, blue, lightPurp } from "../utils/colors";

export default function Card(props) {
  const { index, deck, showAnswer, flip, answer } = props;
  const card = deck.questions[index];

  return (
    <View style={styles.container}>
      <Text style={styles.cardInfo}>
        {showAnswer ? card.answer : card.question}
      </Text>

      <TouchableOpacity onPress={flip}>
        <Text style={styles.flip}>
          {showAnswer ? "Show Question" : "Show Answer"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.answer} onPress={() => answer("correct")}>
        <Text style={styles.result}>Correct</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.answer, { backgroundColor: red }]}
        onPress={() => answer("incorrect")}
      >
        <Text style={styles.result}>Incorrect</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  answer: {
    width: 150,
    height: 50,
    backgroundColor: green,
    borderRadius: 0,
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center"
  },
  result: {
    color: white,
    fontSize: 16
  },
  cardInfo: {
    fontSize: 25,
    color: lightPurp,
    marginLeft: 15,
    marginRight: 15
  },
  flip: {
    marginTop: 20,
    marginBottom: 50,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: blue
  }
});
