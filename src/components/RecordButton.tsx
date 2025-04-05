
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';

interface RecordButtonProps {
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  hasRecognitionSupport?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isListening,
  onStartListening,
  onStopListening,
  hasRecognitionSupport = true,
}) => {
  return (
    <Button
      size="lg"
      variant={isListening ? "destructive" : "default"}
      className={`rounded-full w-16 h-16 flex items-center justify-center ${
        isListening ? 'pulse-animation bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
      }`}
      onClick={isListening ? onStopListening : onStartListening}
      disabled={!hasRecognitionSupport}
      aria-label={isListening ? "Stop recording" : "Start recording"}
    >
      {isListening ? (
        <MicOff className="h-6 w-6" />
      ) : (
        <Mic className="h-6 w-6" />
      )}
    </Button>
  );
};

export default RecordButton;
