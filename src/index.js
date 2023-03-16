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
      }}
    >
      <a
        href="https://pmnd.rs/"
        style={{ position: 'absolute', bottom: 40, left: 90, fontSize: '13px' }}
      >
        WAY001
        <br />
        Holloway
      </a>
      <div
        style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}
      >
        bandcamp —
      </div>
      <div
        style={{ position: 'absolute', top: 60, left: 40, fontSize: '13px' }}
      >
        spotify —
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          fontSize: '13px',
        }}
      >
        02/03/2023
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
