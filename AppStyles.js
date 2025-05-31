import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  transcript: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: "70%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  startButton: {
    backgroundColor: "#80bc24",
  },
  stopButton: {
    backgroundColor: "#f08058",
  },
  muteButton: {
    backgroundColor: "#6d5850",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default styles;
