import { Pressable, Text, View } from "react-native";
import { Link } from 'expo-router';
import { styles } from '../styles/styles'
import { useDispatch, useSelector } from "react-redux";
import {fetchData} from '../redux/shovelSlice';
export default function Index() {
  //const value = useSelector();
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={()=>dispatch(fetchData())}>
        <Text style={styles.menuOption}>
          Загрузить данные
        </Text>
      </Pressable>
      <Link href="/game" style={styles.menuOption}>
        Новая игра
      </Link>
      <Link href="/game" style={styles.menuOption}>
        Продолжить
      </Link>
    </View>
  );
}
