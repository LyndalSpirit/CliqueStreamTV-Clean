// src/components/ScriptWriter.tsx
import React, { useState } from 'react';

interface ScriptWriterProps {
  model: string;
}

const ScriptWriter: React.FC<ScriptWriterProps> = ({ model }) => {
  const [prompt, setPrompt] = useState('');
  const [script, setScript] = useState<string | null>(null);

  const handleGenerate = () => {
    // TODO: replace with real AI API call
    setScript(`(Mocked ${model} response) Your script for: "${prompt}"`);
  };

  return (
    <div className="space-y-2">
      <textarea
        className="w-full p-2 bg-gray-700 rounded text-white"
        rows={4}
        placeholder="Enter a prompt to generate a script"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 text-white"
      >
        Generate Script
      </button>
      {script && (
        <pre className="mt-4 p-4 bg-gray-800 rounded text-sm whitespace-pre-wrap">
          {script}
        </pre>
      )}
    </div>
  );
};

export default ScriptWriter;
