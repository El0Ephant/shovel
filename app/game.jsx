import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Modal, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import * as selectors from '../redux/selectors'
import processStatus from "@/redux/requestState";
import { choice, handleNextParagraph, saveData, saveStatusClear } from "@/redux/shovelSlice";
import { useRouter } from "expo-router";

export default function Game() {
  const [isChoice, setIsChoice] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Состояние для меню

  const showChoices = useSelector(selectors.selectShowChoices);
  const descriptions = useSelector(selectors.selectChoices);
  const saveStatus = useSelector(selectors.selectSaveStatus);
  const paragraph = useSelector(selectors.selectParagraph);
  const image = useSelector(selectors.selectImage);
  const isFinal = useSelector(selectors.selectIsFinal);

  const dispatch = useDispatch();

  const router = useRouter();

  const onTouch = () => {
    if (!isFinal) {
      dispatch(handleNextParagraph())
    }
  }

  useEffect(() => {
    if (saveStatus == processStatus.succeeded) {
      setIsMenuOpen(false); // Закрываем меню
      router.back();
      dispatch(saveStatusClear());
    }
  }, [saveStatus])


  return (
    <TouchableWithoutFeedback onPress={onTouch}>
      <ImageBackground
        source={{
          uri: image,
        }}
        style={styles.backgroundImage}
      >

        {/* Текст */}
        <TouchableWithoutFeedback onPress={onTouch}>
          <View style={styles.dialogueContainer}>
            <Text style={styles.text}>
              {paragraph}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        {/* Условный рендеринг кнопок */}
        <Modal
          visible={showChoices && !isFinal}
          animationType="fade"
          transparent={true}
        >

          <View style={styles.menuOverlay}>
            <View style={styles.gameMenuContainer}>
              {Object.keys(descriptions).map(curchoice =>
                <TouchableOpacity
                  style={styles.choiceButton}
                  onPress={() => {
                    dispatch(choice(curchoice))
                  }}
                >
                  <Text style={styles.choiceText}>{descriptions[curchoice]}</Text>
                </TouchableOpacity>)}
            </View>
          </View>
        </Modal>

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
                onPress={
                  () => { }
                }
              >
                <Text style={styles.choiceText}>Продолжить</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gameMenuButton}
                onPress={
                  () => { dispatch(saveData()) }
                }>
                {saveStatus === processStatus.inProgress ?
                  <ActivityIndicator size="large" color="#0000ff" />
                  :
                  <Text style={styles.choiceText}>
                    Сохранить и выйти
                  </Text>
                }

              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}
