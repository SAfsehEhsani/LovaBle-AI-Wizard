
import React, { useState } from 'react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import Header from '../components/Header';
import RecordButton from '../components/RecordButton';
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import ActionButtons from '../components/ActionButtons';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const [transcriptText, setTranscriptText] = useState('');
  
  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport
  } = useSpeechRecognition({
    onTranscript: (text) => setTranscriptText(text),
  });

  const handleTranscriptChange = (newText: string) => {
    setTranscriptText(newText);
  };

  const handleClearTranscript = () => {
    if (transcriptText) {
      resetTranscript();
      toast.success('Transcript cleared');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 bg-gradient-to-b from-secondary to-background">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-8">
        <Header />
        
        <Card className="w-full bg-card/80 backdrop-blur shadow-lg border-opacity-50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6">
              <TranscriptionDisplay 
                transcript={transcriptText}
                onTranscriptChange={handleTranscriptChange}
                isRecording={isListening}
              />
              
              <div className="flex flex-col items-center gap-4">
                <RecordButton 
                  isListening={isListening}
                  onStartListening={startListening}
                  onStopListening={stopListening}
                  hasRecognitionSupport={hasRecognitionSupport}
                />
                
                <p className="text-sm text-muted-foreground">
                  {isListening ? 'Listening... Speak now' : 'Click to start recording'}
                </p>
              </div>
              
              <ActionButtons 
                transcript={transcriptText}
                onClear={handleClearTranscript}
              />
            </div>
          </CardContent>
        </Card>
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Whisper to Wordsmith Wizard &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Speech to text conversion in your browser - no data sent to servers</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
