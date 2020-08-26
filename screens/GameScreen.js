import React, { useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import Number from "../components/Number";
import Card from "../components/Card";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.useChoice)
  );

  const [minSide, setMinSide] = useState(1);
  const [maxSide, setMaxSide] = useState(100);

  const handleMaxSide = (maxSide) => {
    if (currentGuess > props.useChoice) {
      setMaxSide(maxSide);
      const rand = generateRandomBetween(minSide, maxSide, currentGuess);
      setCurrentGuess(rand);
      if (rand === props.useChoice) {
        console.log("winnnn", rand);
        props.handleWin(true);
      }
    } else {
      Alert.alert("Don't lie");
    }
  };

  const handleMinSide = (minSide) => {
    if (currentGuess < props.useChoice) {
      setMinSide(minSide);
      const rand = generateRandomBetween(minSide, maxSide, currentGuess);
      setCurrentGuess(rand);
      if (rand === props.useChoice) {
        props.handleWin(true);
      }
    } else {
      Alert.alert("Don't lie");
    }
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <Number>{currentGuess}</Number>
      <Card style={styles.buttonContainer}>
        <Button
          title="Lower"
          onPress={() => {
            handleMaxSide(currentGuess);
            generateRandomBetween(minSide, maxSide, props.useChoice);
          }}
        />
        <Button
          title="Greater"
          onPress={() => {
            handleMinSide(currentGuess);
            generateRandomBetween(minSide, maxSide, props.useChoice);
          }}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
