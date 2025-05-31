import { View, Text, Button, StyleSheet } from "react-native";
import useSpeech from "./hooks/useSpeech";
import Response from "./components/response";
import { OPENAI_API_KEY } from '@env';

export default function App() {
  console.log("OpenAI key:", OPENAI_API_KEY);
  const { isListening, transcript, toggleListening } = useSpeech(OPENAI_API_KEY);

  return (
    <View style={styles.container}>
      <Text style={styles.transcript}>{transcript || "Say something..."}</Text>
      <Button title={isListening ? "Stop" : "Start"} onPress={toggleListening} />
      {!isListening && transcript && <Response transcript={transcript} apiKey={OPENAI_API_KEY} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  transcript: { fontSize: 16, marginBottom: 20, textAlign: "center" },
});
