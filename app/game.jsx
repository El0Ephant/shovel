import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Modal } from "react-native";
import { Link } from "expo-router";
import { styles } from "../styles/styles";

export default function Game() {
  const [isChoice, setIsChoice] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для меню

  const choiceHandler = (choice) => {
    alert("Вы выбрали: " + choice);
    setIsChoice(false);
  };

  return (
    <ImageBackground
      source={require("../assets/image1.jpeg")} // Замените путь на ваш фон
      style={styles.backgroundImage}
    >
      {/* Диалоговое окно */}
      <View style={styles.dialogueContainer}>
        <Text style={styles.text}>
          {isChoice
            ? "Диалог с выбором варианта ответа"
            : "Простой диалог без выбора"}
        </Text>
      </View>

      {/* Условный рендеринг кнопок */}
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

      {/* Кнопка "Выйти" */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => setIsMenuOpen(true)} // Открываем меню
      >
        <Text style={styles.choiceText}>Меню</Text>
      </TouchableOpacity>

      {/* Модальное окно меню */}
      <Modal
        visible={isMenuOpen}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.menuOverlay}>
          <View style={styles.gameMenuContainer}>
            <TouchableOpacity
              style={styles.gameMenuButton}
              onPress={() => setIsMenuOpen(false)} // Закрываем меню
            >
              <Text style={styles.choiceText}>Продолжить</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gameMenuButton}>
              <Link href="/" style={styles.choiceText} onPress={() => setIsMenuOpen(false)}>
                Сохранить и выйти
              </Link>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}
