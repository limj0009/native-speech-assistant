import { OPENAI_API_KEY } from '@env';
import { View, Text, TouchableOpacity } from "react-native";
import useSpeech from "./hooks/useSpeech";
import Response from "./components/response";
import { unlockSpeech, cancelSpeech } from './components/speechControl';
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
      <TouchableOpacity
        style={[
          styles.button,
          isListening ? styles.stopButton : styles.startButton,
        ]}
        onPress={handleStartStop}
      >
        <Text style={styles.buttonText}>{isListening ? "Recording" : "Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.muteButton]} onPress={handleMute}>
        <Text style={styles.buttonText}>Mute</Text>
      </TouchableOpacity>

      {!isListening && transcript && (
        <Response transcript={transcript} apiKey={OPENAI_API_KEY} />
      )}
    </View>
  );
}