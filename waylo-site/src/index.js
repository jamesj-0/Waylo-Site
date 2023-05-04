import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import Marquee from 'react-fast-marquee';
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
      <Marquee speed={50}>
        <p
          className="item"
          style={{
            fontSize: '16px',
            width: '150vw',
            color: '#1F232D',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontSize: '15px',
              fontFamily: 'Eurostile-Wide',
            }}
          >
            WAY
          </span>
          <span
            style={{
              fontSize: '15px',
              fontFamily: 'Times',
              fontStyle: 'italic',
            }}
          >
            001
          </span>
          {'  '}
          {'  '}
          <span style={{ fontSize: '14px', fontFamily: 'Eurostile-Wide' }}>
            Event - 7th July - The Carpet Shop Peckham - Parris - Mosca - Nadí -
            Holloway
          </span>
        </p>
      </Marquee>
      <p
        style={{
          position: 'absolute',
          bottom: 20,
          left: 90,
          fontSize: '16px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontFamily: 'Eurostile-Wide',
            color: '#1F232D',
          }}
        >
          WAY
        </span>
        <span
          style={{
            fontSize: '16px',
            fontFamily: 'Times',
            fontStyle: 'italic',
            color: '#1F232D',
          }}
        >
          001
        </span>
        <br />
        <span
          style={{ fontSize: '16px', fontFamily: 'SFPro', color: '#1F232D' }}
        >
          Holloway
        </span>
      </p>
      <a
        style={{
          position: 'absolute',
          fontFamily: 'Eurostile-Wide',
          top: 100,
          left: 40,
          color: '#1F232D',

          fontSize: '16px',
        }}
        href="https://waylo-records.bandcamp.com/releases"
        target="_blank"
      >
        Bandcamp —
      </a>
      <a
        style={{
          position: 'absolute',
          fontFamily: 'Eurostile-Wide',
          top: 125,
          left: 40,
          color: '#1F232D',

          fontSize: '16px',
        }}
        href="https://www.instagram.com/waylo_records/"
        target="_blank"
      >
        Instagram —
      </a>
      <a
        style={{
          position: 'absolute',
          fontFamily: 'Eurostile-Wide',
          top: 150,
          left: 40,
          color: '#1F232D',

          fontSize: '16px',
        }}
        href="https://ra.co/events/1692787"
        target="_blank"
      >
        RA —
      </a>
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
