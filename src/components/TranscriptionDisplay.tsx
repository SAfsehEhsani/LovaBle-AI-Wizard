
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface TranscriptionDisplayProps {
  transcript: string;
  onTranscriptChange: (text: string) => void;
  isRecording: boolean;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({
  transcript,
  onTranscriptChange,
  isRecording
}) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <ScrollArea className="h-[300px] w-full rounded-md">
          <Textarea
            value={transcript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            placeholder="Your transcription will appear here..."
            className="min-h-[300px] border-none resize-none focus-visible:ring-0 p-0"
            readOnly={isRecording}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TranscriptionDisplay;
