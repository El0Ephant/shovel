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
    bottom: 20, 
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
  menuButton: {
    backgroundColor: "rgba(107, 131, 168, 1)", 
    padding: 15, 
    marginVertical: 5,
    borderRadius: 10,
    width: "20%", 
  },
  menuContainer: {
    flex: 1,
        justifyContent: "center",
        alignItems: "center",
  },
});
