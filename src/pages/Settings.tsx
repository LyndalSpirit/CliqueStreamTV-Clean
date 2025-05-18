import React, { useState } from 'react';

const Settings: React.FC = () => {
  const [username, setUsername] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = () => {
    // TODO: wire up to your user API
    alert('Settings saved!');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-teal-400 mb-4">Settings</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300">Username</label>
          <input
            className="w-full p-2 bg-gray-700 rounded text-white"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-300">Email</label>
          <input
            className="w-full p-2 bg-gray-700 rounded text-white"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={e => setDarkMode(e.target.checked)}
            className="mr-2"
          />
          <label className="text-gray-300">Dark Mode</label>
        </div>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-teal-500 rounded hover:bg-teal-600 text-white"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
