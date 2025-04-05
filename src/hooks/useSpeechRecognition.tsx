
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

interface UseSpeechRecognitionProps {
  onTranscript?: (transcript: string) => void;
  continuous?: boolean;
  language?: string;
}

export function useSpeechRecognition({
  onTranscript,
  continuous = true,
  language = 'en-US',
}: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  // Initialize the speech recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      toast.error('Speech recognition is not supported in this browser.');
      return;
    }

    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = continuous;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = language;

    recognitionInstance.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const newTranscript = finalTranscript || interimTranscript;
      setTranscript(prevTranscript => {
        const updatedTranscript = prevTranscript ? `${prevTranscript} ${newTranscript}` : newTranscript;
        if (onTranscript) {
          onTranscript(updatedTranscript);
        }
        return updatedTranscript;
      });
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        toast.error('Microphone access was denied. Please enable microphone access to use speech recognition.');
      } else {
        toast.error(`Error occurred in speech recognition: ${event.error}`);
      }
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [continuous, language, onTranscript]);

  const startListening = useCallback(() => {
    if (!recognition) return;

    try {
      recognition.start();
      setIsListening(true);
      toast.success('Listening started');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      toast.error('Failed to start speech recognition');
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (!recognition) return;

    recognition.stop();
    setIsListening(false);
    toast.success('Listening stopped');
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    if (onTranscript) {
      onTranscript('');
    }
  }, [onTranscript]);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport: !!recognition,
  };
}

// Add type declaration for browsers
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}
