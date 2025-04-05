
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center justify-center py-6">
      <h1 className="text-3xl font-bold tracking-tight text-primary">
        Whisper to Wordsmith
      </h1>
      <p className="text-muted-foreground mt-2 text-center max-w-md">
        Transform your voice into text instantly. Just click the microphone button and start speaking.
      </p>
    </header>
  );
};

export default Header;
