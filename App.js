<script src="http://localhost:8097"></script>;
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Win from "./screens/Win";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [win, setWin] = useState(false);

  const startGameHandler = (num) => {
    setUserNumber(num);
  };

  const handleWin = (val) => {
    setWin(val);
  };

  let content = <StartGameScreen startGameHandler={startGameHandler} />;
  if (userNumber && !win) {
    content = <GameScreen useChoice={userNumber} handleWin={handleWin} />;
  }
  if (win) {
    content = <Win />;
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number"></Header>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
