import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { Logo } from './Logo';

function Overlay() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <p
        style={{
          animation: 'scroll-left 15s linear infinite',
          fontSize: '13px',
        }}
      >
        WAY001 - Holloway - Out 01.01.01
      </p>
      <a
        href="https://pmnd.rs/"
        style={{
          position: 'absolute',
          bottom: 40,
          left: 90,
          fontSize: '13px',
        }}
      >
        WAY001
        <br />
        Holloway
      </a>
      <div
        style={{ position: 'absolute', top: 50, left: 40, fontSize: '13px' }}
      >
        Bandcamp —
      </div>
      <div
        style={{ position: 'absolute', top: 75, left: 40, fontSize: '13px' }}
      >
        Spotify —
      </div>
      <div
        style={{ position: 'absolute', top: 100, left: 40, fontSize: '13px' }}
      >
        Instagram —
      </div>
      <div
        style={{ position: 'absolute', top: 125, left: 40, fontSize: '13px' }}
      >
        RA —
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Overlay />
    <Logo />
  </>
);
