// src/tests/hooks/useVoiceSearch.test.ts
import { renderHook } from "@testing-library/react-hooks";
import { useVoiceSearch } from "../../hooks/useVoiceSearch";

// Mock react-speech-recognition
jest.mock("react-speech-recognition", () => ({
  useSpeechRecognition: jest.fn(),
}));

import SpeechRecognition from "react-speech-recognition";

describe("useVoiceSearch Hook", () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    (SpeechRecognition.useSpeechRecognition as jest.Mock).mockReturnValue({
      transcript: "",
      resetTranscript: jest.fn(),
      listening: false,
      browserSupportsSpeechRecognition: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns initial state", () => {
    const { result } = renderHook(() => useVoiceSearch(mockSetSearchTerm));
    expect(result.current.transcript).toBe("");
    expect(result.current.browserSupportsSpeechRecognition).toBe(true);
  });

  it("updates search term when transcript changes", () => {
    (SpeechRecognition.useSpeechRecognition as jest.Mock).mockReturnValue({
      transcript: "Jane",
      resetTranscript: jest.fn(),
      listening: false,
      browserSupportsSpeechRecognition: true,
    });

    const { result } = renderHook(() => useVoiceSearch(mockSetSearchTerm));
    expect(mockSetSearchTerm).toHaveBeenCalledWith("Jane");
  });

  it("starts voice search when startVoiceSearch is called", () => {
    const mockStartListening = jest.fn();
    (SpeechRecognition.useSpeechRecognition as jest.Mock).mockReturnValue({
      transcript: "",
      resetTranscript: jest.fn(),
      listening: false,
      browserSupportsSpeechRecognition: true,
      startListening: mockStartListening,
    });

    const { result } = renderHook(() => useVoiceSearch(mockSetSearchTerm));
    result.current.startVoiceSearch();

    expect(mockStartListening).toHaveBeenCalled();
  });

  it("resets transcript when resetTranscript is called", () => {
    const mockResetTranscript = jest.fn();
    (SpeechRecognition.useSpeechRecognition as jest.Mock).mockReturnValue({
      transcript: "Jane",
      resetTranscript: mockResetTranscript,
      listening: false,
      browserSupportsSpeechRecognition: true,
    });

    const { result } = renderHook(() => useVoiceSearch(mockSetSearchTerm));
    result.current.resetTranscript();

    expect(mockResetTranscript).toHaveBeenCalled();
  });
});