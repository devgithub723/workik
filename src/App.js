import React from 'react';

const App = () => {
  const connectGitHub = () => {
    window.location.href = '/auth/github'; // Redirect to your backend for OAuth
  };

  return (
    <div>
      <h1>Automatic GitHub PR Review System</h1>
      <button onClick={connectGitHub}>Connect GitHub</button>
    </div>
  );
};

export default App;
