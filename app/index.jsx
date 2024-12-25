import { View, Text,ImageBackground, ActivityIndicator } from "react-native";
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from "react-redux";
import { loadData } from '../redux/shovelSlice';
import { useEffect } from 'react';
import * as selectors from '../redux/selectors'
import processStatus from "../redux/requestState";
import MainMenu from "../components/mainMenu";

export default function Index() {
  const dispatch = useDispatch();
  const loadStatus = useSelector(selectors.selectLoadStatus);

  useEffect(
    () => {
      dispatch(loadData())
    },
    [dispatch]);

  return (

    <ImageBackground
      source={require("../assets/image.jpg")}
      style={styles.backgroundImage}>

      <View style={styles.menuContainer}>
        {
          [processStatus.initial, processStatus.inProgress, undefined].includes(loadStatus) &&
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Загрузка сохранений...</Text>
          </>
        }

        {
          [processStatus.succeeded, processStatus.failed].includes(loadStatus) &&
            <MainMenu></MainMenu>

        }
      </View>
    </ImageBackground>
  );
}