import React, { useState } from 'react';
import './App.css';

const songs = [
  {
    url: "https://cdn1.suno.ai/ba6b0a4b-8010-4524-9398-abca42ab5730.mp3",
    cover: "https://cdn2.suno.ai/ba6b0a4b-8010-4524-9398-abca42ab5730_050e7871.jpeg",
    title: "Autobiografía"
  },
  {
    url: "https://cdn1.suno.ai/bf8b7e25-6e9b-4ed2-a21d-6a77eac75fc1.mp3",
    cover: "https://cdn2.suno.ai/bf8b7e25-6e9b-4ed2-a21d-6a77eac75fc1_3fbe5e97.jpeg",
    title: "Mi amor por Charly Asekas"
  },
  {
    url: "https://cdn1.suno.ai/505848ad-dfec-4431-8c68-ad4631a3cb91.mp3",
    cover: "https://cdn2.suno.ai/505848ad-dfec-4431-8c68-ad4631a3cb91_058e271c.jpeg",
    title: "El Extensible de Asekas"
  },
  {
    url: "https://cdn1.suno.ai/71b8e029-3858-4704-9467-33f33afdad57.mp3",
    cover: "https://cdn2.suno.ai/image_large_71b8e029-3858-4704-9467-33f33afdad57.jpeg",
    title: "El Bad Boy de Benidorm"
  },
  {
    url: "https://cdn1.suno.ai/2f02f4ee-f603-4a76-9210-b40fdf4b5c8c.mp3",
    cover: "https://cdn2.suno.ai/image_large_2f02f4ee-f603-4a76-9210-b40fdf4b5c8c.jpeg",
    title: "charly haz mas directos"
  },
  {
    url: "https://cdn1.suno.ai/1b2561e6-f86d-4071-aac7-276d77f110a8.mp3",
    cover: "https://cdn2.suno.ai/image_large_1b2561e6-f86d-4071-aac7-276d77f110a8.jpeg",
    title: "La Leyenda de CharlyAsekas🐐"
  },
];

function App() {
  const [mode, setMode] = useState('gallery');
  const [currentIndex, setCurrentIndex] = useState(null);

  // Tamaños para el carrusel
  const ITEM_WIDTH = window.innerWidth * 0.75; // 75% ancho viewport
  const SIDE_VISIBILITY = ITEM_WIDTH * 0.15; // 15% visible de lado

  const goToViewer = (index) => {
    setCurrentIndex(index);
    setMode('viewer');
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : songs.length - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev < songs.length - 1 ? prev + 1 : 0));
  };

  const backToGallery = () => {
    setMode('gallery');
    setCurrentIndex(null);
  };

  return (
    <div className="app-container">
      <h1>Galería de Canciones SUNO</h1>

      {mode === 'gallery' && (
        <div className="grid-gallery">
          {songs.map((song, index) => (
            <div
              key={index}
              onClick={() => goToViewer(index)}
              className="song-tile"
              style={{ backgroundImage: `url(${song.cover})` }}
            >
              <div className="overlay">{song.title}</div>
            </div>
          ))}
        </div>
      )}

      {mode === 'viewer' && (
        <div className="carousel-container">
          <button onClick={backToGallery} className="back-button">🔙 Volver</button>

          <div
            className="carousel-wrapper"
            style={{
              width: ITEM_WIDTH + SIDE_VISIBILITY * 2,
            }}
          >
            <div
              className="carousel-track"
              style={{
                transform: `translateX(calc(${SIDE_VISIBILITY}px - ${currentIndex * (ITEM_WIDTH + 40)}px))`,
              }}
            >
              {songs.map((song, index) => (
                <div
                  className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                  key={index}
                  style={{ width: ITEM_WIDTH }}
                >
                  <img src={song.cover} alt={song.title} />
                  <h2>{song.title}</h2>
                  <audio controls src={song.url} style={{ width: '100%' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="viewer-controls">
            <button onClick={goPrev} className="nav-button left">⬅️</button>
            <button onClick={goNext} className="nav-button right">➡️</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
