import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import Number from "../components/Number";

export default function StartGameScreen(props) {
  const [enteredNumber, setEnteredNumber] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [savedNumber, setSavedNumber] = useState(null);
  const [inputContainerWidth, setInputContainerWidth] = useState(
    Dimensions.get("window").width * 0.9
  );

  useEffect(() => {
    const updateLayout = () => {
      setInputContainerWidth(Dimensions.get("window").width * 0.9);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const handleNumberChange = (val) => {
    const newval = val.replace(/[^0-9]/g, "");
    setEnteredNumber(newval);
  };

  const resetInputHandler = () => {
    setEnteredNumber(""); //
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredNumber);
    if (chosenNumber <= 0 || chosenNumber === NaN || chosenNumber > 99) {
      Alert.alert("Invalid number", "Number should be between 0 and 99.", [
        {
          text: "Okay",
          style: "destructive",
          onPress: () => resetInputHandler(),
        },
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredNumber("");
    setSavedNumber(chosenNumber);
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <View>
        <Card style={styles.chosenNumber}>
          <Text>Chosen Number</Text>
          <Number>{savedNumber}</Number>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Start"
                color={colors.primary}
                onPress={() => {
                  resetInputHandler();
                  props.startGameHandler(savedNumber);
                }}
              ></Button>
            </View>
          </View>
        </Card>
      </View>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a new game!</Text>
            <Card
              style={{ ...styles.inputContainer, width: inputContainerWidth }}
            >
              <Text>Select a number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                value={enteredNumber}
                onChangeText={handleNumberChange}
              />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="Reset"
                    color={colors.primary}
                    onPress={() => resetInputHandler()}
                  ></Button>
                </View>
                <View style={styles.button}>
                  <Button
                    title="Confirm"
                    color={colors.accent}
                    onPress={() => confirmInputHandler()}
                  ></Button>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    // width: "95%",
    // maxWidth: "80%",
    alignItems: "center",
    marginTop: Dimensions.get("window").height > 400 ? 70 : 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
  },
  button: {
    width: 100,
  },
  input: { width: 50 },
  chosenNumber: {
    marginVertical: 20,
  },
});
