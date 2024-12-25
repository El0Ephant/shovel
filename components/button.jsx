import { Link } from 'expo-router';
import { Text, TouchableOpacity } from "react-native";
import { styles } from '../styles/styles'
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../redux/selectors'
import processStatus from '../redux/requestState';
import { fetchData } from '../redux/shovelSlice';

export default function Button({ text, callback, isActive}) {
    return <>

        <TouchableOpacity style={{ 
            ...styles.menuButton, 
            opacity: isActive ? 1 : 0.5}}
            disabled={!isActive}
            onPress={callback}
        >
            <Text style={styles.choiceText}>{text}</Text>
        </TouchableOpacity>
    </>
}

Button.defaultProps = {
    isActive: true,
}