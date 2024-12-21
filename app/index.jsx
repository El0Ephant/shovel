import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Link } from 'expo-router';
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from "react-redux";
import {fetchData} from '../redux/shovelSlice';
export default function Index() {
  //const value = useSelector();
  const dispatch = useDispatch();

  return (

    <ImageBackground
          source={require("../assets/image.jpg")} 
          style={styles.backgroundImage}>
    <View style={styles.menuContainer}>
              <TouchableOpacity 
              style={styles.menuButton}
              onPress={()=>dispatch(fetchData())}>
                <Text style={styles.choiceText}>Загрузить данные</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Link href="/game" style={styles.choiceText}>Новая игра</Link>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuButton}>
                <Link href="/game" style={styles.choiceText}>Продолжить</Link>
              </TouchableOpacity>
      </View>
      </ImageBackground>
  );
}