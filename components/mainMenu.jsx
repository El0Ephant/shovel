import { Link, useRouter } from 'expo-router';
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from '../styles/styles'
import { useSelector, useDispatch } from 'react-redux';
import * as selectors from '../redux/selectors'
import processStatus from '../redux/requestState';
import { fetchData, newGame, choice } from '../redux/shovelSlice';
import Button from './button';

export default function MainMenu() {
    const dispatch = useDispatch();
    const fetchStatus = useSelector(selectors.selectFetchStatus);
    const canContinue = useSelector(selectors.selectContinue);
    const router = useRouter()

    return <>
        <TouchableOpacity
            style={styles.menuButton}
            onPress={() => dispatch(fetchData())}>

            {[processStatus.inProgress, undefined].includes(fetchStatus) &&
                <ActivityIndicator size="large" color="#0000ff" />}

            {[processStatus.initial, processStatus.succeeded, processStatus.failed].includes(fetchStatus) &&
                <Text style={styles.choiceText}>Загрузить данные</Text>}
        </TouchableOpacity>


        <Button text="Новая игра"
            isActive={fetchStatus === processStatus.succeeded}
            callback={() => {
                dispatch(newGame())
                router.push('/game')
            }}></Button>

        <Button text="Продолжить"
            isActive={fetchStatus === processStatus.succeeded && canContinue}
            callback={() => {
                router.push('/game')
            }}></Button>
    </>
}