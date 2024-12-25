import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    position: "relative",
  },

  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dialogueContainer: {
    position: "absolute",
    bottom: "30%",
    left: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: "#ffffff",
    fontFamily: "Arial",
  },
  choicesContainer: {
    position: "absolute",
    bottom: "1%",
    left: 20,
    right: 20,
    alignItems: "center",
  },
  choiceButton: {
    backgroundColor: "rgba(107, 131, 168, 0.7)",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: "80%",
  },
  choiceText: {
    fontSize: 20,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Arial",
  },
  exitButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(107, 131, 168, 1)",
    padding: 10,
    borderRadius: 20,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Затемнение фона
    justifyContent: "center",
    alignItems: "center",
  },
  gameMenuContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  gameMenuButton: {
    backgroundColor: "rgba(107, 131, 168, 1)",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  menuButton: {
    backgroundColor: "rgba(107, 131, 168, 1)",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    width: "20%",
    alignItems: "center",
  },
});
