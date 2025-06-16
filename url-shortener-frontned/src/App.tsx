import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    if (!originalUrl) return alert('Please enter a URL');

    try {
      const response = await axios.post('http://localhost:5000/shorten', {
        originalUrl,
      });

      setShortUrl(response.data.shortUrl);
    } catch (err) {
      console.error(err);
      alert('Failed to shorten URL');
    }
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Paste your long URL here..."
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button onClick={handleShorten}>Shorten</button>

      {shortUrl && (
        <p>
          Short URL:{' '}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
