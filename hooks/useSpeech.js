import { useState, useRef } from "react";
import { Audio } from "expo-av";
import { transcribeSpeech } from "../api/transcribe";

const useSpeech = (apiKey) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recordingRef = useRef(null);

  const startRecording = async () => {
    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) {
      return;
    }

    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      recordingRef.current = recording;
      setIsListening(true);
    } catch (error) {
      console.error(error);
    }
  };

  const transcribeInBackground = async (uri) => {
    try {
      const responseText = await transcribeSpeech(uri, apiKey);
      setTranscript(responseText);
    } catch (error) {
      console.error("Transcription error:", error);
    }
  };

  const stopRecording = async () => {
    const recording = recordingRef.current;
    if (!recording) return;

    try {
      const status = await recording.getStatusAsync();

      if (!status.isRecording && status.isDoneRecording) {
        return;
      }

      await recording.stopAndUnloadAsync();
      setIsListening(false);
      recordingRef.current = null;

      const uri = recording.getURI();
      if (uri) {
        transcribeInBackground(uri);
      }

    } catch (error) {
      console.error("stopRecording error:", error);
      setIsListening(false); 
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return {
    isListening,
    transcript,
    toggleListening,
  };
};

export default useSpeech;
