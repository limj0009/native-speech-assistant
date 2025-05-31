import * as Speech from 'expo-speech';

export const unlockSpeech = () => {
  Speech.speak('');
};

export const cancelSpeech = () => {
  Speech.stop();
};
