import { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

export const useVoiceSearch = (setSearchTerm: (value: string) => void) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchTerm(transcript);
    }
  }, [transcript, setSearchTerm]);

  const startVoiceSearch = () => SpeechRecognition.startListening();

  return { transcript, resetTranscript, startVoiceSearch, browserSupportsSpeechRecognition };
};