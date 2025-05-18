import React from 'react';

const Profile: React.FC = () => {
  const user = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    joined: 'May 1, 2025',
    uploads: 12,
    subscribers: 128,
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-teal-400 mb-4">Your Profile</h1>
      <div className="bg-gray-800 p-4 rounded-lg space-y-2">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Joined:</strong> {user.joined}</div>
        <div><strong>Uploads:</strong> {user.uploads}</div>
        <div><strong>Subscribers:</strong> {user.subscribers}</div>
      </div>
    </div>
  );
};

export default Profile;
