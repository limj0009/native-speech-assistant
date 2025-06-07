import { useEffect } from "react";
import * as Speech from "expo-speech";
import { generateResponse } from "../api/api";

const Response = ({ transcript, apiKey }) => {
  useEffect(() => {
    if (transcript.trim() === "") {
      return;
    }

    let isCancelled = false;

    generateResponse(transcript, apiKey)
      .then((res) => {
        if (!isCancelled) {
          Speech.speak(res, {
            language: "en",
            pitch: 1.0,
            rate: 1.1,
          });
        }
      })
      .catch((err) => {
        console.error("LLM error:", err);
      });

    return () => {
      isCancelled = true;
      Speech.stop();
    };
  }, [transcript, apiKey]);

  return null;
};

export default Response;
