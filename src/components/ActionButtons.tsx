
import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonsProps {
  transcript: string;
  onClear: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  transcript,
  onClear
}) => {
  const copyToClipboard = async () => {
    if (!transcript) {
      toast.error('Nothing to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(transcript);
      toast.success('Copied to clipboard');
    } catch (error) {
      console.error('Failed to copy', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const downloadTranscript = () => {
    if (!transcript) {
      toast.error('Nothing to download');
      return;
    }

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    
    a.href = url;
    a.download = `transcript-${date}.txt`;
    document.body.appendChild(a);
    a.click();
    
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    toast.success('Transcript downloaded');
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={copyToClipboard}
        disabled={!transcript}
      >
        <Copy size={18} />
        Copy
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={downloadTranscript}
        disabled={!transcript}
      >
        <Download size={18} />
        Download
      </Button>
      <Button
        variant="outline"
        className="flex items-center gap-2 text-destructive hover:text-destructive"
        onClick={onClear}
        disabled={!transcript}
      >
        <Trash2 size={18} />
        Clear
      </Button>
    </div>
  );
};

export default ActionButtons;
