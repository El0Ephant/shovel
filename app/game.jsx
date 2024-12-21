import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { styles } from "../styles/styles";

export default function Game() {
  const [isChoice, setIsChoice] = useState(true); 

  const choiceHandler = (choice) => {
    alert("Вы выбрали: " + choice); 
    setIsChoice(false);
  };

  return (
    <ImageBackground
      source={require("../assets/image1.jpeg")} 
      style={styles.backgroundImage}>
        
      <View style={styles.dialogueContainer}>
        <Text style={styles.text}>
          {isChoice
            ? "Диалог с выбором варианта ответа"
            : "Прост диалог без выбора"}
        </Text>
      </View>
      
      {isChoice && (
        <View style={styles.choicesContainer}>
          <TouchableOpacity
            style={styles.choiceButton}
            onPress={() => choiceHandler("Вариант 1")}
          >
            <Text style={styles.choiceText}>Вариант 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceButton}
            onPress={() => choiceHandler("Вариант 2")}
          >
            <Text style={styles.choiceText}>Вариант 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.choiceButton}
            onPress={() => choiceHandler("Вариант 3")}
          >
            <Text style={styles.choiceText}>Вариант 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}
