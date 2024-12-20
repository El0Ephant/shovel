import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../redux/store.js"

export default function RootLayout() {
  return <Provider store={store}>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="game" />
    </Stack>;
  </Provider>
}
