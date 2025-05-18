// src/components/ModelSelector.tsx
import React from 'react';

interface ModelSelectorProps {
  onChange(model: string): void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onChange }) => (
  <select
    className="mb-4 p-2 bg-gray-700 rounded text-white"
    onChange={e => onChange(e.target.value)}
  >
    <option value="chatgpt">ChatGPT</option>
    <option value="openrouter">OpenRouter</option>
  </select>
);

export default ModelSelector;
