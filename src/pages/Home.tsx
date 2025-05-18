import React, { useState } from 'react';
import ModelSelector from '../components/ModelSelector';
import ScriptWriter from '../components/ScriptWriter';

const Home: React.FC = () => {
  const [model, setModel] = useState('chatgpt');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-teal-400 mb-4">
        Welcome to CLIQUE Stream TV
      </h1>
      <ModelSelector onChange={setModel} />
      <ScriptWriter model={model} />
    </div>
  );
};

export default Home;
