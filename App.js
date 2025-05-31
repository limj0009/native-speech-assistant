import { View, Text, Button, StyleSheet } from "react-native";
import useSpeech from "./hooks/useSpeech";
import Response from "./components/response";
import { unlockSpeech, cancelSpeech } from './components/speechControl';
import { OPENAI_API_KEY } from '@env';
import styles from "./AppStyles";

export default function App() {
  const { isListening, transcript, toggleListening } = useSpeech(OPENAI_API_KEY);

  const handleStartStop = () => {
    unlockSpeech();
    toggleListening();
  };

  const handleMute = () => {
    cancelSpeech();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.transcript}>{transcript || "Say something..."}</Text>

      <View style={styles.buttonWrapper}>
        <Button
          title={isListening ? "Stop" : "Start"}
          onPress={handleStartStop}
          color={isListening ? "red" : "green"}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          title="Mute"
          onPress={handleMute}
          color="#555"
        />
      </View>

      {!isListening && transcript && (
        <Response transcript={transcript} apiKey={OPENAI_API_KEY} />
      )}
    </View>
  );
}