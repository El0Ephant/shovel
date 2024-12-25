import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LocalStorage {
    constructor() {}

    async save(values) {
        await AsyncStorage.setItem('shovel', JSON.stringify(values))
    }

    async load() {
        const value = await AsyncStorage.getItem('shovel')
        return value != null ? JSON.parse(value) : null;;
    }
}