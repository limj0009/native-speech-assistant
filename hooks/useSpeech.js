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

  const stopRecording = async () => {
    try {
      await recordingRef.current.stopAndUnloadAsync();
      const uri = recordingRef.current.getURI();
      const responseText = await transcribeSpeech(uri, apiKey);
      setTranscript(responseText);
    } catch (error) {
      console.error("stopRecording error:", error);
    } finally {
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
